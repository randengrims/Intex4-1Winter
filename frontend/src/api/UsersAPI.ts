import { User } from '../types/User';

export async function fetchUsers(): Promise<User[]> {
  const response = await fetch('https://localhost:5000/api/movie/GetUsers');
  if (!response.ok) {
    throw new Error(`Failed to fetch users. Status: ${response.status}`);
  }

  return await response.json(); // plain array
}
