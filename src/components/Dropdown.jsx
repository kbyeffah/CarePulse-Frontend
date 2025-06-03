import { useEffect, useRef, useState } from "react";
import { CiGlobe } from "react-icons/ci";

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const languages = ["English", "Twi", "Ga", "Ewe"];

  const toggleFunction = () => setIsOpen(!isOpen);

  const handleSelect = (lang) => {
    setSelectedLanguage(lang);
    setIsOpen(false);
  };

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <div ref={dropdownRef}>
      <button
        onClick={toggleFunction}
        className="px-4 py-1 rounded-md flex items-center gap-x-2"
        style={{ backgroundColor: 'var(--background-color)', borderColor: 'var(--text-color)', color: 'var(--text-color)' }}
      >
        <CiGlobe />
        {selectedLanguage}
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-2 w-30 rounded-md shadow-lg ring-1 ring-opacity-5" style={{ backgroundColor: 'var(--background-color)', color: 'var(--text-color)' }}>
          <div>
            {languages.map((lang) => (
              <button
                key={lang}
                onClick={() => handleSelect(lang)}
                className="flex flex-col w-full px-4 py-2 text-left hover:bg-gray-100"
                style={{ color: 'var(--text-color)' }}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
export default Dropdown;