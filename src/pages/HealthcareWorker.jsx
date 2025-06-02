import { useState } from "react";
import {
	Search,
	Filter,
	Bell,
	Calendar,
	RefreshCw,
	ArrowLeft,
	UserCircle,
	ClipboardList,
	MessageSquare,
} from "lucide-react";

import PatientsTab from "../pages/Tabs/PatientsTab";
import RecordsTab from "../pages/Tabs/RecordsTab";
import CommunicationsTab from "../pages/Tabs/CommunicationsTab";
import AlertsTab from "../pages/Tabs/AlertsTab";
import PagesLayout from "../layouts/PagesLayout";
import { Link } from "react-router";

function HealthcareWorker() {
	const [selectedPatient, setSelectedPatient] = useState(null);
	const [activeTab, setActiveTab] = useState("patients");

	// Sample data - you might want to move this to a separate data file or context
	const patients = [
		{
			id: 1,
			name: "Kofi Mensah",
			age: 45,
			gender: "Male",
			condition: "Hypertension",
			status: "Stable",
			lastUpdated: "10 min ago",
		},
		{
			id: 2,
			name: "Ama Owusu",
			age: 32,
			gender: "Female",
			condition: "Pregnancy",
			status: "Stable",
			lastUpdated: "25 min ago",
		},
		{
			id: 3,
			name: "Kwame Asante",
			age: 67,
			gender: "Male",
			condition: "Diabetes",
			status: "Improving",
			lastUpdated: "1 hour ago",
		},
		{
			id: 4,
			name: "Akosua Boateng",
			age: 45,
			gender: "Female",
			condition: "Malaria",
			status: "Improving",
			lastUpdated: "2 hours ago",
		},
		{
			id: 5,
			name: "Yaw Darko",
			age: 52,
			gender: "Male",
			condition: "Chest Pain",
			status: "Critical",
			lastUpdated: "5 min ago",
		},
		{
			id: 6,
			name: "Abena Mensah",
			age: 19,
			gender: "Female",
			condition: "Fever",
			status: "New",
			lastUpdated: "Just now",
		},
	];

	const patientRecords = [
		{
			id: 1,
			patientId: 1,
			type: "Diagnosis",
			title: "Hypertension Assessment",
			date: "May 15, 2025",
			doctor: "Dr. Kwame Nkrumah",
		},
		{
			id: 2,
			patientId: 1,
			type: "Medication",
			title: "Lisinopril Prescription",
			date: "May 15, 2025",
			doctor: "Dr. Kwame Nkrumah",
		},
		{
			id: 3,
			patientId: 2,
			type: "Examination",
			title: "Prenatal Checkup",
			date: "May 10, 2025",
			doctor: "Dr. Ama Bawumia",
		},
		{
			id: 4,
			patientId: 3,
			type: "Lab Results",
			title: "Blood Glucose Test",
			date: "May 5, 2025",
			doctor: "Dr. Joseph Danquah",
		},
		{
			id: 5,
			patientId: 4,
			type: "Diagnosis",
			title: "Malaria Test",
			date: "May 18, 2025",
			doctor: "Dr. Kofi Annan",
		},
		{
			id: 6,
			patientId: 5,
			type: "Emergency",
			title: "Chest Pain Evaluation",
			date: "May 21, 2025",
			doctor: "Dr. Efua Sutherland",
		},
	];

	const patientCommunications = [
		{
			id: 1,
			patientId: 1,
			type: "Phone Call",
			title: "Medication Follow-up",
			date: "May 18, 2025",
			status: "Completed",
			staff: "Nurse Adjoa",
		},
		{
			id: 2,
			patientId: 1,
			type: "SMS",
			title: "Appointment Reminder",
			date: "May 17, 2025",
			status: "Sent",
			staff: "System",
		},
		{
			id: 3,
			patientId: 2,
			type: "Email",
			title: "Prenatal Care Information",
			date: "May 16, 2025",
			status: "Sent",
			staff: "Dr. Ama Bawumia",
		},
		{
			id: 4,
			patientId: 3,
			type: "Phone Call",
			title: "Medication Instructions",
			date: "May 15, 2025",
			status: "Missed",
			staff: "Nurse Kofi",
		},
		{
			id: 5,
			patientId: 5,
			type: "Emergency Contact",
			title: "Critical Condition Update",
			date: "May 21, 2025",
			status: "Completed",
			staff: "Dr. Efua Sutherland",
		},
	];

	const patientAlerts = [
		{
			id: 1,
			patientId: 5,
			type: "Emergency",
			title: "Severe Chest Pain",
			description:
				"Patient Yaw Darko (ID: p5) has reported severe chest pain and difficulty breathing.",
			status: "Critical",
			date: "May 21, 2025",
		},
		{
			id: 2,
			patientId: 1,
			type: "Medication",
			title: "Missed Medication",
			description: "Patient Kofi Mensah (ID: p1) has missed their scheduled medication for 2 days.",
			status: "Attention",
			date: "May 20, 2025",
		},
		{
			id: 3,
			patientId: 3,
			type: "Appointment",
			title: "Follow-up Required",
			description:
				"Patient Kwame Asante (ID: p3) needs a follow-up appointment for diabetes management.",
			status: "Normal",
			date: "May 19, 2025",
		},
		{
			id: 4,
			patientId: 2,
			type: "Test Results",
			title: "Lab Results Available",
			description: "New lab results available for Patient Ama Owusu (ID: p2).",
			status: "Information",
			date: "May 18, 2025",
		},
	];

	const tabs = [
		{ id: "patients", label: "Patients", icon: <UserCircle className="w-5 h-5 mr-2" /> },
		{ id: "records", label: "Records", icon: <ClipboardList className="w-5 h-5 mr-2" /> },
		{
			id: "communications",
			label: "Communications",
			icon: <MessageSquare className="w-5 h-5 mr-2" />,
		},
		{ id: "alerts", label: "Alerts", icon: <Bell className="w-5 h-5 mr-2" /> },
	];

	const renderTabContent = () => {
		switch (activeTab) {
			case "patients":
				return (
					<PatientsTab
						patients={patients}
						selectedPatient={selectedPatient}
						setSelectedPatient={setSelectedPatient}
					/>
				);
			case "records":
				return (
					<RecordsTab
						patients={patients}
						patientRecords={patientRecords}
						selectedPatient={selectedPatient}
					/>
				);
			case "communications":
				return (
					<CommunicationsTab
						patients={patients}
						patientCommunications={patientCommunications}
						selectedPatient={selectedPatient}
					/>
				);
			case "alerts":
				return <AlertsTab patientAlerts={patientAlerts} />;
			default:
				return null;
		}
	};

	return (
		<PagesLayout>
			<div className="min-h-screen  mt-[5%]">
				<div className="max-w-7xl mx-auto px-6 py-4">
					{/* Header */}
					<div className="flex justify-between items-center mb-4">
						<h1 className="text-2xl font-bold text-gray-900">Healthcare Worker Interface</h1>
						<Link to={'/'} className="flex items-center text-sm text-blue-600 hover:text-blue-800 border border-gray-200 rounded-md px-3 py-1 cursor-pointer">
							<ArrowLeft className="w-4 h-4 mr-1" />
							Back to Home
						</Link>
					</div>

					{/* Dashboard Header */}
					<div className="flex justify-between items-center mb-6">
						<div className="flex items-center">
							<h2 className="text-xl font-bold text-gray-900 mr-3">Healthcare Worker Dashboard</h2>
							<span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-md">
								Staff
							</span>
						</div>
						<div className="flex items-center space-x-2">
							<div className="relative">
								<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
									<Search className="h-4 w-4 text-gray-400" />
								</div>
								<input
									type="text"
									placeholder="Search patients..."
									className="pl-9 pr-4 py-2 border border-gray-200 rounded-md focus:ring-blue-500 focus:border-blue-500 w-64 text-sm"
								/>
							</div>
							<button className="p-2 border border-gray-200 rounded-md hover:bg-gray-50">
								<Filter className="h-5 w-5 text-gray-500" />
							</button>
							<button className="p-2 border border-gray-200 rounded-md hover:bg-gray-50 relative">
								<RefreshCw className="h-5 w-5 text-gray-500" />
							</button>
							<button className="p-2 border border-gray-200 rounded-md hover:bg-gray-50 relative">
								<Bell className="h-5 w-5 text-gray-500" />
								<span className="absolute -top-1 -right-1 flex items-center justify-center h-4 w-4 text-xs font-bold text-white bg-red-500 rounded-full">
									2
								</span>
							</button>
							<button className="p-2 border border-gray-200 rounded-md hover:bg-gray-50">
								<Calendar className="h-5 w-5 text-gray-500" />
							</button>
						</div>
					</div>

					{/* Tabs */}
					<div className="bg-gray-50 rounded-lg mb-6 overflow-hidden py-2 p-4">
						<div className="flex">
							{tabs.map((tab) => (
								<button
									key={tab.id}
									onClick={() => setActiveTab(tab.id)}
									className={`rounded-lg flex-1 flex items-center justify-center px-4 py-2 text-sm font-medium transition-colors ${
										activeTab === tab.id
											? "bg-white text-gray-900 rounded-t-md shadow-sm"
											: "text-gray-500 hover:text-gray-700"
									}`}
								>
									{tab.icon}
									{tab.label}
								</button>
							))}
						</div>
					</div>

					{/* Main Content */}
					{renderTabContent()}
				</div>
			</div>
		</PagesLayout>
	);
}

export default HealthcareWorker;
