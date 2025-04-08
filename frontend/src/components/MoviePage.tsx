import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Movie } from '../types/Movie';
import { fetchMovieById } from '../api/MoviesAPI';
const MoviePage = () => {
  const { show_id } = useParams<{ show_id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const loadMovie = async () => {
      try {
        setLoading(true);
        if (show_id) {
          const data = await fetchMovieById(show_id);
          setMovie(data);
        }
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    loadMovie();
  }, [show_id]);
  if (loading) return <p>Loading movie details...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (!movie) return <p>Movie not found.</p>;
  return (
    <div className="movie-page-container">
      <h2>{movie.title}</h2>
      <ul className="list-unstyled">
        <li><strong>Type:</strong> {movie.type}</li>
        <li><strong>Director:</strong> {movie.director}</li>
        <li><strong>Cast:</strong> {movie.cast}</li>
        <li><strong>Country:</strong> {movie.country}</li>
        <li><strong>Release Year:</strong> {movie.release_year}</li>
        <li><strong>Rating:</strong> {movie.rating}</li>
        <li><strong>Duration:</strong> {movie.duration}</li>
        <li><strong>Description:</strong> {movie.description}</li>
        <li><strong>Genres:</strong> {movie.genres}</li>
      </ul>
    </div>
  );
};
export default MoviePage;
3:06
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import AdminMoviesPage from './pages/AdminMoviesPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import HomePage from './pages/HomePage';
import MoviePage from './pages/MoviePage'
import CreateAccountPage from './pages/CreateAccountPage'; // adjust path as needed
function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* <Route path='/' element={<LandingPage />} />
          <Route path='/' element={<LoginPage />} /> */}
          <Route path='/adminmovies' element={<AdminMoviesPage />} />
          <Route path='/privacypolicy' element={<PrivacyPolicyPage />} />
          <Route path='/HomePage' element={<HomePage/>}/>
          <Route path="/movies/:show_id" element={<MoviePage />} />
          <Route path="/create-account" element={<CreateAccountPage />} />
        </Routes>
      </Router>
    </>
  );
}
export default App