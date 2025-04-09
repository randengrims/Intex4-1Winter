import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './PublicHeader.css';

const PublicHeader: React.FC = () => {
  const location = useLocation(); // Get current route
  const isOnSpecialPage = ['/', '/login', '/privacypolicy'].includes(
    location.pathname,
  ); // Check if on LandingPage, LoginPage, or PrivacyPolicyPage
  const isLandingPage = location.pathname === '/'; // Only show sign-in button on LandingPage
  const navigate = useNavigate(); // Hook to navigate programmatically

  const handleSignInClick = () => {
    navigate('/login'); // Programmatically navigate to /login page
  };

  if (!isOnSpecialPage) {
    return null; // Do not render header on other pages
  }

  return (
    <header className='public-header bg-dark text-light'>
      <div className='row align-items-center justify-content-between container'>
        {/* Brand Logo */}
        <div className='col text-start'>
          <a
            href='/'
            className='fw-bold text-decoration-none fs-4 text-goldenrod'
          >
            CineNiche
          </a>
        </div>
        {/* Sign-In Button */}
        {/* The Sign-In button will only be shown on the LoginPage */}
        {isLandingPage && (
          <div className='col text-end'>
            <button className='btn-goldenrod' onClick={handleSignInClick}>
              Sign In
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default PublicHeader;
