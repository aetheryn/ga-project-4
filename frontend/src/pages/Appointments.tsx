import { useContext, useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import { Appointment } from "../classes/appointment";
import UserContext from "../context/user";
import DocAppointmentCard from "../components/DocAppointmentCard";

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
      <table className="user-table">
        <tr>
          <th>Date</th>
          <th>Time</th>
          <th>Patient</th>
          <th>Status</th>
          <th></th>
        </tr>

        {appointments.map((appointment) => (
          <DocAppointmentCard
            key={appointment.id}
            appointment={appointment}
            getDoctorAppointments={getDoctorAppointments}
          ></DocAppointmentCard>
        ))}
      </table>

      {/* <h2>Availability</h2>
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
      </div> */}
    </div>
  );
}

export default Appointments;
