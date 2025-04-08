import { useState } from 'react';
import { Movie } from '../types/Movie';
import { addMovie } from '../api/MoviesAPI';

interface NewMovieFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

const NewMovieForm = ({ onSuccess, onCancel }: NewMovieFormProps) => {
  const [formData, setFormData] = useState<Movie>({
    show_id: '',
    type: '',
    title: '',
    director: '',
    cast: '',
    country: '',
    release_year: 0,
    rating: '',
    duration: '',
    description: '',
    genres: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addMovie(formData);
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Movie</h2>
      <label>
        Type:
        <input
          type='string'
          name='type'
          value={formData.type}
          onChange={handleChange}
        />
      </label>
      <label>
        Title:
        <input
          type='string'
          name='title'
          value={formData.title}
          onChange={handleChange}
        />
      </label>
      <label>
        Director:
        <input
          type='string'
          name='director'
          value={formData.director}
          onChange={handleChange}
        />
      </label>
      <label>
        Cast:
        <input
          type='string'
          name='cast'
          value={formData.cast}
          onChange={handleChange}
        />
      </label>
      <label>
        Country:
        <input
          type='string'
          name='country'
          value={formData.country}
          onChange={handleChange}
        />
      </label>
      <label>
        Release Year:
        <input
          type='number'
          name='category'
          value={formData.release_year || ''}
          onChange={handleChange}
        />
      </label>
      <label>
        Rating:
        <input
          type='string'
          name='rating'
          value={formData.rating ?? ''}
          onChange={handleChange}
        />
      </label>
      <label>
        Duration:
        <input
          type='string'
          name='duration'
          value={formData.duration}
          onChange={handleChange}
        />
      </label>
      <label>
        Description:
        <input
          type='string'
          name='description'
          value={formData.description}
          onChange={handleChange}
        />
      </label>
      <label>
        Genre:
        <input
          type='string'
          name='genres'
          value={formData.genres}
          onChange={handleChange}
        />
      </label>
      <button type='submit'>Add Movie</button>
      <button type='button' onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
};

export default NewMovieForm;
