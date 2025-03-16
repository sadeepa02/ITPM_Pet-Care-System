import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'; // Import the Home component
import Services from './pages/services';
import Footer from './components/Footer';
import ServiceBooking1 from './pages/ServiceBooking1';
import BookingDetails1 from './pages/BokkingDetails1';

function App() {
  return (
    <div className="App">
     <Router>
      <Routes>
        <Route path="/" element={<Home />} /> {/* Add the Home route */}
        <Route path="/services" element={<Services />} />
        <Route path="/servicebook" element={<ServiceBooking1/>}/>
        <Route path="/bookingdetails" element={<BookingDetails1/>}/>
        
      </Routes>
     </Router>
     <Footer />
    </div>
  );
}

export default App;
