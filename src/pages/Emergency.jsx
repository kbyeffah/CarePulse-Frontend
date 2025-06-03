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

// Fix for default marker icon in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const Emergency = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [emergencyStatus, setEmergencyStatus] = useState("idle");
  const [progress, setProgress] = useState(0);
  const [selectedBodyPart, setSelectedBodyPart] = useState("Head");
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [customMessage, setCustomMessage] = useState("");
  const [selectedPhrase, setSelectedPhrase] = useState("");
  const [userLocation, setUserLocation] = useState({
    autoDetected: "Detecting...",
    manual: "",
    manualInputString: "",
    coordinates: null,
    mapCenter: [5.6037, -0.1870],
    zoom: 10,
    locationError: null,
  });
  const [submittedAlert, setSubmittedAlert] = useState(null);
  const [locationConfirmed, setLocationConfirmed] = useState(false);

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

  const geocodeAddress = useCallback(async (address) => {
    if (!address) return { coords: null, displayName: "" };
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1&countrycodes=gh`
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

  useEffect(() => {
    if (currentStep === 3 && userLocation.autoDetected === "Detecting..." && userLocation.manualInputString === "") {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            const newCoordinates = [latitude, longitude];
            try {
              const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
              );
              const data = await response.json();
              if (data && data.display_name) {
                setUserLocation((prev) => ({
                  ...prev,
                  autoDetected: data.display_name,
                  coordinates: newCoordinates,
                  mapCenter: newCoordinates,
                  zoom: 13,
                  locationError: null,
                }));
              } else {
                setUserLocation((prev) => ({
                  ...prev,
                  autoDetected: `Lat: ${latitude}, Lon: ${longitude} (Address not found)`,
                  coordinates: newCoordinates,
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
                coordinates: newCoordinates,
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
              mapCenter: [5.6037, -0.1870],
              zoom: 10,
              coordinates: null,
            }));
          },
          { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
        );
      } else {
        setUserLocation((prev) => ({
          ...prev,
          autoDetected: "Geolocation not supported by this browser.",
          locationError: "Geolocation API is not supported by your browser.",
          mapCenter: [5.6037, -0.1870],
          zoom: 10,
          coordinates: null,
        }));
      }
    }
  }, [currentStep, userLocation.autoDetected, userLocation.manualInputString]);

  const handleInitialEmergencyAlert = () => setCurrentStep(2);
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
    setCurrentStep(5);
    let finalLocationString;
    let finalCoordinates;

    if (userLocation.manual && userLocation.coordinates) {
      finalLocationString = userLocation.manual;
      finalCoordinates = userLocation.coordinates;
    } else if (userLocation.autoDetected && userLocation.coordinates) {
      finalLocationString = userLocation.autoDetected;
      finalCoordinates = userLocation.coordinates;
    } else {
      finalLocationString = userLocation.manualInputString || userLocation.autoDetected || "Location not specified.";
      finalCoordinates = null;
    }

    const alertData = {
      symptoms: selectedSymptoms,
      message: customMessage || selectedPhrase,
      location: finalLocationString,
      coordinates: finalCoordinates,
      timestamp: new Date().toLocaleString(),
    };
    setSubmittedAlert(alertData);

    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 10;
      setProgress(currentProgress);
      if (currentProgress >= 100) {
        clearInterval(interval);
        setEmergencyStatus("sent");
        setTimeout(() => setEmergencyStatus("acknowledged"), 2000);
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
        manualInputString: "",
        coordinates: null,
        mapCenter: [5.6037, -0.1870],
        zoom: 10,
        locationError: null,
      });
      setSubmittedAlert(null);
      setLocationConfirmed(false);
    }
  };

  const handleConfirmLocation = () => {
    setLocationConfirmed(true);
    if (userLocation.autoDetected && !userLocation.manualInputString) {
      setUserLocation((prev) => ({
        ...prev,
        manual: prev.autoDetected,
        manualInputString: "",
      }));
    }
  };

  const handleManualLocationChange = async (e) => {
    const rawInput = e.target.value;
    setUserLocation((prev) => ({ ...prev, manualInputString: rawInput }));

    if (rawInput.length > 5) {
      setUserLocation((prev) => ({ ...prev, locationError: "Searching for location...", manual: "" }));
      const { coords, displayName } = await geocodeAddress(rawInput + ", Ghana");

      if (coords && displayName) {
        setUserLocation((prev) => ({
          ...prev,
          coordinates: coords,
          mapCenter: coords,
          zoom: 15,
          manual: displayName,
          locationError: null,
        }));
        setLocationConfirmed(true);
      } else {
        setUserLocation((prev) => ({
          ...prev,
          coordinates: null,
          mapCenter: [5.6037, -0.1870],
          zoom: 10,
          manual: "",
          locationError: "Could not find address. Please be more specific or use auto-detect.",
        }));
        setLocationConfirmed(false);
      }
    } else {
      setUserLocation((prev) => ({
        ...prev,
        locationError: null,
        coordinates: null,
        manual: "",
      }));
      setLocationConfirmed(false);
    }
  };

  const renderStepContent = () => {
    const displayLocation = userLocation.manual || userLocation.autoDetected;
    const displayCoordinates = userLocation.coordinates;

    switch (currentStep) {
      case 1:
        return (
          <div className="flex flex-col items-center justify-center gap-4 p-6 border rounded-lg bg-red-50 pt-32" style={{ borderColor: 'var(--text-color)', backgroundColor: 'var(--card-bg)' }}>
            <HeartPulse className="h-16 w-16 text-red-600 animate-pulse" />
            <h3 className="text-xl font-bold text-center" style={{ color: 'var(--text-color)' }}>Request Immediate Help</h3>
            <p className="text-center text-gray-600" style={{ color: 'var(--text-color)' }}>
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

      case 2:
        return (
          <div className="space-y-6" style={{ backgroundColor: 'var(--background-color)' }}>
            <div className="bg-white border rounded-lg shadow-sm p-6" style={{ borderColor: 'var(--text-color)', backgroundColor: 'var(--card-bg)' }}>
              <h3 className="text-lg font-bold mb-2 flex items-center gap-2" style={{ color: 'var(--text-color)' }}>
                <AlertTriangle className="h-5 w-5 text-red-600" />
                Report Emergency Symptoms
              </h3>
              <p className="text-gray-600 text-sm mb-4" style={{ color: 'var(--text-color)' }}>
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
              <div className="mb-4 border rounded p-4" style={{ borderColor: 'var(--text-color)', backgroundColor: 'var(--card-bg)' }}>
                <h4 className="font-medium mb-2" style={{ color: 'var(--text-color)' }}>Select symptoms for {selectedBodyPart}:</h4>
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
              <div className="bg-gray-100 p-4 rounded" style={{ backgroundColor: 'var(--card-bg)' }}>
                <h4 className="font-medium" style={{ color: 'var(--text-color)' }}>Selected Symptoms:</h4>
                <p className="text-sm mt-1" style={{ color: 'var(--text-color)' }}>
                  {selectedSymptoms.length > 0 ? selectedSymptoms.join(", ") : "None"}
                </p>
              </div>
            </div>
            <div className="bg-white border rounded-lg shadow-sm p-6" style={{ borderColor: 'var(--text-color)', backgroundColor: 'var(--card-bg)' }}>
              <h3 className="text-lg font-bold mb-2 flex items-center gap-2" style={{ color: 'var(--text-color)' }}>
                <MessageSquare className="h-5 w-5 text-red-600" />
                Emergency Communication
              </h3>
              <p className="text-gray-600 text-sm mb-4" style={{ color: 'var(--text-color)' }}>
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
                      setCustomMessage("");
                      handleTextToSpeech(phrase);
                    }}
                  >
                    <Volume2 className="h-4 w-4 flex-shrink-0 text-red-500" />
                    <span>{phrase}</span>
                  </button>
                ))}
              </div>
              <div className="mt-4">
                <label htmlFor="custom-message" className="block text-sm font-medium text-gray-700 mb-2" style={{ color: 'var(--text-color)' }}>
                  Custom Message (Optional):
                </label>
                <textarea
                  id="custom-message"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 text-sm"
                  rows="3"
                  placeholder="Type your message here..."
                  value={customMessage}
                  onChange={(e) => {
                    setCustomMessage(e.target.value);
                    setSelectedPhrase("");
                  }}
                  style={{ borderColor: 'var(--text-color)', backgroundColor: 'var(--card-bg)', color: 'var(--text-color)' }}
                ></textarea>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4 p-6 border rounded-lg bg-red-50" style={{ borderColor: 'var(--text-color)', backgroundColor: 'var(--card-bg)' }}>
            <h3 className="text-lg font-bold mb-2 flex items-center gap-2" style={{ color: 'var(--text-color)' }}>
              <MapPin className="h-5 w-5 text-red-600" />
              Confirm Your Location in Ghana
            </h3>
            <p className="text-gray-600 text-sm mb-4" style={{ color: 'var(--text-color)' }}>
              Your precise location helps emergency services find you quickly. The map will display your detected location within Ghana.
              Please confirm your location or enter it manually below.
            </p>
            {userLocation.locationError && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" style={{ borderColor: 'var(--text-color)', backgroundColor: 'var(--card-bg)' }}>
                <strong className="font-bold" style={{ color: 'var(--text-color)' }}>Location Error!</strong>
                <span className="block sm:inline ml-2" style={{ color: 'var(--text-color)' }}>{userLocation.locationError}</span>
              </div>
            )}
            <div className="bg-white p-4 rounded-lg shadow-sm" style={{ borderColor: 'var(--text-color)', backgroundColor: 'var(--card-bg)' }}>
              <p className="font-medium" style={{ color: 'var(--text-color)' }}>Auto-detected Location:</p>
              <p className="text-gray-700 text-sm mt-1" style={{ color: 'var(--text-color)' }}>
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
            <div className="w-full h-80 bg-gray-200 rounded-lg overflow-hidden relative" style={{ backgroundColor: 'var(--card-bg)' }}>
              {userLocation.coordinates || userLocation.mapCenter ? (
                <MapContainer
                  center={userLocation.mapCenter}
                  zoom={userLocation.zoom}
                  scrollWheelZoom={true}
                  className="w-full h-full z-0"
                  key={JSON.stringify(userLocation.mapCenter) + userLocation.zoom}
                >
                  <TileLayer
                    attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  {userLocation.coordinates && (
                    <Marker position={userLocation.coordinates}>
                      <Popup>{userLocation.manual ? userLocation.manual : userLocation.autoDetected}</Popup>
                    </Marker>
                  )}
                </MapContainer>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-600 text-sm" style={{ color: 'var(--text-color)' }}>
                  <Loader2 className="h-8 w-8 mr-2 animate-spin" /> Loading Map...
                </div>
              )}
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm" style={{ borderColor: 'var(--text-color)', backgroundColor: 'var(--card-bg)' }}>
              <label htmlFor="manual-location" className="block text-sm font-medium text-gray-700 mb-2" style={{ color: 'var(--text-color)' }}>
                Manual Location / Additional Details (Optional):
              </label>
              <input
                type="text"
                id="manual-location"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 text-sm"
                placeholder="e.g., Apartment 4B, near the park entrance, landmark details"
                value={userLocation.manualInputString}
                onChange={handleManualLocationChange}
                style={{ borderColor: 'var(--text-color)', backgroundColor: 'var(--card-bg)', color: 'var(--text-color)' }}
              />
              <p className="text-gray-500 text-xs mt-1" style={{ color: 'var(--text-color)' }}>
                Provide more precise details if auto-detected location is inaccurate, or if you need to specify a different location within Ghana.
              </p>
              {userLocation.manual && userLocation.manualInputString && (
                <p className="text-sm mt-2 text-green-700" style={{ color: 'var(--text-color)' }}>
                  Geocoded to: <span className="font-medium">{userLocation.manual}</span>
                </p>
              )}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4 p-6 border rounded-lg bg-red-50" style={{ borderColor: 'var(--text-color)', backgroundColor: 'var(--card-bg)' }}>
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2" style={{ color: 'var(--text-color)' }}>
              <CheckCircle className="h-5 w-5 text-red-600" />
              Review Your Emergency Alert
            </h3>
            <div className="bg-white p-4 rounded-lg shadow-sm" style={{ borderColor: 'var(--text-color)', backgroundColor: 'var(--card-bg)' }}>
              <h4 className="font-medium mb-2" style={{ color: 'var(--text-color)' }}>Selected Symptoms:</h4>
              <p className="text-gray-700 text-sm" style={{ color: 'var(--text-color)' }}>
                {selectedSymptoms.length > 0 ? selectedSymptoms.join(", ") : "No symptoms reported."}
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm" style={{ borderColor: 'var(--text-color)', backgroundColor: 'var(--card-bg)' }}>
              <h4 className="font-medium mb-2" style={{ color: 'var(--text-color)' }}>Emergency Message:</h4>
              <p className="text-gray-700 text-sm" style={{ color: 'var(--text-color)' }}>
                {customMessage || selectedPhrase || "No specific message provided."}
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm" style={{ borderColor: 'var(--text-color)', backgroundColor: 'var(--card-bg)' }}>
              <h4 className="font-medium mb-2" style={{ color: 'var(--text-color)' }}>Your Location:</h4>
              <p className="text-gray-700 text-sm" style={{ color: 'var(--text-color)' }}>
                {displayLocation || "Location not provided."}
              </p>
              {displayCoordinates && (
                <p className="text-gray-600 text-xs mt-1" style={{ color: 'var(--text-color)' }}>
                  Coordinates: {displayCoordinates[0].toFixed(4)}, {displayCoordinates[1].toFixed(4)}
                </p>
              )}
            </div>
            <p className="text-center text-gray-700 text-sm mt-4" style={{ color: 'var(--text-color)' }}>
              Please review all information carefully before submitting your alert.
            </p>
          </div>
        );

      case 5:
        return (
          <div className="flex flex-col items-center justify-center gap-6 p-6 border rounded-lg bg-red-50" style={{ borderColor: 'var(--text-color)', backgroundColor: 'var(--card-bg)' }}>
            <h3 className="text-xl font-bold text-center flex items-center gap-2 text-red-700" style={{ color: 'var(--text-color)' }}>
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
            <div className="w-full bg-gray-200 rounded-full h-3" style={{ backgroundColor: 'var(--card-bg)' }}>
              <div
                className="bg-red-600 h-3 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            {emergencyStatus === "acknowledged" && (
              <div className="w-full space-y-3 text-center">
                <p className="text-lg font-semibold text-gray-800" style={{ color: 'var(--text-color)' }}>
                  Ambulance Contacted: <span className="text-green-700">Confirmed</span>
                </p>
                <p className="text-lg font-semibold text-gray-800" style={{ color: 'var(--text-color)' }}>
                  Estimated Time of Arrival (ETA): <span className="text-red-700">~5 minutes</span>
                </p>
                {submittedAlert && (
                  <div className="text-sm text-gray-600" style={{ color: 'var(--text-color)' }}>
                    <p>Alert submitted at: {submittedAlert.timestamp}</p>
                    <p>Location shared: {submittedAlert.location}</p>
                    {submittedAlert.coordinates && (
                      <p>Coordinates: {submittedAlert.coordinates[0].toFixed(4)}, {submittedAlert.coordinates[1].toFixed(4)}</p>
                    )}
                  </div>
                )}
              </div>
            )}
            <div className="w-full h-64 bg-gray-300 rounded-lg overflow-hidden relative" style={{ backgroundColor: 'var(--card-bg)' }}>
              {submittedAlert && submittedAlert.coordinates ? (
                <MapContainer
                  center={submittedAlert.coordinates}
                  zoom={submittedAlert.coordinates ? 15 : userLocation.zoom}
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
                <div className="w-full h-full flex items-center justify-center text-gray-600 text-sm" style={{ color: 'var(--text-color)' }}>
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
      <div className="p-6 space-y-6 max-w-4xl mx-auto min-h-screen mt-[5%]" style={{ backgroundColor: 'var(--background-color)' }}>
        <div className="bg-white border border-red-200 rounded-lg shadow-lg" style={{ borderColor: 'var(--text-color)', backgroundColor: 'var(--card-bg)' }}>
          <div className="bg-red-50 px-6 py-4 border-b border-red-200 rounded-t-lg" style={{ borderBottomColor: 'var(--text-color)', backgroundColor: 'var(--card-bg)' }}>
            <h2 className="text-red-700 text-xl font-bold flex items-center gap-2" style={{ color: 'var(--text-color)' }}>
              <AlertTriangle className="h-5 w-5" />
              Emergency Assistance
            </h2>
            <p className="text-gray-600 text-sm mt-1" style={{ color: 'var(--text-color)' }}>
              Follow the steps to request immediate medical assistance.
            </p>
          </div>
          <div className="p-6">
            <div className="mb-6">
              <div className="w-full bg-gray-200 rounded-full h-2" style={{ backgroundColor: 'var(--card-bg)' }}>
                <div
                  className="bg-red-500 h-2 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${getStepProgress()}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-gray-600 mt-2" style={{ color: 'var(--text-color)' }}>
                <span>Step 1: Alert</span>
                <span>Step 2: Details</span>
                <span>Step 3: Location</span>
                <span>Step 4: Review</span>
                <span>Step 5: Status</span>
              </div>
            </div>
            {renderStepContent()}
            {currentStep > 1 && currentStep < 5 && (
              <div className="flex justify-between mt-6">
                <button
                  onClick={() => {
                    setCurrentStep((prev) => prev - 1);
                    setLocationConfirmed(false);
                  }}
                  className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition-colors flex items-center gap-2" style={{ color: 'var(--text-color)', backgroundColor: 'var(--card-bg)' }}
                >
                  <ChevronLeft className="h-5 w-5" /> Back
                </button>
                {currentStep < 4 ? (
                  <button
                    onClick={() => setCurrentStep((prev) => prev + 1)}
                    disabled={currentStep === 3 && !locationConfirmed}
                    className={`px-6 py-3 text-white rounded-lg font-semibold transition-colors flex items-center gap-2 ${
                      currentStep === 3 && !locationConfirmed ? "bg-gray-400 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"
                    }`}
                  >
                    Next <ChevronRight className="h-5 w-5" />
                  </button>
                ) : (
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