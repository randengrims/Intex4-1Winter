import React, { useState } from 'react';
import './LoginPage.css';
import PublicHeader from '../components/PublicHeader';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorVisible, setErrorVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorVisible(false);
    setLoading(true);

    try {
      const response = await fetch('https://localhost:5000/auth/login', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, rememberMe: true }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      // Login successful
      navigate('/homepage'); // Change this route if needed
    } catch (error) {
      setErrorVisible(true);
      setTimeout(() => setErrorVisible(false), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='login-body'>
      <div className='login-container'>
        <PublicHeader />
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor='email' className='form-label'>
              Email
            </label>
            <input
              type='email'
              className='form-control'
              id='email'
              name='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete='email'
              placeholder='Enter your email'
              required
            />
          </div>

          <div className='mb-3'>
            <label htmlFor='password' className='form-label'>
              Password
            </label>
            <input
              type='password'
              className='form-control'
              id='password'
              name='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete='current-password'
              placeholder='Enter your password'
              required
            />
          </div>

          <button
            type='submit'
            className='btn-login btn-goldenrod'
            disabled={loading}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div className='social-buttons'>
          <button className='btn-social btn-google'>Sign In with Google</button>
          <button className='btn-social btn-facebook'>
            Sign In with Facebook
          </button>
        </div>

        <p className={`error ${errorVisible ? 'opacity-100' : 'opacity-0'}`}>
          Invalid credentials. Please try again.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
