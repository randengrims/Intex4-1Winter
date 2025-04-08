import { Movie } from "../types/Movie";

interface FetchMoviesResponse{
    movies: Movie[];
    totalNumMovies: number;
}

const API_URL = 'https://localhost:5000/api/Movie'
export const fetchMovies = async (
    pageSize: number,
    pageNum: number,
    // selectedCategories: string[]
) : Promise<FetchMoviesResponse> => {
    try{
        // const categoryParams = selectedCategories.map((cat)=> `projectTypes=${encodeURIComponent(cat)}`).join("&")

        const response = await fetch(`${API_URL}/GetMovies?pageSize=${pageSize}&pageNum=${pageNum} : ''}`);
        if (!response.ok) {
            throw new Error('Failed to fetch projects');
        }
        return await response.json();

    } catch (error) {
        console.error('Error fetching projects:', error);
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