import React from "react";
import healthworker from "../../jsfiles/healthworker";
import { CiMicrophoneOn, CiSpeaker } from "react-icons/ci";
import { FaRegPaperPlane } from "react-icons/fa";
import { GiSpeaker } from "react-icons/gi";

const HealthCare = () => {
  const statusdot = (status) => {
    switch (status) {
      case "online":
        return "bg-green-500";
      case "busy":
        return "bg-yellow-500";
      default:
        return "bg-gray-400";
    }
  };

  const textColor = (color) => {
    switch (color) {
      case "online":
        return "text-green-500";
      case "busy":
        return "text-yellow-500";
      default:
        return "text-gray-400";
    }
  };

  return (
    <section className="rounded-md overflow-hidden" style={{ borderColor: 'var(--text-color)', backgroundColor: 'var(--background-color)' }}>
      <div className="px-4 py-2 border-b" style={{ borderBottomColor: 'var(--text-color)' }}>
        <h1 className="text-2xl font-semibold" style={{ color: 'var(--text-color)' }}>Chat with HealthCare Workers</h1>
        <p className="text-sm mb-2" style={{ color: 'var(--text-color)' }}>
          Direct communication with doctors and healthcare professionals
        </p>
      </div>

      <main className="flex h-full">
        <aside className="w-1/3 border-r overflow-y-auto" style={{ borderRightColor: 'var(--text-color)', backgroundColor: 'var(--background-color)' }}>
          <div className="border-b px-4 py-2" style={{ borderBottomColor: 'var(--text-color)' }}>
            <h1 className="text-lg font-semibold" style={{ color: 'var(--text-color)' }}>HealthCare Workers</h1>
            <p className="text-sm" style={{ color: 'var(--text-color)' }}>Select a healthworker to chat with</p>
          </div>

          {healthworker.map((worker, index) => (
            <div
              key={index}
              className="p-4 hover:bg-gray-100 cursor-pointer border-b"
              style={{ borderBottomColor: 'var(--text-color)', backgroundColor: 'var(--card-bg)' }}
            >
              <div className="relative">
                <div className="w-10 h-10 rounded-full flex justify-center items-center" style={{ backgroundColor: 'var(--card-bg)' }}>
                  {worker.initials}
                </div>
                <span
                  className={`absolute bottom-0 right-0 w-3 h-3 rounded-full ${statusdot(worker.status)}`}
                ></span>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <p className="font-medium" style={{ color: 'var(--text-color)' }}>{worker.name}</p>
                  <p className="text-xs" style={{ color: 'var(--text-color)' }}>{worker.lastSeen}</p>
                </div>
                <p className="text-base" style={{ color: 'var(--text-color)' }}>{worker.role}</p>
                <p className={`${textColor(worker.status)} font-medium text-sm`}>{worker.status}</p>
              </div>
            </div>
          ))}
        </aside>

        <section className="flex-1 flex flex-col">
          <div className="flex gap-3 p-4 border-b" style={{ borderBottomColor: 'var(--text-color)' }}>
            <div className="w-10 h-10 rounded-full flex justify-center items-center" style={{ backgroundColor: 'var(--card-bg)' }}>
              <p style={{ color: 'var(--text-color)' }}>KN</p>
            </div>
            <div className="">
              <p className="font-medium flex gap-x-2" style={{ color: 'var(--text-color)' }}>
                Dr. Kwame Nkrumah
                <span className="text-sm px-2 rounded-full" style={{ backgroundColor: 'var(--card-bg)', color: 'var(--text-color)' }}>
                  Online
                </span>
              </p>
              <p className="text-sm" style={{ color: 'var(--text-color)' }}>General Physician</p>
            </div>
          </div>

          <div className="p-4 space-y-2 overflow-y-auto border-b mb-10" style={{ borderBottomColor: 'var(--text-color)' }}>
            <p className="text-xs text-center" style={{ color: 'var(--text-color)' }}>Yesterday</p>
            <div className="flex gap-x-2">
              <div className="w-5 h-5 rounded-full" style={{ backgroundColor: 'var(--card-bg)' }}></div>
              <p className="p-2 rounded-md" style={{ backgroundColor: 'var(--card-bg)', color: 'var(--text-color)' }}>How can I help you today</p>
            </div>
            <p className="text-xs text-center rounded-full py-1 mx-auto" style={{ backgroundColor: 'var(--card-bg)', color: 'var(--text-color)' }}>Today</p>
            <div className="flex gap-2">
              <p className="ml-auto p-2 rounded-md" style={{ backgroundColor: 'var(--text-color)', color: 'var(--background-color)' }}>
                I have been experiencing severe headache
              </p>
              <div className="w-5 h-5 rounded-full" style={{ backgroundColor: 'var(--card-bg)' }}></div>
            </div>
            <div className="flex gap-2">
              <p className="ml-auto p-2 rounded-md" style={{ backgroundColor: 'var(--text-color)', color: 'var(--background-color)' }}>
                I have been experiencing severe headache
              </p>
              <div className="w-5 h-5 rounded-full" style={{ backgroundColor: 'var(--card-bg)' }}></div>
            </div>
          </div>

          <div className="flex gap-x-3 items-center">
            <textarea
              name=""
              id=""
              placeholder="Type your message here"
              className="w-full rounded-md py-3 px-5 pr-12 outline-none"
              style={{ borderColor: 'var(--text-color)', backgroundColor: 'var(--background-color)' }}
            ></textarea>
            <div className="w-12 flex flex-col space-y-2">
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
      </main>
    </section>
  );
};

export default HealthCare;