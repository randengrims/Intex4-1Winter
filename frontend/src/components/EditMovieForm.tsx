import { useState, ChangeEvent, FormEvent } from 'react';
import { Movie } from '../types/Movie';
import { updateMovie } from '../api/MoviesAPI';

interface EditMovieFormProps {
  movie: Movie;
  onSuccess: () => void;
  onCancel: () => void;
}

const genreOptions = [
  "Action", "Adventure", "Anime Series International TV Shows", "British TV Shows Docuseries International TV Shows",
  "Children", "Comedies", "Comedies Dramas International Movies", "Comedies International Movies",
  "Comedies Romantic Movies", "Crime TV Shows Docuseries", "Documentaries", "Documentaries International Movies",
  "Docuseries", "Dramas", "Dramas International Movies", "Dramas Romantic Movies",
  "Family Movies", "Fantasy", "Horror Movies", "International Movies Thrillers",
  "International TV Shows Romantic TV Shows TV Dramas", "Kids' TV", "Language TV Shows",
  "Musicals", "Nature TV", "Reality TV", "Spirituality", "TV Action", "TV Comedies",
  "TV Dramas", "Talk Shows TV Comedies", "Thrillers"
];

const EditMovieForm = ({ movie, onSuccess, onCancel }: EditMovieFormProps) => {
  const [formData, setFormData] = useState<Movie>({ ...movie });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const updatedData = { ...formData };

    // Normalize and set genre flag
    const genreFlagKey = genreOptions.find((g) => g === formData.genres);
    if (genreFlagKey) {
      const normalizedKey = genreFlagKey.replace(/[^a-zA-Z0-9]/g, '');
      (updatedData as any)[normalizedKey] = true;
    }

    try {
      await updateMovie(formData.show_id, updatedData);
      onSuccess();
    } catch (err) {
      console.error("Failed to update movie:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Movie</h2>

      <label>
        Type:
        <select name="type" value={formData.type} onChange={handleChange}>
          <option value="">Select Type</option>
          <option value="Movie">Movie</option>
          <option value="TV Show">TV Show</option>
        </select>
      </label>

      <label>
        Title:
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
      </label>

      <label>
        Director:
        <input
          type="text"
          name="director"
          value={formData.director}
          onChange={handleChange}
        />
      </label>

      <label>
        Cast:
        <input
          type="text"
          name="cast"
          value={formData.cast}
          onChange={handleChange}
        />
      </label>

      <label>
        Country:
        <input
          type="text"
          name="country"
          value={formData.country}
          onChange={handleChange}
        />
      </label>

      <label>
        Release Year:
        <input
          type="number"
          name="release_year"
          value={formData.release_year || ''}
          onChange={handleChange}
        />
      </label>

      <label>
        Rating:
        <input
          type="text"
          name="rating"
          value={formData.rating}
          onChange={handleChange}
        />
      </label>

      <label>
        Duration:
        <input
          type="text"
          name="duration"
          value={formData.duration}
          onChange={handleChange}
        />
      </label>

      <label>
        Description:
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </label>

      <label>
        Genre:
        <select name="genres" value={formData.genres} onChange={handleChange}>
          <option value="">Select Genre</option>
          {genreOptions.map((genre) => (
            <option key={genre} value={genre}>{genre}</option>
          ))}
        </select>
      </label>

      <button type="submit">Update Movie</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
};

export default EditMovieForm;
