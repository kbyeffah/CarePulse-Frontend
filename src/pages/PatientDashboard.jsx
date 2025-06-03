import React from 'react';
import PagesLayout from '../layouts/PagesLayout';
import HomePatient from '../components/patient/HomePatient';

const PatientDashboard = () => {
  return (
    <PagesLayout>
      <div style={{ backgroundColor: 'var(--background-color)', color: 'var(--text-color)' }}>
        <HomePatient />
      </div>
    </PagesLayout>
  );
};

export default PatientDashboard;