import React, { useState, useEffect } from 'react';
import axios from 'axios';


const BookingDetails1 = () => {
  const [lastBooking, setLastBooking] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  const styles = {
    container: {
      fontFamily: 'Arial, sans-serif',
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px',
    },
    heading: {
      fontFamily: 'cursive, Arial, sans-serif',
      color: '#333',
      fontSize: '32px',
      fontWeight: 'bold',
      marginBottom: '30px',
      textAlign: 'center',
    },
    content: {
      display: 'flex',
      justifyContent: 'space-between',
      gap: '40px',
    },
    details: {
      backgroundColor: '#f2f2f2',
      padding: '20px',
      borderRadius: '15px',
      fontSize: '18px',
      marginBottom: '20px',
      width: '55%',
    },
    error: {
      color: 'red',
      textAlign: 'center',
      marginBottom: '20px',
    },
    loading: {
      textAlign: 'center',
      marginBottom: '20px',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
    },
    input: {
      width: '100%',
      padding: '10px',
      borderRadius: '5px',
      border: '1px solid #ccc',
    },
    button: {
      padding: '10px 20px',
      backgroundColor: '#333',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      marginRight: '10px',
    },
    serviceInfo: {
      width: '40%',
      padding: '20px',
      backgroundColor: '#e9ecef',
      borderRadius: '15px',
      boxShadow: '0 2px 15px rgba(0,0,0,0.1)',
    },
    serviceHeading: {
      fontSize: '24px',
      color: '#333',
      marginBottom: '15px',
    },
    serviceText: {
      fontSize: '16px',
      color: '#555',
      lineHeight: '1.6',
    },
  };

  useEffect(() => {
    const fetchLastBooking = async () => {
      setIsLoading(true);
      setError('');
      try {
        const response = await axios.get('http://localhost:8070/api/paincontrolbook/');
        const bookings = response.data.data;
        if (bookings.length > 0) {
          setLastBooking(bookings[0]); // Get the last booking
        } else {
          setError('No booking details to display');
        }
      } catch (err) {
        setError('An error occurred. Please try again later.');
        console.error('Error fetching bookings:', err);
      }
      setIsLoading(false);
    };

    fetchLastBooking();
  }, []);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8070/api/paincontrolbook/${lastBooking._id}`);
      setLastBooking(null);
      setError('Booking deleted successfully');
    } catch (err) {
      setError('Failed to delete booking');
      console.error('Error deleting booking:', err);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      await axios.patch(`http://localhost:8070/api/paincontrolbook/${lastBooking._id}`, lastBooking);
      setError('Booking updated successfully');
    } catch (err) {
      setError('Failed to update booking');
      console.error('Error updating booking:', err);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLastBooking({
      ...lastBooking,
      [name]: value,
    });
  };

  return (
    <>
      <div style={styles.container}>

        <div style={styles.serviceInfo}></div>
        <h1 style={styles.heading}> Booking Details</h1>
        {isLoading && <p style={styles.loading}>Loading...</p>}
        {error && <p style={styles.error}>{error}</p>}
        <div style={styles.content}>
          {lastBooking ? (
            <div style={styles.details}>
              <form onSubmit={handleUpdate} style={styles.form}>
                <p><strong>Owner Name:</strong> <input type="text" name="ownerName" value={lastBooking.ownerName} onChange={handleChange} style={styles.input} /></p>
                <p><strong>Pet Name:</strong> <input type="text" name="petName" value={lastBooking.petName} onChange={handleChange} style={styles.input} /></p>
                <p><strong>Pet Category:</strong> 
                  <select name="petCategory" value={lastBooking.petCategory} onChange={handleChange} style={styles.input}>
                    <option value="dog">Dog</option>
                    <option value="cat">Cat</option>
                    <option value="bird">Bird</option>
                    <option value="rabbit">Rabbit</option>
                    <option value="reptile">Reptile</option>
                    <option value="other">Other</option>
                  </select>
                </p>
                <p><strong>Contact Number:</strong> <input type="tel" name="contactNumber" value={lastBooking.contactNumber} onChange={handleChange} style={styles.input} /></p>
                <p><strong>Email:</strong> <input type="email" name="email" value={lastBooking.email} onChange={handleChange} style={styles.input} /></p>
                <p><strong>Preferred Date:</strong> <input type="date" name="preferredDate" value={new Date(lastBooking.preferredDate).toISOString().split('T')[0]} onChange={handleChange} style={styles.input} /></p>
                <p><strong>Preferred Time:</strong> <input type="time" name="preferredTime" value={lastBooking.preferredTime} onChange={handleChange} style={styles.input} /></p>
                <p><strong>Preferred Doctor:</strong> <input type="text" name="preferredDoctor" value={lastBooking.preferredDoctor} onChange={handleChange} style={styles.input} /></p>
                <p><strong>Concerns:</strong> <textarea name="concerns" value={lastBooking.concerns} onChange={handleChange} style={styles.input} /></p>
                <p><strong>Services:</strong> <textarea name="services" value={lastBooking.services.join(', ')} onChange={handleChange} style={styles.input} /></p>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <button type="submit" style={styles.button} disabled={isUpdating}>
                    {isUpdating ? 'Updating...' : 'Update Booking'}
                  </button>
                  <button type="button" onClick={handleDelete} style={{ ...styles.button, backgroundColor: '#d9534f' }}>
                    Delete Booking
                  </button>
                </div>
              </form>
            </div>
          ) : (
            !isLoading && <p>No booking details to display</p>
          )}

          <div style={styles.serviceInfo}>
            <h2 style={styles.serviceHeading}>Our Services</h2>
            <p style={styles.serviceText}>
              At PetVet Clinic, we offer a comprehensive range of services to ensure your pet's health and well-being. Our services include:
            </p>
            <ul style={styles.serviceText}>
              <li>General Check-ups</li>
              <li>Vaccinations</li>
              <li>Dental Care</li>
              <li>Emergency Services</li>
              <li>Surgical Procedures</li>
              <li>Nutrition Counseling</li>
              <li>Grooming Services</li>
              <li>Behavioral Consultations</li>
            </ul>
            <p style={styles.serviceText}>
              Our experienced team of veterinarians and staff are dedicated to providing the highest quality care for your pet. Contact us today to schedule an appointment or learn more about our services.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingDetails1;