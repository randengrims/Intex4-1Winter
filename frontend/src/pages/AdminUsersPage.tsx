import { useEffect, useState } from 'react';
import { fetchUsers } from '../api/UsersAPI';
import { User } from '../types/User';
import '../components/admin-styles/admin-layout.css';


const AdminUsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await fetchUsers();
        setUsers(data); // ✅ directly using array
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  if (loading) return <div className="admin-wrapper"><div className="loading-spinner"></div></div>;
  if (error) return <div className="admin-wrapper"><p className="error-message">{error}</p></div>;

  return (
    <div className="admin-wrapper">
      <h1>All Users</h1>
      <table className="styled-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Location</th>
            <th>Services</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.user_id}>
              <td>{u.user_id}</td>
              <td>{u.name}</td>
              <td>{u.email ?? '-'}</td>
              <td>{u.phone ?? '-'}</td>
              <td>{u.age ?? '-'}</td>
              <td>{u.gender ?? '-'}</td>
              <td>{[u.city, u.state, u.zip].filter(Boolean).join(', ') || '-'}</td>
              <td>
                {Object.entries(u)
                  .filter(([, v]) => typeof v === 'boolean' && v)
                  .map(([key]) => key)
                  .join(', ') || '-'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsersPage;
