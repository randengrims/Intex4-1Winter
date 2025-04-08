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

// export const addProject =async (newProject:Project): Promise<Project> => {
//     try{
//         const response = await fetch(`${API_URL}/AddProject`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type' : 'application/json',
//             },
//             body: JSON.stringify(newProject)
//         });

//         if (!response.ok){
//             throw new Error('Failed to add project');
//         }

//         return await response.json();

//     } catch (error) {
//         console.error('Error adding project', error);
//         throw error;
//     }
// };

// export const updateProject = async (projectId: number, updatedProject:Project) : Promise<Project> => {
//     try {
//         const response = await fetch(`${API_URL}/UpdateProject/${projectId}`, {
//             method: 'PUT',
//             headers: {
//                 'Content-Type' : 'application/json',
//             },
//             body: JSON.stringify(updatedProject)
//         });

//         return await response.json();
        
//     } catch (error) {
//         console.error('Error updating project:',error);
//         throw error;
//     }
// };

// export const deleteProject = async (projectId: number): Promise<void> => {
//     try {
//         const response = await fetch(`${API_URL}/DeleteProject/${projectId}`,
//         {
//             method: 'DELETE'
//         });

//         if (!response.ok){
//             throw new Error('Failed to delete project');
//         }
//     } catch (error){
//         console.error('Error deleting project:', error);
//         throw error;
//     }
// };