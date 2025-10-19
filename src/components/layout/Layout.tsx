/**
 * Layout Component - Main app shell
 * Provides navigation and theme toggle
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="app-layout">
      <nav className="navbar">
        <div className="nav-brand">
          <h2>💰 Net Worth Tracker</h2>
        </div>
        <div className="nav-links">
          <Link to="/">Dashboard</Link>
          <Link to="/assets">Assets</Link>
          <Link to="/liabilities">Liabilities</Link>
        </div>
        <button onClick={toggleTheme} className="theme-toggle">
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </nav>
      <main className="main-content">{children}</main>
    </div>
  );
};

export default Layout;