import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import logo from '../image/FurryNest.png';

const Footer = () => {
  return (
    <footer style={{
      backgroundColor: '#333',
      color: '#fff',
      padding: '3rem 0 1rem'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
      }}>
        <div style={{
          flex: '1 1 300px',
          margin: '1rem'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '1rem'
          }}>
            <img src={logo} alt="Medico Logo" style={{
              height: '35px',
              marginRight: '0.5rem'
            }} />
            <span style={{
              color: '#fff',
              fontWeight: 700,
              fontSize: '1.5rem'
            }}>FURRYNEST</span>
          </div>
          <p style={{ lineHeight: '1.6', color: '#bbb' }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <div style={{
            display: 'flex',
            marginTop: '1.5rem'
          }}>
            <a href="#" style={{
              backgroundColor: '#1abc9c',
              color: '#fff',
              width: '35px',
              height: '35px',
              borderRadius: '50%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: '0.8rem'
            }}>
              <FaFacebookF />
            </a>
            <a href="#" style={{
              backgroundColor: '#1abc9c',
              color: '#fff',
              width: '35px',
              height: '35px',
              borderRadius: '50%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: '0.8rem'
            }}>
              <FaTwitter />
            </a>
            <a href="#" style={{
              backgroundColor: '#1abc9c',
              color: '#fff',
              width: '35px',
              height: '35px',
              borderRadius: '50%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: '0.8rem'
            }}>
              <FaInstagram />
            </a>
            <a href="#" style={{
              backgroundColor: '#1abc9c',
              color: '#fff',
              width: '35px',
              height: '35px',
              borderRadius: '50%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <FaLinkedinIn />
            </a>
          </div>
        </div>
        
        <div style={{
          flex: '1 1 200px',
          margin: '1rem'
        }}>
          <h3 style={{
            fontSize: '1.2rem',
            marginBottom: '1.2rem',
            position: 'relative',
            paddingBottom: '0.5rem'
          }}>Useful Links</h3>
          <ul style={{
            listStyle: 'none',
            padding: 0,
            margin: 0
          }}>
            <li style={{ marginBottom: '0.8rem' }}>
              <a href="#" style={{
                color: '#bbb',
                textDecoration: 'none',
                transition: 'color 0.3s'
              }}>Home</a>
            </li>
            <li style={{ marginBottom: '0.8rem' }}>
              <a href="#" style={{
                color: '#bbb',
                textDecoration: 'none',
                transition: 'color 0.3s'
              }}>About Us</a>
            </li>
            <li style={{ marginBottom: '0.8rem' }}>
              <a href="#" style={{
                color: '#bbb',
                textDecoration: 'none',
                transition: 'color 0.3s'
              }}>Services</a>
            </li>
            <li style={{ marginBottom: '0.8rem' }}>
              <a href="#" style={{
                color: '#bbb',
                textDecoration: 'none',
                transition: 'color 0.3s'
              }}>Terms of service</a>
            </li>
            <li style={{ marginBottom: '0.8rem' }}>
              <a href="#" style={{
                color: '#bbb',
                textDecoration: 'none',
                transition: 'color 0.3s'
              }}>Privacy policy</a>
            </li>
          </ul>
        </div>
        
        <div style={{
          flex: '1 1 300px',
          margin: '1rem'
        }}>
          <h3 style={{
            fontSize: '1.2rem',
            marginBottom: '1.2rem',
            position: 'relative',
            paddingBottom: '0.5rem'
          }}>Contact Us</h3>
          <p style={{ marginBottom: '0.8rem', color: '#bbb' }}>
            123 Healthcare St., Medical District
            <br />
            New York, NY 10012
          </p>
          <p style={{ marginBottom: '0.8rem', color: '#bbb' }}>
            <strong>Phone:</strong> +1 234 567 8900
          </p>
          <p style={{ marginBottom: '0.8rem', color: '#bbb' }}>
            <strong>Email:</strong> info@medico.com
          </p>
        </div>
      </div>
      
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        textAlign: 'center',
        paddingTop: '2rem',
        borderTop: '1px solid #444',
        marginTop: '2rem'
      }}>
        <p style={{ color: '#bbb' }}>
          © {new Date().getFullYear()} <span style={{ color: '#1abc9c' }}>FURRYNEST</span>. All Rights Reserved
        </p>
        <p style={{ 
          fontSize: '0.8rem', 
          color: '#777',
          marginTop: '0.5rem'
        }}>
          Designed with care for your healthcare needs
        </p>
      </div>
    </footer>
  );
};

export default Footer;