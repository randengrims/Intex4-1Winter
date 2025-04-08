import React, { useState } from 'react';
import './LoginPage.css';

const LoginPage: React.FC = () => {
  const [errorVisible, setErrorVisible] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorVisible(true); // Show error message
    setTimeout(() => setErrorVisible(false), 3000); // Hide after 3 seconds
  };

  return (
    <div className='login-body'>
      <div className='login-container'>
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit}>
          {/* Email Field */}
          <div className='mb-3'>
            <label htmlFor='email' className='form-label'>
              Email
            </label>
            <input
              type='email'
              className='form-control'
              id='email'
              name='email'
              autoComplete='email'
              placeholder='Enter your email'
              required
            />
          </div>

          {/* Password Field */}
          <div className='mb-3'>
            <label htmlFor='password' className='form-label'>
              Password
            </label>
            <input
              type='password'
              className='form-control'
              id='password'
              name='password'
              autoComplete='current-password'
              placeholder='Enter your password'
              required
            />
          </div>

          {/* Submit Button */}
          <button type='submit' className='btn-login btn-goldenrod'>
            Sign In
          </button>
        </form>

        {/* Social Media Buttons Container */}
        <div className='social-buttons'>
          {/* Google Sign-In */}
          <button className='btn-social btn-google'>
            <span className='icon'>{/* Google icon can be added here */}</span>
            Sign In with Google
          </button>

          {/* Facebook Sign-In */}
          <button className='btn-social btn-facebook'>
            <span className='icon'>
              {/* Facebook icon can be added here */}
            </span>
            Sign In with Facebook
          </button>
        </div>

        {/* Error Message */}
        <p className={`error ${errorVisible ? 'opacity-100' : 'opacity-0'}`}>
          Invalid credentials. Please try again.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;