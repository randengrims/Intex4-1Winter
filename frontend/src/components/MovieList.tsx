import { useEffect, useState, useRef, useCallback } from "react";
import { Movie } from '../types/Movie';
import { fetchMovies } from "../api/MoviesAPI";
import PublicHeader from "./PublicHeader";
import MovieFilter from "./MovieFilter";

const sanitizeTitle = (title: string): string => {
    return title
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-zA-Z0-9 ]/g, "")
        .replace(/\s+/g, " ")
        .trim();
};

// Function to check if an image URL exists
const imageExists = async (url: string): Promise<boolean> => {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = url;
    });
};

function MovieList() {
    const [selectedGenres, setSelectedGenres] = useState<string[]>([]); // Local state for selected genres
    const [movies, setMovies] = useState<Movie[]>([]);
    const [pageSize] = useState<number>(10);
    const [pageNum, setPageNum] = useState<number>(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [featuredMovie, setFeaturedMovie] = useState<Movie | null>(null);

    const observer = useRef<IntersectionObserver | null>(null);

    // Refs to track previously seen titles and image URLs
    const seenTitles = useRef<Set<string>>(new Set());
    const seenImages = useRef<Set<string>>(new Set());

    const lastMovieRef = useCallback(
        (node: HTMLDivElement | null) => {
            if (loading) return;
            if (observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver(entries => {
                if (entries[0].isIntersecting && hasMore) {
                    setPageNum(prev => prev + 1);
                }
            });
            if (node) observer.current.observe(node);
        },
        [loading, hasMore]
    );

    useEffect(() => {
        const loadMovies = async () => {
            try {
                setLoading(true);
                const data = await fetchMovies(pageSize, pageNum, selectedGenres);
                if (Array.isArray(data.movies)) {
                    const newMovies: Movie[] = [];

                    // Loop through the fetched movies
                    for (const movie of data.movies) {
                        const title = sanitizeTitle(movie.title);
                        const imageUrl = `https://moviepostersforintex.blob.core.windows.net/movieposters/${encodeURIComponent(title)}.jpg`;

                        // Skip duplicate titles or images
                        if (seenTitles.current.has(movie.title) || seenImages.current.has(imageUrl)) continue;

                        const exists = await imageExists(imageUrl);
                        if (!exists) continue; // Skip if the image doesn't exist

                        // Mark the title and image as seen
                        seenTitles.current.add(movie.title);
                        seenImages.current.add(imageUrl);

                        // Add movie to the list of new movies
                        newMovies.push(movie);
                    }

                    setMovies(prev => [...prev, ...newMovies]);
                    const totalPages = Math.ceil(data.totalNumMovies / pageSize);
                    setHasMore(pageNum < totalPages);

                    // If featured movie is not already stored in localStorage, select one
                    let selectedFeaturedMovie = localStorage.getItem('featuredMovie');
                    if (!selectedFeaturedMovie) {
                        const randomIndex = Math.floor(Math.random() * newMovies.length);
                        selectedFeaturedMovie = JSON.stringify(newMovies[randomIndex]);
                        localStorage.setItem('featuredMovie', selectedFeaturedMovie);
                    }

                    setFeaturedMovie(JSON.parse(selectedFeaturedMovie));
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
    }, [pageNum, pageSize,selectedGenres]);

    if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;

    const gridStyle: React.CSSProperties = {
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)', // Show 5 movies per row
        gap: '16px',
        padding: '16px'
    };

    const cardStyle: React.CSSProperties = {
        width: '100%',
        height: '300px',
        backgroundColor: '#1f1f1f',
        borderRadius: '8px',
        overflow: 'hidden',
        position: 'relative',
        boxShadow: '0 4px 10px rgba(0,0,0,0.5)',
        transform: 'scale(1)',
        transition: 'transform 0.3s ease'
    };

    const imageStyle: React.CSSProperties = {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        display: 'block'
    };

    const overlayStyle: React.CSSProperties = {
        position: 'absolute',
        bottom: '0',
        left: '0',
        right: '0',
        height: '60px',
        background: 'rgba(0, 0, 0, 0.7)',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        padding: '0 10px',
        fontSize: '14px',
        opacity: 0,
        transition: 'opacity 0.3s ease'
    };

    const cardHoverStyle: React.CSSProperties = {
        transform: 'scale(1.05)',
        cursor: 'pointer'
    };

    const overlayHoverStyle: React.CSSProperties = {
        opacity: 1
    };

    const bannerStyle: React.CSSProperties = {
        backgroundColor: '#333',
        color: 'white',
        padding: '20px',
        display: 'flex',
        alignItems: 'center',
        marginBottom: '20px',
        justifyContent: 'flex-start',
    };

    const textStyle: React.CSSProperties = {
        marginLeft: '20px',
        maxWidth: '60%',
        textAlign: 'left', // Left-aligned text
    };

    const buttonStyle: React.CSSProperties = {
        marginTop: '10px',
        padding: '10px 20px',
        backgroundColor: '#ff8c00',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    };

    const buttonHoverStyle: React.CSSProperties = {
        backgroundColor: '#cc6b00',
    };

    const handleButtonClick = () => {
        // Handle "See Details" button click (e.g., navigate to a detailed page)
        alert(`See more details about: ${featuredMovie?.title}`);
    };

    return (
        <>
            {<PublicHeader/>}
            <MovieFilter selectedGenres={selectedGenres} setSelectedGenres={setSelectedGenres} />
            <br /><br />
            {featuredMovie && (
                <div style={bannerStyle}>
                    <img
                        src={`https://moviepostersforintex.blob.core.windows.net/movieposters/${encodeURIComponent(sanitizeTitle(featuredMovie.title))}.jpg`}
                        alt={featuredMovie.title}
                        style={{ width: '200px', height: '300px', objectFit: 'cover' }}
                        onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src = "/Click.jpg";
                        }}
                    />
                    <div style={textStyle}>
                        <h2>Featured Movie:</h2>
                        <h3>{featuredMovie.title} ({featuredMovie.release_year})</h3>
                        <p><strong>Rating:</strong> {featuredMovie.rating}</p>
                        <p><strong>Description:</strong> {featuredMovie.description}</p>
                        <button 
                            style={buttonStyle} 
                            onMouseEnter={(e) => (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#ff8c00'}
                            onMouseLeave={(e) => (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#ff8c00'}
                            onClick={handleButtonClick}
                        >
                            See Details
                        </button>
                    </div>
                </div>
            )}
            <div style={gridStyle}>
                {movies.map((m, idx) => {
                    const isLast = idx === movies.length - 1;
                    const sanitizedTitle = sanitizeTitle(m.title);
                    const imageUrl = `https://moviepostersforintex.blob.core.windows.net/movieposters/${encodeURIComponent(sanitizedTitle)}.jpg`;

                    return (
                        <div
                            key={m.show_id}
                            ref={isLast ? lastMovieRef : null}
                            style={cardStyle}
                            onMouseEnter={e => {
                                (e.currentTarget as HTMLDivElement).style.transform = cardHoverStyle.transform!;
                                const overlay = (e.currentTarget as HTMLDivElement).querySelector('.overlay') as HTMLDivElement;
                                if (overlay) overlay.style.opacity = overlayHoverStyle.opacity!.toString();
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
                                style={imageStyle}
                                loading="lazy"
                                onError={(e) => {
                                    (e.currentTarget as HTMLImageElement).src = "/Click.jpg";
                                }}
                            />
                            <div className="overlay" style={overlayStyle}>
                                {m.title}
                            </div>
                        </div>
                    );
                })}
            </div>
            {loading && <p style={{ textAlign: 'center', marginTop: '1rem', color: '#ccc' }}>Loading more movies...</p>}
            {!hasMore && <p style={{ textAlign: 'center', marginTop: '1rem', color: '#ccc' }}>No more movies to load.</p>}
        </>
    );
}

export default MovieList;
