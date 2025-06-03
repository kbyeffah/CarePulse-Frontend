import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import HomePage from "./pages/HomePage";

import HealthcareWorker from "./pages/HealthcareWorker";

import PatientDashboard from "./pages/PatientDashboard";
import Emergency from "./pages/Emergency";
import Login from "./pages/Login/Signup/Login";
import Signup from "./pages/Login/Signup/SignUp";


function App() {
  return (
    <div style={{ backgroundColor: 'var(--background-color)', color: 'var(--text-color)', minHeight: '100vh' }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/healthcareworker" element={<HealthcareWorker />} />
          <Route path="/emergency" element={<Emergency />} />
          <Route path="/patient" element={<PatientDashboard />} />
          <Route path="*" element={<div style={{ padding: '20px', textAlign: 'center' }}><h1 style={{ color: 'var(--text-color)' }}>404 - Page Not Found</h1></div>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;