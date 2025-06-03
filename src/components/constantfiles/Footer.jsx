import React from "react";
import footerlinks from "../../jsfiles/footerlinks";

const Footer = () => {
  return (
    <section className="p-4" style={{ backgroundColor: 'var(--background-color)' }}>
      <div className="flex justify-between items-center">
        <div>
          <h1 style={{ color: 'var(--text-color)' }}>CarePulse AI</h1>
          <p style={{ color: 'var(--text-color)' }}>Join us in making healthcare more seamless and transparent</p>
        </div>
        <div className="flex">
          {footerlinks.map((item, index) => (
            <div key={index}>
              <p style={{ color: 'var(--text-color)' }}>{item.name}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="text-right">
        <p style={{ color: 'var(--text-color)' }}>
          © {new Date().getFullYear()} CarePulse. All rights reserved
        </p>
      </div>
    </section>
  );
};

export default Footer;