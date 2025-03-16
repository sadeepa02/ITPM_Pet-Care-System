import React from 'react';

const Footer = () => {
  return (
    <footer style={footerStyle}>
      <div style={footerContainerStyle}>
        <div style={footerSectionStyle}>
          <h4 style={footerTitleStyle}>About Us</h4>
          <p style={footerTextStyle}>We provide the best veterinary services for your beloved pets.</p>
        </div>
        <div style={footerSectionStyle}>
          <h4 style={footerTitleStyle}>Contact</h4>
          <p style={footerTextStyle}>Email: contact@petvet.com</p>
          <p style={footerTextStyle}>Phone: (123) 456-7890</p>
        </div>
        <div style={footerSectionStyle}>
          <h4 style={footerTitleStyle}>Follow Us</h4>
          <p style={footerTextStyle}>
            <a href="#" style={footerLinkStyle}>Facebook</a> | <a href="#" style={footerLinkStyle}>Twitter</a> | <a href="#" style={footerLinkStyle}>Instagram</a>
          </p>
        </div>
      </div>
      <div style={footerBottomStyle}>
        <p style={footerTextStyle}>© 2023 PetVet. All rights reserved.</p>
      </div>
    </footer>
  );
};

// Inline CSS styles
const footerStyle = {
  backgroundColor: '#2c3e50',
  color: 'white',
  padding: '2rem 0',
  textAlign: 'center'
};

const footerContainerStyle = {
  display: 'flex',
  justifyContent: 'space-around',
  maxWidth: '1200px',
  margin: '0 auto',
  flexWrap: 'wrap'
};

const footerSectionStyle = {
  flex: '1',
  minWidth: '200px',
  margin: '1rem'
};

const footerTitleStyle = {
  fontSize: '1.5rem',
  marginBottom: '1rem'
};

const footerTextStyle = {
  fontSize: '1rem',
  lineHeight: '1.6'
};

const footerLinkStyle = {
  color: 'white',
  textDecoration: 'none'
};

const footerBottomStyle = {
  borderTop: '1px solid #7f8c8d',
  paddingTop: '1rem',
  marginTop: '1rem'
};

export default Footer;
