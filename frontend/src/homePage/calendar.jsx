import React, { useState } from 'react';
import "./calendar.css";

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const EventCalendar = () => {
  const [activeMonth, setActiveMonth] = useState(new Date().getMonth());
  const [eventData, setEventData] = useState({});

  const getDaysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
  const getStartDayOfMonth = (month, year) => new Date(year, month, 1).getDay();
  const currentYear = new Date().getFullYear();

  const addEvent = (day) => {
    const eventType = prompt("Enter event type:");
    const eventTime = prompt("Enter event time (e.g., 2:00 PM):");
    if (eventType && eventTime) {
      setEventData((prev) => ({
        ...prev,
        [activeMonth]: {
          ...prev[activeMonth],
          [day]: { type: eventType, time: eventTime }
        }
      }));
    }
  };

  const editEvent = (day) => {
    const eventType = prompt("Edit event type:", eventData[activeMonth]?.[day]?.type || "");
    const eventTime = prompt("Edit event time:", eventData[activeMonth]?.[day]?.time || "");
    if (eventType && eventTime) {
      setEventData((prev) => ({
        ...prev,
        [activeMonth]: {
          ...prev[activeMonth],
          [day]: { type: eventType, time: eventTime }
        }
      }));
    }
  };

  const deleteEvent = (day) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      setEventData((prev) => {
        const updatedMonth = { ...prev[activeMonth] };
        delete updatedMonth[day];
        return { ...prev, [activeMonth]: updatedMonth };
      });
    }
  };

  const daysInMonth = getDaysInMonth(activeMonth, currentYear);
  const startDay = getStartDayOfMonth(activeMonth, currentYear);

  return (
    <div className="calendar-wrapper">
      <div className="calendar-header">
        <button onClick={() => setActiveMonth((activeMonth - 1 + 12) % 12)}>&lt;</button>
        <h1>{monthNames[activeMonth]} {currentYear}</h1>
        <button onClick={() => setActiveMonth((activeMonth + 1) % 12)}>&gt;</button>
      </div>
      <div className="calendar-days">
        {daysOfWeek.map((day) => (
          <div key={day} className="calendar-day-name">{day}</div>
        ))}
      </div>
      <div className="calendar-grid">
        {Array.from({ length: startDay }).map((_, i) => (
          <div key={`empty-${i}`} className="calendar-day empty"></div>
        ))}
        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => (
          <div key={day} className="calendar-day">
            <div className="day-number">{day}</div>
            {eventData[activeMonth]?.[day] && (
              <div
                className="day-event"
                onClick={() => editEvent(day)}
              >
                <strong>{eventData[activeMonth][day].type}</strong>
                <span>{eventData[activeMonth][day].time}</span>
              </div>
            )}
            <button className="add-event-btn" onClick={() => addEvent(day)}>Add</button>
            {eventData[activeMonth]?.[day] && (
              <button className="delete-event-btn" onClick={() => deleteEvent(day)}>Delete</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventCalendar;
