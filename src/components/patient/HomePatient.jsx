import React, { useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { GrEmergency } from "react-icons/gr";
import { Link } from "react-router";
import patientnav from "../../jsfiles/patientnav";
import Assistant from "./Assistant";
import HealthCare from "./HealthCare";
import Symptom from "./Symptom";
import Medication from "./Medication";


const HomePatient = () => {
  const [activeTab, setActiveTab] = useState("Assistant");
  return (
    <section className="mt-[8%] px-5 space-y-5" style={{ backgroundColor: 'var(--background-color)' }}>
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-semibold" style={{ color: 'var(--text-color)' }}>Patient Interface</h1>
        <Link
          to="/"
          className="px-2 py-1 rounded-md flex items-center gap-x-2"
          style={{ backgroundColor: 'var(--background-color)', borderColor: 'var(--text-color)', color: 'var(--text-color)' }}
        >
          <BiArrowBack />
          Back to Home
        </Link>
      </div>

      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold" style={{ color: 'var(--text-color)' }}>CarePulse Assistant</h1>
        <button className="flex items-center px-3 py-1 rounded-md" style={{ backgroundColor: 'var(--text-color)', color: 'var(--background-color)' }}>
          <GrEmergency />
          Emergency
        </button>
      </div>

      <div className="flex justify-between items-center py-3 px-3" style={{ backgroundColor: 'var(--card-bg)' }}>
        {patientnav.map((item) => (
          <div
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className="flex justify-center gap-x-2 items-center cursor-pointer w-full py-1"
            style={{ backgroundColor: activeTab === item.id ? 'var(--background-color)' : 'transparent', color: 'var(--text-color)' }}
          >
            <item.icon />
            <p style={{ color: 'var(--text-color)' }}>{item.text}</p>
          </div>
        ))}
      </div>

      <div>
        {activeTab === "Assistant" && <Assistant />}
        {activeTab === "HealthCare" && <HealthCare />}
        {activeTab === "Visual" && <Symptom />}
        {activeTab === "Medication" && <Medication />}
      </div>
    </section>
  );
};

export default HomePatient;