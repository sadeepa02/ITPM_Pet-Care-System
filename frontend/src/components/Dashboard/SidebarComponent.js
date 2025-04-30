import React, { useState } from 'react';

const Sidebar = ({ activePage, setActivePage }) => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const menuItems = [
    {
      id: 'overview',
      label: 'Overview',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="7"></rect>
          <rect x="14" y="3" width="7" height="7"></rect>
          <rect x="14" y="14" width="7" height="7"></rect>
          <rect x="3" y="14" width="7" height="7"></rect>
        </svg>
      ),
    },
    {
      id: 'appointments',
      label: 'Appointments',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="16" y1="2" x2="16" y2="6"></line>
          <line x1="8" y1="2" x2="8" y2="6"></line>
          <line x1="3" y1="10" x2="21" y2="10"></line>
        </svg>
      ),
    },
    {
      id: 'doctors',
      label: 'Doctors',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
      ),
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3"></circle>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
        </svg>
      ),
    },
  ];

  // Loading spinner component
  const LoadingSpinner = () => (
    <svg 
      width="18" 
      height="18" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      style={{ animation: 'spin 1s linear infinite' }}
    >
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
      <circle cx="12" cy="12" r="10" strokeWidth="4" stroke="currentColor" strokeDasharray="30 50" />
    </svg>
  );

  // Handle logout function
  const handleLogout = () => {
    setIsLoggingOut(true);
    
    // Simulate a short delay for the loading effect
    setTimeout(() => {
      // Remove token and admin data from localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("adminData");
      
      // Redirect to login page
      window.location.href = "/login";
    }, 1000); // 1 second delay for visual feedback
  };

  return (
    <div style={{
      width: '240px',
      backgroundColor: '#ffffff',
      borderRight: '1px solid #e2e8f0',
      display: 'flex',
      flexDirection: 'column',
      padding: '24px 0',
    }}>
      <nav>
        <ul style={{
          listStyleType: 'none',
          padding: 0,
          margin: 0,
        }}>
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setActivePage(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  width: '100%',
                  padding: '12px 24px',
                  border: 'none',
                  background: activePage === item.id ? '#edf2f7' : 'transparent',
                  borderLeft: activePage === item.id ? '3px solid #4299e1' : '3px solid transparent',
                  color: activePage === item.id ? '#2d3748' : '#718096',
                  fontWeight: activePage === item.id ? 600 : 400,
                  fontSize: '14px',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                <span style={{ marginRight: '12px' }}>{item.icon}</span>
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div style={{
        marginTop: 'auto',
        padding: '16px 24px',
        borderTop: '1px solid #e2e8f0',
      }}>
        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            padding: '10px 16px',
            backgroundColor: isLoggingOut ? '#edf2f7' : '#f7fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '6px',
            color: '#4a5568',
            fontSize: '14px',
            fontWeight: 500,
            cursor: isLoggingOut ? 'default' : 'pointer',
            transition: 'all 0.2s',
            opacity: isLoggingOut ? 0.7 : 1,
          }}
          onMouseOver={(e) => {
            if (!isLoggingOut) {
              e.currentTarget.style.backgroundColor = '#edf2f7';
              e.currentTarget.style.borderColor = '#cbd5e0';
            }
          }}
          onMouseOut={(e) => {
            if (!isLoggingOut) {
              e.currentTarget.style.backgroundColor = '#f7fafc';
              e.currentTarget.style.borderColor = '#e2e8f0';
            }
          }}
        >
          {isLoggingOut ? (
            <>
              <span style={{ marginRight: '12px' }}><LoadingSpinner /></span>
              Logging out...
            </>
          ) : (
            <>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '12px' }}>
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
              Log out
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;