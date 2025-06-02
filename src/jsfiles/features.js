import { FaRegUserCircle, FaStethoscope } from "react-icons/fa";
import { FiBarChart2, FiMessageSquare } from "react-icons/fi";
import { GrAlert } from "react-icons/gr";
import { HiOutlineSpeakerWave, HiOutlineSpeakerXMark } from "react-icons/hi2";
import { IoPulseSharp, IoWifiSharp } from "react-icons/io5";
import { LuBrainCircuit } from "react-icons/lu";
import { RiGlobalLine } from "react-icons/ri";
import { TbPill } from "react-icons/tb";

const keyfeatures = [
	{
		icon: RiGlobalLine,
		feature: "Multi-language Support",
		text: "Communicate in Twi, Ewe, Ga, and English with text-to-speech and speech-to-text capabilities.",
	},
	{
		icon: FiMessageSquare,
		feature: "Symptom Entry",
		text: "Enter symptoms via text, voice, or visual selection for clear communication.",
	},
	{
		icon: IoPulseSharp,
		feature: "Visual Triage Interface",
		text: "Icon-driven symptom reporting for easy communication without words.",
	},
	{
		icon: LuBrainCircuit,
		feature: "AI-Driven Medical Queries",
		text: "Smart follow-up questions based on symptoms to improve diagnosis accuracy.",
	},
	{
		icon: GrAlert,
		feature: "Emergency Alert System",
		text: "Instant alerts to medical staff with patient condition information.",
	},
	{
		icon: TbPill,
		feature: "Medication Understanding",
		text: "Get medication instructions and side effects in your preferred language.",
	},
	{
		icon: FiBarChart2,
		feature: "Patient History Log",
		text: "rack symptoms and treatments over time for better healthcare outcomes.",
	},
	{
		icon: FaStethoscope,
		feature: "Health Worker mode",
		text: "Simplified interface for medical staff to view patient information.",
	},
	{
		icon: IoWifiSharp,
		feature: "Offline Mode",
		text: "Use the app without internet connection in remote areas.",
	},
	{
		icon: FaRegUserCircle,
		feature: "User Profiles",
		text: "Store medical information and preferences for personalized care",
	},
	{
		icon: HiOutlineSpeakerXMark,
		feature: "Voice for the Voiceless",
		text: "Empowering those with speech disabilities to communicate effectively.",
	},
	{
		icon: HiOutlineSpeakerWave,
		feature: "Apomuden Assistant",
		text: "AI-powered health companion in your local language.",
	},
];

export default keyfeatures;
