import React from 'react'
import PagesLayout from '../layouts/PagesLayout'
import HomePatient from '../components/patient/HomePatient'

const PatientDashboard = () => {
  return (
    <PagesLayout>
        <HomePatient />
    </PagesLayout>
  )
}

export default PatientDashboard