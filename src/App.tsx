import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { PortfolioProvider } from './contexts/PortfolioContext';
import Layout from './components/layout/Layout';
import Dashboard from './components/dashboard/Dashboard';
import './styles/global.css';
import './styles/theme.css';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <PortfolioProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/assets" element={<div>Assets Page (Coming Soon)</div>} />
              <Route path="/liabilities" element={<div>Liabilities Page (Coming Soon)</div>} />
            </Routes>
          </Layout>
        </Router>
      </PortfolioProvider>
    </ThemeProvider>
  );
};

export default App;