import React from 'react';
import './Footer.css'; // Import the Footer CSS file

const Footer: React.FC = () => {
  return (
    <footer className='footer'>
      <div className='footer-content'>
        <p>© 2025 MovieINTEX. All rights reserved.</p>
        <div className='footer-links'>
          <a href='/privacypolicy' className='footer-link'>
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
