import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import AdminMoviesPage from './pages/AdminMoviesPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import HomePage from './pages/HomePage';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import Footer from './components/Footer'; // Import Footer component
import SignUpPage from './pages/SignUpPage';

function App() {
  return (
    <Router>
      <div className='main-content'>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/adminmovies' element={<AdminMoviesPage />} />
          <Route
            path='/privacypolicy'
            element={
              <div className='max-w-4xl px-4 py-12 text-left'>
                <PrivacyPolicyPage />
              </div>
            }
          />
          <Route path='/sign-up' element={<SignUpPage />} />
          <Route path='/HomePage' element={<HomePage />} />
        </Routes>
      </div>
      {/* Footer */}
      <Footer />
    </Router>
  );
}

export default App;
