import { useState } from "react";

function Booking(): JSX.Element {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("");

  // Function to handle date change
  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  // Function to handle time selection
  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  return (
    <div>
      <h1>Book an Appointment</h1>
      <label htmlFor="date">Date:</label>
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
      <button>Book Appointment</button>
    </div>
  );
}

export default Booking;
