import React from "react";
import b1 from "../images/b1.jpg";
import c1 from "../images/c1.jpg";
import c2 from "../images/c2.jpg";
import c3 from "../images/c3.jpg";
import c4 from "../images/c4.jpg";
import c5 from "../images/c5.jpg";
import c6 from "../images/c6.jpg";

const Services = () => {
  const services = [
    { 
      title: "Wellness Programs",
      description: "Preventive care and health maintenance for your companions",
      image: c1
    },
    {
      title: "Surgery & Treatment",
      description: "Advanced surgical procedures and disease management",
      image: c6
    },
    {
      title: "Diagnostic Imaging",
      description: "State-of-the-art X-Ray and Scan technologies",
      image: c3
    },
    {
      title: "Animal Dentistry",
      description: "Complete dental care for all companion animals",
      image: c4
    },
    {
      title: "Pain Management",
      description: "Comprehensive pain control strategies",
      image: c5
    },
    {
      title: "Anesthesia Services",
      description: "Advanced anesthesia monitoring and care",
      image: c2
    }
  ];

  return (
    <div style={containerStyle}>
      {/* Hero Image Section */}
      <div style={imageContainerStyle}>
        <img 
          src={b1} 
          alt="Happy pets at PetVet" 
          style={imageStyle}
        />
      </div>

      <div style={headerStyle}>
        <h1 style={titleStyle}>Animal Care</h1>
        <h2 style={subtitleStyle}>Our Services</h2>
        <div style={textWrapperStyle}>
          <p style={introTextStyle}>
            At PetVet, we believe our customers view their animal friends as extensions of their family. 
            This is why our suite of services, including wellness programmes and disease diagnosis and treatment, 
            are designed to connect, care and cure your companions.
          </p>
          <p style={introTextStyle}>
            We offer the following services for companion (including equines) and exotic animals. These include 
            wellness programs as well as disease diagnosis and treatment, including surgery, dentistry and 
            diagnostic imaging (X-Ray/Scan).
          </p>
        </div>
      </div>

      <div style={gridStyle}>
        {services.map((service, index) => (
          <div key={index} style={cardStyle}>
            <div style={cardImageContainerStyle}>
              <img src={service.image} alt={service.title} style={cardImageStyle} />
            </div>
            <h3 style={cardTitleStyle}>{service.title}</h3>
            <p style={cardTextStyle}>{service.description}</p>
            <button style={buttonStyle}>
              Book Appointment
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

// Styles
const containerStyle = {
  padding: '2rem',
  backgroundColor: '#f9f9f9',
  maxWidth: '1500px',
  margin: '0 auto'
};

const imageContainerStyle = {
  width: '100%',
  height: '600px',
  margin: '2rem 0',
  borderRadius: '15px',
  overflow: 'hidden',
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
};

const imageStyle = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  display: 'block'
};

const headerStyle = {
  textAlign: 'center',
  marginBottom: '2rem'
};

const titleStyle = {
  color: '#2c3e50',
  fontSize: '2.8rem',
  marginBottom: '0.5rem'
};

const subtitleStyle = {
  color: '#e74c3c',
  fontSize: '2rem',
  marginBottom: '1.5rem'
};

const textWrapperStyle = {
  maxWidth: '800px',
  margin: '0 auto'
};

const introTextStyle = {
  color: '#7f8c8d',
  fontSize: '1.1rem',
  lineHeight: '1.6',
  margin: '1rem 0'
};

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  gap: '1.5rem',
  margin: '2rem 0'
};

const cardStyle = {
  backgroundColor: 'white',
  padding: '0 0 1.5rem 0',
  borderRadius: '10px',
  boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
  transition: 'transform 0.3s ease',
  display: 'flex',
  flexDirection: 'column',
  minHeight: '450px',
  overflow: 'hidden',
  '&:hover': {
    transform: 'translateY(-5px)',
    '& img': {
      transform: 'scale(1.1)'
    }
  }
};

const cardImageContainerStyle = {
  width: '100%',
  height: '200px',
  overflow: 'hidden',
  borderRadius: '10px 10px 0 0',
  marginBottom: '1rem'
};

const cardImageStyle = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  transition: 'transform 0.3s ease'
};

const cardTitleStyle = {
  color: '#e74c3c',
  fontSize: '1.3rem',
  marginBottom: '1rem',
  padding: '0 1.5rem'
};

const cardTextStyle = {
  color: '#34495e',
  fontSize: '1rem',
  lineHeight: '1.5',
  flexGrow: 1,
  padding: '0 1.5rem'
};

const buttonStyle = {
  backgroundColor: '#e74c3c',
  color: 'white',
  padding: '12px 30px',
  fontSize: '1rem',
  borderRadius: '25px',
  border: 'none',
  cursor: 'pointer',
  margin: '1.5rem',
  transition: 'background-color 0.3s ease',
  fontWeight: 'bold',
  '&:hover': {
    backgroundColor: '#c0392b'
  }
};

export default Services;