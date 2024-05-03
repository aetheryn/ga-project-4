import { SyntheticEvent, useContext, useEffect, useState } from "react";
import { Appointment } from "../classes/appointment";
import { User } from "../classes/user";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";

interface AppointmentProps {
  appointment: Appointment;
  getPendingDocAppointments: () => void;
  getDoctorAppointments: () => void;
}

function DocAppointmentCard(props: AppointmentProps): JSX.Element {
  const { appointment, getPendingDocAppointments, getDoctorAppointments } =
    props;
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
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [status, setStatus] = useState<string>("");
  const fetchData = useFetch();
  const userCtx = useContext(UserContext);

  async function getPatientDetails() {
    try {
      const response: any = await fetchData(
        "/users/" + appointment.patient_id,
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
    getPatientDetails();
  }, []);

  function handleClick(): void {
    setIsUpdating(true);
  }

  async function updateStatus() {
    try {
      const response: any = await fetchData(
        "/appointments/" + appointment.id,
        "PATCH",
        { status: status },
        userCtx.accessToken
      );

      if (response.ok) {
        getPendingDocAppointments();
        getDoctorAppointments();
        setIsUpdating(false);
      }
    } catch (error: any) {
      console.error(error.message);
    }
  }

  function handleStatusSelect(event: SyntheticEvent): void {
    const selectElement = event.currentTarget as HTMLOptionElement;
    setStatus(selectElement.value);
  }

  function formatDate(date: Date): string {
    const formattedDate = date.toString().slice(0, 10);
    var nextDate = new Date(formattedDate);
    nextDate.setDate(nextDate.getDate() + 1);

    return nextDate.toString().slice(0, 10);
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
      {!isUpdating && (
        <>
          <td>{formatDisplayedStatus(appointment.status)}</td>
          {appointment.status === "PENDING" && (
            <td>
              <button onClick={handleClick} className="button">
                Update Status
              </button>
            </td>
          )}
        </>
      )}
      {isUpdating && (
        <>
          <td>
            <select onChange={(event) => handleStatusSelect(event)}>
              <option value={"PENDING"}>Pending</option>
              <option value={"COMPLETED"}>Completed</option>
              <option value={"MISSED"}>Missed</option>
            </select>
          </td>
          <td>
            <div className="button-wrapper">
              <button onClick={() => updateStatus()} className="button">
                Save
              </button>
              <button onClick={() => setIsUpdating(false)} className="button">
                Cancel
              </button>
            </div>
          </td>
        </>
      )}
    </tr>
  );
}

export default DocAppointmentCard;
