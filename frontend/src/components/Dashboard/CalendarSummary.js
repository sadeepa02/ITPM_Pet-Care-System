import React, { useEffect, useState } from 'react';
import { fetchBookedDates } from '../../api/api';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

const CalendarSummary = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const getBookedDates = async () => {
      const bookedDates = await fetchBookedDates();
      const eventList = Object.entries(bookedDates).map(([date, count]) => ({
        title: `${count} Bookings`,
        start: date
      }));
      setEvents(eventList);
    };

    getBookedDates();
  }, []);

  return (
    <div>
      <h2>Booked Appointments Summary</h2>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
        height="500px"
      />
    </div>
  );
};

export default CalendarSummary;
