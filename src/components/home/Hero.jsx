import React from "react";

const Hero = () => {
  return (
    <section className="pt-20" style={{ backgroundColor: 'var(--background-color)' }}>
      <div className="space-y-3 md:px-10 p-5">
        <h1 className="text-4xl md:text-7xl font-bold" style={{ color: 'var(--text-color)' }}>CarePulse AI</h1>
        <p className="text-lg font-bold" style={{ color: 'var(--text-color)' }}></p>
        <p className="text-lg max-w-xl" style={{ color: 'var(--text-color)' }}>
          An AI-powered HealthTech solution that ensures diaspora families can provide quality healthcare for their loved ones without the immediate financial burden on patients and with full transparency.
        </p>
        <div className="flex gap-x-5">
          <button className="px-4 py-1 rounded-md" style={{ backgroundColor: 'var(--text-color)', color: 'var(--background-color)' }}>
            Patience Interface
          </button>
          <button className="px-4 py-1 rounded-md" style={{ backgroundColor: 'var(--background-color)', color: 'var(--text-color)', borderColor: 'var(--text-color)' }}>
            Health Worker Interface
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;