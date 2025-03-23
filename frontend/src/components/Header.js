import React from 'react';
import logo from '../image/FurryNest.png';

const Header = () => {
  return (
    <header style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0.8rem 2rem',
      backgroundColor: '#fff',
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      width: '100%'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center'
      }}>
        <img src={logo} alt="Medico Logo" style={{
          height: '40px',
          marginRight: '0.5rem'
        }} />
        <span style={{
          color: '#444',
          fontWeight: 700,
          fontSize: '1.5rem'
        }}>MEDICO</span>
      </div>
    </header>
  );
};

export default Header;