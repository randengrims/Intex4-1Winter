import { useEffect, useState, useRef, useCallback } from "react";
import { Movie } from '../types/Movie';
import { useNavigate } from "react-router-dom";
import { fetchMovies } from "../api/MoviesAPI";

// Sanitize movie title to match how the poster images are named in Azure
const sanitizeTitle = (title: string): string => {
    return title
        .normalize("NFD")                     // Decompose accented characters
        .replace(/[\u0300-\u036f]/g, "")     // Remove diacritics (accents)
        .replace(/[^a-zA-Z0-9 ]/g, "")       // Remove special characters
        .replace(/\s+/g, " ")                // Collapse multiple spaces into one
        .trim();                             // Trim leading/trailing spaces
};

function MovieList() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [pageSize] = useState<number>(10);
    const [pageNum, setPageNum] = useState<number>(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const observer = useRef<IntersectionObserver | null>(null);
    const navigate = useNavigate();

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
                const data = await fetchMovies(pageSize, pageNum);
                if (Array.isArray(data.movies)) {
                    setMovies(prev => [...prev, ...data.movies]);
                    const totalPages = Math.ceil(data.totalNumMovies / pageSize);
                    setHasMore(pageNum < totalPages);
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
    }, [pageNum, pageSize]);

    if (error) return <p className="text-red-500">Error: {error}</p>;

    return (
        <>
            <h2 className="text-xl font-bold mb-2">Browse Movies</h2>
            {movies.map((m, idx) => {
                const isLast = idx === movies.length - 1;
                const sanitizedTitle = sanitizeTitle(m.title);
                const imageUrl = `https://moviepostersforintex.blob.core.windows.net/movieposters/${encodeURIComponent(sanitizedTitle)}.jpg`;

                return (
                    <div
                        id="movieCard"
                        className="card mb-4 p-4 shadow-lg border rounded"
                        key={m.show_id}
                        ref={isLast ? lastMovieRef : null}
                    >
                        {/* Movie Poster */}
                        {/* <img
                            src={imageUrl}
                            alt={`Poster for ${m.title}`}
                            className="w-full max-w-xs h-auto mb-3 object-cover rounded"
                            loading="lazy"
                            onError={(e) => {
                                (e.currentTarget as HTMLImageElement).src = "/Click.jpg";
                            }}
                        /> */}

                        {/* Movie Info */}
                        <h3 className="card-title text-lg font-semibold mb-1">{m.title}</h3>
                        <div className="card-body">
                            <ul className="list-unstyled space-y-1 text-sm">
                                <li><strong>Release Year:</strong> {m.release_year}</li>
                                <li><strong>Rating:</strong> {m.rating}</li>
                                <li><strong>Genres:</strong> {m.genres}</li>
                            </ul>
                        </div>
                    </div>
                );
            })}
            {loading && <p>Loading more movies...</p>}
            {!hasMore && <p className="text-gray-500">No more movies to load.</p>}
        </>
    );
}

export default MovieList;