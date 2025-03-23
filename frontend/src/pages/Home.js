import React from 'react';

function Home() {
  const styles = {
    container: {
      fontFamily: "'Arial', sans-serif",
      color: '#333',
    },
    nav: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '20px 50px',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      position: 'fixed',
      width: '100%',
      top: 0,
      zIndex: 1000,
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    },
    logo: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#007bff',
    },
    navLinks: {
      display: 'flex',
      gap: '30px',
    },
    navLink: {
      textDecoration: 'none',
      color: '#333',
      fontWeight: '500',
      transition: 'color 0.3s ease',
    },
    hero: {
      height: '100vh',
      background: 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url("https://images.unsplash.com/photo-1583512603805-3cc6b41f3edb")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      color: 'white',
      paddingTop: '80px',
    },
    heroContent: {
      maxWidth: '800px',
      padding: '20px',
    },
    section: {
      padding: '80px 20px',
    },
    sectionDark: {
      backgroundColor: '#f8f9fa',
    },
    gridContainer: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '30px',
      maxWidth: '1200px',
      margin: '0 auto',
    },
    serviceCard: {
      backgroundColor: 'white',
      borderRadius: '10px',
      padding: '30px',
      boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
      transition: 'transform 0.3s ease',
      textAlign: 'center',
    },
    icon: {
      fontSize: '40px',
      color: '#007bff',
      marginBottom: '20px',
    },
    button: {
      backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      padding: '15px 30px',
      borderRadius: '25px',
      fontSize: '16px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      textTransform: 'uppercase',
      fontWeight: 'bold',
    },
    contactForm: {
      maxWidth: '600px',
      margin: '0 auto',
      backgroundColor: 'white',
      padding: '40px',
      borderRadius: '10px',
      boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
    },
    input: {
      width: '100%',
      padding: '12px',
      margin: '10px 0',
      border: '1px solid #ddd',
      borderRadius: '5px',
      fontSize: '16px',
    },
    footer: {
      backgroundColor: '#333',
      color: 'white',
      padding: '40px 20px',
      textAlign: 'center',
    },
  };

  return (
    <div style={styles.container}>
      {/* Navigation */}
      <nav style={styles.nav}>
        <div style={styles.logo}>PetCare</div>
        <div style={styles.navLinks}>
          <a href="#home" style={styles.navLink}>Home</a>
          <a href="#services" style={styles.navLink}>Services</a>
          <a href="#about" style={styles.navLink}>About</a>
          <a href="#contact" style={styles.navLink}>Contact</a>
        </div>
      </nav>
      {/* Hero Section */}
      <section style={styles.hero} id="home">
        <div style={styles.heroContent}>
          <h1 style={{ fontSize: '48px', marginBottom: '20px' }}>Premium Care for Your Beloved Pets</h1>
          <p style={{ fontSize: '20px', marginBottom: '30px' }}>24/7 Veterinary Services & Emergency Care</p>
          <button 
            style={styles.button}
            onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
            onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
          >
            Book Appointment
          </button>
        </div>
      </section>

      {/* Services Section */}
      <section style={{ ...styles.section, ...styles.sectionDark }} id="services">
        <h2 style={{ textAlign: 'center', fontSize: '36px', marginBottom: '50px' }}>Our Services</h2>
        <div style={styles.gridContainer}>
          {['Veterinary Care', 'Grooming', 'Boarding', 'Training'].map((service, index) => (
            <div 
              key={index}
              style={styles.serviceCard}
              onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-10px)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'none'}
            >
              <div style={styles.icon}>🐾</div>
              <h3 style={{ marginBottom: '15px' }}>{service}</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section style={styles.section} id="contact">
        <h2 style={{ textAlign: 'center', fontSize: '36px', marginBottom: '50px' }}>Contact Us</h2>
        <div style={styles.contactForm}>
          <input type="text" placeholder="Your Name" style={styles.input} />
          <input type="email" placeholder="Your Email" style={styles.input} />
          <textarea placeholder="Your Message" rows="5" style={styles.input}></textarea>
          <button 
            style={styles.button}
            onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
          >
            Send Message
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <p>© 2023 PetCare. All rights reserved.</p>
        <div style={{ marginTop: '20px' }}>
          {['facebook', 'twitter', 'instagram'].map((social, index) => (
            <a 
              key={index}
              href={`#${social}`} 
              style={{ 
                color: 'white', 
                margin: '0 10px', 
                textDecoration: 'none',
                transition: 'color 0.3s ease'
              }}
              onMouseOver={(e) => e.target.style.color = '#007bff'}
              onMouseOut={(e) => e.target.style.color = 'white'}
            >
              {social.charAt(0).toUpperCase() + social.slice(1)}
            </a>
          ))}
        </div>
      </footer>
    </div>
  );
}

export default Home;