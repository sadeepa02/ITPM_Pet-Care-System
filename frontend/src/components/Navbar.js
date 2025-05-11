import React, { useState } from 'react';
import AdminLoginForm from './AdminLoginForm';

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);
  const [showUserForm, setShowUserForm] = useState(false);
  const [showAdminForm, setShowAdminForm] = useState(false);
  const [showSignupForm, setShowSignupForm] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: '15px 20px', 
        borderBottom: '1px solid #eee',
        backgroundColor: 'white',
        position: 'sticky',
        top: 0,
        zIndex: 1000
      }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ 
            width: '40px', 
            height: '40px', 
            borderRadius: '50%', 
            background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4, #FFE66D)', 
            marginRight: '10px' 
          }}></div>
          <h1 style={{ color: '#333', margin: 0, fontSize: '24px' }}>PETCARE</h1>
        </div>
        <div style={{ display: 'flex', gap: '20px' }}>
          <button
            type="button"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setActiveSection('home');
            }}
            style={{ 
              background: 'none',
              border: 'none',
              padding: 0,
              color: activeSection === 'home' ? '#4ECDC4' : '#555',
              textDecoration: 'none',
              fontWeight: activeSection === 'home' ? 'bold' : 'normal',
              cursor: 'pointer'
            }}
          >
            HOME
          </button>
          <button
            type="button"
            onClick={() => {
              scrollToSection('about');
              setActiveSection('about');
            }}
            style={{ 
              background: 'none',
              border: 'none',
              padding: 0,
              color: activeSection === 'about' ? '#4ECDC4' : '#555',
              textDecoration: 'none',
              fontWeight: activeSection === 'about' ? 'bold' : 'normal',
              cursor: 'pointer'
            }}
          >
            ABOUT
          </button>
          <button
            type="button"
            onClick={() => {
              scrollToSection('services');
              setActiveSection('services');
            }}
            style={{ 
              background: 'none',
              border: 'none',
              padding: 0,
              color: activeSection === 'services' ? '#4ECDC4' : '#555',
              textDecoration: 'none',
              fontWeight: activeSection === 'services' ? 'bold' : 'normal',
              cursor: 'pointer'
            }}
          >
            SERVICES
          </button>
          <button
            type="button"
            onClick={() => {
              scrollToSection('doctors');
              setActiveSection('doctors');
            }}
            style={{ 
              background: 'none',
              border: 'none',
              padding: 0,
              color: activeSection === 'doctors' ? '#4ECDC4' : '#555',
              textDecoration: 'none',
              fontWeight: activeSection === 'doctors' ? 'bold' : 'normal',
              cursor: 'pointer'
            }}
          >
            DOCTORS
          </button>
          <button
            type="button"
            onClick={() => {
              scrollToSection('contact');
              setActiveSection('contact');
            }}
            style={{ 
              background: 'none',
              border: 'none',
              padding: 0,
              color: activeSection === 'contact' ? '#4ECDC4' : '#555',
              textDecoration: 'none',
              fontWeight: activeSection === 'contact' ? 'bold' : 'normal',
              cursor: 'pointer'
            }}
          >
            CONTACT
          </button>
          <button
            type="button"
            onClick={() => setShowModal(true)}
            style={{ 
              backgroundColor: '#4ECDC4', 
              color: 'white', 
              border: 'none', 
              padding: '10px 15px', 
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            LOGIN
          </button>
        </div>
      </nav>

      {showModal && (
        <div style={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%', 
          background: 'rgba(0, 0, 0, 0.5)', 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center' 
        }}>
          <div style={{ 
            background: 'white', 
            padding: '20px', 
            borderRadius: '10px', 
            textAlign: 'center', 
            width: '350px', 
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)' 
          }}>
            {!showUserForm && !showAdminForm && !showSignupForm ? (
              <>
                <h2>Login / Signup</h2>
                <button onClick={() => { setShowUserForm(true); setShowAdminForm(false); }} style={{ margin: '10px', padding: '10px', width: '100%', backgroundColor: '#4ECDC4', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>User Login / Signup</button>
                <button onClick={() => { setShowAdminForm(true); setShowUserForm(false); }} style={{ margin: '10px', padding: '10px', width: '100%', backgroundColor: '#FF6B6B', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Admin Login</button>
                <button onClick={() => setShowModal(false)} style={{ margin: '10px', padding: '10px', width: '100%', backgroundColor: '#ccc', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Close</button>
              </>
            ) : showUserForm ? (
              !showSignupForm ? (
                <>
                  <h2>User Login</h2>
                  <input type="text" placeholder="Email" style={{ width: '100%', padding: '8px', margin: '5px 0', borderRadius: '5px', border: '1px solid #ccc' }} />
                  <input type="password" placeholder="Password" style={{ width: '100%', padding: '8px', margin: '5px 0', borderRadius: '5px', border: '1px solid #ccc' }} />
                  <button style={{ margin: '10px', padding: '10px', width: '100%', backgroundColor: '#4ECDC4', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Login</button>
                  <button onClick={() => setShowSignupForm(true)} style={{ margin: '10px', padding: '10px', width: '100%', backgroundColor: '#FF6B6B', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Signup</button>
                  <button onClick={() => setShowModal(false)} style={{ margin: '10px', padding: '10px', width: '100%', backgroundColor: '#ccc', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Close</button>
                </>
              ) : (
                <>
                  <h2>User Signup</h2>
                  <form>
                    <input type="text" placeholder="Full Name" style={{ width: '100%', padding: '8px', margin: '5px 0', borderRadius: '5px', border: '1px solid #ccc' }} />
                    <input type="email" placeholder="Email" style={{ width: '100%', padding: '8px', margin: '5px 0', borderRadius: '5px', border: '1px solid #ccc' }} />
                    <input type="password" placeholder="Password" style={{ width: '100%', padding: '8px', margin: '5px 0', borderRadius: '5px', border: '1px solid #ccc' }} />
                    <input type="text" placeholder="Address" style={{ width: '100%', padding: '8px', margin: '5px 0', borderRadius: '5px', border: '1px solid #ccc' }} />
                    <button style={{ margin: '10px', padding: '10px', width: '100%', backgroundColor: '#4ECDC4', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Submit</button>
                    <button onClick={() => setShowModal(false)} style={{ margin: '10px', padding: '10px', width: '100%', backgroundColor: '#ccc', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Close</button>
                  </form>
                </>
              )
            ) : (
              showAdminForm && <AdminLoginForm onClose={() => setShowAdminForm(false)} />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;