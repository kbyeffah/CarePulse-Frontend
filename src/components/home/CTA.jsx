import React from "react";

const CTA = () => {
  return (
    <section>
      <div className="flex flex-col items-center justify-center p-[8%] space-y-2" style={{ backgroundColor: 'var(--background-color)' }}>
        <h1 className="text-3xl md:text-5xl font-semibold" style={{ color: 'var(--text-color)' }}>Ready to Get Started ?</h1>
        <p className="text-lg" style={{ color: 'var(--text-color)' }}>
          Join us in bridging the communication gap in healthcare
        </p>
        <div className="mt-4 md:flex gap-4">
          <button className="px-4 py-1 rounded-md" style={{ backgroundColor: 'var(--text-color)', color: 'var(--background-color)' }}>
            Patient Interface
          </button>
          <button className="px-4 py-1 rounded-md" style={{ backgroundColor: 'var(--background-color)', color: 'var(--text-color)', borderColor: 'var(--text-color)' }}>
            HealthCare Worker
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTA;