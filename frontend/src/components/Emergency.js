import React from 'react';

const Emergency = () => {
  return (
    <div style={{
      backgroundColor: '#1abc9c',
      padding: '2.5rem 0',
      color: '#fff',
      textAlign: 'center'
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        position: 'relative'
      }}>
        <h2 style={{
          fontSize: '2rem',
          marginBottom: '1.5rem'
        }}>In an emergency? Need help now?</h2>
        
        <p style={{
          fontSize: '1.1rem',
          marginBottom: '1.5rem',
          lineHeight: '1.6'
        }}>
          Our 24/7 emergency service is available for urgent pet care situations. 
        We understand that emergencies don't follow business hours, so our dedicated team 
        is always ready to provide immediate attention when your pet needs it most.
        </p>
        
        <div style={{
          position: 'absolute',
          right: '0',
          top: '50%',
          transform: 'translateY(-50%)'
        }}>
          <span style={{
            fontSize: '2rem',
            fontWeight: 'bold'
          }}>+</span>
        </div>
      </div>
    </div>
  );
};

export default Emergency;