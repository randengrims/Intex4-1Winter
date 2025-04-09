import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Slider from 'react-slick';
import './LandingPage.css';
import PublicHeader from '../components/PublicHeader'; // Import your header component
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
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [email, setEmail] = useState('');
  const navigate = useNavigate(); // Hook for navigation

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleGetStarted = () => {
    // Navigate to the sign-up page, passing the email in state
    navigate('/sign-up', { state: { email } });
  };

  const faqs = [
    {
      question: 'How do I sign up?',
      answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
      question: 'What types of movies are available?',
      answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
      question: 'How does the recommendation system work?',
      answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
  ];

  const toggleFAQ = (index: number) => {
    setExpandedIndex(index === expandedIndex ? null : index);
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
  };

  return (
    <div className='landing-page container-fluid'>
      {/* Public Header */}
      <PublicHeader />

      {/* Hero Section */}
      <header className='hero bg-dark text-light'>
        <div className='hero-overlay' />
        <div className='hero-content text-center container'>
          <h1 className='display-4 fw-bold'>
            Unlimited movies, TV shows, and more.
          </h1>
          <p className='lead'>Watch anywhere. Cancel anytime.</p>
          <div className='cta d-flex justify-content-center mt-4'>
            <input
              type='email'
              value={email}
              onChange={handleEmailChange}
              placeholder='Email address'
              className='form-control me-2'
              style={{ maxWidth: '300px' }}
            />
            <button className='btn btn-danger' onClick={handleGetStarted}>
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* Carousel Section */}
      <section className='carousel-section bg-black py-5'>
        <div className='container text-light'>
          <h2 className='mb-4'>Featured Originals</h2>
          <Slider {...settings}>
            {moviePosters.map((poster, index) => (
              <div key={index} className='px-2'>
                <img
                  src={`/MoviePosters/${poster}`}
                  alt={`Movie Poster ${index + 1}`}
                  className='img-fluid rounded'
                />
              </div>
            ))}
          </Slider>
        </div>
      </section>

      {/* FAQ Section */}
      <section className='faq bg-light py-5'>
        <div className='container'>
          <h2 className='mb-4'>Frequently Asked Questions</h2>
          <div className='accordion'>
            {faqs.map((faq, index) => (
              <div key={index} className='faq-item mb-3'>
                <div
                  className='faq-question'
                  onClick={() => toggleFAQ(index)}
                  style={{
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    color: '#333',
                    backgroundColor: '#f8f9fa',
                    padding: '1rem',
                    borderRadius: '4px',
                  }}
                >
                  {faq.question}
                  <span style={{ float: 'right' }}>
                    {expandedIndex === index ? '-' : '+'}
                  </span>
                </div>
                {expandedIndex === index && (
                  <div
                    className='faq-answer'
                    style={{
                      backgroundColor: '#e9ecef',
                      marginTop: '0.5rem',
                      padding: '1rem',
                      borderRadius: '4px',
                    }}
                  >
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
