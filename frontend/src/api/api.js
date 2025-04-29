export const fetchBookedDates = async () => {
    try {
      const response = await fetch('http://localhost:8070/api/appointments/booked-dates');
      const data = await response.json();
      return data.success ? data.data : {};
    } catch (error) {
      console.error('Error fetching booked dates:', error);
      return {};
    }
  };
  