import { useState, ChangeEvent, FormEvent } from 'react';
import { Movie } from '../types/Movie';
import { addMovie } from '../api/MoviesAPI';

interface NewMovieFormProps {
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
    Action: false,
    Adventure: false,
    AnimeSeriesInternationalTVShows: false,
    BritishTVShowsDocuseriesInternationalTVShows: false,
    Children: false,
    Comedies: false,
    ComediesDramasInternationalMovies: false,
    ComediesInternationalMovies: false,
    ComediesRomanticMovies: false,
    CrimeTVShowsDocuseries: false,
    Documentaries: false,
    DocumentariesInternationalMovies: false,
    Docuseries: false,
    Dramas: false,
    DramasInternationalMovies: false,
    DramasRomanticMovies: false,
    FamilyMovies: false,
    Fantasy: false,
    HorrorMovies: false,
    InternationalMoviesThrillers: false,
    InternationalTVShowsRomanticTVShowsTVDramas: false,
    KidsTV: false,
    LanguageTVShows: false,
    Musicals: false,
    NatureTV: false,
    RealityTV: false,
    Spirituality: false,
    TVAction: false,
    TVComedies: false,
    TVDramas: false,
    TalkShowsTVComedies: false,
    Thrillers: false,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

    const handleSubmit = async (e: FormEvent) => {
      e.preventDefault();
    
      // Create a copy of formData to safely modify it
      const updatedFormData = { ...formData };
    
      // Normalize genre flag key and set it to true
      const genreFlagKey = genreOptions.find((g) => g === formData.genres);
      if (genreFlagKey) {
        const normalizedKey = genreFlagKey.replace(/[^a-zA-Z0-9]/g, '');
        (updatedFormData as any)[normalizedKey] = true;
      }
    
      try {
        await addMovie(updatedFormData);
        onSuccess(); // Refresh movie list or close form
      } catch (err) {
        console.error("Failed to submit movie:", err);
        // Optional: show error to user with setError or toast
      }
    };
  

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Movie</h2>

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
        <input type='text' name='title' value={formData.title} onChange={handleChange} />
      </label>

      <label>
        Director:
        <input type='text' name='director' value={formData.director} onChange={handleChange} />
      </label>

      <label>
        Cast:
        <input type='text' name='cast' value={formData.cast} onChange={handleChange} />
      </label>

      <label>
        Country:
        <input type='text' name='country' value={formData.country} onChange={handleChange} />
      </label>

      <label>
        Release Year:
        <input type='number' name='release_year' value={formData.release_year || ''} onChange={handleChange} />
      </label>

      <label>
        Rating:
        <input type='text' name='rating' value={formData.rating} onChange={handleChange} />
      </label>

      <label>
        Duration:
        <input type='text' name='duration' value={formData.duration} onChange={handleChange} />
      </label>

      <label>
        Description:
        <input type='text' name='description' value={formData.description} onChange={handleChange} />
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

      <button type='submit'>Add Movie</button>
      <button type='button' onClick={onCancel}>Cancel</button>
    </form>
  );
};

export default NewMovieForm;