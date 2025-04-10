import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import './LandingPage.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const moviePosters = [
  '1 Chance 2 Dance.jpg',
  '2 Hearts.jpg',
  '3 Idiots.jpg',
  '4th Republic.jpg',
  '5 Star Christmas.jpg',
  '6 Bullets.jpg',
  '7 Seven.jpg',
  '9.jpg',
  '10 jours en or.jpg',
  '12 Years Promise.jpg',
  'How to Train Your Dragon 2.jpg',
  '14 Cameras.jpg',
  '15Aug.jpg',
  '16 Blocks.jpg',
  '17 Again.jpg',
  '18 Presents.jpg',
  '20th Century Women.jpg',
  'Avengers Infinity War.jpg',
  '22Jul.jpg',
  'Zoids Wild.jpg',
];

const LandingPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleGetStarted = () => {
    navigate('/sign-up', { state: { email } });
  };

  const settings = {
    infinite: true,
    speed: 2000,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: 'linear',
    pauseOnHover: true,
    focusOnSelect: true,
    draggable: true,
    swipeToSlide: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
        }
      }
    ]
  };

  return (
    <div className={`landing-page ${isVisible ? 'visible' : ''}`}>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-overlay" />
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">Stream Bold. Discover Niche.</h1>
            <p className="hero-subtitle">Your Home for Underrated Cinema</p>
          </div>
          <div className="cta-container">
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter your email"
              className="email-input"
              aria-label="Email address"
            />
            <button 
              className="cta-button"
              onClick={handleGetStarted}
              aria-label="Get Started"
            >
              Get Started
            </button>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="featured-section">
        <div className="featured-content">
          <h2 className="section-title">Featured Originals</h2>
          <Slider {...settings} className="movie-carousel">
            {moviePosters.map((poster, index) => (
              <div key={index} className="movie-slide">
                <img
                  src={`/MoviePosters/${poster}`}
                  alt={`Featured movie ${index + 1}`}
                  className="movie-poster"
                  loading="lazy"
                />
              </div>
            ))}
          </Slider>
        </div>
      </section>

      {/* Brand Section */}
      <section className="brand-section">
        <div className="brand-content">
          <h2 className="brand-title">CineNiche</h2>
          <p className="brand-tagline">Curated Cinema for the Discerning Viewer</p>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
