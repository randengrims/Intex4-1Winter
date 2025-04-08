import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import AdminMoviesPage from './pages/AdminMoviesPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import HomePage from './pages/HomePage';

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path='/' element={<LandingPage />} />
        <Route path='/' element={<LoginPage />} /> */}
        <Route path='/adminmovies' element={<AdminMoviesPage />} />
        <Route
          path='/privacypolicy'
          element={
            <div className='max-w-4xl px-4 py-12 text-left'>
              <PrivacyPolicyPage />
            </div>
          }
        />
        <Route path='/HomePage' element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;