import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const AdminLoginForm = ({ onClose }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await axios.post(
        "http://localhost:8070/api/admin/login", 
        { username, password }
      );
      
      // Store token and admin data in localStorage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("adminData", JSON.stringify(response.data.admin));

      console.log("Admin logged in successfully", response.data.token);
      
      // Show success message with SweetAlert2
      Swal.fire({
        title: 'Success!',
        text: 'Login successful. Redirecting to dashboard...',
        icon: 'success',
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false
      }).then(() => {
        // Redirect to admin dashboard
        navigate("/dashboard");
      });
      
    } catch (err) {
      // Show error message with SweetAlert2
      Swal.fire({
        title: 'Login Failed',
        text: err.response?.data?.message || "Login failed. Please try again.",
        icon: 'error',
        confirmButtonColor: '#d33',
        confirmButtonText: 'Try Again'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Admin Login</h2>
      
      <form onSubmit={handleLogin} style={styles.form}>
        <div style={styles.inputGroup}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
            disabled={loading}
            required
          />
        </div>
        
        <div style={styles.inputGroup}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            disabled={loading}
            required
          />
        </div>
        
        <button 
          type="submit" 
          style={{
            ...styles.button,
            opacity: loading ? 0.7 : 1,
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
          disabled={loading}
        >
          {loading ? (
            <div style={styles.loadingContainer}>
              <div style={styles.spinner}></div>
              <span>Logging in...</span>
            </div>
          ) : "Login"}
        </button>
        
        <button 
          type="button" 
          onClick={onClose} 
          style={styles.closeButton}
          disabled={loading}
        >
          Close
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '300px',
    padding: '20px',
    backgroundColor: '#f7f7f7',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  },
  header: {
    marginBottom: '20px',
    fontSize: '24px',
    color: '#333',
    fontWeight: 'bold',
  },
  form: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  inputGroup: {
    marginBottom: '15px',
    width: '100%',
  },
  input: {
    width: '100%',
    padding: '12px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    fontSize: '16px',
    outline: 'none',
    transition: 'border-color 0.3s',
    boxSizing: 'border-box',
  },
  button: {
    backgroundColor: '#007BFF',
    color: '#fff',
    padding: '12px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginBottom: '10px',
    fontSize: '16px',
    fontWeight: 'bold',
    transition: 'background-color 0.3s',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    backgroundColor: '#d9534f',
    color: '#fff',
    padding: '12px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginBottom: '10px',
    fontSize: '16px',
    fontWeight: 'bold',
    transition: 'background-color 0.3s',
  },
  loadingContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  spinner: {
    width: '18px',
    height: '18px',
    border: '3px solid rgba(255,255,255,0.3)',
    borderRadius: '50%',
    borderTop: '3px solid white',
    animation: 'spin 1s linear infinite',
    marginRight: '10px',
  },
  '@keyframes spin': {
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' },
  }
};

// Add global styles for the spinner animation
const GlobalStyles = () => {
  return (
    <style>{`
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `}</style>
  );
};

const AdminLoginFormWithStyles = (props) => (
  <>
    <GlobalStyles />
    <AdminLoginForm {...props} />
  </>
);

export default AdminLoginFormWithStyles;