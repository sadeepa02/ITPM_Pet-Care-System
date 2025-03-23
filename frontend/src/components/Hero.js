import React, { useState, useEffect } from 'react';

const HeroSection = ({ 
  images = [
    '/images/hero-carousel-1.jpg',
    '/images/hero-carousel-2.jpg',
    '/images/hero-carousel-3.jpg'
  ],
  autoSlideInterval = 5000 // 5 seconds
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-slide functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, autoSlideInterval);
    
    return () => clearInterval(timer);
  }, [images.length, autoSlideInterval]);

  // Manual slide navigation
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Go to next slide
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };

  // Go to previous slide
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  // Hero section styles
  const heroStyle = {
    // position: 'relative',
    height: '500px',
    backgroundImage: `url(${images[currentSlide]})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background-image 0.5s ease-in-out'
  };

  // Text overlay styles
  const overlayStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    padding: '40px',
    maxWidth: '800px',
    textAlign: 'center',
    borderRadius: '5px',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
  };

  // Pagination dots styles
  const paginationStyle = {
    position: 'absolute',
    bottom: '20px',
    textAlign: 'center',
    width: '100%',
    zIndex: 2
  };

  // Navigation arrow styles
  const arrowStyle = {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    backgroundColor: 'rgba(78, 205, 196, 0.7)',
    color: 'white',
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    fontSize: '24px',
    cursor: 'pointer',
    zIndex: 2,
    border: 'none'
  };

  return (
    <div style={heroStyle}>
      {/* Left arrow */}
      <button 
        style={{ ...arrowStyle, left: '20px' }}
        onClick={prevSlide}
        aria-label="Previous slide"
      >
        &#10094;
      </button>
      
      {/* Content overlay */}
      <div style={overlayStyle}>
        <h2 style={{ fontSize: '32px', color: '#333', marginBottom: '20px' }}>Caring for Your Pet's Health</h2>
        <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#555', marginBottom: '20px' }}>
          We provide comprehensive veterinary care with a focus on preventative medicine, 
          surgical services, and dental care. Our team of experienced professionals is dedicated 
          to the health and wellbeing of your beloved pets.
        </p>
        <button style={{ 
          backgroundColor: '#4ECDC4', 
          color: 'white', 
          border: 'none',
          padding: '10px 25px',
          borderRadius: '5px',
          fontSize: '16px',
          cursor: 'pointer',
          transition: 'background-color 0.3s'
        }}>
          Read More
        </button>
      </div>
      
      {/* Right arrow */}
      <button 
        style={{ ...arrowStyle, right: '20px' }}
        onClick={nextSlide}
        aria-label="Next slide"
      >
        &#10095;
      </button>
      
      {/* Pagination dots */}
      <div style={paginationStyle}>
        {images.map((_, index) => (
          <span 
            key={index}
            onClick={() => goToSlide(index)}
            style={{
              height: '10px',
              width: '10px',
              backgroundColor: currentSlide === index ? '#4ECDC4' : 'white',
              borderRadius: '50%',
              display: 'inline-block',
              margin: '0 5px',
              cursor: 'pointer',
              transition: 'background-color 0.3s'
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSection;