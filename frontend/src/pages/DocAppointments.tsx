import { useContext, useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import { Appointment } from "../classes/appointment";
import UserContext from "../context/user";
import DocAppointmentCard from "../components/DocAppointmentCard";

function DocAppointments(): JSX.Element {
  const fetchData = useFetch();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [pastAppointments, setPastAppointments] = useState<Appointment[]>([]);
  const userCtx = useContext(UserContext);

  // const [availability, setAvailability] = useState(new Array(24).fill(true));

  // const markUnavailable = (index: number) => {
  //   const newAvailability = [...availability];
  //   newAvailability[index] = false;
  //   setAvailability(newAvailability);
  // };

  async function getPendingDocAppointments() {
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

  async function getDoctorAppointments(): Promise<void> {
    try {
      const response: any = await fetchData(
        "/appointments/doctor/" + userCtx.loggedInUser.id,
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
    getPendingDocAppointments();
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
            getPendingDocAppointments={getPendingDocAppointments}
          ></DocAppointmentCard>
        ))}
      </table>

      <h1>Archived Appointments</h1>
      <table className="user-table">
        <tr>
          <th>Date</th>
          <th>Time</th>
          <th>Patient</th>
          <th>Status</th>
        </tr>

        {pastAppointments.map((appointment) => (
          <DocAppointmentCard
            key={appointment.id}
            appointment={appointment}
            getPendingDocAppointments={getPendingDocAppointments}
          ></DocAppointmentCard>
        ))}
      </table>
    </div>
  );
}

export default DocAppointments;
