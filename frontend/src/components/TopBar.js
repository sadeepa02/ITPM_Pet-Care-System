import React from 'react';

const TopBar = () => {
  return (
    <div style={{
      backgroundColor: '#4ECDC4',
      color: 'white',
      padding: '10px 0',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <div style={{ marginLeft: '20px', display: 'flex', alignItems: 'center' }}>
        <span style={{ marginRight: '5px' }}>⏱</span>
        <span>Monday - Saturday, 8AM to 8PM</span>
      </div>
      <div style={{ marginRight: '20px', display: 'flex', alignItems: 'center' }}>
        <span style={{ marginRight: '5px' }}>📱</span>
        <span>Call us now +1 555 123 4567</span>
      </div>
    </div>
  );
};

export default TopBar;