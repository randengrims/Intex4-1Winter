import { Link } from 'react-router-dom';

interface AdminSidebarProps {
  isSidebarCollapsed: boolean;
  toggleSidebar: () => void;
  theme: string;
  toggleTheme: () => void;
}

const AdminSidebar = ({
  isSidebarCollapsed,
  toggleSidebar,
  theme,
  toggleTheme,
}: AdminSidebarProps) => {

  // Automatically collapse sidebar after link click on mobile
  const handleLinkClick = () => {
    if (window.innerWidth < 768 && !isSidebarCollapsed) {
      toggleSidebar();
    }
  };

  return (
    <aside className={`sidebar ${!isSidebarCollapsed ? 'visible' : ''}`}>
      <div className="sidebar-header">
        <a href="/" className="sidebar-logo">Movie Admin</a>
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
        </button>
      </div>
      <nav className="sidebar-nav">
        <Link to="/admin/movies" className="sidebar-link" onClick={handleLinkClick}>All Movies</Link>
        <Link to="/admin/movies/new" className="sidebar-link" onClick={handleLinkClick}>Add New Movie</Link>
        <Link to="/admin/movies/categories" className="sidebar-link" onClick={handleLinkClick}>Categories</Link>
        <Link to="/admin/movies/import" className="sidebar-link" onClick={handleLinkClick}>Import Movies</Link>
        <Link to="/admin/users" className="sidebar-link" onClick={handleLinkClick}>All Users</Link>
        {/* Add more links here */}
      </nav>
    </aside>
  );
};

export default AdminSidebar;
