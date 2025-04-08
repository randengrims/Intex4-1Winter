import { Movie } from "../types/Movie";

interface FetchMoviesResponse{
    movies: Movie[];
    totalNumMovies: number;
}

const API_URL = 'https://localhost:5000/api/Movie';

export const fetchMovies = async (
    pageSize: number,
    pageNum: number
): Promise<FetchMoviesResponse> => {
    try {
        const response = await fetch(`${API_URL}/GetMovies?pageSize=${pageSize}&pageNum=${pageNum}`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch movies');
        }

        const data = await response.json();
        console.log("Parsed Data:", data);

        // Just take the first 100 movies
        const first100 = data.slice(0, 100);

        // You can still paginate within those 100
        const startIndex = (pageNum - 1) * pageSize;
        const paginatedMovies = first100.slice(startIndex, startIndex + pageSize);

        return {
            movies: paginatedMovies,
            totalNumMovies: first100.length
        };

    } catch (error) {
        console.error('Error fetching movies:', error);
        throw error;
    }
};



// This is CRUD stuff we will need 

export const addMovie =async (newMovie:Movie): Promise<Movie> => {
    try{
        const response = await fetch(`${API_URL}/AddMovie`, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify(newMovie)
        });

        if (!response.ok){
            throw new Error('Failed to add movie');
        }

        return await response.json();

    } catch (error) {
        console.error('Error adding movie', error);
        throw error;
    }
};

export const updateMovie = async (show_id: string, updatedMovie:Movie) : Promise<Movie> => {
    try {
        const response = await fetch(`${API_URL}/UpdateProject/${show_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify(updatedMovie)
        });

        return await response.json();
        
    } catch (error) {
        console.error('Error updating movie:', error);
        throw error;
    }
};

export const deleteMovie = async (show_id: string): Promise<void> => {
    try {
        const response = await fetch(`${API_URL}/DeleteProject/${show_id}`,
        {
            method: 'DELETE'
        });

        if (!response.ok){
            throw new Error('Failed to delete movie');
        }
    } catch (error){
        console.error('Error deleting movie:', error);
        throw error;
    }
};