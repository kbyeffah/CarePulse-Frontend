import React, { useState } from "react";
import triads from "../../jsfiles/triads";
import { FaBrain, FaCalendar, FaHeart } from "react-icons/fa";
import chest from "../../jsfiles/chestsymp";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import nextsteps from "../../jsfiles/nextsteps";

const Symptom = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };
  return (
    <section className="p-5" style={{ borderColor: 'var(--text-color)', backgroundColor: 'var(--background-color)' }}>
      <h1 className="text-2xl font-semibold" style={{ color: 'var(--text-color)' }}>Visual Symptom Selection</h1>
      <p className="text-sm" style={{ color: 'var(--text-color)' }}>Select the part of your body that you feel pain</p>

      <div className="grid grid-cols-3 gap-4 mt-5">
        {triads.map((signs, index) => (
          <div
            key={index}
            className="flex justify-center items-center flex-col p-4 hover:bg-gray-100 cursor-pointer rounded-md"
            style={{ borderColor: 'var(--text-color)', backgroundColor: 'var(--card-bg)' }}
          >
            <signs.icon style={{ color: 'var(--text-color)' }} />
            <p style={{ color: 'var(--text-color)' }}>{signs.text}</p>
          </div>
        ))}
      </div>

      <div className="p-5 mt-3" style={{ borderColor: 'var(--text-color)', backgroundColor: 'var(--background-color)' }}>
        <div className="flex items-center gap-2">
          <FaBrain style={{ color: 'var(--text-color)' }} />
          <p className="font-medium text-lg" style={{ color: 'var(--text-color)' }}>Select symptoms for Head:</p>
        </div>

        <div className="grid grid-cols-3 gap-4 p-4 mt-3" style={{ borderColor: 'var(--text-color)', backgroundColor: 'var(--card-bg)' }}>
          {chest.map((symps, index) => (
            <div
              key={index}
              className="rounded-md p-4 hover:bg-gray-100 cursor-pointer"
              style={{ borderColor: 'var(--text-color)', backgroundColor: 'var(--card-bg)' }}
            >
              <p className="text-center" style={{ color: 'var(--text-color)' }}>{symps}</p>
            </div>
          ))}
        </div>

        <div className="rounded-md mt-5" style={{ borderColor: 'var(--text-color)', backgroundColor: 'var(--background-color)' }}>
          <div className="flex gap-x-2 items-center p-5">
            <FaHeart style={{ color: 'var(--text-color)' }} />
            <p className="font-medium text-lg" style={{ color: 'var(--text-color)' }}>Selected Symptoms:</p>
          </div>

          <div className="grid grid-rows-2 gap-y-3 p-3">
            <p className="mx-2 p-3 rounded-sm" style={{ borderColor: 'var(--text-color)', backgroundColor: 'var(--card-bg)', color: 'var(--text-color)' }}>Chest: Chest Pain</p>
            <p className="mx-2 p-3 rounded-sm" style={{ borderColor: 'var(--text-color)', backgroundColor: 'var(--card-bg)', color: 'var(--text-color)' }}>Chest: Chest Pain</p>
            <p className="mx-2 p-3 rounded-sm" style={{ borderColor: 'var(--text-color)', backgroundColor: 'var(--card-bg)', color: 'var(--text-color)' }}>Chest: Chest Pain</p>

            <button
              onClick={handleOpenModal}
              className="w-full p-2 rounded-sm text-sm font-medium"
              style={{ backgroundColor: 'var(--text-color)', color: 'var(--background-color)' }}
            >
              Submit Symptom
            </button>

            {isOpen && (
              <div className="fixed inset-0 shadow-md backdrop-blur-md flex items-center justify-center z-50" style={{ backgroundColor: 'var(--background-color)' }}>
                <div className="rounded-sm p-6 w-120 h-[80vh] relative" style={{ borderColor: 'var(--text-color)', backgroundColor: 'var(--background-color)' }}>
                  <div className="flex items-center gap-x-2">
                    <IoMdCheckmarkCircleOutline style={{ color: 'var(--text-color)' }} />
                    <p className="font-medium text-lg" style={{ color: 'var(--text-color)' }}>Symptoms Submitted Successfully</p>
                  </div>
                  <button
                    onClick={handleCloseModal}
                    className="absolute top-0 right-2 mx-2 text-3xl cursor-pointer hover:bg-gray-100 w-10 h-10 rounded-full"
                    style={{ color: 'var(--text-color)' }}
                  >
                    ×
                  </button>
                  <p className="text-sm mt-2" style={{ color: 'var(--text-color)' }}>
                    Your symptoms have been recorded and will be reviewed by a healthcare professional
                  </p>

                  <div className="p-2 mt-2 rounded-sm space-y-2" style={{ borderColor: 'var(--text-color)', backgroundColor: 'var(--card-bg)' }}>
                    <div className="flex gaap-2 items-center gap-2">
                      <FaCalendar style={{ color: 'var(--text-color)' }} />
                      <p className="font-medium" style={{ color: 'var(--text-color)' }}>Priority Level: Normal</p>
                    </div>
                    <p className="text-sm leading-normal -tracking-wide" style={{ color: 'var(--text-color)' }}>
                      Your symptoms have been recorded and a healthworker will review them shortly
                    </p>
                    <p className="font-semibold text-sm" style={{ color: 'var(--text-color)' }}>
                      Estimated Time Response: Within 24 Hours
                    </p>
                  </div>

                  <div className="space-y-2 mt-5">
                    <p className="font-medium" style={{ color: 'var(--text-color)' }}>Next Steps:</p>
                    {nextsteps.map((item, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <item.icon style={{ color: 'var(--text-color)' }} />
                        <p className="text-sm" style={{ color: 'var(--text-color)' }}>{item.steps}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 flex gap-4 justify-center items-center">
                    <button className="rounded-md px-2 py-2" style={{ backgroundColor: 'var(--background-color)', borderColor: 'var(--text-color)', color: 'var(--text-color)' }}>
                      Report New Symptom
                    </button>
                    <button className="rounded-md px-2 py-2" style={{ backgroundColor: 'var(--text-color)', borderColor: 'var(--text-color)', color: 'var(--background-color)' }}>
                      Go To Health Care Chat
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Symptom;