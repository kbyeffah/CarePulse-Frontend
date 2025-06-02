import { BiPulse } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import { FiMessageSquare, FiUsers } from "react-icons/fi";
import { TbPill } from "react-icons/tb";

const patientnav = [
	{
		icon: FiMessageSquare,
		text: "AI Assistant",
		id: 'Assistant'
	},
	{
		icon: FiUsers,
		text: "HealthCare Chat",
		id: 'HealthCare'
	},
	{
		icon: BiPulse,
		text: "Visual Symptom",
		id: 'Visual'
	},
	{
		icon: TbPill,
		text: "Medication",
		id: 'Medication'
	},
];
export default patientnav;
