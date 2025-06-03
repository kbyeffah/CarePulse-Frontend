import React from "react";
import PagesLayout from "../layouts/PagesLayout";
import Hero from "../components/home/Hero";
import Features from "../components/home/Features";
import CTA from "../components/home/CTA";

const HomePage = () => {
	return (
		<PagesLayout>
      <div style={{ backgroundColor: 'var(--background-color)', color: 'var(--text-color)' }}>
        <Hero />
        <Features />
        <CTA />
      </div>
    </PagesLayout>
	);
};

export default HomePage;

