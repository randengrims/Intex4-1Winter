import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import './App.css';

import AdminLayout from './components/AdminLayout';
import AdminMoviesPage from './pages/AdminMoviesPage';
import AdminUsersPage from './pages/AdminUsersPage'; // ✅ Make sure this exists
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import HomePage from './pages/HomePage';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import Footer from './components/Footer';

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  return (
    <div data-theme={theme}>
      <Router>
        <div className='main-content'>
          <Routes>
            <Route path='/' element={<LandingPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/sign-up' element={<SignUpPage />} />
            <Route path='/HomePage' element={<HomePage />} />
            <Route
              path='/privacypolicy'
              element={
                <div className='max-w-4xl px-4 py-12 text-left'>
                  <PrivacyPolicyPage />
                </div>
              }
            />
            <Route
              path='/admin/movies'
              element={
                <AdminLayout theme={theme} setTheme={setTheme}>
                  <AdminMoviesPage />
                </AdminLayout>
              }
            />
            <Route
              path='/admin/users'
              element={
                <AdminLayout theme={theme} setTheme={setTheme}>
                  <AdminUsersPage />
                </AdminLayout>
              }
            />
          </Routes>
        </div>

        {/* Footer */}
        <Footer />
      </Router>
    </div>
  );
}

export default App;
