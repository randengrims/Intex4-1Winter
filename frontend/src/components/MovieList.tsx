import { useEffect, useState, useRef, useCallback } from "react";
import { Movie } from '../types/Movie';
import { fetchMovies } from "../api/MoviesAPI";
import PublicHeader from "./PublicHeader";
import GenreFilter from "./MovieFilter";
import MoviePopup from "./MoviePopup";


const sanitizeTitle = (title: string): string => {
    return title
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-zA-Z0-9 ]/g, "")
        .replace(/\s+/g, " ")
        .trim();
};

const imageExists = async (url: string): Promise<boolean> => {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = url;
    });
};

function MovieList() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [pageSize] = useState<number>(10);
    const [pageNum, setPageNum] = useState<number>(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [featuredMovie, setFeaturedMovie] = useState<Movie | null>(null);

    const observer = useRef<IntersectionObserver | null>(null);
    const seenTitles = useRef<Set<string>>(new Set());
    const seenImages = useRef<Set<string>>(new Set());

    const lastMovieRef = useCallback((node: HTMLDivElement | null) => {
        if (loading) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPageNum(prev => prev + 1);
            }
        });
        if (node) observer.current.observe(node);
    }, [loading, hasMore]);

    useEffect(() => {
        if (pageNum === 1) {
            seenTitles.current.clear();
            seenImages.current.clear();
        }

        const loadMovies = async () => {
            try {
                setLoading(true);
                const data = await fetchMovies(pageSize, pageNum, selectedGenres, searchTerm);
                if (Array.isArray(data.movies)) {
                    const newMovies: Movie[] = [];
                    for (const movie of data.movies) {
                        const title = sanitizeTitle(movie.title);
                        const imageUrl = `ps://moviepostersforintex.blob.core.windows.net/movieposterhtts/${encodeURIComponent(title)}.jpg`;
                        if (seenTitles.current.has(movie.title) || seenImages.current.has(imageUrl)) continue;
                        const exists = await imageExists(imageUrl);
                        if (!exists) continue;
                        seenTitles.current.add(movie.title);
                        seenImages.current.add(imageUrl);
                        newMovies.push(movie);
                    }
                    setMovies(prev => pageNum === 1 ? newMovies : [...prev, ...newMovies]);
                    const totalPages = Math.ceil(data.totalNumMovies / pageSize);
                    setHasMore(pageNum < totalPages);

                    let selectedFeaturedMovie = localStorage.getItem('featuredMovie');
                    if (!selectedFeaturedMovie && newMovies.length) {
                        const randomIndex = Math.floor(Math.random() * newMovies.length);
                        selectedFeaturedMovie = JSON.stringify(newMovies[randomIndex]);
                        localStorage.setItem('featuredMovie', selectedFeaturedMovie);
                    }
                    if (selectedFeaturedMovie) {
                        setFeaturedMovie(JSON.parse(selectedFeaturedMovie));
                    }
                } else {
                    throw new Error("Invalid movies data");
                }
            } catch (error) {
                setError((error as Error).message);
            } finally {
                setLoading(false);
            }
        };

        loadMovies();
    }, [pageNum, pageSize, selectedGenres, searchTerm]);

    if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;
    const cardStyle: React.CSSProperties = {
        width: '100%',
        height: '300px',
        backgroundColor: '#1F1F1F',
        borderRadius: '8px',
        overflow: 'hidden',
        position: 'relative',
        boxShadow: '0 4px 10px rgba(0,0,0,0.5)',
        transform: 'scale(1)',
        transition: 'transform 0.3s ease'
    };
    return (
        <>
            <PublicHeader />
            <br /><br />
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '20px' }}>
                <input
                    type="text"
                    placeholder="Search by title..."
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setPageNum(1);
                        setMovies([]);
                    }}
                    style={{ padding: '10px', fontSize: '16px', width: '300px' }}
                />
                <GenreFilter
                    selectedGenres={selectedGenres}
                    setSelectedGenres={(genres) => {
                        setSelectedGenres(genres);
                        setPageNum(1);
                        setMovies([]);
                    }}
                />
            </div>

            {featuredMovie && (
                <div style={{ backgroundColor: '#333', color: 'white', padding: '20px', display: 'flex', alignItems: 'center', marginBottom: '20px', justifyContent: 'flex-start' }}>
                    <img
                        src={`https://moviepostersforintex.blob.core.windows.net/movieposters/${encodeURIComponent(sanitizeTitle(featuredMovie.title))}.jpg`}
                        alt={featuredMovie.title}
                        style={{ width: '200px', height: '300px', objectFit: 'cover' }}
                        onError={(e) => (e.currentTarget as HTMLImageElement).src = "/Click.jpg"}
                    />
                    <div style={{ marginLeft: '20px', maxWidth: '60%', textAlign: 'left' }}>
                        <h2>Featured Movie:</h2>
                        <h3>{featuredMovie.title} ({featuredMovie.release_year})</h3>
                        <p><strong>Rating:</strong> {featuredMovie.rating}</p>
                        <p><strong>Description:</strong> {featuredMovie.description}</p>
                        <button style={{ marginTop: '10px', padding: '10px 20px', backgroundColor: '#ff8c00', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                            See Details
                        </button>
                    </div>
                </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px', padding: '16px' }}>
                {movies.map((m, idx) => {
                    const isLast = idx === movies.length - 1;
                    const sanitizedTitle = sanitizeTitle(m.title);
                    const imageUrl = `https://moviepostersforintex.blob.core.windows.net/movieposters/${encodeURIComponent(sanitizedTitle)}.jpg`;
                    return (
                        <div
                            key={m.show_id}
                            ref={isLast ? lastMovieRef : null}
                            style={cardStyle}
                            onClick={() => setSelectedMovie(m)}
                            onMouseEnter={e => {
                                (e.currentTarget as HTMLDivElement).style.transform = 'scale(1.05)';
                                const overlay = (e.currentTarget as HTMLDivElement).querySelector('.overlay') as HTMLDivElement;
                                if (overlay) overlay.style.opacity = '1';
                            }}
                            onMouseLeave={e => {
                                (e.currentTarget as HTMLDivElement).style.transform = 'scale(1)';
                                const overlay = (e.currentTarget as HTMLDivElement).querySelector('.overlay') as HTMLDivElement;
                                if (overlay) overlay.style.opacity = '0';
                            }}
                        >
                            <img
                                src={imageUrl}
                                alt={m.title}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                loading="lazy"
                                onError={(e) => (e.currentTarget as HTMLImageElement).src = "/Click.jpg"}
                            />
                            <div className="overlay" style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '60px', background: 'rgba(0, 0, 0, 0.7)', color: 'white', display: 'flex', alignItems: 'center', padding: '0 10px', fontSize: '14px', opacity: 0, transition: 'opacity 0.3s ease' }}>
                                {m.title}
                            </div>
                        </div>
                    );
                })}
                            {selectedMovie && (
            <MoviePopup open={!!selectedMovie} onClose={() => setSelectedMovie(null)}>
                {/* Top section: poster image with overlay text */}
                <div style={{ position: 'relative', marginBottom: '1rem' }}>
                <img
                    src={`https://moviepostersforintex.blob.core.windows.net/movieposters/${encodeURIComponent(sanitizeTitle(selectedMovie.title))}.jpg`}
                    alt={selectedMovie.title}
                    style={{
                    width: '100%',
                    maxHeight: '500px',
                    objectFit: 'cover',
                    borderRadius: '6px',
                    display: 'block',
                    }}
                    onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = "/Click.jpg";
                    }}
                />
                <div
                    style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    padding: '2rem',
                    background: 'linear-gradient(to top, rgba(0,0,0,0.85), rgba(0,0,0,0.4), rgba(0,0,0,0))',
                    color: 'white',
                    borderBottomLeftRadius: '6px',
                    borderBottomRightRadius: '6px',
                    }}
                >
                    <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                    {selectedMovie.title}
                    </h2>
                    <p style={{ fontSize: '0.9rem', opacity: 0.85 }}>
                    {selectedMovie.release_year} • {selectedMovie.rating} • {selectedMovie.genres}
                    </p>
                </div>
                </div>
            {/* Scrollable content below poster */}
            <div className="text-white mt-4" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Two-column layout */}
            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                {/* Left Column – Summary, Director, Country */}
                <div style={{ flex: '2 1 60%' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Summary</h3>
                <p style={{ lineHeight: '1.6', marginBottom: '1rem' }}>{selectedMovie.description}</p>
                {/* Director + Country live here now */}
                <div style={{ fontSize: '0.9rem', opacity: 0.85 }}>
                    <p><strong>Director:</strong> {selectedMovie.director}</p>
                    <p><strong>Country:</strong> {selectedMovie.country}</p>
                </div>
                </div>
                {/* Right Column – Cast & Genres */}
                <div style={{ flex: '1 1 35%' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Cast</h3>
                <p style={{ marginBottom: '1rem' }}>{selectedMovie.cast}</p>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Genres</h3>
                <p>{selectedMovie.genres}</p>
                </div>
            </div>
            </div>
            </MoviePopup>
            )}
            </div>

            {loading && <p style={{ textAlign: 'center', marginTop: '1rem', color: '#ccc' }}>Loading more movies...</p>}
            {!hasMore && <p style={{ textAlign: 'center', marginTop: '1rem', color: '#ccc' }}>No more movies to load.</p>}
        </>
    );
}

export default MovieList;
