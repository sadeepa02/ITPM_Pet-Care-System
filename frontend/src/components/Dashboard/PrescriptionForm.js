import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom'; // Make sure you have this import


const PrescriptionForm = ({ currentAppointment, onClose, onSubmit, isLoading }) => {
  const [prescriptionData, setPrescriptionData] = useState({
    medicine: '',
    dosage: '',
    instructions: '',
    duration: ''
  });

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Handle prescription form input changes
  const handlePrescriptionInputChange = (e) => {
    const { name, value } = e.target;
    setPrescriptionData(prev => ({ ...prev, [name]: value }));
  };

  // Submit prescription
  const handleSubmitPrescription = async (e) => {
    e.preventDefault();
    
    // Ensure `currentAppointment` exists
    if (!currentAppointment) {
      Swal.fire("Error", "No appointment data found!", "error");
      return;
    }
  
    const prescriptionPayload = {
      appointmentId: currentAppointment._id, // Get the appointment ID from props
      petName: currentAppointment.petName,
      ownerName: currentAppointment.ownerName,
      doctorName: currentAppointment.preferredDoctor,
      ...prescriptionData, // Spread the prescription input values
    };
  
    try {
      const response = await fetch("http://localhost:8070/api/prescriptions/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(prescriptionPayload),
      });
  
      if (!response.ok) throw new Error("Failed to save prescription");
  
      const data = await response.json();
      
      Swal.fire("Success", "Prescription saved successfully!", "success");
      onSubmit(data); // Call parent function to refresh data if needed
      onClose(); // Close modal
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    }
  };
  

  if (!currentAppointment) return null;

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modalContainer}>
        <div style={styles.modalHeader}>
          <h2 style={styles.modalTitle}>Prescribe Medication</h2>
          <button 
            style={styles.closeButton}
            onClick={onClose}
          >
            &times;
          </button>
        </div>
        
        <div style={styles.modalBody}>
          <form onSubmit={handleSubmitPrescription}>
            

            {/* Patient Information */}
            <div style={styles.patientInfoSection}>
              <h3 style={styles.sectionTitle}>Patient Information</h3>
              <div style={styles.infoGrid}>
                <div style={styles.infoItem}>
                  <label style={styles.infoLabel}>Owner:</label>
                  <div style={styles.infoValue}>{currentAppointment.ownerName}</div>
                </div>
                <div style={styles.infoItem}>
                  <label style={styles.infoLabel}>Pet:</label>
                  <div style={styles.infoValue}>{currentAppointment.petName}</div>
                </div>
                <div style={styles.infoItem}>
                  <label style={styles.infoLabel}>Category:</label>
                  <div style={styles.infoValue}>{currentAppointment.petCategory}</div>
                </div>
                <div style={styles.infoItem}>
                  <label style={styles.infoLabel}>Doctor:</label>
                  <div style={styles.infoValue}>{currentAppointment.preferredDoctor}</div>
                </div>
                <div style={styles.infoItem}>
                  <label style={styles.infoLabel}>Date:</label>
                  <div style={styles.infoValue}>{formatDate(currentAppointment.preferredDate)}</div>
                </div>
                <div style={styles.infoItem}>
                  <label style={styles.infoLabel}>Time:</label>
                  <div style={styles.infoValue}>{currentAppointment.preferredTime}</div>
                </div>
                <div style={styles.infoItem}>
                  <label style={styles.infoLabel}>Contact:</label>
                  <div style={styles.infoValue}>{currentAppointment.contactNumber}</div>
                </div>
              </div>
            </div>
            
            {/* Prescription Details */}
            <div style={styles.prescriptionSection}>
              <h3 style={styles.sectionTitle}>Prescription Details</h3>
              
              <div style={styles.formGroup}>
                <label style={styles.formLabel}>Medicine</label>
                <input 
                  type="text" 
                  name="medicine" 
                  value={prescriptionData.medicine} 
                  onChange={handlePrescriptionInputChange} 
                  style={styles.formInput} 
                  required 
                />
              </div>
              
              <div style={styles.formGroup}>
                <label style={styles.formLabel}>Dosage</label>
                <input 
                  type="text" 
                  name="dosage" 
                  value={prescriptionData.dosage} 
                  onChange={handlePrescriptionInputChange} 
                  style={styles.formInput} 
                  required 
                />
              </div>
              
              <div style={styles.formGroup}>
                <label style={styles.formLabel}>Instructions</label>
                <textarea 
                  name="instructions" 
                  value={prescriptionData.instructions} 
                  onChange={handlePrescriptionInputChange} 
                  style={styles.formTextarea} 
                  required 
                />
              </div>
              
              <div style={styles.formGroup}>
                <label style={styles.formLabel}>Duration</label>
                <input 
                  type="text" 
                  name="duration" 
                  value={prescriptionData.duration} 
                  onChange={handlePrescriptionInputChange} 
                  style={styles.formInput} 
                  placeholder="e.g., 7 days" 
                  required 
                />
              </div>
            </div>
            
            <div style={styles.formActions}>
              <button 
                type="button" 
                onClick={onClose} 
                style={styles.cancelFormButton}
                disabled={isLoading}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                style={styles.submitFormButton}
                disabled={isLoading}
              >
                {isLoading ? 'Saving...' : 'Save Prescription'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Styles for the PrescriptionForm component
const styles = {
  // Modal Styles
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: '8px',
    width: '90%',
    maxWidth: '800px',
    maxHeight: '90vh',
    overflowY: 'auto',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
    animation: 'modalFadeIn 0.3s',
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px 20px',
    borderBottom: '1px solid #eee',
    backgroundColor: '#9b59b6',
    borderRadius: '8px 8px 0 0',
  },
  modalTitle: {
    margin: 0,
    color: 'white',
    fontSize: '22px',
  },
  closeButton: {
    background: 'none',
    border: 'none',
    color: 'white',
    fontSize: '24px',
    cursor: 'pointer',
  },
  modalBody: {
    padding: '20px',
  },
  
  // View All Prescriptions Button Styles
  viewAllButtonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: '15px',
  },
  viewAllLink: {
    textDecoration: 'none',
  },
  viewAllButton: {
    backgroundColor: '#8e44ad', // Slightly darker than the header
    color: 'white',
    border: 'none',
    borderRadius: '30px',
    padding: '10px 20px',
    fontSize: '14px',
    fontWeight: 'bold',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    boxShadow: '0 4px 10px rgba(142, 68, 173, 0.3)',
    transition: 'all 0.3s ease',
    // Hover effect achieved through CSS
    ':hover': {
      backgroundColor: '#7d3c98',
      transform: 'translateY(-2px)',
      boxShadow: '0 6px 12px rgba(142, 68, 173, 0.4)',
    },
  },
  viewAllButtonIcon: {
    fontSize: '16px',
  },
  
  // Patient Info Section
  patientInfoSection: {
    marginBottom: '25px',
    backgroundColor: '#f8f9fa',
    padding: '15px',
    borderRadius: '6px',
  },
  sectionTitle: {
    fontSize: '18px',
    marginTop: '0',
    marginBottom: '15px',
    color: '#2c3e50',
    borderBottom: '1px solid #ddd',
    paddingBottom: '8px',
  },
  infoGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '15px',
  },
  infoItem: {
    marginBottom: '10px',
  },
  infoLabel: {
    fontWeight: 'bold',
    display: 'block',
    marginBottom: '3px',
    color: '#555',
    fontSize: '14px',
  },
  infoValue: {
    color: '#2c3e50',
    fontSize: '15px',
  },
  
  // Prescription Form
  prescriptionSection: {
    backgroundColor: '#fff',
    padding: '15px',
    borderRadius: '6px',
    marginBottom: '20px',
    border: '1px solid #e0e0e0',
  },
  formGroup: {
    marginBottom: '15px',
  },
  formLabel: {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold',
    color: '#333',
  },
  formInput: {
    width: '100%',
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    fontSize: '14px',
    boxSizing: 'border-box',
  },
  formTextarea: {
    width: '100%',
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    fontSize: '14px',
    boxSizing: 'border-box',
    minHeight: '100px',
    resize: 'vertical',
  },
  formActions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '15px',
    marginTop: '20px',
  },
  cancelFormButton: {
    padding: '10px 20px',
    backgroundColor: '#95a5a6',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  submitFormButton: {
    padding: '10px 20px',
    backgroundColor: '#9b59b6',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 'bold',
  },
};

export default PrescriptionForm;