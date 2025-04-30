import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ServiceBooking1 = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    ownerName: '',
    petName: '',
    petCategory: 'dog',
    contactNumber: '',
    email: '',
    preferredDate: '',
    preferredTime: '',
    preferredDoctor: '',
    concerns: '',
    services: [],
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderError, setOrderError] = useState('');

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
      marginTop: '30px',
    },
    form: {
      width: '55%',
    },
    contactInfo: {
      width: '40%',
      backgroundColor: '#f2f2f2',
      padding: '30px',
      borderRadius: '15px',
      height: 'fit-content',
      boxShadow: '0 2px 15px rgba(0,0,0,0.1)',
    },
    contactHeading: {
      fontSize: '24px',
      marginBottom: '25px',
      color: '#8a4efc',
    },
    contactItem: {
      marginBottom: '20px',
      lineHeight: '1.6',
      color: '#555',
    },
    input: {
      width: '100%',
      padding: '15px',
      borderRadius: '25px',
      border: 'none',
      backgroundColor: '#f2f2f2',
      marginBottom: '20px',
      fontSize: '16px',
      boxShadow: 'inset 0 2px 5px rgba(0,0,0,0.1)',
    },
    select: {
      width: '100%',
      padding: '15px',
      borderRadius: '25px',
      border: 'none',
      backgroundColor: '#f2f2f2',
      marginBottom: '20px',
      fontSize: '16px',
      appearance: 'none',
      boxShadow: 'inset 0 2px 5px rgba(0,0,0,0.1)',
    },
    textarea: {
      width: '100%',
      padding: '15px',
      borderRadius: '15px',
      border: 'none',
      backgroundColor: '#f2f2f2',
      marginBottom: '20px',
      fontSize: '16px',
      minHeight: '150px',
      resize: 'vertical',
      boxShadow: 'inset 0 2px 5px rgba(0,0,0,0.1)',
    },
    button: {
      padding: '15px 30px',
      backgroundColor: '#8a4efc',
      color: 'white',
      border: 'none',
      borderRadius: '25px',
      fontSize: '16px',
      fontWeight: 'bold',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      width: '100%',
      marginTop: '10px',
    },
    successMessage: {
      backgroundColor: '#d4edda',
      color: '#155724',
      padding: '15px',
      borderRadius: '5px',
      marginBottom: '20px',
      textAlign: 'center',
    },
    errorMessage: {
      backgroundColor: '#f8d7da',
      color: '#721c24',
      padding: '15px',
      borderRadius: '5px',
      marginBottom: '20px',
      textAlign: 'center',
    },
    primaryButton: {
      padding: '12px 24px',
      backgroundColor: '#8a4efc',
      color: 'white',
      border: 'none',
      borderRadius: '25px',
      fontSize: '16px',
      fontWeight: 'bold',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
      margin: '30px auto',
      display: 'block',
    },
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setOrderError('');

    try {
      await axios.post('http://localhost:8070/api/paincontrolbook/submit', formData);
      setSubmitted(true);
      setIsSubmitting(false);
      setFormData({
        ownerName: '',
        petName: '',
        petCategory: 'dog',
        contactNumber: '',
        email: '',
        preferredDate: '',
        preferredTime: '',
        preferredDoctor: '',
        concerns: '',
        services: [],
      });
    } catch (error) {
      setOrderError(error.response?.data?.message || 'An error occurred');
      setIsSubmitting(false);
    }
  };
  
  
  return (
    
      <div style={styles.container}>
        <h2 style={styles.heading}>Service Booking</h2>

        {submitted && (
          <div style={styles.successMessage}>
            <p>Thank you for your booking! We will contact you shortly.</p>
          </div>
        )}

        {orderError && (
          <div style={styles.errorMessage}>
            <p>{orderError}</p>
          </div>
        )}

        <div style={styles.content}>
          <form onSubmit={handleSubmit} style={styles.form}>
            <input
              type="text"
              name="ownerName"
              value={formData.ownerName}
              onChange={handleChange}
              style={styles.input}
              placeholder="Owner Name"
              required
            />

            <input
              type="text"
              name="petName"
              value={formData.petName}
              onChange={handleChange}
              style={styles.input}
              placeholder="Pet Name"
              required
            />

            <select
              name="petCategory"
              value={formData.petCategory}
              onChange={handleChange}
              style={styles.select}
              required
            >
              <option value="dog">Dog</option>
              <option value="cat">Cat</option>
              <option value="bird">Bird</option>
              <option value="rabbit">Rabbit</option>
              <option value="reptile">Reptile</option>
              <option value="other">Other</option>
            </select>

            <input
              type="tel"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              style={styles.input}
              placeholder="Contact Number"
              required
            />

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={styles.input}
              placeholder="Email"
              required
            />

            <input
              type="date"
              name="preferredDate"
              value={formData.preferredDate}
              onChange={handleChange}
              style={styles.input}
              required
            />
<label htmlFor="preferredTime">Preferred Time</label>
<select
  name="preferredTime"
  value={formData.preferredTime}
  onChange={handleChange}
  style={styles.select}
  required
>
  <option value="">Select Preferred Time</option>
  <option value="09:00">09:00 AM</option>
  <option value="10:00">10:00 AM</option>
  <option value="11:00">11:00 AM</option>
  <option value="12:00">12:00 PM</option>
  <option value="13:00">01:00 PM</option>
  <option value="14:00">02:00 PM</option>
  <option value="15:00">03:00 PM</option>
  <option value="16:00">04:00 PM</option>
</select>


<label htmlFor="preferredDoctor">Preferred Doctor</label>
<select
  name="preferredDoctor"
  value={formData.preferredDoctor}
  onChange={handleChange}
  style={styles.select}
  required
>
  <option value="">Select Preferred Doctor</option>
  <option value="drSmith">Dr. Smith</option>
  <option value="drJohnson">Dr. Johnson</option>
  <option value="drWilliams">Dr. Williams</option>
  <option value="drTaylor">Dr. Taylor</option>
  <option value="drDavis">Dr. Davis</option>
</select>


            <textarea
              name="concerns"
              value={formData.concerns}
              onChange={handleChange}
              style={styles.textarea}
              placeholder="Concerns"
              required
            ></textarea>

            <textarea
              name="services"
              value={formData.services}
              onChange={handleChange}
              style={styles.textarea}
              placeholder="Services Required"
              required
            ></textarea>

            <button type="submit" style={styles.button} disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Book Appointment'}
            </button>
          </form>

          <div style={styles.contactInfo}>
            <h3 style={styles.contactHeading}>Contact Information</h3>
            <div style={styles.contactItem}>
              <strong>PetVet Clinic</strong><br />
              98/4, Havelock Road,<br />
              Colombo 05, Sri Lanka<br />
              <a href="#location" style={{ color: '#8a4efc' }}>View on Map</a>
            </div>
            <div style={styles.contactItem}>
              <strong>Phone</strong><br />
              General: +94 11 259 9799<br />
              Emergency: +94 777 738 838
            </div>
            <div style={styles.contactItem}>
              <strong>Email</strong><br />
              info@petvet.lk<br />
              support@petvet.lk
            </div>
            <div style={styles.contactItem}>
              <strong>Hours</strong><br />
              Mon-Sun: 8:30 AM – 9:00 PM<br />
              24/7 Emergency Services
            </div>
            <iframe
              title="Google Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12682.28817682303!2d79.85775005000001!3d6.8892644500000005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae25bc6a8f1c5af%3A0x59a5f3f4c0a92e1e!2sHavelock%20Road%2C%20Colombo!5e0!3m2!1sen!2slk!4v1717171717171!5m2!1sen!2slk"
              style={styles.map}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        <button 
          style={styles.primaryButton} 
          onClick={() => navigate('/bookingdetails')}
        >
          View My Bookings
        </button>
      </div>
   
  );
};

export default ServiceBooking1;