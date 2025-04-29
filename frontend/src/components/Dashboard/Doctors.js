import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    doctorName: '',
    doctorCategory: '',
    doctorContactNumber: '',
    doctorEmail: '',
    doctorServices: ''
  });
  const [currentDoctorId, setCurrentDoctorId] = useState(null);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const API_BASE_URL = 'http://localhost:8070/api/doctoradd';

  // Fetch all doctors
  const fetchDoctors = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_BASE_URL}/`);
      const data = await response.json();
      if (data.success) {
        setDoctors(data.data);
      } else {
        setError('Failed to fetch doctors');
      }
      setIsLoading(false);
    } catch (error) {
      setError('Failed to fetch doctors');
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'doctorServices') {
      setFormData({
        ...formData,
        [name]: value.split(',').map(service => service.trim())
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      
      // Convert services back to array if it's a string
      const dataToSubmit = {
        ...formData,
        doctorServices: Array.isArray(formData.doctorServices) 
          ? formData.doctorServices 
          : formData.doctorServices.split(',').map(service => service.trim())
      };

      let response;
      
      if (isEditing) {
        response = await fetch(`${API_BASE_URL}/${currentDoctorId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(dataToSubmit)
        });
        
        const data = await response.json();
        if (data.success) {
          Swal.fire({
            title: 'Updated!',
            text: 'Doctor information has been updated successfully!',
            icon: 'success',
            confirmButtonColor: '#3498db'
          });
          setSuccessMessage('Doctor updated successfully!');
        } else {
          Swal.fire({
            title: 'Error!',
            text: data.error || 'Failed to update doctor',
            icon: 'error',
            confirmButtonColor: '#e74c3c'
          });
          setError(data.error || 'Failed to update doctor');
        }
      } else {
        response = await fetch(`${API_BASE_URL}/submit`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(dataToSubmit)
        });
        
        const data = await response.json();
        if (data.success) {
          Swal.fire({
            title: 'Success!',
            text: 'New doctor has been added successfully!',
            icon: 'success',
            confirmButtonColor: '#2ecc71'
          });
          setSuccessMessage('Doctor added successfully!');
        } else {
          Swal.fire({
            title: 'Error!',
            text: data.error || 'Failed to add doctor',
            icon: 'error',
            confirmButtonColor: '#e74c3c'
          });
          setError(data.error || 'Failed to add doctor');
        }
      }
      
      // Reset form and fetch updated list
      setFormData({
        doctorName: '',
        doctorCategory: '',
        doctorContactNumber: '',
        doctorEmail: '',
        doctorServices: ''
      });
      setIsEditing(false);
      setCurrentDoctorId(null);
      setShowForm(false);
      fetchDoctors();
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'Something went wrong',
        icon: 'error',
        confirmButtonColor: '#e74c3c'
      });
      setError('Something went wrong');
    } finally {
      setIsLoading(false);
      
      // Clear messages after 3 seconds
      setTimeout(() => {
        setSuccessMessage('');
        setError('');
      }, 3000);
    }
  };

  // Handle edit doctor
  const handleEdit = (doctor) => {
    setIsEditing(true);
    setCurrentDoctorId(doctor._id);
    setFormData({
      doctorName: doctor.doctorName,
      doctorCategory: doctor.doctorCategory,
      doctorContactNumber: doctor.doctorContactNumber,
      doctorEmail: doctor.doctorEmail,
      doctorServices: doctor.doctorServices.join(', ')
    });
    setShowForm(true);
    window.scrollTo(0, 0);
  };

  // Handle delete doctor
  const handleDelete = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e74c3c',
      cancelButtonColor: '#7f8c8d',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setIsLoading(true);
          const response = await fetch(`${API_BASE_URL}/${id}`, {
            method: 'DELETE'
          });
          
          const data = await response.json();
          if (data.success) {
            Swal.fire({
              title: 'Deleted!',
              text: 'Doctor has been removed from the system.',
              icon: 'success',
              confirmButtonColor: '#3498db'
            });
            setSuccessMessage('Doctor deleted successfully!');
            fetchDoctors();
          } else {
            Swal.fire({
              title: 'Error!',
              text: data.error || 'Failed to delete doctor',
              icon: 'error',
              confirmButtonColor: '#e74c3c'
            });
            setError(data.error || 'Failed to delete doctor');
          }
        } catch (error) {
          Swal.fire({
            title: 'Error!',
            text: 'Failed to delete doctor',
            icon: 'error',
            confirmButtonColor: '#e74c3c'
          });
          setError('Failed to delete doctor');
        } finally {
          setIsLoading(false);
          
          // Clear messages after 3 seconds
          setTimeout(() => {
            setSuccessMessage('');
            setError('');
          }, 3000);
        }
      }
    });
  };

  const toggleForm = () => {
    if (showForm && isEditing) {
      // Reset form when cancelling edit
      setFormData({
        doctorName: '',
        doctorCategory: '',
        doctorContactNumber: '',
        doctorEmail: '',
        doctorServices: ''
      });
      setIsEditing(false);
      setCurrentDoctorId(null);
    }
    setShowForm(!showForm);
  };

  // Define categories for the dropdown
  const doctorCategories = [
    'Cardiologist',
    'Dermatologist',
    'Neurologist',
    'Pediatrician',
    'Psychiatrist',
    'Orthopedic Surgeon',
    'Gynecologist',
    'Ophthalmologist',
    'Dentist',
    'General Physician'
  ];

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Doctors Management Dashboard</h1>
        <button 
          style={showForm ? styles.closeButton : styles.addButton} 
          onClick={toggleForm}
        >
          {showForm ? 'Cancel' : '+ Add New Doctor'}
        </button>
      </div>

      {/* Success and Error Messages */}
      {successMessage && (
        <div style={styles.successMessage}>{successMessage}</div>
      )}
      {error && (
        <div style={styles.errorMessage}>{error}</div>
      )}

      {/* Doctor Registration Form */}
      {showForm && (
        <div style={styles.formContainer}>
          <h2 style={styles.formTitle}>
            {isEditing ? 'Edit Doctor' : 'Add New Doctor'}
          </h2>
          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Doctor Name</label>
              <input
                type="text"
                name="doctorName"
                value={formData.doctorName}
                onChange={handleChange}
                required
                style={styles.input}
                placeholder="Dr. John Doe"
              />
            </div>
            
            <div style={styles.formGroup}>
              <label style={styles.label}>Specialization</label>
              <select
                name="doctorCategory"
                value={formData.doctorCategory}
                onChange={handleChange}
                required
                style={styles.input}
              >
                <option value="">Select Specialization</option>
                {doctorCategories.map((category, index) => (
                  <option key={index} value={category}>{category}</option>
                ))}
              </select>
            </div>
            
            <div style={styles.formGroup}>
              <label style={styles.label}>Contact Number</label>
              <input
                type="text"
                name="doctorContactNumber"
                value={formData.doctorContactNumber}
                onChange={handleChange}
                required
                style={styles.input}
                placeholder="10-digit number"
                pattern="^\d{10}$"
                title="Please enter a valid 10-digit number"
              />
            </div>
            
            <div style={styles.formGroup}>
              <label style={styles.label}>Email</label>
              <input
                type="email"
                name="doctorEmail"
                value={formData.doctorEmail}
                onChange={handleChange}
                required
                style={styles.input}
                placeholder="doctor@example.com"
              />
            </div>
            
            <div style={styles.formGroup}>
              <label style={styles.label}>Services (comma-separated)</label>
              <textarea
                name="doctorServices"
                value={Array.isArray(formData.doctorServices) ? formData.doctorServices.join(', ') : formData.doctorServices}
                onChange={handleChange}
                required
                style={styles.textarea}
                placeholder="Consultation, Surgery, Check-up"
              />
            </div>
            
            <button type="submit" style={styles.submitButton}>
              {isLoading ? 'Processing...' : isEditing ? 'Update Doctor' : 'Add Doctor'}
            </button>
          </form>
        </div>
      )}

      {/* Doctors List */}
      <div style={styles.listContainer}>
        <h2 style={styles.listTitle}>Doctors Directory</h2>
        
        {isLoading && !showForm ? (
          <div style={styles.loading}>Loading doctors...</div>
        ) : doctors.length === 0 ? (
          <div style={styles.noDoctors}>No doctors found. Add your first doctor!</div>
        ) : (
          <div style={styles.cardGrid}>
            {doctors.map((doctor) => (
              <div key={doctor._id} style={styles.card}>
                <div style={styles.cardContent}>
                  <h3 style={styles.doctorName}>{doctor.doctorName}</h3>
                  <div style={styles.badge}>{doctor.doctorCategory}</div>
                  <div style={styles.contactInfo}>
                    <p><strong>Contact:</strong> {doctor.doctorContactNumber}</p>
                    <p><strong>Email:</strong> {doctor.doctorEmail}</p>
                  </div>
                  <div>
                    <strong>Services:</strong>
                    <div style={styles.servicesList}>
                      {doctor.doctorServices.map((service, index) => (
                        <span key={index} style={styles.serviceTag}>{service}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <div style={styles.cardActions}>
                  <button 
                    onClick={() => handleEdit(doctor)} 
                    style={styles.editButton}
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(doctor._id)} 
                    style={styles.deleteButton}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Inline styles
const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
    maxWidth: '1200px',
    margin: '0 auto',
    backgroundColor: '#f8f9fa',
    minHeight: '100vh',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    padding: '10px 0',
    borderBottom: '2px solid #3498db',
  },
  title: {
    color: '#2c3e50',
    margin: '0',
    fontSize: '28px',
  },
  addButton: {
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    marginLeft: '20px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'background-color 0.3s',
  },
  closeButton: {
    backgroundColor: '#7f8c8d',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    marginLeft: '20px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'background-color 0.3s',
  },
  formContainer: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    marginBottom: '30px',
  },
  formTitle: {
    color: '#2c3e50',
    marginTop: '0',
    borderBottom: '1px solid #eee',
    paddingBottom: '10px',
    fontSize: '20px',
  },
  form: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '20px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    fontWeight: 'bold',
    marginBottom: '5px',
    color: '#34495e',
  },
  input: {
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '16px',
  },
  textarea: {
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '16px',
    minHeight: '100px',
    fontFamily: 'Arial, sans-serif',
  },
  submitButton: {
    gridColumn: '1 / -1',
    backgroundColor: '#2ecc71',
    color: 'white',
    border: 'none',
    padding: '12px',
    marginBottom: '50px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '16px',
    transition: 'background-color 0.3s',
  },
  listContainer: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  },
  listTitle: {
    color: '#2c3e50',
    marginTop: '0',
    borderBottom: '1px solid #eee',
    paddingBottom: '10px',
    fontSize: '20px',
  },
  cardGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '20px',
    marginTop: '20px',
  },
  card: {
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    overflow: 'hidden',
    transition: 'transform 0.3s, box-shadow 0.3s',
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
  },
  cardContent: {
    padding: '20px',
    flex: '1',
  },
  doctorName: {
    color: '#2c3e50',
    margin: '0 0 10px 0',
    fontSize: '18px',
  },
  badge: {
    display: 'inline-block',
    backgroundColor: '#3498db',
    color: 'white',
    padding: '5px 10px',
    borderRadius: '20px',
    fontSize: '12px',
    marginBottom: '15px',
  },
  contactInfo: {
    margin: '10px 0',
    fontSize: '14px',
    color: '#7f8c8d',
  },
  servicesList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '5px',
    marginTop: '5px',
  },
  serviceTag: {
    backgroundColor: '#f0f0f0',
    padding: '3px 8px',
    borderRadius: '4px',
    fontSize: '12px',
    color: '#555',
  },
  cardActions: {
    display: 'flex',
    padding: '10px 20px',
    backgroundColor: '#f8f9fa',
    borderTop: '1px solid #e0e0e0',
  },
  editButton: {
    flex: '1',
    padding: '8px',
    marginRight: '5px',
    backgroundColor: '#f39c12',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  deleteButton: {
    flex: '1',
    padding: '8px',
    marginLeft: '5px',
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  loading: {
    textAlign: 'center',
    padding: '20px',
    color: '#7f8c8d',
  },
  noDoctors: {
    textAlign: 'center',
    padding: '30px',
    color: '#7f8c8d',
    backgroundColor: '#f8f9fa',
    borderRadius: '4px',
    marginTop: '10px',
  },
  successMessage: {
    backgroundColor: '#d4edda',
    color: '#155724',
    padding: '12px',
    borderRadius: '4px',
    marginBottom: '20px',
    textAlign: 'center',
  },
  errorMessage: {
    backgroundColor: '#f8d7da',
    color: '#721c24',
    padding: '12px',
    borderRadius: '4px',
    marginBottom: '20px',
    textAlign: 'center',
  },
  // Ensures the entire page is centered
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Centers form and list containers
  formContainer: {
    width: '100%',
    maxWidth: '600px',
  },
  
  listContainer: {
    width: '100%',
    maxWidth: '800px',
  },

  cardGrid: {
    justifyContent: 'center',
  },
};

export default Doctors;