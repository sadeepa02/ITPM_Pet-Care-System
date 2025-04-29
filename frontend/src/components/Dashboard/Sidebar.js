import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Sidebar = ({ activePage, setActivePage }) => {
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = () => {
    setIsLoggingOut(true);
    
    // Simulate an API call or localStorage removal
    setTimeout(() => {
      try {
        localStorage.removeItem("token");
        localStorage.removeItem("adminData");
        
        Swal.fire({
          icon: 'success',
          title: 'Logged Out',
          text: 'You have successfully logged out.',
          timer: 2000,
          showConfirmButton: false
        }).then(() => {
          navigate('/');
        });
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Logout Failed',
          text: 'An error occurred while logging out.',
        });
      } finally {
        setIsLoggingOut(false);
      }
    }, 500);
  };

  return (
    <aside style={{ width: '250px', height: '100vh', backgroundColor: '#2c3e50', color: '#ecf0f1', padding: '20px 0', position: 'fixed', left: 0, top: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div>
        <div style={{ padding: '0 20px 20px 20px', borderBottom: '1px solid #34495e', marginBottom: '20px', textAlign: 'center' }}>
          <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#3498db' }}>MedDash</span>
        </div>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {['overview', 'appointments', 'doctors', 'settings'].map((page) => (
            <li
              key={page}
              style={{ padding: '15px 20px', cursor: 'pointer', backgroundColor: activePage === page ? '#34495e' : 'transparent', fontWeight: activePage === page ? 'bold' : 'normal' }}
              onClick={() => setActivePage(page)}
            >
              {page.charAt(0).toUpperCase() + page.slice(1)}
            </li>
          ))}
        </ul>
      </div>
      <div style={{ borderTop: '1px solid #34495e', padding: '15px 0', textAlign: 'center' }}>
        <button
          style={{ background: 'none', border: 'none', color: '#e74c3c', cursor: isLoggingOut ? 'default' : 'pointer', fontSize: '16px' }}
          onClick={isLoggingOut ? null : handleLogout}
        >
          {isLoggingOut ? 'Logging out...' : '🚪 Logout'}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
