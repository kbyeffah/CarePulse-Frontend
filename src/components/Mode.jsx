import React, { useState, useContext } from "react";
import { IoMoon, IoSunny } from "react-icons/io5";
import { ThemeContext } from "../ThemeContext";

const Mode = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [isOpen, setIsOpen] = useState(false);

  // Map the current theme to the selected mode for display
  const modes = [
    { name: "light", icon: <IoSunny className="inline mr-1" /> },
    { name: "dark", icon: <IoMoon className="inline mr-1" /> },
  ];

  const selectedMode = modes.find(mode => mode.name === theme) || modes[0];

  const toggleFunction = () => setIsOpen(!isOpen);

  const handleModeSelection = (mode) => {
    toggleTheme(mode.name); // Update the theme via context
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