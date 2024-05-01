import { useEffect, useState } from "react";
import { Appointment } from "../classes/appointment";
import { User } from "../classes/user";
import useFetch from "../hooks/useFetch";

interface AppointmentProps {
  appointment: Appointment;
}

function PatAppointmentCard({ appointment }: AppointmentProps): JSX.Element {
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

  return (
    <div>
      Appointment at {appointment.date.toString().slice(0, 10)},{" "}
      {appointment.time.toString().slice(0, 5)} with {associatedUser.full_name}.
    </div>
  );
}

export default PatAppointmentCard;
