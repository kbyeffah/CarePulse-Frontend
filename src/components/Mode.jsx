import React, { useState } from "react";
import { IoMoon, IoSunny } from "react-icons/io5";

const Mode = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedMode, setSelectedMode] = useState({
		name: "light",
		icon: <IoSunny className="inline mr-1" />,
	});

	const modes = [
		{ name: "light", icon: <IoSunny className="inline mr-1" /> },
		{ name: "dark", icon: <IoMoon className="inline mr-1" /> },
	];

	const toggleFunction = () => setIsOpen(!isOpen);

	const handleModeSelection = (mode) => {
		setSelectedMode(mode);
		setIsOpen(false);
	};

	return (
		<div className="relative inline-block">
			<button onClick={toggleFunction}>
				{selectedMode.icon}
				{selectedMode.name}
			</button>

			{isOpen && (
				<div className="absolute z-10 mt-5 ring-1 ring-gray-200 ring-opacity-5 bg-white w-20 rounded-md">
					{modes.map((mode) => (
						<button
							key={mode.name}
							onClick={() => handleModeSelection(mode)}
							className="flex gap-x-2 py-2 text-gray-700 hover:bg-gray-100 w-full items-center"
						>
							{mode.icon}
							{mode.name}
						</button>
					))}
				</div>
			)}
		</div>
	);
};

export default Mode;
