import { useEffect, useState } from "react";
import {Movie} from '../types/Movie'
import { useNavigate } from "react-router-dom";
import { fetchMovies } from "../api/MoviesAPI"
import Pagination from "./pagination";

function MovieList() {

    const[movies, setMovies] = useState<Movie[]>([]);
    const [pageSize, setPageSize] = useState<number>(10);
    const [pageNum, setPageNum] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadMovies = async () => {
        try {
            setLoading(true);
            const data = await fetchMovies(pageSize, pageNum);

            // Log the full data response to inspect it
            console.log(data);

            // Check if data.movies is an array
            if (Array.isArray(data.movies)) {
                setMovies(data.movies);
                setTotalPages(Math.ceil(data.totalNumMovies / pageSize));
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
}, [pageSize, pageNum]);

    
    
    

    if (loading) return <p>Loading Movies ...</p>
    if (error) return <p className="text-red-500">Error: {error}</p>

    return(
        <>
        {movies.map((m) => (
            <div id="movieCard" className="card" key={m.show_id}>
                {/* Movie Poster */}
                {/* <img
                    // src={`../MoviePosters/${m.title}.jpg`} // Adjust path if needed
                    alt={`Poster of ${m.title}`}
                    className="card-img-top"
                /> */}
                <h3 className="card-title">{m.title}</h3>
                <div className="card-body">
                    <ul className='list-unstyled'>
                        <li><strong>Type:</strong> {m.type}</li>
                        <li><strong>Director:</strong> {m.director}</li>
                        <li><strong>Cast:</strong> {m.cast}</li>
                        <li><strong>Country:</strong> {m.country}</li>
                        <li><strong>Release Year:</strong> {m.release_year}</li>
                        <li><strong>Rating:</strong> {m.rating}</li>
                        <li><strong>Duration:</strong> {m.duration}</li>
                        <li><strong>Description:</strong> {m.description}</li>
                        <li><strong>Genres:</strong> {m.genres}</li>
                    </ul>
        
                    <button className="btn btn-success" onClick={() => navigate(`/donate/${m.title}/${m.show_id}`)}>Donate</button>
                </div>
            </div>
        ))}
        
    
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
    
        </>

    );
}

export default MovieList;