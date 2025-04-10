import { useState } from 'react';
import AdminSidebar from '../components/AdminSidebar'; // You’ll create this next
import '../components/admin-styles/admin-layout.css';

interface AdminLayoutProps {
  theme: string;
  setTheme: (theme: string) => void;
  children: React.ReactNode;
}

const AdminLayout = ({ theme, setTheme, children }: AdminLayoutProps) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);

  const toggleSidebar = () => setIsSidebarCollapsed(!isSidebarCollapsed);
  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  return (
    <div data-theme={theme}>
      <div className="admin-wrapper">
        <button className="sidebar-toggle" onClick={toggleSidebar}>
          {isSidebarCollapsed ? '☰' : '×'}
        </button>

        <div
          className={`sidebar-overlay ${!isSidebarCollapsed ? 'visible' : ''}`}
          onClick={toggleSidebar}
        />

        <AdminSidebar
          isSidebarCollapsed={isSidebarCollapsed}
          toggleSidebar={toggleSidebar}
          theme={theme}
          toggleTheme={toggleTheme}
        />

        <main className={`main-content ${!isSidebarCollapsed ? 'sidebar-visible' : ''}`}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
