import React, { useState } from 'react';
import UserAppointments from './UserAppointments';
import UserDashboard from './UserDashboard';

const ParentComponent = () => {
  const [appointments, setAppointments] = useState([]);

  const addAppointment = (newAppointment) => {
    const appointmentWithId = { ...newAppointment, id: Date.now() }; // Add a unique ID
    setAppointments([appointmentWithId]); // Set only the latest appointment
  };

  return (
    <div>
      <UserAppointments addAppointment={addAppointment} />
      <UserDashboard appointments={appointments} />
    </div>
  );
};

export default ParentComponent;
