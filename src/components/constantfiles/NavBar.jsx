import React, { useState } from "react";
import navigation from "../../jsfiles/navindex";
import { CiGlobe } from "react-icons/ci";
import { TiWeatherSunny } from "react-icons/ti";
import Dropdown from "../Dropdown";
import Mode from "../Mode";
import { NavLink } from "react-router";
import { Menu, X } from "lucide-react";

const NavBar = () => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<section className={`border border-b-gray-300 p-4 items-center fixed top-0 right-0 left-0 bg-white/60 backdrop-blur-md z-50 ${isOpen ? "h-screen" : "h-auto"}`}>
			<div className="flex justify-between items-center">
				<div className=" text-[#3f9669] font-semibold">CarePulse AI</div>
				<ul className="hidden justify-end md:flex gap-x-5">
					{navigation.map((navitems, index) => (
						<NavLink
							to={navitems.path}
							key={index}
							className={({ isActive }) =>
								`flex items-center gap-1 hover:text-[#3f9669] hover:bg-gray-100 px-4 py-1 cursor-pointer ${
									isActive ? "text-[#3f9669] bg-gray-100 px-4 py-1 rounded-md" : "text-gray-600"
								}`
							}
						>
							<navitems.icon />
							{navitems.name}
						</NavLink>
					))}
					<div className="flex gap-5 items-center">
						<Dropdown />
						<div className="items-center flex border border-gray-300 px-2 py-1 rounded-md">
							<p>
								<Mode />
							</p>
						</div>
						<button className="bg-[#Ef5257] text-white px-3 py-2 rounded-md">Emergency</button>
						<p>KA</p>
					</div>
				</ul>
				<div className="md:hidden ">
					{isOpen ? (
						<X size={24} onClick={() => setIsOpen(false)} />
					) : (
						<Menu size={24} onClick={() => setIsOpen(true)} />
					)}
				</div>
			</div>

			{isOpen && (
				<ul className="space-y-4 mt-5 w-full">
					{navigation.map((navitems, index) => (
						<NavLink
							to={navitems.path}
							key={index}
							className={({ isActive }) =>
								`flex items-center gap-1 hover:text-[#3f9669] hover:bg-gray-100 px-4 py-1 cursor-pointer ${
									isActive ? "text-[#3f9669] bg-gray-100 px-4 py-1 rounded-md" : "text-gray-600"
								}`
							}
						>
							<navitems.icon />
							{navitems.name}
						</NavLink>
					))}
					<div className="md:hidden space-y-4 ml-2">
						<Dropdown />
						<div className="items-center flex border border-gray-300 px-2 py-1 rounded-md">
							<p>
								<Mode />
							</p>
						</div>
						<button className="bg-[#Ef5257] text-white px-3 py-2 rounded-md">Emergency</button>
						<p>KA</p>
					</div>
				</ul>
			)}
		</section>
	);
};

export default NavBar;
