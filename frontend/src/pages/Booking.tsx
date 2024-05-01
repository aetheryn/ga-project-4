import { SyntheticEvent, useContext, useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import { Appointment } from "../classes/appointment";
import UserContext from "../context/user";
import PatAppointmentCard from "../components/PatAppointmentCard";
import { User } from "../classes/user";

function Booking(): JSX.Element {
  const fetchData = useFetch();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const userCtx = useContext(UserContext);
  const [allDoctors, setAllDoctors] = useState<User[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<number>(0);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("");

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  const handleTimeSelect = (time: string) => {
    console.log(time + ":00");
    setSelectedTime("10:00:00");
  };

  function handleSelectDoctor(event: SyntheticEvent): void {
    const selectElement = event.currentTarget as HTMLOptionElement;
    setSelectedDoctor(Number(selectElement.value));
  }

  async function getPatientAppointments() {
    try {
      const response: any = await fetchData(
        "/appointments/patient/" + userCtx.loggedInUser.id,
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

  function getDoctors() {
    const tempArray: User[] = [...userCtx.allUsers];
    const listOfDoctors: User[] = tempArray.filter(
      (user) => user.role === "DOCTOR"
    );
    setAllDoctors(listOfDoctors);
  }

  useEffect(() => {
    getPatientAppointments();
    getDoctors();
  }, []);

  async function createAppointment() {
    try {
      const response: any = await fetchData(
        "/appointments",
        "PUT",
        {
          doctorId: selectedDoctor,
          patientId: userCtx.loggedInUser.id,
          time: "10:00:00",
          date: selectedDate,
        },
        userCtx.accessToken
      );

      if (response.ok) {
        getPatientAppointments();
      }
    } catch (error: any) {
      console.error(error.message);
    }
  }

  function handleClick() {
    createAppointment();
    console.log(selectedDoctor);
    setSelectedDate(new Date());
    setSelectedTime("");
    setSelectedDoctor(0);
  }

  return (
    <div>
      <h1>Book an Appointment</h1>
      <label htmlFor="date">Date:</label>

      <select
        onChange={(event) => {
          handleSelectDoctor(event);
        }}
      >
        {allDoctors.map((doctor) => {
          return <option value={doctor.id}>{doctor.full_name}</option>;
        })}
      </select>
      <input
        type="date"
        id="date"
        min={new Date().toISOString().split("T")[0]}
        max={
          new Date()
            .setDate(new Date().getDate() + 7)
            .toString()
            .split("T")[0]
        }
        value={selectedDate.toISOString().split("T")[0]}
        onChange={(e) => handleDateChange(new Date(e.target.value))}
      />
      <label htmlFor="time">Time:</label>
      <select
        id="time"
        value={selectedTime}
        onChange={(e) => handleTimeSelect(e.target.value)}
      >
        {[...Array(8)].map((_, i) => (
          <option key={i} value={`10:${i * 30 + 10}`}>{`10:${
            i * 30 + 10
          }`}</option>
        ))}
      </select>
      <button onClick={handleClick}>Book Appointment</button>

      <h1>Upcoming Appointments</h1>
      {appointments.map((appointment) => (
        <PatAppointmentCard
          key={appointment.id}
          appointment={appointment}
        ></PatAppointmentCard>
      ))}
    </div>
  );
}

export default Booking;
