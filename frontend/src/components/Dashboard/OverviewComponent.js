import React from 'react';
import CalendarSummary from './CalendarSummary';

const Overview = () => {
  const stats = [
    {
      title: 'Total Patients',
      value: '2,845',
      change: '+12.5%',
      positive: true,
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4299e1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      )
    },
    {
      title: 'Appointments',
      value: '145',
      change: '+3.8%',
      positive: true,
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4c51bf" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="16" y1="2" x2="16" y2="6"></line>
          <line x1="8" y1="2" x2="8" y2="6"></line>
          <line x1="3" y1="10" x2="21" y2="10"></line>
        </svg>
      )
    }
  ];

  return (
    <div style={{ padding: '20px', marginLeft: '250px' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '24px', color: '#2d3748' }}>Dashboard Overview</h2>

      {/* Stats Section */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '24px' }}>
        {stats.map((stat, index) => (
          <div key={index} style={{ backgroundColor: '#ffffff', borderRadius: '8px', padding: '24px', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ marginRight: '16px', width: '48px', height: '48px', borderRadius: '12px', backgroundColor: '#ebf4ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {stat.icon}
              </div>
              <div>
                <p style={{ margin: '0 0 4px 0', fontSize: '14px', color: '#718096' }}>{stat.title}</p>
                <h3 style={{ margin: 0, fontSize: '24px', fontWeight: 600, color: '#2d3748' }}>{stat.value}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Calendar Summary Section */}
      <div style={{ marginTop: '40px', backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' }}>
        <CalendarSummary />
      </div>
    </div>
  );
};

export default Overview;
