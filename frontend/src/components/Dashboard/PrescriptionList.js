/*import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const PrescriptionList = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch prescriptions from the API
  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const response = await fetch('http://localhost:8070/api/prescriptions');
        
        if (!response.ok) {
          throw new Error('Failed to fetch prescriptions');
        }
        
        const data = await response.json();
        setPrescriptions(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        Swal.fire('Error', 'Failed to load prescriptions', 'error');
      }
    };

    fetchPrescriptions();
  }, []);

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Delete prescription handler
  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#9b59b6',
        cancelButtonColor: '#95a5a6',
        confirmButtonText: 'Yes, delete it!'
      });
      
      if (result.isConfirmed) {
        // Updated DELETE endpoint to match your Express route
        const response = await fetch(`http://localhost:8070/api/prescriptions/${id}`, {
          method: 'DELETE'
        });
        
        if (!response.ok) {
          throw new Error('Failed to delete prescription');
        }
        
        // Remove the deleted prescription from state
        setPrescriptions(prescriptions.filter(prescription => prescription._id !== id));
        
        Swal.fire('Deleted!', 'Prescription has been deleted.', 'success');
      }
    } catch (err) {
      Swal.fire('Error', err.message, 'error');
    }
  };

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.loadingSpinner}></div>
        <p>Loading prescriptions...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.errorContainer}>
        <h2>Error</h2>
        <p>{error}</p>
        <Link to="/" style={styles.backLink}>Back to Dashboard</Link>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Prescription List</h1>
        <Link to="/" style={styles.backToButton}>
          Back to Dashboard
        </Link>
      </div>
      
      {prescriptions.length === 0 ? (
        <div style={styles.emptyState}>
          <p>No prescriptions found.</p>
        </div>
      ) : (
        <div style={styles.prescriptionList}>
          {prescriptions.map((prescription) => (
            <div key={prescription._id} style={styles.prescriptionCard}>
              <div style={styles.prescriptionHeader}>
                <h3 style={styles.petName}>{prescription.petName}</h3>
                <div style={styles.prescriptionActions}>
                  <Link 
                    to={`/prescriptions/${prescription._id}`} 
                    style={styles.viewButton}
                  >
                    View
                  </Link>
                  <button 
                    onClick={() => handleDelete(prescription._id)} 
                    style={styles.deleteButton}
                  >
                    Delete
                  </button>
                </div>
              </div>
              
              <div style={styles.prescriptionDetails}>
                <div style={styles.detailRow}>
                  <span style={styles.detailLabel}>Owner:</span>
                  <span style={styles.detailValue}>{prescription.ownerName}</span>
                </div>
                <div style={styles.detailRow}>
                  <span style={styles.detailLabel}>Doctor:</span>
                  <span style={styles.detailValue}>{prescription.doctorName}</span>
                </div>
                <div style={styles.detailRow}>
                  <span style={styles.detailLabel}>Medicine:</span>
                  <span style={styles.detailValue}>{prescription.medicine}</span>
                </div>
                <div style={styles.detailRow}>
                  <span style={styles.detailLabel}>Dosage:</span>
                  <span style={styles.detailValue}>{prescription.dosage}</span>
                </div>
                <div style={styles.detailRow}>
                  <span style={styles.detailLabel}>Duration:</span>
                  <span style={styles.detailValue}>{prescription.duration}</span>
                </div>
                <div style={styles.detailRow}>
                  <span style={styles.detailLabel}>Date:</span>
                  <span style={styles.detailValue}>
                    {formatDate(prescription.createdAt)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Styles for the PrescriptionList component
const styles = {
  container: {
    padding: '20px',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px',
    borderBottom: '2px solid #9b59b6',
    paddingBottom: '15px',
  },
  title: {
    color: '#2c3e50',
    margin: 0,
    fontSize: '28px',
  },
  backToButton: {
    backgroundColor: '#9b59b6',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '30px',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: 'bold',
    boxShadow: '0 4px 10px rgba(142, 68, 173, 0.3)',
    transition: 'all 0.3s ease',
  },
  prescriptionList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
    gap: '20px',
  },
  prescriptionCard: {
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    padding: '20px',
    backgroundColor: 'white',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  },
  prescriptionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '15px',
    borderBottom: '1px solid #eee',
    paddingBottom: '10px',
  },
  petName: {
    margin: 0,
    color: '#9b59b6',
    fontSize: '18px',
  },
  prescriptionActions: {
    display: 'flex',
    gap: '10px',
  },
  viewButton: {
    backgroundColor: '#3498db',
    color: 'white',
    padding: '6px 12px',
    borderRadius: '4px',
    textDecoration: 'none',
    fontSize: '12px',
    border: 'none',
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
    color: 'white',
    padding: '6px 12px',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '12px',
  },
  prescriptionDetails: {
    fontSize: '14px',
  },
  detailRow: {
    display: 'flex',
    margin: '8px 0',
  },
  detailLabel: {
    color: '#7f8c8d',
    width: '80px',
    fontWeight: 'bold',
  },
  detailValue: {
    color: '#2c3e50',
    flexGrow: 1,
  },
  emptyState: {
    textAlign: 'center',
    padding: '40px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    color: '#7f8c8d',
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '50vh',
    color: '#7f8c8d',
  },
  loadingSpinner: {
    border: '4px solid rgba(0, 0, 0, 0.1)',
    borderLeftColor: '#9b59b6',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    animation: 'spin 1s linear infinite',
    marginBottom: '15px',
  },
  errorContainer: {
    textAlign: 'center',
    padding: '40px',
    color: '#e74c3c',
  },
  backLink: {
    display: 'inline-block',
    marginTop: '20px',
    color: '#9b59b6',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
};

export default PrescriptionList;*/
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const PrescriptionList = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch prescriptions from the API
  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const response = await fetch('http://localhost:8070/api/prescriptions');
        
        if (!response.ok) {
          throw new Error('Failed to fetch prescriptions');
        }
        
        const data = await response.json();
        setPrescriptions(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        Swal.fire('Error', 'Failed to load prescriptions', 'error');
      }
    };

    fetchPrescriptions();
  }, []);

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Download all prescriptions as HTML with styled table
  const handleDownloadAll = () => {
    try {
      // Generate HTML with styled table
      let htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Pet Prescriptions List</title>
          <style>
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              margin: 0;
              padding: 20px;
              color: #333;
            }
            h1 {
              color: #9b59b6;
              text-align: center;
              margin-bottom: 20px;
              padding-bottom: 10px;
              border-bottom: 2px solid #9b59b6;
            }
            .date-generated {
              text-align: right;
              margin-bottom: 20px;
              font-style: italic;
              color: #7f8c8d;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 30px;
              box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
            }
            th, td {
              padding: 12px 15px;
              text-align: left;
              border-bottom: 1px solid #ddd;
            }
            th {
              background-color: #9b59b6;
              color: white;
              font-weight: bold;
              text-transform: uppercase;
              font-size: 0.9em;
            }
            tr:nth-child(even) {
              background-color: #f8f9fa;
            }
            tr:hover {
              background-color: #f1f1f1;
            }
            .footer {
              text-align: center;
              margin-top: 30px;
              padding-top: 10px;
              border-top: 1px solid #ddd;
              color: #7f8c8d;
              font-size: 0.9em;
            }
            @media print {
              body {
                padding: 0;
                margin: 0.5cm;
              }
              h1 {
                margin-top: 0;
              }
              .no-print {
                display: none;
              }
            }
            .print-button {
              display: block;
              width: 200px;
              margin: 20px auto;
              padding: 10px;
              background-color: #9b59b6;
              color: white;
              text-align: center;
              border: none;
              border-radius: 4px;
              cursor: pointer;
              font-size: 1em;
              text-decoration: none;
            }
          </style>
        </head>
        <body>
          <h1>Pet Prescriptions List</h1>
          <div class="date-generated">Generated on: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}</div>
          
          <table>
            <thead>
              <tr>
                <th>Pet Name</th>
                <th>Owner Name</th>
                <th>Doctor Name</th>
                <th>Medicine</th>
                <th>Dosage</th>
                <th>Duration</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
      `;

      // Add table rows
      prescriptions.forEach(prescription => {
        htmlContent += `
          <tr>
            <td>${prescription.petName || ''}</td>
            <td>${prescription.ownerName || ''}</td>
            <td>${prescription.doctorName || ''}</td>
            <td>${prescription.medicine || ''}</td>
            <td>${prescription.dosage || ''}</td>
            <td>${prescription.duration || ''}</td>
            <td>${formatDate(prescription.createdAt)}</td>
          </tr>
        `;
      });

      // Complete the HTML
      htmlContent += `
            </tbody>
          </table>
          
          <button class="print-button no-print" onclick="window.print()">Print Prescriptions</button>
          
          <div class="footer">
            <p>This is an automatically generated report. Total prescriptions: ${prescriptions.length}</p>
          </div>
          
        </body>
        </html>
      `;
      
      // Create a Blob with the HTML content
      const blob = new Blob([htmlContent], { type: 'text/html' });
      
      // Create a link element and trigger download
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', 'Pet_Prescriptions_List.html');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      Swal.fire('Success', 'Prescriptions data downloaded successfully. Open the HTML file to view and print.', 'success');
    } catch (err) {
      Swal.fire('Error', 'Failed to download prescriptions data', 'error');
    }
  };

  // Delete prescription handler
  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#9b59b6',
        cancelButtonColor: '#95a5a6',
        confirmButtonText: 'Yes, delete it!'
      });
      
      if (result.isConfirmed) {
        // Updated DELETE endpoint to match your Express route
        const response = await fetch(`http://localhost:8070/api/prescriptions/${id}`, {
          method: 'DELETE'
        });
        
        if (!response.ok) {
          throw new Error('Failed to delete prescription');
        }
        
        // Remove the deleted prescription from state
        setPrescriptions(prescriptions.filter(prescription => prescription._id !== id));
        
        Swal.fire('Deleted!', 'Prescription has been deleted.', 'success');
      }
    } catch (err) {
      Swal.fire('Error', err.message, 'error');
    }
  };

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.loadingSpinner}></div>
        <p>Loading prescriptions...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.errorContainer}>
        <h2>Error</h2>
        <p>{error}</p>
        <Link to="/dashboard" style={styles.backLink}>Back to Dashboard</Link>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Prescription List</h1>
        <div style={styles.headerActions}>
          <button 
            onClick={handleDownloadAll} 
            style={styles.downloadButton}
            disabled={prescriptions.length === 0}
          >
            Download All
          </button>
          <Link to="/" style={styles.backToButton}>
            Back to Dashboard
          </Link>
        </div>
      </div>
      
      {prescriptions.length === 0 ? (
        <div style={styles.emptyState}>
          <p>No prescriptions found.</p>
        </div>
      ) : (
        <div style={styles.prescriptionList}>
          {prescriptions.map((prescription) => (
            <div key={prescription._id} style={styles.prescriptionCard}>
              <div style={styles.prescriptionHeader}>
                <h3 style={styles.petName}>{prescription.petName}</h3>
                <div style={styles.prescriptionActions}>
                  <Link 
                    to={`/prescriptions/${prescription._id}`} 
                    style={styles.viewButton}
                  >
                    View
                  </Link>
                  <button 
                    onClick={() => handleDelete(prescription._id)} 
                    style={styles.deleteButton}
                  >
                    Delete
                  </button>
                </div>
              </div>
              
              <div style={styles.prescriptionDetails}>
                <div style={styles.detailRow}>
                  <span style={styles.detailLabel}>Owner:</span>
                  <span style={styles.detailValue}>{prescription.ownerName}</span>
                </div>
                <div style={styles.detailRow}>
                  <span style={styles.detailLabel}>Doctor:</span>
                  <span style={styles.detailValue}>{prescription.doctorName}</span>
                </div>
                <div style={styles.detailRow}>
                  <span style={styles.detailLabel}>Medicine:</span>
                  <span style={styles.detailValue}>{prescription.medicine}</span>
                </div>
                <div style={styles.detailRow}>
                  <span style={styles.detailLabel}>Dosage:</span>
                  <span style={styles.detailValue}>{prescription.dosage}</span>
                </div>
                <div style={styles.detailRow}>
                  <span style={styles.detailLabel}>Duration:</span>
                  <span style={styles.detailValue}>{prescription.duration}</span>
                </div>
                <div style={styles.detailRow}>
                  <span style={styles.detailLabel}>Date:</span>
                  <span style={styles.detailValue}>
                    {formatDate(prescription.createdAt)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Styles for the PrescriptionList component
const styles = {
  container: {
    padding: '20px',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px',
    borderBottom: '2px solid #9b59b6',
    paddingBottom: '15px',
  },
  title: {
    color: '#2c3e50',
    margin: 0,
    fontSize: '28px',
  },
  headerActions: {
    display: 'flex',
    gap: '15px',
    alignItems: 'center',
  },
  backToButton: {
    backgroundColor: '#9b59b6',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '30px',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: 'bold',
    boxShadow: '0 4px 10px rgba(142, 68, 173, 0.3)',
    transition: 'all 0.3s ease',
  },
  downloadButton: {
    backgroundColor: '#27ae60',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '30px',
    border: 'none',
    fontSize: '14px',
    fontWeight: 'bold',
    cursor: 'pointer',
    boxShadow: '0 4px 10px rgba(39, 174, 96, 0.3)',
    transition: 'all 0.3s ease',
  },
  prescriptionList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
    gap: '20px',
  },
  prescriptionCard: {
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    padding: '20px',
    backgroundColor: 'white',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  },
  prescriptionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '15px',
    borderBottom: '1px solid #eee',
    paddingBottom: '10px',
  },
  petName: {
    margin: 0,
    color: '#9b59b6',
    fontSize: '18px',
  },
  prescriptionActions: {
    display: 'flex',
    gap: '10px',
  },
  viewButton: {
    backgroundColor: '#3498db',
    color: 'white',
    padding: '6px 12px',
    borderRadius: '4px',
    textDecoration: 'none',
    fontSize: '12px',
    border: 'none',
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
    color: 'white',
    padding: '6px 12px',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '12px',
  },
  prescriptionDetails: {
    fontSize: '14px',
  },
  detailRow: {
    display: 'flex',
    margin: '8px 0',
  },
  detailLabel: {
    color: '#7f8c8d',
    width: '80px',
    fontWeight: 'bold',
  },
  detailValue: {
    color: '#2c3e50',
    flexGrow: 1,
  },
  emptyState: {
    textAlign: 'center',
    padding: '40px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    color: '#7f8c8d',
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '50vh',
    color: '#7f8c8d',
  },
  loadingSpinner: {
    border: '4px solid rgba(0, 0, 0, 0.1)',
    borderLeftColor: '#9b59b6',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    animation: 'spin 1s linear infinite',
    marginBottom: '15px',
  },
  errorContainer: {
    textAlign: 'center',
    padding: '40px',
    color: '#e74c3c',
  },
  backLink: {
    display: 'inline-block',
    marginTop: '20px',
    color: '#9b59b6',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
};

export default PrescriptionList;