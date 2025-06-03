import { useState } from "react";
import {
  Phone,
  Mail,
  MessageSquare,
  AlertTriangle,
  ChevronRight,
  Send,
  MoreVertical,
  Paperclip,
  Smile
} from "lucide-react";

function CommunicationsTab({ patients, patientCommunications, selectedPatient }) {
  const [activeView, setActiveView] = useState("history");
  const [newMessage, setNewMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      sender: "healthcare_worker",
      message: "Hello! This is the communication history with the patient.",
      timestamp: "15:16",
      isRead: true
    },
    {
      id: 2,
      sender: "patient",
      message: "I've been experiencing some side effects from the new medication.",
      timestamp: "15:16",
      isRead: true
    },
    {
      id: 3,
      sender: "healthcare_worker",
      message: "I'm sorry to hear that. Can you describe the side effects in detail?",
      timestamp: "15:16",
      isRead: true
    },
    {
      id: 4,
      sender: "patient",
      message: "I've been feeling dizzy and nauseous, especially in the morning.",
      timestamp: "15:16",
      isRead: true
    },
    {
      id: 5,
      sender: "healthcare_worker",
      message: "Thank you for letting me know. I'll make a note of this and discuss it with the doctor. In the meantime, try taking the medication with food.",
      timestamp: "15:17",
      isRead: false
    }
  ]);

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "Completed": return "bg-green-100 text-green-800";
      case "Sent": return "bg-blue-100 text-blue-800";
      case "Missed": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getCommunicationTypeIcon = (type) => {
    switch (type) {
      case "Phone Call": return <Phone className="w-5 h-5 text-blue-500" />;
      case "SMS": return <MessageSquare className="w-5 h-5 text-green-500" />;
      case "Email": return <Mail className="w-5 h-5 text-purple-500" />;
      case "Emergency Contact": return <AlertTriangle className="w-5 h-5 text-red-500" />;
      default: return <MessageSquare className="w-5 h-5 text-gray-500" />;
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const newMsg = {
        id: chatMessages.length + 1,
        sender: "healthcare_worker",
        message: newMessage.trim(),
        timestamp: new Date().toLocaleTimeString('en-US', { 
          hour12: false, 
          hour: '2-digit', 
          minute: '2-digit' 
        }),
        isRead: false
      };
      setChatMessages([...chatMessages, newMsg]);
      setNewMessage("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const selectedPatientData = patients?.find(p => p.id === selectedPatient);

  const renderChatInterface = () => (
    <div className="flex flex-col h-full" style={{ backgroundColor: 'var(--background-color)' }}>
      <div className="flex items-center justify-between p-4 border-b" style={{ borderBottomColor: 'var(--text-color)', backgroundColor: 'var(--card-bg)' }}>
        <div className="flex items-center">
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
            {selectedPatientData?.name?.charAt(0)}
          </div>
          <div className="ml-3">
            <h4 className="text-sm font-medium" style={{ color: 'var(--text-color)' }}>{selectedPatientData?.name}</h4>
            <p className="text-xs text-green-600">Online</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button className="p-2 rounded" style={{ color: 'var(--text-color)', backgroundColor: 'var(--card-bg)' }}>
            <Phone className="w-4 h-4" />
          </button>
          <button className="p-2 rounded" style={{ color: 'var(--text-color)', backgroundColor: 'var(--card-bg)' }}>
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ backgroundColor: 'var(--card-bg)' }}>
        <div className="text-center">
          <span className="text-xs px-3 py-1 rounded-full" style={{ backgroundColor: 'var(--background-color)', color: 'var(--text-color)' }}>
            Communication History
          </span>
        </div>
        
        {chatMessages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === 'healthcare_worker' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
              msg.sender === 'healthcare_worker' 
                ? 'bg-blue-500 text-white' 
                : 'border' 
            }`} style={{ borderColor: 'var(--text-color)', backgroundColor: msg.sender === 'healthcare_worker' ? 'var(--text-color)' : 'var(--card-bg)', color: 'var(--text-color)' }}>
              <p className="text-sm">{msg.message}</p>
              <div className={`flex items-center justify-end mt-1 space-x-1 ${
                msg.sender === 'healthcare_worker' ? 'text-blue-100' : 'text-gray-500'
              }`}>
                <span className="text-xs">{msg.timestamp}</span>
                {msg.sender === 'healthcare_worker' && (
                  <div className="flex">
                    <div className={`w-3 h-3 ${msg.isRead ? 'text-blue-200' : 'text-blue-300'}`}>
                      <svg viewBox="0 0 16 16" fill="currentColor">
                        <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t" style={{ borderTopColor: 'var(--text-color)', backgroundColor: 'var(--background-color)' }}>
        <div className="flex items-end space-x-2">
          <div className="flex-1 relative">
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="w-full resize-none rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              rows="1"
              style={{ minHeight: '40px', maxHeight: '120px', borderColor: 'var(--text-color)', backgroundColor: 'var(--card-bg)', color: 'var(--text-color)' }}
            />
          </div>
          <div className="flex items-center space-x-1">
            <button className="p-2 rounded" style={{ color: 'var(--text-color)', backgroundColor: 'var(--card-bg)' }}>
              <Paperclip className="w-4 h-4" />
            </button>
            <button className="p-2 rounded" style={{ color: 'var(--text-color)', backgroundColor: 'var(--card-bg)' }}>
              <Smile className="w-4 h-4" />
            </button>
            <button
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
              className={`p-2 rounded-lg transition-colors ${
                newMessage.trim()
                  ? 'bg-blue-500 text-white hover:bg-blue-600'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderHistoryView = () => (
    <div>
      <div className="mb-4 flex items-center justify-between p-4" style={{ backgroundColor: 'var(--card-bg)' }}>
        <div>
          <h4 className="text-md font-medium" style={{ color: 'var(--text-color)' }}>
            {selectedPatientData?.name}'s Communications
          </h4>
          <p className="text-sm" style={{ color: 'var(--text-color)' }}>
            Recent patient interactions and messages
          </p>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={() => setActiveView("chat")}
            className="px-3 py-1 rounded-md text-sm flex items-center hover:bg-green-700"
            style={{ backgroundColor: 'var(--text-color)', color: 'var(--background-color)' }}
          >
            <MessageSquare className="w-4 h-4 mr-1" />
            Chat
          </button>
          <button className="px-3 py-1 rounded-md text-sm flex items-center hover:bg-blue-700" style={{ backgroundColor: 'var(--text-color)', color: 'var(--background-color)' }}>
            <Phone className="w-4 h-4 mr-1" />
            Call
          </button>
        </div>
      </div>

      <div className="space-y-2 p-4" style={{ backgroundColor: 'var(--card-bg)' }}>
        {patientCommunications
          ?.filter(comm => comm.patientId === selectedPatient)
          .map(comm => (
            <div key={comm.id} className="rounded-md p-3 hover:bg-gray-50 flex justify-between items-center" style={{ borderColor: 'var(--text-color)', backgroundColor: 'var(--card-bg)' }}>
              <div className="flex items-center">
                {getCommunicationTypeIcon(comm.type)}
                <div className="ml-3">
                  <h5 className="text-sm font-medium" style={{ color: 'var(--text-color)' }}>{comm.title}</h5>
                  <p className="text-xs" style={{ color: 'var(--text-color)' }}>{comm.type} - {comm.date} by {comm.staff}</p>
                </div>
              </div>
              <div className="flex items-center">
                <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium mr-3 ${getStatusBadgeClass(comm.status)}`}>
                  {comm.status}
                </span>
                <button className="text-blue-600 hover:text-blue-800 text-sm">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}

        {(!patientCommunications || patientCommunications.filter(comm => comm.patientId === selectedPatient).length === 0) && (
          <div className="text-center py-8">
            <p className="text-gray-500">No communication history found for this patient.</p>
            <button 
              onClick={() => setActiveView("chat")}
              className="mt-2 px-4 py-2 rounded-md text-sm hover:bg-green-700"
              style={{ backgroundColor: 'var(--text-color)', color: 'var(--background-color)' }}
            >
              Start New Conversation
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="rounded-lg overflow-hidden" style={{ borderColor: 'var(--text-color)', backgroundColor: 'var(--background-color)' }}>
      {selectedPatient ? (
        <div className="h-[600px] flex flex-col">
          <div className="flex items-center justify-between p-4 border-b" style={{ borderBottomColor: 'var(--text-color)', backgroundColor: 'var(--card-bg)' }}>
            <div className="flex space-x-1">
              <button
                onClick={() => setActiveView("history")}
                className={`px-3 py-1 text-sm font-medium rounded transition-colors ${
                  activeView === "history"
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                History
              </button>
              <button
                onClick={() => setActiveView("chat")}
                className={`px-3 py-1 text-sm font-medium rounded transition-colors ${
                  activeView === "chat"
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Live Chat
              </button>
            </div>
            <h3 className="text-lg font-semibold" style={{ color: 'var(--text-color)' }}>Live Tracking</h3>
          </div>

          <div className="flex-1 overflow-hidden">
            {activeView === "chat" ? (
              <div className="h-full">
                {renderChatInterface()}
              </div>
            ) : (
              <div className="p-4 h-full overflow-y-auto">
                {renderHistoryView()}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="h-64 flex flex-col items-center justify-center text-center p-4" style={{ backgroundColor: 'var(--card-bg)' }}>
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
            <MessageSquare className="h-8 w-8 text-gray-400" />
          </div>
          <h4 className="text-lg font-medium mb-2" style={{ color: 'var(--text-color)' }}>Live Tracking</h4>
          <p className="text-sm" style={{ color: 'var(--text-color)' }}>Select a patient to view their communication history</p>
        </div>
      )}
    </div>
  );
}

export default CommunicationsTab;