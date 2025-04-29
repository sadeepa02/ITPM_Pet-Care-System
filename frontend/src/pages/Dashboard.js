import React, { useState } from 'react';
import Navbar from '../components/Dashboard/NavbarComponent';
import Sidebar from '../components/Dashboard/Sidebar';
import Overview from '../components/Dashboard/OverviewComponent';
import Appointments from '../components/Dashboard/Appointments';
import Doctors from '../components/Dashboard/Doctors';
import Settings from '../components/Dashboard/Settings';

const Dashboard = () => {
  const [activePage, setActivePage] = useState('overview');

  const renderContent = () => {
    switch (activePage) {
      case 'overview':
        return <Overview />;
      case 'appointments':
        return <Appointments />;
      case 'doctors':
        return <Doctors />;
      case 'settings':
        return <Settings />;
      default:
        return <Overview />;
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f5f7fa',
    }}>
      <Navbar />
      
      <div style={{
        display: 'flex',
        flex: 1,
        overflow: 'hidden',
      }}>
        <Sidebar activePage={activePage} setActivePage={setActivePage} />
        
        <main style={{
          flex: 1,
          padding: '24px',
          overflowY: 'auto',
        }}>
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;