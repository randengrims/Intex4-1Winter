import { useEffect, useRef, useState } from 'react';
import { Movie } from '../types/Movie';
import { fetchMovies, deleteMovie } from '../api/MoviesAPI';
import Pagination from '../components/pagination';
import NewMovieForm from '../components/NewMovieForm';
import EditMovieForm from '../components/EditMovieForm';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import '../components/admin-styles/admin-layout.css';

interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error';
}

const AdminMoviesPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [showForm, setShowForm] = useState(false);
  const [editingMovie, setEditingMovie] = useState<Movie | null>(null);
  const [expandedRowId, setExpandedRowId] = useState<string | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const editFormRef = useRef<HTMLDivElement>(null);
  const toastTimeoutRef = useRef<number | undefined>(undefined);

  const addToast = (message: string, type: 'success' | 'error') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);

    if (toastTimeoutRef.current) {
      window.clearTimeout(toastTimeoutRef.current);
    }

    toastTimeoutRef.current = window.setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 3000);
  };

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const data = await fetchMovies(pageSize, pageNum, [], '');
        setMovies(data.movies);
        setTotalPages(Math.ceil(data.totalNumMovies / pageSize));
      } catch (err) {
        setError((err as Error).message);
        addToast('Failed to load movies', 'error');
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, [pageSize, pageNum]);

  useEffect(() => {
    if (editingMovie && editFormRef.current) {
      editFormRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [editingMovie]);

  const handleDelete = async (show_id: string) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this movie?');
    if (!confirmDelete) return;

    try {
      await deleteMovie(show_id);
      setMovies(movies.filter((m) => m.show_id !== show_id));
      addToast('Movie deleted successfully', 'success');
    } catch {
      addToast('Failed to delete movie', 'error');
    }
  };

  if (loading) return <div className="loading-spinner" />;

  if (error) return <p className="error-message">Error: {error}</p>;

  return (
    <>
      <div className="content-header">
        <h1>Movies</h1>
        <button className="btn btn-add" onClick={() => setShowForm(true)}>Add Movie</button>
      </div>

      {showForm ? (
        <NewMovieForm
          onSuccess={() => {
            setShowForm(false);
            fetchMovies(pageSize, pageNum, [], '').then((data) => {
              setMovies(data.movies);
              addToast('Movie added successfully', 'success');
            });
          }}
          onCancel={() => setShowForm(false)}
        />
      ) : editingMovie ? (
        <EditMovieForm
          movie={editingMovie}
          onSuccess={() => {
            setEditingMovie(null);
            fetchMovies(pageSize, pageNum, [], '').then((data) => {
              setMovies(data.movies);
              addToast('Movie updated successfully', 'success');
            });
          }}
          onCancel={() => setEditingMovie(null)}
        />
      ) : movies.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">🎬</div>
          <h2 className="empty-state-message">No movies found</h2>
          <p>Add your first movie to get started</p>
          <button className="btn btn-add empty-state-action" onClick={() => setShowForm(true)}>
            Add Movie
          </button>
        </div>
      ) : (
        <div className="table-container">
          <table className="styled-table">
            <thead>
              <tr>
                <th>Show ID</th>
                <th>Type</th>
                <th>Title</th>
                <th>Director</th>
                <th>Cast</th>
                <th>Country</th>
                <th>Release Year</th>
                <th>Rating</th>
                <th>Duration</th>
                <th>Description</th>
                <th>Genres</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {movies.map((m) => (
                <>
                  <tr
                    key={m.show_id}
                    onClick={() => setExpandedRowId(expandedRowId === m.show_id ? null : m.show_id)}
                    style={{ cursor: 'pointer' }}
                  >
                    <td>{m.show_id}</td>
                    <td>{m.type}</td>
                    <td>{m.title}</td>
                    <td title={m.director}>{m.director}</td>
                    <td title={m.cast}>{m.cast}</td>
                    <td title={m.country}>{m.country}</td>
                    <td>{m.release_year}</td>
                    <td>{m.rating}</td>
                    <td>{m.duration}</td>
                    <td title={m.description}>{m.description}</td>
                    <td>
                      {Object.entries(m)
                        .filter(([_, value]) => typeof value === 'boolean' && value === true)
                        .map(([genre]) => genre)
                        .join(', ')}
                    </td>
                    <td className="action-buttons">
                      <button
                        type="button"
                        className="btn btn-edit"
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowForm(false);
                          setEditingMovie(m);
                        }}
                      >
                        Edit <PencilIcon className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        className="btn btn-delete"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(m.show_id);
                        }}
                      >
                        Delete <TrashIcon className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                  {expandedRowId === m.show_id && (
                    <tr className="expanded-detail-row">
                      <td colSpan={12}>
                        <div className="expanded-card">
                          <h3 className="expanded-title">{m.title}</h3>
                          <p><strong>Description:</strong> {m.description}</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Pagination
        currentPage={pageNum}
        totalPages={totalPages}
        pageSize={pageSize}
        onPageChange={setPageNum}
        onPageSizeChange={(newSize) => {
          setPageSize(newSize);
          setPageNum(1);
        }}
      />

      <div className="toast-container">
        {toasts.map((toast) => (
          <div key={toast.id} className={`toast ${toast.type}`}>
            {toast.type === 'success' ? '✓' : '✕'} {toast.message}
          </div>
        ))}
      </div>
    </>
  );
};

export default AdminMoviesPage;
