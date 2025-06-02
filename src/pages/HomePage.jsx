import React from "react";
import PagesLayout from "../layouts/PagesLayout";
import Hero from "../components/home/Hero";
import Features from "../components/home/Features";
import CTA from "../components/home/CTA";

const HomePage = () => {
	return (
		<PagesLayout>
			<Hero />
			<Features />
			<CTA />
			
		</PagesLayout>
	);
};

export default HomePage;
