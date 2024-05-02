import { useContext, useEffect, useState } from "react";
import { Appointment } from "../classes/appointment";
import { User } from "../classes/user";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";

interface AppointmentProps {
  appointment: Appointment;
  getPendingPatAppointments: () => void;
}

function PatAppointmentCard(props: AppointmentProps): JSX.Element {
  const { appointment, getPendingPatAppointments } = props;
  const [associatedUser, setAssociatedUser] = useState<User>({
    id: 0,
    username: "",
    hash: "",
    full_name: "",
    date_of_birth: new Date(),
    contact: 0,
    address: "",
    role: "",
    pending_approval: false,
  });
  const fetchData = useFetch();
  const userCtx = useContext(UserContext);

  async function getDoctorDetails() {
    try {
      const response: any = await fetchData(
        "/users/" + appointment.doctor_id,
        "POST",
        undefined,
        undefined
      );

      if (response.ok) {
        setAssociatedUser(response.data);
      }
    } catch (error: any) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    getDoctorDetails();
  }, []);

  function handleClick(): void {
    deleteAppointment();
  }

  function formatDate(date: Date): string {
    const formattedDate = date.toString().slice(0, 10);
    var nextDate = new Date(formattedDate);
    nextDate.setDate(nextDate.getDate() + 1);

    return nextDate.toString().slice(0, 10);
  }

  async function deleteAppointment() {
    try {
      const response: any = await fetchData(
        "/appointments/" + appointment.id,
        "DELETE",
        undefined,
        userCtx.accessToken
      );

      if (response.ok) {
        getPendingPatAppointments();
      }
    } catch (error: any) {
      console.error(error.message);
    }
  }

  function formatDisplayedStatus(string: string): string {
    if (string === "PENDING") {
      return "Pending";
    } else if (string === "COMPLETED") {
      return "Completed";
    } else return "Missed";
  }

  return (
    <tr>
      <td>{formatDate(appointment.date)}</td>
      <td>{appointment.time.toString().slice(0, 5)}</td>
      <td>{associatedUser.full_name}</td>
      <td>
        {appointment.status === "PENDING" ? (
          <button onClick={handleClick} className="button">
            Cancel Appointment
          </button>
        ) : (
          <>{formatDisplayedStatus(appointment.status)}</>
        )}
      </td>
    </tr>
  );
}

export default PatAppointmentCard;
