// src/api/AdminMoviesAPI.ts

import { Movie } from '../types/Movie';

interface FetchMoviesResponse {
  movies: Movie[];
  totalNumMovies: number;
}

const API_URL = 'https://localhost:5000/api/Movie';

// PAGINATED FETCH
export const fetchMoviesPaged = async (
  pageSize: number,
  pageNum: number,
): Promise<FetchMoviesResponse> => {
  try {
    const response = await fetch(
      `${API_URL}/GetMovies?pageSize=${pageSize}&pageNum=${pageNum}`,
    );
    if (!response.ok) throw new Error('Failed to fetch movies');

    const data = await response.json();
    return {
      movies: data.movies,
      totalNumMovies: data.totalNumMovies,
    };
  } catch (error) {
    console.error('Error fetching paged movies:', error);
    throw error;
  }
};

// ADD
export const addMovie = async (newMovie: Movie): Promise<Movie> => {
  try {
    const response = await fetch(`${API_URL}/AddMovie`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newMovie),
    });
    if (!response.ok) throw new Error('Failed to add movie');
    return await response.json();
  } catch (error) {
    console.error('Error adding movie', error);
    throw error;
  }
};

// UPDATE
export const updateMovie = async (
  show_id: string,
  updatedMovie: Movie,
): Promise<Movie> => {
  try {
    const response = await fetch(`${API_URL}/UpdateProject/${show_id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedMovie),
    });
    return await response.json();
  } catch (error) {
    console.error('Error updating movie:', error);
    throw error;
  }
};

// DELETE
export const deleteMovie = async (show_id: string): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/DeleteProject/${show_id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete movie');
  } catch (error) {
    console.error('Error deleting movie:', error);
    throw error;
  }
};