import { Search, User, Heart, Thermometer, Activity, Wind } from "lucide-react";

function PatientsTab({ patients, selectedPatient, setSelectedPatient }) {
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "Stable": return "bg-green-100 text-green-800";
      case "Improving": return "bg-blue-100 text-blue-800";
      case "Critical": return "bg-red-100 text-red-800";
      case "New": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const enhancedPatients = [
    {
      id: 1,
      name: "Kofi Mensah",
      age: 45,
      gender: "Male",
      condition: "Hypertension",
      status: "Stable",
      lastUpdated: "10 min ago",
      lastVisit: "2023-04-15",
      nextAppointment: "2023-05-20",
      vitals: {
        bloodPressure: "140/90",
        heartRate: 78,
        temperature: 36.8,
        respiratoryRate: 16,
        bloodPressureStatus: "elevated",
        heartRateStatus: "normal",
        temperatureStatus: "normal",
        respiratoryRateStatus: "normal"
      },
      clinicalNotes: "Patient has been managing hypertension for 5 years. Recent blood tests show improved kidney function.",
      symptoms: ["Occasional headaches", "Mild fatigue"],
      medications: ["Lisinopril 10mg daily", "Hydrochlorothiazide 25mg daily"],
      allergies: ["Penicillin"]
    },
    {
      id: 2,
      name: "Ama Owusu",
      age: 32,
      gender: "Female",
      condition: "Pregnancy",
      status: "Stable",
      lastUpdated: "25 min ago",
      lastVisit: "2023-05-10",
      nextAppointment: "2023-05-25",
      vitals: {
        bloodPressure: "115/75",
        heartRate: 85,
        temperature: 36.5,
        respiratoryRate: 18,
        bloodPressureStatus: "normal",
        heartRateStatus: "normal",
        temperatureStatus: "normal",
        respiratoryRateStatus: "normal"
      },
      clinicalNotes: "28 weeks pregnant. Regular prenatal visits. No complications detected.",
      symptoms: ["Morning sickness (resolved)", "Mild back pain"],
      medications: ["Prenatal vitamins", "Iron supplements"],
      allergies: ["None known"]
    },
    {
      id: 3,
      name: "Kwame Asante",
      age: 67,
      gender: "Male",
      condition: "Diabetes",
      status: "Improving",
      lastUpdated: "1 hour ago",
      lastVisit: "2023-05-05",
      nextAppointment: "2023-05-22",
      vitals: {
        bloodPressure: "135/85",
        heartRate: 72,
        temperature: 36.7,
        respiratoryRate: 14,
        bloodPressureStatus: "elevated",
        heartRateStatus: "normal",
        temperatureStatus: "normal",
        respiratoryRateStatus: "normal"
      },
      clinicalNotes: "Type 2 diabetes. Blood glucose levels improving with medication adherence.",
      symptoms: ["Increased thirst", "Frequent urination"],
      medications: ["Metformin 1000mg twice daily", "Insulin glargine 20 units"],
      allergies: ["Sulfa drugs"]
    },
    {
      id: 4,
      name: "Akosua Boateng",
      age: 45,
      gender: "Female",
      condition: "Malaria",
      status: "Improving",
      lastUpdated: "2 hours ago",
      lastVisit: "2023-05-18",
      nextAppointment: "2023-05-24",
      vitals: {
        bloodPressure: "120/80",
        heartRate: 90,
        temperature: 37.8,
        respiratoryRate: 20,
        bloodPressureStatus: "normal",
        heartRateStatus: "elevated",
        temperatureStatus: "elevated",
        respiratoryRateStatus: "elevated"
      },
      clinicalNotes: "Responding well to antimalarial treatment. Fever subsiding gradually.",
      symptoms: ["Fever", "Chills", "Headache", "Muscle aches"],
      medications: ["Artemether-lumefantrine", "Paracetamol for fever"],
      allergies: ["None known"]
    },
    {
      id: 5,
      name: "Yaw Darko",
      age: 52,
      gender: "Male",
      condition: "Chest Pain",
      status: "Critical",
      lastUpdated: "5 min ago",
      lastVisit: "2023-05-21",
      nextAppointment: "Emergency followup",
      vitals: {
        bloodPressure: "160/100",
        heartRate: 110,
        temperature: 37.2,
        respiratoryRate: 22,
        bloodPressureStatus: "high",
        heartRateStatus: "elevated",
        temperatureStatus: "elevated",
        respiratoryRateStatus: "elevated"
      },
      clinicalNotes: "Acute chest pain. ECG shows abnormalities. Requires immediate cardiac evaluation.",
      symptoms: ["Severe chest pain", "Shortness of breath", "Sweating", "Nausea"],
      medications: ["Aspirin 325mg", "Nitroglycerin sublingual"],
      allergies: ["Morphine"]
    },
    {
      id: 6,
      name: "Abena Mensah",
      age: 19,
      gender: "Female",
      condition: "Fever",
      status: "New",
      lastUpdated: "Just now",
      lastVisit: "2023-05-21",
      nextAppointment: "2023-05-23",
      vitals: {
        bloodPressure: "110/70",
        heartRate: 95,
        temperature: 38.5,
        respiratoryRate: 18,
        bloodPressureStatus: "normal",
        heartRateStatus: "elevated",
        temperatureStatus: "high",
        respiratoryRateStatus: "normal"
      },
      clinicalNotes: "New patient presenting with high fever. Awaiting test results to determine cause.",
      symptoms: ["High fever", "Body aches", "Fatigue"],
      medications: ["Paracetamol 500mg as needed"],
      allergies: ["None known"]
    }
  ];

  const selectedPatientData = enhancedPatients.find(p => p.id === selectedPatient) || 
    (selectedPatient ? {
      ...patients.find(p => p.id === selectedPatient),
      lastVisit: "2023-04-15",
      nextAppointment: "2023-05-20",
      vitals: {
        bloodPressure: "120/80",
        heartRate: 72,
        temperature: 36.5,
        respiratoryRate: 16,
        bloodPressureStatus: "normal",
        heartRateStatus: "normal",
        temperatureStatus: "normal",
        respiratoryRateStatus: "normal"
      },
      clinicalNotes: "Standard clinical notes for this patient. Regular monitoring and care.",
      symptoms: ["No current symptoms reported"],
      medications: ["As prescribed by physician"],
      allergies: ["None known"]
    } : null);

  const getVitalStatusColor = (status) => {
    switch (status) {
      case "normal": return "bg-green-400";
      case "elevated": return "bg-yellow-400";
      case "high": return "bg-red-400";
      default: return "bg-gray-400";
    }
  };

  const getVitalStatusWidth = (value, max) => {
    return `${Math.min((value / max) * 100, 100)}%`;
  };

  return (
    <div className="flex space-x-6">
      <div className="w-1/3 p-4 rounded-lg" style={{ borderColor: 'var(--text-color)', backgroundColor: 'var(--background-color)' }}>
        <h3 className="text-lg font-semibold mb-1" style={{ color: 'var(--text-color)' }}>Patient List</h3>
        <p className="text-sm mb-4" style={{ color: 'var(--text-color)' }}>Select a patient to view their details</p>

        <div className="relative mb-4">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4" style={{ color: 'var(--text-color)' }} />
          </div>
          <input
            type="text"
            placeholder="Filter patients..."
            className="pl-9 pr-4 py-2 rounded-md w-full text-sm"
            style={{ borderColor: 'var(--text-color)', backgroundColor: 'var(--card-bg)', color: 'var(--text-color)' }}
          />
        </div>

        <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
          {(patients || enhancedPatients).map((patient) => (
            <div
              key={patient.id}
              className={`flex items-center px-3 py-3 rounded-md cursor-pointer border-b hover:bg-gray-50 transition-colors ${
                selectedPatient === patient.id ? "bg-blue-50 border-blue-200" : ""
              }`}
              style={{ borderColor: 'var(--text-color)', backgroundColor: 'var(--card-bg)' }}
              onClick={() => setSelectedPatient(patient.id)}
            >
              <div className="flex-shrink-0 h-8 w-8 bg-gray-200 rounded-full flex items-center justify-center">
                <User className="h-4 w-4" style={{ color: 'var(--text-color)' }} />
              </div>
              <div className="ml-3 flex-1">
                <div className="flex justify-between">
                  <h4 className="text-sm font-medium" style={{ color: 'var(--text-color)' }}>{patient.name}</h4>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getStatusBadgeClass(patient.status)}`}>
                    {patient.status}
                  </span>
                </div>
                <p className="text-sm" style={{ color: 'var(--text-color)' }}>{patient.age}, {patient.gender}</p>
                <p className="text-sm font-medium" style={{ color: 'var(--text-color)' }}>{patient.condition}</p>
                <p className="text-xs" style={{ color: 'var(--text-color)' }}>Updated {patient.lastUpdated}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-2/3 p-4 rounded-lg" style={{ borderColor: 'var(--text-color)', backgroundColor: 'var(--background-color)' }}>
        <h3 className="text-lg font-semibold mb-1" style={{ color: 'var(--text-color)' }}>Patient Details</h3>
        <p className="text-sm mb-4" style={{ color: 'var(--text-color)' }}>View and manage patient information</p>

        {selectedPatientData ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-lg p-4" style={{ backgroundColor: 'var(--card-bg)' }}>
                <div className="flex items-center mb-3">
                  <User className="h-5 w-5 text-blue-600 mr-2" />
                  <h4 className="text-lg font-semibold" style={{ color: 'var(--text-color)' }}>Patient Information</h4>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium" style={{ color: 'var(--text-color)' }}>Name:</span>
                    <span className="text-sm" style={{ color: 'var(--text-color)' }}>{selectedPatientData.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium" style={{ color: 'var(--text-color)' }}>Age:</span>
                    <span className="text-sm" style={{ color: 'var(--text-color)' }}>{selectedPatientData.age} years</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium" style={{ color: 'var(--text-color)' }}>Gender:</span>
                    <span className="text-sm font-medium" style={{ color: 'var(--text-color)' }}>{selectedPatientData.gender}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium" style={{ color: 'var(--text-color)' }}>Condition:</span>
                    <span className="text-sm" style={{ color: 'var(--text-color)' }}>{selectedPatientData.condition}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium" style={{ color: 'var(--text-color)' }}>Status:</span>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getStatusBadgeClass(selectedPatientData.status)}`}>
                      {selectedPatientData.status}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium" style={{ color: 'var(--text-color)' }}>Last Visit:</span>
                    <span className="text-sm" style={{ color: 'var(--text-color)' }}>{selectedPatientData.lastVisit}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium" style={{ color: 'var(--text-color)' }}>Next Appointment:</span>
                    <span className="text-sm" style={{ color: 'var(--text-color)' }}>{selectedPatientData.nextAppointment}</span>
                  </div>
                </div>
              </div>

              <div className="rounded-lg p-4" style={{ backgroundColor: 'var(--card-bg)' }}>
                <div className="flex items-center mb-3">
                  <Activity className="h-5 w-5 text-red-600 mr-2" />
                  <h4 className="text-lg font-semibold" style={{ color: 'var(--text-color)' }}>Symptoms & Complaints</h4>
                </div>
                <div className="space-y-3">
                  {selectedPatientData.symptoms && selectedPatientData.symptoms.length > 0 ? (
                    selectedPatientData.symptoms.map((symptom, index) => (
                      <div key={index} className="flex items-start">
                        <div className="w-2 h-2 rounded-full bg-red-500 mr-3 mt-2 flex-shrink-0"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium" style={{ color: 'var(--text-color)' }}>{symptom}</p>
                          <p className="text-xs mt-1" style={{ color: 'var(--text-color)' }}>
                            {index === 0 ? "Primary complaint" : 
                             index === 1 ? "Secondary symptom" : 
                             "Additional symptom"}
                          </p>
                        </div>
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                          index === 0 ? "bg-red-100 text-red-800" :
                          index === 1 ? "bg-orange-100 text-orange-800" :
                          "bg-yellow-100 text-yellow-800"
                        }`}>
                          {index === 0 ? "Severe" : 
                           index === 1 ? "Moderate" : 
                           "Mild"}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="flex items-center text-green-600">
                      <div className="w-2 h-2 rounded-full bg-green-500 mr-3"></div>
                      <p className="text-sm font-medium" style={{ color: 'var(--text-color)' }}>No current symptoms reported</p>
                    </div>
                  )}
                </div>
                
                <div className="mt-4 pt-4 border-t" style={{ borderTopColor: 'var(--text-color)' }}>
                  <h5 className="text-sm font-semibold mb-2" style={{ color: 'var(--text-color)' }}>Chief Complaint:</h5>
                  <p className="text-sm p-3 rounded border-l-4" style={{ borderLeftColor: 'var(--text-color)', backgroundColor: 'var(--card-bg)', color: 'var(--text-color)' }}>
                    {selectedPatientData.condition || "General consultation"}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-lg p-4" style={{ backgroundColor: 'var(--card-bg)' }}>
              <div className="flex items-center mb-3">
                <div className="w-5 h-5 bg-green-100 rounded mr-2 flex items-center justify-center">
                  <div className="w-2 h-2 bg-green-600 rounded"></div>
                </div>
                <h4 className="text-lg font-semibold" style={{ color: 'var(--text-color)' }}>Clinical Notes</h4>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-color)' }}>{selectedPatientData.clinicalNotes}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="rounded-lg p-4" style={{ backgroundColor: 'var(--card-bg)' }}>
                <h5 className="text-sm font-semibold mb-2" style={{ color: 'var(--text-color)' }}>Current Symptoms</h5>
                <ul className="space-y-1">
                  {selectedPatientData.symptoms.map((symptom, index) => (
                    <li key={index} className="text-sm" style={{ color: 'var(--text-color)' }}>• {symptom}</li>
                  ))}
                </ul>
              </div>

              <div className="rounded-lg p-4" style={{ backgroundColor: 'var(--card-bg)' }}>
                <h5 className="text-sm font-semibold mb-2" style={{ color: 'var(--text-color)' }}>Current Medications</h5>
                <ul className="space-y-1">
                  {selectedPatientData.medications.map((medication, index) => (
                    <li key={index} className="text-sm" style={{ color: 'var(--text-color)' }}>• {medication}</li>
                  ))}
                </ul>
              </div>

              <div className="rounded-lg p-4" style={{ backgroundColor: 'var(--card-bg)' }}>
                <h5 className="text-sm font-semibold mb-2" style={{ color: 'var(--text-color)' }}>Known Allergies</h5>
                <ul className="space-y-1">
                  {selectedPatientData.allergies.map((allergy, index) => (
                    <li key={index} className="text-sm" style={{ color: 'var(--text-color)' }}>• {allergy}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-64 flex flex-col items-center justify-center text-center" style={{ backgroundColor: 'var(--card-bg)' }}>
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
              <User className="h-8 w-8 text-gray-400" />
            </div>
            <h4 className="text-lg font-medium mb-2" style={{ color: 'var(--text-color)' }}>No Patient Selected</h4>
            <p className="text-sm" style={{ color: 'var(--text-color)' }}>Select a patient from the list to view their details</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default PatientsTab;