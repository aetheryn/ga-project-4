import { useState } from "react";

function Appointments(): JSX.Element {
  const appointments = [
    { id: 1, date: "2024-05-15", time: "10:00", withWho: "Patient A" },
    { id: 2, date: "2024-05-16", time: "11:00", withWho: "Patient B" },
  ];

  // State to manage availability
  const [availability, setAvailability] = useState(new Array(24).fill(true));

  // Function to mark time as unavailable
  const markUnavailable = (index: number) => {
    const newAvailability = [...availability];
    newAvailability[index] = false;
    setAvailability(newAvailability);
  };

  return (
    <div>
      <h1>Upcoming Appointments</h1>
      <ul>
        {appointments.map((appointment) => (
          <li key={appointment.id}>
            {appointment.date} at {appointment.time} with {appointment.withWho}
          </li>
        ))}
      </ul>
      <h2>Availability</h2>
      <div>
        {availability.map((isAvailable, index) => (
          <button
            key={index}
            disabled={!isAvailable}
            onClick={() => markUnavailable(index)}
          >
            {index}:00
          </button>
        ))}
      </div>
    </div>
  );
}

export default Appointments;
