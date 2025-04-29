import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import PrescriptionForm from '../Dashboard/PrescriptionForm';
import { Link } from 'react-router-dom';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showPrescriptionForm, setShowPrescriptionForm] = useState(false);
  const [currentAppointment, setCurrentAppointment] = useState(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const API_BASE_URL = 'http://localhost:8070/api/paincontrolbook';

  // Fetch all appointments
  const fetchAppointments = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_BASE_URL}/`);
      const data = await response.json();
      if (data.success) {
        // Sort appointments by creation date (first come first served)
        const sortedAppointments = data.data.sort((a, b) => 
          new Date(a.createdAt) - new Date(b.createdAt)
        );
        setAppointments(sortedAppointments);
      } else {
        setError('Failed to fetch appointments');
      }
      setIsLoading(false);
    } catch (error) {
      setError('Failed to fetch appointments');
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
    
    // Listen for sidebar toggle events
    const handleResize = () => {
      setIsSidebarCollapsed(window.innerWidth < 768);
    };
    
    // Set initial value
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Handle appointment deletion
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
              text: 'Appointment has been removed from the system.',
              icon: 'success',
              confirmButtonColor: '#3498db'
            });
            setSuccessMessage('Appointment deleted successfully!');
            fetchAppointments();
          } else {
            Swal.fire({
              title: 'Error!',
              text: data.error || 'Failed to delete appointment',
              icon: 'error',
              confirmButtonColor: '#e74c3c'
            });
            setError(data.error || 'Failed to delete appointment');
          }
        } catch (error) {
          Swal.fire({
            title: 'Error!',
            text: 'Failed to delete appointment',
            icon: 'error',
            confirmButtonColor: '#e74c3c'
          });
          setError('Failed to delete appointment');
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

  // Handle status change (e.g., mark as completed, in-progress)
  const handleStatusChange = async (id, newStatus) => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
      });
      
      const data = await response.json();
      if (data.success) {
        Swal.fire({
          title: 'Updated!',
          text: `Appointment status has been changed to ${newStatus}!`,
          icon: 'success',
          confirmButtonColor: '#3498db'
        });
        setSuccessMessage('Appointment status updated successfully!');
        fetchAppointments();
      } else {
        Swal.fire({
          title: 'Error!',
          text: data.error || 'Failed to update appointment status',
          icon: 'error',
          confirmButtonColor: '#e74c3c'
        });
        setError(data.error || 'Failed to update appointment status');
      }
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'Failed to update appointment status',
        icon: 'error',
        confirmButtonColor: '#e74c3c'
      });
      setError('Failed to update appointment status');
    } finally {
      setIsLoading(false);
      
      // Clear messages after 3 seconds
      setTimeout(() => {
        setSuccessMessage('');
        setError('');
      }, 3000);
    }
  };

  // Open prescription form
  const handleOpenPrescriptionForm = (appointment) => {
    setCurrentAppointment(appointment);
    setShowPrescriptionForm(true);
  };

  // Close prescription form
  const handleClosePrescriptionForm = () => {
    setShowPrescriptionForm(false);
    setCurrentAppointment(null);
  };

  // Submit prescription
  const handleSubmitPrescription = async (prescriptionData) => {
    try {
      setIsLoading(true);
      // Here you would typically save the prescription to your backend
      const response = await fetch(`${API_BASE_URL}/prescribe/${currentAppointment._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...prescriptionData,
          appointmentId: currentAppointment._id
        })
      });

      // Showing success message
      Swal.fire({
        title: 'Prescription Added!',
        text: 'The prescription has been successfully added.',
        icon: 'success',
        confirmButtonColor: '#3498db'
      });
      
      setSuccessMessage('Prescription added successfully!');
      handleClosePrescriptionForm();
      fetchAppointments();
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'Failed to add prescription',
        icon: 'error',
        confirmButtonColor: '#e74c3c'
      });
      setError('Failed to add prescription');
    } finally {
      setIsLoading(false);
      
      // Clear messages after 3 seconds
      setTimeout(() => {
        setSuccessMessage('');
        setError('');
      }, 3000);
    }
  };

  return (
    <div style={{
      ...styles.mainContent,
      marginLeft: isSidebarCollapsed ? '0' : '205px', 
      width: isSidebarCollapsed ? '100%' : 'calc(100% - 205px)',
      transition: 'margin-left 0.3s, width 0.3s'
    }}>
      <div style={styles.contentContainer}>
        <div style={styles.header}>
          <h1 style={styles.title}>Pet Pain Control Appointments</h1>
          <div style={styles.headerButtons}>
            <Link to="/prescriptions" style={styles.viewAllLink}>
              <button style={styles.viewAllButton}>
                <span style={styles.viewAllButtonIcon}>📋</span>
                <span style={styles.buttonText}>View All Prescriptions</span>
              </button>
            </Link>
            <Link to="/servicebook" style={styles.viewAllLink}>
              <button style={styles.addButton}>
                <span>+</span>
                <span style={styles.buttonText}>Add New Appointment</span>
              </button>
            </Link>
          </div>
        </div>

        {/* Success and Error Messages */}
        {successMessage && (
          <div style={styles.successMessage}>{successMessage}</div>
        )}
        {error && (
          <div style={styles.errorMessage}>{error}</div>
        )}

        {/* Appointments List */}
        <div style={styles.listContainer}>
          <h2 style={styles.listTitle}>Appointments Directory</h2>
          
          {isLoading ? (
            <div style={styles.loading}>Loading appointments...</div>
          ) : appointments.length === 0 ? (
            <div style={styles.noAppointments}>No appointments found.</div>
          ) : (
            <div style={styles.tableContainer}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.tableHeader}>Queue #</th>
                    <th style={styles.tableHeader}>Owner</th>
                    <th style={styles.tableHeader}>Pet</th>
                    <th style={styles.tableHeader} className="hide-sm">Category</th>
                    <th style={styles.tableHeader} className="hide-sm">Date</th>
                    <th style={styles.tableHeader} className="hide-sm">Time</th>
                    <th style={styles.tableHeader} className="hide-md">Doctor</th>
                    <th style={styles.tableHeader} className="hide-md">Contact</th>
                    <th style={styles.tableHeader} className="hide-lg">Concerns</th>
                    <th style={styles.tableHeader} className="hide-md">Services</th>
                    <th style={styles.tableHeader}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((appointment, index) => (
                    <tr key={appointment._id} style={styles.tableRow}>
                      <td style={styles.tableCell}>{index + 1}</td>
                      <td style={styles.tableCell}>{appointment.ownerName}</td>
                      <td style={styles.tableCell}>{appointment.petName}</td>
                      <td style={{...styles.tableCell}} className="hide-sm">{appointment.petCategory}</td>
                      <td style={{...styles.tableCell}} className="hide-sm">{formatDate(appointment.preferredDate)}</td>
                      <td style={{...styles.tableCell}} className="hide-sm">{appointment.preferredTime}</td>
                      <td style={{...styles.tableCell}} className="hide-md">{appointment.preferredDoctor}</td>
                      <td style={{...styles.tableCell}} className="hide-md">
                        <div>{appointment.contactNumber}</div>
                        <div><small>{appointment.email}</small></div>
                      </td>
                      <td style={{...styles.tableCell}} className="hide-lg">{appointment.concerns}</td>
                      <td style={{...styles.tableCell}} className="hide-md">
                        <div style={styles.servicesList}>
                          {appointment.services.map((service, idx) => (
                            <span key={idx} style={styles.serviceTag}>{service}</span>
                          ))}
                        </div>
                      </td>
                      <td style={styles.tableCell}>
                        <div style={styles.actionButtons}>
                          <button 
                            onClick={() => handleOpenPrescriptionForm(appointment)} 
                            style={styles.prescribeButton}
                            aria-label="Prescribe"
                          >
                            <span style={styles.buttonText}>Prescribe</span>
                          </button>
                          <button 
                            onClick={() => handleStatusChange(appointment._id, 'Completed')} 
                            style={styles.completeButton}
                            aria-label="Complete"
                          >
                            <span style={styles.buttonText}>Complete</span>
                          </button>
                          <button 
                            onClick={() => handleDelete(appointment._id)} 
                            style={styles.deleteButton}
                            aria-label="Cancel"
                          >
                            <span style={styles.buttonText}>Cancel</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        
        {/* Prescription Form Modal */}
        {showPrescriptionForm && currentAppointment && (
          <PrescriptionForm 
            currentAppointment={currentAppointment}
            onClose={handleClosePrescriptionForm}
            onSubmit={handleSubmitPrescription}
            isLoading={isLoading}
          />
        )}
      </div>
    </div>
  );
};

// Styles for the Appointments component
const styles = {
  mainContent: {
    position: 'relative',
    minHeight: '100vh',
    backgroundColor: '#f8f9fa',
    padding: '0',
    boxSizing: 'border-box',
    transition: 'all 0.3s',
  },
  contentContainer: {
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    boxSizing: 'border-box',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    paddingBottom: '10px',
    borderBottom: '2px solid #3498db',
    flexWrap: 'wrap',
    gap: '10px',
  },
  title: {
    color: '#2c3e50',
    margin: '0',
    fontSize: 'clamp(18px, 4vw, 28px)',
    flex: '1 1 200px',
  },
  headerButtons: {
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  buttonText: {
    '@media (max-width: 480px)': {
      display: 'none',
    }
  },
  addButton: {
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    padding: '8px 16px',
    fontSize: '14px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    minWidth: '40px',
    justifyContent: 'center',
  },
  viewAllLink: {
    textDecoration: 'none',
  },
  viewAllButton: {
    backgroundColor: '#9b59b6',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    padding: '8px 16px',
    fontSize: '14px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    minWidth: '40px',
    justifyContent: 'center',
  },
  viewAllButtonIcon: {
    fontSize: '16px',
  },
  listContainer: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    overflowX: 'auto',
  },
  listTitle: {
    color: '#2c3e50',
    marginTop: '0',
    borderBottom: '1px solid #eee',
    paddingBottom: '10px',
    fontSize: 'clamp(16px, 3vw, 20px)',
  },
  tableContainer: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '10px',
    fontSize: '14px',
    minWidth: '650px', // Ensures a minimum width for mobile
  },
  tableHeader: {
    backgroundColor: '#f2f2f2',
    padding: '12px 8px',
    textAlign: 'left',
    borderBottom: '2px solid #ddd',
    fontWeight: 'bold',
    whiteSpace: 'nowrap',
    fontSize: 'clamp(12px, 2vw, 14px)',
  },
  tableRow: {
    borderBottom: '1px solid #ddd',
    '@media (max-width: 768px)': {
      display: 'flex',
      flexDirection: 'column',
      borderBottom: '2px solid #ddd',
      marginBottom: '10px',
    }
  },
  tableCell: {
    padding: '12px 8px',
    textAlign: 'left',
    verticalAlign: 'top',
    wordWrap: 'break-word',
    fontSize: 'clamp(12px, 2vw, 14px)',
  },
  servicesList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '5px',
  },
  serviceTag: {
    backgroundColor: '#f0f0f0',
    padding: '3px 8px',
    borderRadius: '4px',
    fontSize: '12px',
    color: '#555',
    display: 'inline-block',
    margin: '2px 0',
  },
  actionButtons: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
  },
  completeButton: {
    padding: '6px 10px',
    backgroundColor: '#2ecc71',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '12px',
    transition: 'background-color 0.3s',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: '80px',
  },
  deleteButton: {
    padding: '6px 10px',
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '12px',
    transition: 'background-color 0.3s',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: '80px',
  },
  prescribeButton: {
    padding: '6px 10px',
    backgroundColor: '#9b59b6',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '12px',
    transition: 'background-color 0.3s',
    marginBottom: '5px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: '80px',
  },
  loading: {
    textAlign: 'center',
    padding: '20px',
    color: '#7f8c8d',
  },
  noAppointments: {
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
  }
};

// Add this to your global CSS or define it directly using styled-components or emotion
// This is needed because className doesn't work with inline styles
const mediaStyles = `
  @media (max-width: 768px) {
    .hide-md {
      display: none;
    }
  }
  @media (max-width: 576px) {
    .hide-sm {
      display: none;
    }
  }
  @media (max-width: 992px) {
    .hide-lg {
      display: none;
    }
  }
  @media (max-width: 480px) {
    .buttonText {
      display: none;
    }
  }
`;

export default Appointments;