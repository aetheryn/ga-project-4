import { SyntheticEvent, useContext, useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";
import { User } from "../classes/user";
import Calendar from "../components/Calendar";
import { useNavigate } from "react-router-dom";

function Booking(): JSX.Element {
  const fetchData = useFetch();
  const userCtx = useContext(UserContext);
  const [allDoctors, setAllDoctors] = useState<User[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<number>(0);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const navigate = useNavigate();

  const handleTimeSelect = (event: SyntheticEvent): void => {
    const selectElement = event.currentTarget as HTMLOptionElement;
    setSelectedTime(selectElement.value + ":00");
  };

  function handleSelectDoctor(event: SyntheticEvent): void {
    const selectElement = event.currentTarget as HTMLOptionElement;
    setSelectedDoctor(Number(selectElement.value));
  }

  function getDoctors() {
    const tempArray: User[] = [...userCtx.allUsers];
    const listOfDoctors: User[] = tempArray.filter(
      (user) => user.role === "DOCTOR"
    );
    setAllDoctors(listOfDoctors);
  }

  useEffect(() => {
    getDoctors();
  }, []);

  async function createAppointment() {
    console.log(selectedDate);
    try {
      const response: any = await fetchData(
        "/appointments",
        "PUT",
        {
          doctorId: selectedDoctor,
          patientId: userCtx.loggedInUser.id,
          time: selectedTime,
          date: selectedDate,
        },
        userCtx.accessToken
      );

      if (response.ok) {
        navigate("/appointments");
      }
    } catch (error: any) {
      console.error(error.message);
    }
  }

  function handleClick() {
    createAppointment();
  }

  return (
    <div style={{ display: "block" }}>
      <h1>Book an Appointment</h1>

      <div style={{ margin: "2rem" }}>
        <h3>Doctor:</h3>
        <select
          onChange={(event) => {
            handleSelectDoctor(event);
          }}
          style={{ fontSize: "1rem" }}
        >
          <option disabled selected>
            --- Please select a doctor ---
          </option>
          {allDoctors.map((doctor) => {
            return <option value={doctor.id}>{doctor.full_name}</option>;
          })}
        </select>
      </div>

      {selectedDoctor !== 0 ? (
        <div style={{ margin: "2rem 0 2rem 0" }}>
          <h3>Date:</h3>
          <Calendar setSelectedDate={setSelectedDate}></Calendar>
        </div>
      ) : null}

      {selectedDate && (
        <div style={{ margin: "2rem 0 2rem 0" }}>
          <h3>Time:</h3>
          <select
            id="time"
            onChange={(event) => handleTimeSelect(event)}
            style={{ fontSize: "1rem" }}
          >
            <option disabled selected>
              --- Please select a time ---
            </option>
            {[...Array(15)].map((_, i) => {
              const hour = Math.floor(i / 2) + 9; // Starting from 9
              const minute = i % 2 === 0 ? "00" : "30"; // Half-hour intervals
              const time = `${hour.toString().padStart(2, "0")}:${minute}`;
              return (
                <option key={i} value={time}>
                  {time}
                </option>
              );
            })}
          </select>
        </div>
      )}

      <br />

      <button className="button" onClick={handleClick}>
        Book Appointment
      </button>
    </div>
  );
}

export default Booking;
