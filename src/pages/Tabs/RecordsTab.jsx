import {
  FileText,
  AlertTriangle,
  Clock,
  Download
} from "lucide-react";

function RecordsTab({ patients, patientRecords, selectedPatient }) {
  const getRecordTypeIcon = (type) => {
    switch (type) {
      case "Diagnosis": return <FileText className="w-5 h-5 text-blue-500" />;
      case "Medication": return <FileText className="w-5 h-5 text-green-500" />;
      case "Examination": return <FileText className="w-5 h-5 text-purple-500" />;
      case "Lab Results": return <FileText className="w-5 h-5 text-yellow-500" />;
      case "Emergency": return <AlertTriangle className="w-5 h-5 text-red-500" />;
      default: return <FileText className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-1">Patient Records</h3>
      <p className="text-sm text-gray-500 mb-4">View and manage patient medical records</p>

      {selectedPatient ? (
        <div>
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h4 className="text-md font-medium text-gray-900">
                {patients.find(p => p.id === selectedPatient)?.name}'s Records
              </h4>
              <p className="text-sm text-gray-500">
                {patients.find(p => p.id === selectedPatient)?.age}, 
                {patients.find(p => p.id === selectedPatient)?.gender} - 
                {patients.find(p => p.id === selectedPatient)?.condition}
              </p>
            </div>
            <button className="bg-blue-100 text-blue-700 px-3 py-1 rounded-md text-sm flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              View History
            </button>
          </div>

          <div className="space-y-2">
            {patientRecords
              .filter(record => record.patientId === selectedPatient)
              .map(record => (
                <div key={record.id} className="border border-gray-200 rounded-md p-3 hover:bg-gray-50 flex justify-between items-center">
                  <div className="flex items-center">
                    {getRecordTypeIcon(record.type)}
                    <div className="ml-3">
                      <h5 className="text-sm font-medium text-gray-900">{record.title}</h5>
                      <p className="text-xs text-gray-500">{record.type} - {record.date} by {record.doctor}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-800 text-sm px-2 py-1 rounded hover:bg-blue-50">View</button>
                    <button className="text-gray-600 hover:text-gray-800 text-sm px-2 py-1 rounded hover:bg-gray-100">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}

            {patientRecords.filter(record => record.patientId === selectedPatient).length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">No records found for this patient.</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="h-64 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
            <FileText className="h-8 w-8 text-gray-400" />
          </div>
          <h4 className="text-lg font-medium text-gray-900 mb-2">Patient Records</h4>
          <p className="text-sm text-gray-500">Select a patient to view their medical records</p>
        </div>
      )}
    </div>
  );
}

export default RecordsTab;