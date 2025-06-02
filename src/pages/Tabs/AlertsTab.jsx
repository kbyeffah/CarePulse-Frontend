import {
  Bell,
  AlertTriangle,
  FileText,
  Calendar
} from "lucide-react";

function AlertsTab({ patientAlerts }) {
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "Critical": return "bg-red-100 text-red-800";
      case "Attention": return "bg-yellow-100 text-yellow-800";
      case "Normal": return "bg-blue-100 text-blue-800";
      case "Information": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getAlertTypeIcon = (type) => {
    switch (type) {
      case "Emergency": return <AlertTriangle className="w-5 h-5 text-red-500" />;
      case "Medication": return <FileText className="w-5 h-5 text-yellow-500" />;
      case "Appointment": return <Calendar className="w-5 h-5 text-blue-500" />;
      case "Test Results": return <FileText className="w-5 h-5 text-green-500" />;
      default: return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-1">Patient Alerts</h3>
      <p className="text-sm text-gray-500 mb-4">View and manage patient alerts and notifications</p>

      <div className="space-y-4">
        {patientAlerts
          .sort((a, b) => {
            // Sort by status priority (Critical first)
            const statusPriority = { "Critical": 1, "Attention": 2, "Normal": 3, "Information": 4 };
            return statusPriority[a.status] - statusPriority[b.status];
          })
          .map(alert => (
            <div key={alert.id} 
              className={`border rounded-md p-4 ${
                alert.status === "Critical" 
                  ? "bg-red-50 border-red-200" 
                  : alert.status === "Attention" 
                    ? "bg-yellow-50 border-yellow-200" 
                    : "bg-white border-gray-200"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  {getAlertTypeIcon(alert.type)}
                  <h5 className={`ml-2 text-sm font-medium ${
                    alert.status === "Critical" 
                      ? "text-red-700" 
                      : alert.status === "Attention" 
                        ? "text-yellow-700" 
                        : "text-gray-900"
                  }`}>
                    {alert.title}
                  </h5>
                </div>
                <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getStatusBadgeClass(alert.status)}`}>
                  {alert.status}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-3">{alert.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">{alert.date}</span>
                <div className="flex space-x-2">
                  {alert.status === "Critical" && (
                    <button className="bg-red-600 text-white px-3 py-1 rounded-md text-sm">
                      Respond Now
                    </button>
                  )}
                  <button className="border border-gray-300 text-gray-700 px-3 py-1 rounded-md text-sm">
                    View Details
                  </button>
                  {alert.status === "Attention" && (
                    <button className="border border-gray-300 text-gray-700 px-3 py-1 rounded-md text-sm">
                      Contact Patient
                    </button>
                  )}
                  <button className="border border-gray-300 text-gray-700 px-3 py-1 rounded-md text-sm">
                    Dismiss
                  </button>
                </div>
              </div>
            </div>
          ))}
          
        {patientAlerts.length === 0 && (
          <div className="text-center py-8 border border-gray-200 rounded-md">
            <Bell className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No alerts at this time</p>
          </div>
        )}
        
        <button className="w-full bg-gray-100 text-gray-700 py-2 rounded-md text-sm font-medium hover:bg-gray-200">
          View All Alerts
        </button>
      </div>
    </div>
  );
}

export default AlertsTab;