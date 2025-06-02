import { useState, useEffect, useCallback } from "react";
import {
  AlertTriangle,
  Phone,
  MessageSquare,
  MapPin,
  Ambulance,
  Volume2,
  Loader2,
  CheckCircle,
  HeartPulse,
  ChevronRight,
  ChevronLeft,
  XCircle,
} from "lucide-react";
import PagesLayout from "../layouts/PagesLayout";

// Import Leaflet components and CSS
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon in Leaflet (often needed with Webpack/Create React App)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});


const Emergency = () => {
  const [currentStep, setCurrentStep] = useState(1); // 1: Alert Button, 2: Details, 3: Location, 4: Submit, 5: Status
  const [emergencyStatus, setEmergencyStatus] = useState("idle");
  const [progress, setProgress] = useState(0);
  const [selectedBodyPart, setSelectedBodyPart] = useState("Head");
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [customMessage, setCustomMessage] = useState("");
  const [selectedPhrase, setSelectedPhrase] = useState("");
  const [userLocation, setUserLocation] = useState({
    autoDetected: "Detecting...", // Stores the full display name from Nominatim
    manual: "", // Stores the full display name from Nominatim after geocoding manual input
    manualInputString: "", // New: Stores the raw text the user types
    coordinates: null, // Stores [latitude, longitude]
    mapCenter: [5.6037, -0.1870], // Default to center of Accra for initial map load
    zoom: 10, // Default zoom level for Accra
    locationError: null,
  });
  const [submittedAlert, setSubmittedAlert] = useState(null); // Stores the final alert data
  const [locationConfirmed, setLocationConfirmed] = useState(false); // Track if location is confirmed

  const bodyParts = ["Head", "Chest", "Abdomen", "Heart", "General", "Pain"];

  const symptomsMap = {
    Head: ["Headache", "Dizziness", "Blurred vision", "Ear pain", "Sore throat"],
    Chest: ["Chest pain", "Shortness of breath", "Palpitations"],
    Abdomen: ["Stomach ache", "Nausea", "Vomiting", "Diarrhea"],
    Heart: ["Palpitations", "Fainting", "Chest pressure"],
    General: ["Fever", "Fatigue", "Weakness", "Chills", "Rash"],
    Pain: ["Back pain", "Joint pain", "Muscle pain", "Sharp pain", "Dull pain"],
  };

  const emergencyPhrases = [
    "I can't breathe",
    "There is bleeding",
    "I have chest pain",
    "I'm feeling dizzy",
    "I'm having a seizure",
    "I'm bleeding heavily",
    "I have severe pain",
    "I can't move",
    "I'm having an allergic reaction",
    "I need medication",
  ];

  // Function to geocode an address
  const geocodeAddress = useCallback(async (address) => {
    if (!address) {
      return { coords: null, displayName: "" };
    }
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1&countrycodes=gh` // Limit to Ghana
      );
      const data = await response.json();
      if (data && data.length > 0) {
        const { lat, lon, display_name } = data[0];
        return { coords: [parseFloat(lat), parseFloat(lon)], displayName: display_name };
      }
      return { coords: null, displayName: "" };
    } catch (error) {
      console.error("Error geocoding address:", error);
      return { coords: null, displayName: "" };
    }
  }, []);

  // Auto-detect location using Geolocation API and reverse geocoding
  useEffect(() => {
    // Only attempt detection if on step 3 and autoDetected is still 'Detecting...' AND manualInputString is empty (prioritize manual if user starts typing)
    if (currentStep === 3 && userLocation.autoDetected === "Detecting..." && userLocation.manualInputString === "") {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            const newCoordinates = [latitude, longitude];

            // Reverse geocoding using OpenStreetMap Nominatim API
            try {
              const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
              );
              const data = await response.json();
              if (data && data.display_name) {
                setUserLocation((prev) => ({
                  ...prev,
                  autoDetected: data.display_name,
                  coordinates: newCoordinates, // Ensure coordinates are set from auto-detect
                  mapCenter: newCoordinates, // Center map on detected location
                  zoom: 13, // Zoom in on detected location
                  locationError: null,
                }));
              } else {
                setUserLocation((prev) => ({
                  ...prev,
                  autoDetected: `Lat: ${latitude}, Lon: ${longitude} (Address not found)`,
                  coordinates: newCoordinates, // Ensure coordinates are set from auto-detect
                  mapCenter: newCoordinates,
                  zoom: 13,
                  locationError: null,
                }));
              }
            } catch (error) {
              console.error("Error during reverse geocoding:", error);
              setUserLocation((prev) => ({
                ...prev,
                autoDetected: `Lat: ${latitude}, Lon: ${longitude} (Failed to get address details)`,
                coordinates: newCoordinates, // Ensure coordinates are set from auto-detect
                mapCenter: newCoordinates,
                zoom: 13,
                locationError: "Failed to get address details. Please check your internet connection.",
              }));
            }
          },
          (error) => {
            console.error("Geolocation error:", error);
            let errorMessage = "Geolocation not available.";
            switch (error.code) {
              case error.PERMISSION_DENIED:
                errorMessage = "Location access denied. Please enable location services in your browser settings.";
                break;
              case error.POSITION_UNAVAILABLE:
                errorMessage = "Location information unavailable.";
                break;
              case error.TIMEOUT:
                errorMessage = "The request to get user location timed out.";
                break;
              default:
                errorMessage = `An unknown error occurred while detecting location: ${error.message}`;
                break;
            }
            setUserLocation((prev) => ({
              ...prev,
              autoDetected: `Could not detect location.`,
              locationError: errorMessage,
              mapCenter: [5.6037, -0.1870], // Default to Accra center if detection fails
              zoom: 10,
              coordinates: null, // Clear coordinates if detection failed
            }));
          },
          { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 } // High accuracy, 10s timeout, no cached position
        );
      } else {
        setUserLocation((prev) => ({
          ...prev,
          autoDetected: "Geolocation not supported by this browser.",
          locationError: "Geolocation API is not supported by your browser.",
          mapCenter: [5.6037, -0.1870], // Default to Accra center
          zoom: 10,
          coordinates: null,
        }));
      }
    }
  }, [currentStep, userLocation.autoDetected, userLocation.manualInputString]);


  const handleInitialEmergencyAlert = () => {
    setCurrentStep(2); // Move to Emergency Details step
  };

  const handleTextToSpeech = (text) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Text-to-Speech not supported in your browser");
    }
  };

  const toggleSymptom = (symptom) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptom) ? prev.filter((s) => s !== symptom) : [...prev, symptom]
    );
  };

  const handleSubmitAlert = () => {
    setEmergencyStatus("sending");
    setCurrentStep(5); // Move to status display

    // Determine the final location string and coordinates to submit
    let finalLocationString;
    let finalCoordinates;

    if (userLocation.manual && userLocation.coordinates) {
      // If manual input resulted in geocoded coordinates, use that
      finalLocationString = userLocation.manual;
      finalCoordinates = userLocation.coordinates;
    } else if (userLocation.autoDetected && userLocation.coordinates) {
      // Otherwise, use auto-detected if available and has coordinates
      finalLocationString = userLocation.autoDetected;
      finalCoordinates = userLocation.coordinates;
    } else {
      // Fallback if neither works well
      finalLocationString = userLocation.manualInputString || userLocation.autoDetected || "Location not specified.";
      finalCoordinates = null; // No reliable coordinates
    }

    const alertData = {
      symptoms: selectedSymptoms,
      message: customMessage || selectedPhrase,
      location: finalLocationString,
      coordinates: finalCoordinates,
      timestamp: new Date().toLocaleString(),
    };
    setSubmittedAlert(alertData);

    // Simulate progress
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 10;
      setProgress(currentProgress);
      if (currentProgress >= 100) {
        clearInterval(interval);
        setEmergencyStatus("sent");
        // Simulate acknowledgment after 2 seconds
        setTimeout(() => {
          setEmergencyStatus("acknowledged");
        }, 2000);
      }
    }, 200);
  };

  const handleCancelEmergency = () => {
    if (window.confirm("Are you sure you want to cancel the emergency alert?")) {
      setEmergencyStatus("idle");
      setCurrentStep(1);
      setProgress(0);
      setSelectedSymptoms([]);
      setCustomMessage("");
      setSelectedPhrase("");
      setUserLocation({
        autoDetected: "Detecting...",
        manual: "",
        manualInputString: "", // Reset raw input too
        coordinates: null,
        mapCenter: [5.6037, -0.1870], // Reset to default Accra center
        zoom: 10,
        locationError: null,
      });
      setSubmittedAlert(null);
      setLocationConfirmed(false); // Reset location confirmation
    }
  };

  // Handler for confirming auto-detected location
  const handleConfirmLocation = () => {
    setLocationConfirmed(true);
    // When auto-detected is confirmed, we can treat it as the "final" manual input if the user didn't type
    if (userLocation.autoDetected && !userLocation.manualInputString) {
      setUserLocation(prev => ({
        ...prev,
        manual: prev.autoDetected, // Use auto-detected as the 'manual' value if user confirms it
        manualInputString: "" // Clear raw manual input if any
      }));
    }
  };

  // Handler for manual location input change
  const handleManualLocationChange = async (e) => {
    const rawInput = e.target.value;
    setUserLocation((prev) => ({ ...prev, manualInputString: rawInput }));

    if (rawInput.length > 5) { // Only geocode if enough characters are typed
      setUserLocation((prev) => ({ ...prev, locationError: "Searching for location...", manual: "" }));
      const { coords, displayName } = await geocodeAddress(rawInput + ", Ghana"); // Add "Ghana" for better results

      if (coords && displayName) {
        setUserLocation((prev) => ({
          ...prev,
          coordinates: coords,
          mapCenter: coords,
          zoom: 15, // Zoom in on the manually entered location
          manual: displayName, // Store the geocoded display name here
          locationError: null,
        }));
        setLocationConfirmed(true); // Manually entering and geocoding implies confirmation
      } else {
        setUserLocation((prev) => ({
          ...prev,
          coordinates: null, // Clear coordinates if geocoding fails
          mapCenter: [5.6037, -0.1870], // Revert to Accra center
          zoom: 10,
          manual: "", // Clear geocoded manual name
          locationError: "Could not find address. Please be more specific or use auto-detect.",
        }));
        setLocationConfirmed(false); // If geocoding failed, location is not confirmed
      }
    } else {
        setUserLocation((prev) => ({
            ...prev,
            locationError: null,
            coordinates: null, // Clear coords if input is too short
            manual: "" // Clear geocoded manual name
        }));
        setLocationConfirmed(false); // Not enough input to confirm
    }
  };

  const renderStepContent = () => {
    const displayLocation = userLocation.manual || userLocation.autoDetected;
    const displayCoordinates = userLocation.coordinates;

    switch (currentStep) {
      case 1: // Initial Alert Button
        return (
          <div className="flex flex-col items-center justify-center gap-4 p-6 border rounded-lg bg-red-50 pt-32">
            <HeartPulse className="h-16 w-16 text-red-600 animate-pulse" />
            <h3 className="text-xl font-bold text-center">Request Immediate Help</h3>
            <p className="text-center text-gray-600">
              Press the button below to alert medical staff of an emergency situation.
            </p>
            <button
              className="w-full bg-red-600 hover:bg-red-700 text-white text-lg py-6 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
              onClick={handleInitialEmergencyAlert}
            >
              <AlertTriangle className="h-5 w-5" />
              Emergency Alert
            </button>
          </div>
        );

      case 2: // Emergency Details (Symptoms & Communication)
        return (
          <div className="space-y-6">
            {/* Symptoms Section */}
            <div className="bg-white border rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                Report Emergency Symptoms
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Quickly select symptoms to report in an emergency situation.
              </p>

              <div className="grid grid-cols-3 md:grid-cols-6 gap-2 mb-4">
                {bodyParts.map((part) => (
                  <button
                    key={part}
                    onClick={() => setSelectedBodyPart(part)}
                    className={`border p-2 rounded text-sm font-medium transition-colors duration-200 ${
                      selectedBodyPart === part
                        ? "bg-red-600 text-white border-red-600"
                        : "bg-white hover:bg-red-50 hover:border-red-300"
                    }`}
                  >
                    {part}
                  </button>
                ))}
              </div>

              <div className="mb-4 border rounded p-4">
                <h4 className="font-medium mb-2">Select symptoms for {selectedBodyPart}:</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {symptomsMap[selectedBodyPart].map((symptom) => (
                    <button
                      key={symptom}
                      onClick={() => toggleSymptom(symptom)}
                      className={`border p-2 rounded text-sm transition-colors duration-200 ${
                        selectedSymptoms.includes(symptom)
                          ? "bg-red-600 text-white border-red-600"
                          : "bg-white hover:bg-red-50 hover:border-red-300"
                      }`}
                    >
                      {symptom}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-gray-100 p-4 rounded">
                <h4 className="font-medium">Selected Symptoms:</h4>
                <p className="text-sm mt-1">
                  {selectedSymptoms.length > 0 ? selectedSymptoms.join(", ") : "None"}
                </p>
              </div>
            </div>

            {/* Communication Section */}
            <div className="bg-white border rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-red-600" />
                Emergency Communication
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Use pre-defined phrases or type a custom message for emergency communication.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                {emergencyPhrases.map((phrase, index) => (
                  <button
                    key={index}
                    className={`flex items-center gap-2 p-3 border rounded-lg text-left transition-colors ${
                      selectedPhrase === phrase
                        ? "bg-red-100 border-red-500 text-red-700"
                        : "hover:bg-red-50 hover:border-red-300"
                    }`}
                    onClick={() => {
                      setSelectedPhrase(phrase);
                      setCustomMessage(""); // Clear custom message if a phrase is selected
                      handleTextToSpeech(phrase);
                    }}
                  >
                    <Volume2 className="h-4 w-4 flex-shrink-0 text-red-500" />
                    <span>{phrase}</span>
                  </button>
                ))}
              </div>

              <div className="mt-4">
                <label htmlFor="custom-message" className="block text-sm font-medium text-gray-700 mb-2">
                  Custom Message (Optional):
                </label>
                <textarea
                  id="custom-message"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                  rows="3"
                  placeholder="Type your message here..."
                  value={customMessage}
                  onChange={(e) => {
                    setCustomMessage(e.target.value);
                    setSelectedPhrase(""); // Clear selected phrase if a custom message is typed
                  }}
                ></textarea>
              </div>
            </div>
          </div>
        );

      case 3: // Confirm Location with Map
        return (
          <div className="space-y-4 p-6 border rounded-lg bg-red-50">
            <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
              <MapPin className="h-5 w-5 text-red-600" />
              Confirm Your Location in Ghana
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Your precise location helps emergency services find you quickly. The map will display your detected location within Ghana.
              Please confirm your location or enter it manually below.
            </p>

            {userLocation.locationError && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                <strong className="font-bold">Location Error!</strong>
                <span className="block sm:inline ml-2">{userLocation.locationError}</span>
              </div>
            )}

            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="font-medium">Auto-detected Location:</p>
              <p className="text-gray-700 text-sm mt-1">
                {userLocation.autoDetected}
                {userLocation.autoDetected !== "Detecting..." && userLocation.coordinates && (
                    <span className="ml-2 text-green-600">(Lat: {userLocation.coordinates[0].toFixed(4)}, Lon: {userLocation.coordinates[1].toFixed(4)})</span>
                )}
              </p>
              {!locationConfirmed && userLocation.autoDetected !== "Detecting..." && !userLocation.locationError && !userLocation.manualInputString && (
                <button
                  onClick={handleConfirmLocation}
                  className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm"
                >
                  Confirm Auto-detected Location
                </button>
              )}
            </div>

            {/* Map Integration */}
            <div className="w-full h-80 bg-gray-200 rounded-lg overflow-hidden relative">
              {userLocation.coordinates || userLocation.mapCenter ? (
                <MapContainer
                  center={userLocation.mapCenter}
                  zoom={userLocation.zoom}
                  scrollWheelZoom={true}
                  className="w-full h-full z-0"
                  key={JSON.stringify(userLocation.mapCenter) + userLocation.zoom} // Force remount when center or zoom changes
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  {userLocation.coordinates && (
                    <Marker position={userLocation.coordinates}>
                      <Popup>
                        {userLocation.manual ? userLocation.manual : userLocation.autoDetected}
                      </Popup>
                    </Marker>
                  )}
                </MapContainer>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-600 text-sm">
                  <Loader2 className="h-8 w-8 mr-2 animate-spin" /> Loading Map...
                </div>
              )}
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm">
              <label htmlFor="manual-location" className="block text-sm font-medium text-gray-700 mb-2">
                Manual Location / Additional Details (Optional):
              </label>
              <input
                type="text"
                id="manual-location"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                placeholder="e.g., Apartment 4B, near the park entrance, landmark details"
                value={userLocation.manualInputString} // Bind to the raw input string
                onChange={handleManualLocationChange}
              />
              <p className="text-gray-500 text-xs mt-1">
                Provide more precise details if auto-detected location is inaccurate, or if you need to specify a different location within Ghana.
              </p>
              {userLocation.manual && userLocation.manualInputString && (
                 <p className="text-sm mt-2 text-green-700">
                    Geocoded to: <span className="font-medium">{userLocation.manual}</span>
                 </p>
              )}
            </div>
          </div>
        );

      case 4: // Review & Submit
        return (
          <div className="space-y-4 p-6 border rounded-lg bg-red-50">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-red-600" />
              Review Your Emergency Alert
            </h3>

            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h4 className="font-medium mb-2">Selected Symptoms:</h4>
              <p className="text-gray-700 text-sm">
                {selectedSymptoms.length > 0 ? selectedSymptoms.join(", ") : "No symptoms reported."}
              </p>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h4 className="font-medium mb-2">Emergency Message:</h4>
              <p className="text-gray-700 text-sm">
                {customMessage || selectedPhrase || "No specific message provided."}
              </p>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h4 className="font-medium mb-2">Your Location:</h4>
              <p className="text-gray-700 text-sm">
                {displayLocation || "Location not provided."}
              </p>
              {displayCoordinates && (
                <p className="text-gray-600 text-xs mt-1">
                  Coordinates: {displayCoordinates[0].toFixed(4)}, {displayCoordinates[1].toFixed(4)}
                </p>
              )}
            </div>

            <p className="text-center text-gray-700 text-sm mt-4">
              Please review all information carefully before submitting your alert.
            </p>
          </div>
        );

      case 5: // Status & Tracking
        return (
          <div className="flex flex-col items-center justify-center gap-6 p-6 border rounded-lg bg-red-50">
            <h3 className="text-xl font-bold text-center flex items-center gap-2 text-red-700">
              {emergencyStatus === "sending" && (
                <Loader2 className="h-6 w-6 animate-spin text-red-600" />
              )}
              {emergencyStatus === "sent" && (
                <CheckCircle className="h-6 w-6 text-green-600" />
              )}
              {emergencyStatus === "acknowledged" && (
                <Ambulance className="h-6 w-6 text-red-600" />
              )}
              {emergencyStatus === "sending" && "Sending Emergency Alert..."}
              {emergencyStatus === "sent" && "Alert Sent Successfully!"}
              {emergencyStatus === "acknowledged" && "Ambulance Dispatched - Help is Coming!"}
            </h3>

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-red-600 h-3 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>

            {emergencyStatus === "acknowledged" && (
              <div className="w-full space-y-3 text-center">
                <p className="text-lg font-semibold text-gray-800">
                  Ambulance Contacted: <span className="text-green-700">Confirmed</span>
                </p>
                <p className="text-lg font-semibold text-gray-800">
                  Estimated Time of Arrival (ETA): <span className="text-red-700">~5 minutes</span>
                </p>
                {submittedAlert && (
                  <div className="text-sm text-gray-600">
                    <p>Alert submitted at: {submittedAlert.timestamp}</p>
                    <p>Location shared: {submittedAlert.location}</p>
                    {submittedAlert.coordinates && (
                        <p>Coordinates: {submittedAlert.coordinates[0].toFixed(4)}, {submittedAlert.coordinates[1].toFixed(4)}</p>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Live Map in Status Section */}
            <div className="w-full h-64 bg-gray-300 rounded-lg overflow-hidden relative">
              {submittedAlert && submittedAlert.coordinates ? (
                <MapContainer
                  center={submittedAlert.coordinates}
                  zoom={submittedAlert.coordinates ? 15 : userLocation.zoom} // Zoom closer if coordinates available
                  scrollWheelZoom={false}
                  dragging={false}
                  doubleClickZoom={false}
                  zoomControl={false}
                  attributionControl={false}
                  className="w-full h-full z-0"
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker position={submittedAlert.coordinates}>
                    <Popup>Your Alert Location</Popup>
                  </Marker>
                </MapContainer>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-600 text-sm">
                  <MapPin className="h-8 w-8 mr-2" /> Map Location Not Available
                </div>
              )}
            </div>

            <div className="w-full flex flex-col md:flex-row gap-4">
              <button
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                onClick={() => handleTextToSpeech("Calling emergency services at 112")}
              >
                <Phone className="h-5 w-5" /> Call 112
              </button>
              <button
                className="flex-1 bg-gray-400 hover:bg-gray-500 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                onClick={handleCancelEmergency}
              >
                <XCircle className="h-5 w-5" /> Cancel Emergency
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const getStepProgress = () => {
    const steps = [1, 2, 3, 4, 5];
    const currentIndex = steps.indexOf(currentStep);
    return ((currentIndex + 1) / steps.length) * 100;
  };

  return (
    <PagesLayout>
      <div className="p-6 space-y-6 max-w-4xl mx-auto min-h-screen mt-[5%]">
        <div className="bg-white border border-red-200 rounded-lg shadow-lg">
          <div className="bg-red-50 px-6 py-4 border-b border-red-200 rounded-t-lg">
            <h2 className="text-red-700 text-xl font-bold flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Emergency Assistance
            </h2>
            <p className="text-gray-600 text-sm mt-1">
              Follow the steps to request immediate medical assistance.
            </p>
          </div>

          <div className="p-6">
            {/* Wizard Step Indicator */}
            <div className="mb-6">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-red-500 h-2 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${getStepProgress()}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-gray-600 mt-2">
                <span>Step 1: Alert</span>
                <span>Step 2: Details</span>
                <span>Step 3: Location</span>
                <span>Step 4: Review</span>
                <span>Step 5: Status</span>
              </div>
            </div>

            {renderStepContent()}

            {/* Navigation Buttons for Wizard Steps */}
            {currentStep > 1 && currentStep < 5 && ( // Don't show on first step or status step
              <div className="flex justify-between mt-6">
                <button
                  onClick={() => {
                    setCurrentStep((prev) => prev - 1);
                    setLocationConfirmed(false); // Reset confirmation on back
                  }}
                  className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition-colors flex items-center gap-2"
                >
                  <ChevronLeft className="h-5 w-5" /> Back
                </button>
                {currentStep < 4 ? (
                  <button
                    onClick={() => setCurrentStep((prev) => prev + 1)}
                    // Disable 'Next' button if on step 3 and location is not confirmed
                    disabled={currentStep === 3 && !locationConfirmed}
                    className={`px-6 py-3 text-white rounded-lg font-semibold transition-colors flex items-center gap-2
                      ${currentStep === 3 && !locationConfirmed ? "bg-gray-400 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"}
                    `}
                  >
                    Next <ChevronRight className="h-5 w-5" />
                  </button>
                ) : (
                  // This is the desired "Submit Alert" button (green style)
                  <button
                    onClick={handleSubmitAlert}
                    className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center gap-2"
                  >
                    <CheckCircle className="h-5 w-5" /> Submit Alert
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </PagesLayout>
  );
};

export default Emergency;