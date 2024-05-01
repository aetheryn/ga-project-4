import { useContext, useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import { Appointment } from "../classes/appointment";
import UserContext from "../context/user";
import AppointmentCard from "../components/AppointmentCard";

function Appointments(): JSX.Element {
  const fetchData = useFetch();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const userCtx = useContext(UserContext);
  // State to manage availability
  const [availability, setAvailability] = useState(new Array(24).fill(true));

  // Function to mark time as unavailable
  const markUnavailable = (index: number) => {
    const newAvailability = [...availability];
    newAvailability[index] = false;
    setAvailability(newAvailability);
  };

  async function getDoctorAppointments() {
    try {
      const response: any = await fetchData(
        "/appointments/doctor/pending/" + userCtx.loggedInUser.id,
        "POST",
        undefined,
        userCtx.accessToken
      );

      if (response.ok) {
        setAppointments(response.data);
      }
    } catch (error: any) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    getDoctorAppointments();
  }, []);

  return (
    <div>
      <h1>Upcoming Appointments</h1>
      <ul>
        {appointments.map((appointment) => (
          <AppointmentCard
            key={appointment.id}
            appointment={appointment}
          ></AppointmentCard>
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
