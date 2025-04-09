import { useEffect, useState } from "react";

function GenreFilter({
  selectedGenres,
  setSelectedGenres,
}: {
  selectedGenres: string[];
  setSelectedGenres: (genres: string[]) => void;
}) {
  const [genres, setGenres] = useState<string[]>([]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch('https://localhost:5000/api/Movie/GetGenres');
        const data = await response.json();
        console.log('Fetched Genres:', data);
        setGenres(data);
      } catch (error) {
        console.error('Error fetching Genres', error);
      }
    };

    fetchGenres();
  }, []);

  // Handle single selection
  function handleDropdownChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const selectedGenre = event.target.value;
    setSelectedGenres(selectedGenre ? [selectedGenre] : []);
  }

  return (
    <div className="category-filter">
      <h5>Project Types</h5>
      <div className="category-dropdown">
        <select
          value={selectedGenres[0] || ""}
          onChange={handleDropdownChange}
          className="category-select"
        >
          <option value="">Select a Genre</option>
          {genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default GenreFilter;
