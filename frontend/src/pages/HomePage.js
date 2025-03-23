import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Emergency from '../components/Emergency';
import AboutUs from '../components/AboutUs';
import BackToTop from '../components/BackToTop';
import Footer from '../components/Footer';
import ServiceCards from '../components/ServiceCards';
import TopBar from '../components/TopBar';


const HomePage = () => {
  return (
    <div style={{ 
      fontFamily: 'Arial, sans-serif',
      margin: 0,
      padding: 0,
      boxSizing: 'border-box'
    }}>
      {/* Header with Logo <Header />*/}
      <TopBar/>
      
      {/* Navigation Bar */}
      <Navbar />
      
      {/* Hero Section with Slider */}
      <Hero />

      {/* About Us Section */}
      <AboutUs />

      <ServiceCards/>
      
      {/* Emergency Call-to-Action Section */}
      <Emergency />
      
      {/* Footer Component */}
      <Footer />
      
      {/* Back to Top Button */}
      <BackToTop />

     
    </div>
  );
};

export default HomePage;