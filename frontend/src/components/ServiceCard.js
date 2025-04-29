import React from 'react';

const ServiceCard = ({ icon, title, description }) => {
  return (
    <div style={{
      backgroundColor: 'white',
      padding: '30px',
      borderRadius: '5px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      width: '250px',
      textAlign: 'center'
    }}>
      <div style={{
        color: '#4ECDC4',
        fontSize: '40px',
        marginBottom: '15px'
      }}>
        {icon}
      </div>
      <h3 style={{ color: '#333', marginBottom: '15px' }}>{title}</h3>
      <p style={{ color: '#666', fontSize: '14px', lineHeight: '1.5' }}>
        {description}
      </p>
    </div>
  );
};

export default ServiceCard;