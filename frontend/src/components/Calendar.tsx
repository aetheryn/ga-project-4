import { SyntheticEvent } from "react";
import styles from "./Calendar.module.css";

interface CalendarProps {
  selectedDate: string;
  setSelectedDate: (arg: string) => void;
}

function Calendar({ selectedDate, setSelectedDate }: CalendarProps) {
  const today = new Date();
  const month = today.getMonth();
  const year = today.getFullYear();
  const numOfDays = new Date(year, month + 1, 0).getDate();

  const weekDays: Array<string> = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
  ];

  const firstDayOfMonth = new Date(year, month, 1);
  const dayOfWeekFirstDay = firstDayOfMonth.getDay();

  function handleDayClick(event: SyntheticEvent, day: number): void {
    const date = new Date(year, month, day, 8, 0).toISOString().slice(0, 10);
    setSelectedDate(date);
    addActiveClass(event);
    console.log(numOfDays);
    console.log(date);
  }

  function addActiveClass(event: SyntheticEvent): void {
    const elements = document.getElementsByClassName(styles["day"]);
    for (let i = 0; i < elements.length; i++) {
      elements[i].classList.remove(styles["isActive"]);
    }

    const selectedElement = event.currentTarget;
    selectedElement.classList.add(styles["isActive"]);
  }

  function generateCalendarRows() {
    const rows = [];
    let row = [];
    let dayCounter = 1;

    for (let i = 0; i < dayOfWeekFirstDay; i++) {
      row.push(<div key={`empty-${i}`} className={styles.day}></div>);
    }

    for (let i = dayOfWeekFirstDay; i < 7; i++) {
      const day = dayCounter;
      row.push(
        <div
          key={`${dayCounter}`}
          className={styles.day}
          onClick={(event) => handleDayClick(event, day)}
        >
          {dayCounter}
        </div>
      );
      dayCounter++;
    }
    rows.push(
      <div key={`row-0`} className={styles.row}>
        {row}
      </div>
    );

    while (dayCounter <= numOfDays) {
      row = [];
      for (let i = 0; i < 7 && dayCounter <= numOfDays; i++) {
        const day = dayCounter;
        row.push(
          <div
            key={`${dayCounter}`}
            className={styles.day}
            onClick={(event) => handleDayClick(event, day)}
          >
            {dayCounter}
          </div>
        );
        dayCounter++;
      }
      rows.push(
        <div key={`row-${dayCounter / 7}`} className={styles.row}>
          {row}
        </div>
      );
    }

    if (row.length < 7) {
      const remainingEmptyDays = 7 - row.length;
      for (let i = 0; i < remainingEmptyDays; i++) {
        row.push(
          <div key={`empty-${dayCounter + i}`} className={styles.day}></div>
        );
      }
    }

    return rows;
  }

  return (
    <>
      <div className={styles.calendar}>
        <h4>{`${month + 1}/${year}`}</h4>
        <div className={styles.headerrow}>
          {weekDays.map((day, index) => (
            <div key={index} className={styles.headerday}>
              {day}
            </div>
          ))}
        </div>
        {generateCalendarRows()}
      </div>
    </>
  );
}

export default Calendar;
