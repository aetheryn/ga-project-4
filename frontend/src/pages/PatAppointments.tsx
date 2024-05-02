import { useContext, useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import { Appointment } from "../classes/appointment";
import UserContext from "../context/user";
import PatAppointmentCard from "../components/PatAppointmentCard";

function PatAppointments(): JSX.Element {
  const fetchData = useFetch();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [pastAppointments, setPastAppointments] = useState<Appointment[]>([]);
  const userCtx = useContext(UserContext);

  async function getPendingPatAppointments(): Promise<void> {
    try {
      const response: any = await fetchData(
        "/appointments/patient/pending/" + userCtx.loggedInUser.id,
        "POST",
        undefined,
        userCtx.accessToken
      );

      if (response.ok) {
        setAppointments(response.data);
        console.log(response.data);
      }
    } catch (error: any) {
      console.error(error.message);
    }
  }

  async function getPatientPastAppointments(): Promise<void> {
    try {
      const response: any = await fetchData(
        "/appointments/patient/" + userCtx.loggedInUser.id,
        "POST",
        undefined,
        userCtx.accessToken
      );

      if (response.ok) {
        setPastAppointments(response.data);
      }
    } catch (error: any) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    getPendingPatAppointments();
    getPatientPastAppointments();
  }, []);

  return (
    <div>
      <h1>Upcoming Appointments</h1>
      <table className="user-table">
        <tr>
          <th>Date</th>
          <th>Time</th>
          <th>Doctor</th>
          <th></th>
        </tr>

        {appointments.map((appointment) => (
          <PatAppointmentCard
            key={appointment.id}
            appointment={appointment}
            getPendingPatAppointments={getPendingPatAppointments}
          ></PatAppointmentCard>
        ))}
      </table>

      <h1>Archived Appointments</h1>
      <table className="user-table">
        <tr>
          <th>Date</th>
          <th>Time</th>
          <th>Doctor</th>
          <th>Status</th>
        </tr>

        {pastAppointments.map((appointment) => (
          <PatAppointmentCard
            key={appointment.id}
            appointment={appointment}
            getPendingPatAppointments={getPendingPatAppointments}
          ></PatAppointmentCard>
        ))}
      </table>
    </div>
  );
}

export default PatAppointments;
