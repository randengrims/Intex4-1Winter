import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';
import PublicHeader from '../components/PublicHeader';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errorVisible, setErrorVisible] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your login logic here
    setErrorVisible(true);
    setTimeout(() => setErrorVisible(false), 3000);
  };

  return (
    <div className="login-body">
      <PublicHeader />
      <div className="login-container">
        <div className="login-form-wrapper">
          <h2>Sign In</h2>
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email or phone number"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
            </div>
            <button type="submit" className="login-btn">
              Sign In
            </button>
            <div className="remember-me">
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label htmlFor="remember">Remember me</label>
            </div>
            <p className="help-text">
              Need help?{' '}
              <a href="#" className="signup-link">
                Sign up now
              </a>
            </p>
          </form>
          <p className={`error ${errorVisible ? 'opacity-100' : 'opacity-0'}`}>
            Invalid email or password. Please try again.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
