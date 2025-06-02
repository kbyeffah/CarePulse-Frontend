import { FaStethoscope } from "react-icons/fa";
import { FiAlertTriangle, FiUser } from "react-icons/fi";
import { HiOutlineHome } from "react-icons/hi";

const navigation = [
	{
		name: "Home",
		icon: HiOutlineHome,
		path: "/",
	},
	{
		name: "Patient",
		icon: FiUser,
		path: "/patient",
	},
	{
		name: "HealthCare Worker",
		icon: FaStethoscope,
		path: "/healthcareworker",
	},
	{
		name: "Emergency",
		icon: FiAlertTriangle,
		path: "/emergency",
	},
];

export default navigation;
