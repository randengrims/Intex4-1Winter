import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './PublicHeader.css';

const PublicHeader: React.FC = () => {
  const location = useLocation(); // Get current route
  const isLandingPage = location.pathname === '/'; // Render button only on '/' route
  const navigate = useNavigate(); // Hook to navigate programmatically

  const handleSignInClick = () => {
    navigate('/login'); // Programmatically navigate to /login page
  };

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
        {isLandingPage && (
          <div className='col text-end'>
            <button
              className='btn-goldenrod'
              onClick={handleSignInClick} // Trigger navigation on click
            >
              Sign In
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default PublicHeader;