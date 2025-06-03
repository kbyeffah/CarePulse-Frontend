import React from "react";
import { CiMicrophoneOn, CiSpeaker } from "react-icons/ci";
import { FaRegPaperPlane } from "react-icons/fa";
import { GiSpeaker } from "react-icons/gi";

const Medication = () => {
  return (
    <div>
      <section className="rounded-md p-5" style={{ borderColor: 'var(--text-color)', backgroundColor: 'var(--background-color)' }}>
        <div>
          <h1 className="text-2xl font-semibold" style={{ color: 'var(--text-color)' }}>Chat with CarePulse Assistant</h1>
          <p className="text-sm" style={{ color: 'var(--text-color)' }}>
            Describe your symptoms or ask questions about your health
          </p>
        </div>

        <div className="ring-1 rounded-md mt-5 pb-[10%] pt-5 px-5 mb-10" style={{ ringColor: 'var(--text-color)', backgroundColor: 'var(--card-bg)' }}>
          <div className="flex gap-x-4 items-center justify-center">
            <div className="w-10 h-10 rounded-full flex justify-center items-center" style={{ backgroundColor: 'var(--card-bg)' }}>
              <p style={{ color: 'var(--text-color)' }}>AC</p>
            </div>

            <div className="flex-1 space-y-3">
              <p className="p-3" style={{ backgroundColor: 'var(--card-bg)', color: 'var(--text-color)' }}>
                I am CarePulse Assistant. How can i help you today Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis impedit modi, ratione eaque nulla magni in! Quae assumenda aut rem exercitationem, reiciendis laudantium et dolor facilis cupiditate iusto in nemo! ?
              </p>
              <div className="flex gap-x-2">
                <p className="text-sm" style={{ color: 'var(--text-color)' }}>{new Date().toLocaleTimeString()}</p>
                <GiSpeaker size={20} style={{ color: 'var(--text-color)' }} />
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-x-5">
          <textarea
            name=""
            id=""
            placeholder="Type your message here.."
            className="w-full rounded-md p-4 flex-1 outline-none"
            style={{ borderColor: 'var(--text-color)', backgroundColor: 'var(--background-color)' }}
          ></textarea>
          <div className="w-12 flex flex-col space-y-3">
            <div className="p-3 flex justify-center items-center rounded-md" style={{ backgroundColor: 'var(--background-color)', color: 'var(--text-color)' }}>
              <CiMicrophoneOn size={25} />
            </div>
            <div className="p-3 flex justify-center items-center rounded-md" style={{ backgroundColor: 'var(--background-color)', color: 'var(--text-color)' }}>
              <GiSpeaker size={20} />
            </div>
            <div className="p-3 flex justify-center items-center rounded-md" style={{ backgroundColor: 'var(--text-color)', color: 'var(--background-color)' }}>
              <FaRegPaperPlane size={20} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Medication;