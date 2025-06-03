import React from "react";
import keyfeatures from "../../jsfiles/features";
import { motion } from "framer-motion";

const Features = () => {
  return (
    <section className="p-[10%]" style={{ backgroundColor: 'var(--background-color)' }}>
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold" style={{ color: 'var(--text-color)' }}>Key Features</h1>
        <p style={{ color: 'var(--text-color)' }}>An AI assistant that provides personalized health insights, ensuring continuous, transparent, and high-quality care in Ghana&nbsp;and&nbsp;beyond.</p>
      </div>

      <div className="md:grid grid-cols-3 gap-x-4 gap-y-4 mt-10">
        {keyfeatures.map((item, index) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            whileHover={{ scale: 1.05 }}
          >
            <div
              key={index}
              className="p-6 flex flex-col items-center justify-center space-y-2 rounded-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
              style={{ borderColor: 'var(--text-color)', backgroundColor: 'var(--card-bg)' }}
            >
              <item.icon size={30} style={{ color: 'var(--text-color)' }} />
              <p className="font-semibold text-xl" style={{ color: 'var(--text-color)' }}>{item.feature}</p>
              <p className="text-center text-sm" style={{ color: 'var(--text-color)' }}>{item.text}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Features;