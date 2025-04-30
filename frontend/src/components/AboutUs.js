import React from 'react';

const AboutUs = () => {
  return (
    <section id="about" style={{ padding: '60px 0', backgroundColor: '#f8f8f8' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        <h2 style={{ 
          textAlign: 'center', 
          color: '#555', 
          fontSize: '32px', 
          marginBottom: '15px' 
        }}>
          About Us
        </h2>
        <div style={{ 
          width: '70px', 
          height: '3px', 
          backgroundColor: '#4ECDC4', 
          margin: '0 auto 30px' 
        }}></div>
        
        <p style={{ 
          textAlign: 'center', 
          color: '#555', 
          fontSize: '16px', 
          lineHeight: '1.6', 
          maxWidth: '800px', 
          margin: '0 auto 50px' 
        }}>
          We are a dedicated team of veterinary professionals committed to providing the highest quality care for your beloved pets.
        </p>
        
        <div style={{ 
          display: 'flex', 
          flexDirection: 'row', 
          gap: '30px', 
          alignItems: 'center' 
        }}>
          <div style={{ width: '50%' }}>
            <img 
              src="/images/Aboutus.jpg" 
              alt="Pet Care Clinic" 
              style={{ 
                width: '100%', 
                height: 'auto', 
                borderRadius: '5px',
                boxShadow: '0 4px 10px rgba(0,0,0,0.1)' 
              }}
            />
            
          </div>
          
          <div style={{ width: '50%' }}>
            <h3 style={{ 
              fontSize: '24px', 
              color: '#444', 
              marginBottom: '20px' 
            }}>
              Committed to Excellence in Pet Care
            </h3>
            <p style={{ 
              fontSize: '16px', 
              color: '#666', 
              lineHeight: '1.6', 
              fontStyle: 'italic', 
              marginBottom: '20px' 
            }}>
              Our mission is to provide comprehensive, high-quality veterinary services and to educate pet owners on the best care practices for their animals.
            </p>
            
            <ul style={{ padding: '0', listStyle: 'none' }}>
              <li style={{ 
                display: 'flex', 
                alignItems: 'center', 
                marginBottom: '15px' 
              }}>
                <span style={{ 
                  color: '#4ECDC4', 
                  marginRight: '10px' 
                }}>✓</span>
                <span>Experienced team of veterinarians and pet care specialists</span>
              </li>
              <li style={{ 
                display: 'flex', 
                alignItems: 'center', 
                marginBottom: '15px' 
              }}>
                <span style={{ 
                  color: '#4ECDC4', 
                  marginRight: '10px' 
                }}>✓</span>
                <span>State-of-the-art equipment and facilities for advanced diagnostics</span>
              </li>
              <li style={{ 
                display: 'flex', 
                alignItems: 'center', 
                marginBottom: '15px' 
              }}>
                <span style={{ 
                  color: '#4ECDC4', 
                  marginRight: '10px' 
                }}>✓</span>
                <span>Compassionate and personalized care for each animal patient</span>
              </li>
            </ul>
            
            <p style={{ 
              fontSize: '16px', 
              color: '#666', 
              lineHeight: '1.6', 
              marginTop: '20px' 
            }}>
              We believe in building long-term relationships with our clients and their pets, providing care through all stages of your pet's life. From routine check-ups to emergency services, we're here when you need us most.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;