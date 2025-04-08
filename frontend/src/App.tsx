import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import AdminMoviesPage from './pages/AdminMoviesPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';

function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* <Route path='/' element={<LandingPage />} />
          <Route path='/' element={<LoginPage />} /> */}
          <Route path='/adminmovies' element={<AdminMoviesPage />} />
          <Route path='/privacypolicy' element={<PrivacyPolicyPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App
