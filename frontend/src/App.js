import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Dashboard from './pages/Dashboard';
import Services from './pages/services';
import Footer from './components/Footer';
import ServiceBooking1 from './pages/ServiceBooking1';
import BookingDetails1 from './pages/BokkingDetails1';

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  
  if (!token) {
    // Redirect to home page if no token exists
    return <Navigate to="/" replace />;
  }
  
  return children;
};

function App() {
  const [isLoading, setIsLoading] = useState(true);
  
  // Check authentication state on initial load
  useEffect(() => {
    // Short timeout to ensure localStorage is checked after hydration
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4000);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (isLoading) {
    // Optional: Show a loading indicator while checking auth state
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '18px'
      }}>
        Loading...
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<Services />} />
        <Route path="/servicebook" element={<ServiceBooking1 />} />
        <Route path="/bookingdetails" element={<BookingDetails1 />} />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
      </Routes>
      <Footer /> {/* Move Footer outside of Routes */}
    </Router>
  );
}

export default App;
