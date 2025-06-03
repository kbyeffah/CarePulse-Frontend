import React from "react";
import NavBar from "../components/constantfiles/NavBar";
import Footer from "../components/constantfiles/Footer";

const PagesLayout = (props) => {
  return (
    <div style={{ backgroundColor: 'var(--background-color)' }}>
      <NavBar />
      {props.children}
      <Footer />
    </div>
  );
};

export default PagesLayout;