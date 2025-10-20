import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { PortfolioProvider } from './contexts/PortfolioContext';
import Layout from './components/layout/Layout';
import Dashboard from './components/dashboard/Dashboard';
import AssetList from './components/assets/AssetList';
import LiabilityList from './components/liabilities/LiabilityList';
import './styles/global.css';
import './styles/theme.css';
import './components/assets/Assets.css';

const App: React.FC = () => (
    <ThemeProvider>
      <PortfolioProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/assets" element={<AssetList />} />
              <Route path="/liabilities" element={<LiabilityList />} />
            </Routes>
          </Layout>
        </Router>
      </PortfolioProvider>
    </ThemeProvider>
  );

export default App;