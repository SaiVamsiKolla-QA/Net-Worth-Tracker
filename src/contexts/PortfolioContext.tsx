import React, { createContext, useContext, useEffect, useState } from 'react';
import { NetWorthService } from '../services/NetWorthService';
import { LocalStorageRepository } from '../repositories/LocalStorageRepository';
import { Portfolio } from '../models/Portfolio';

interface PortfolioContextType {
  service: NetWorthService;
  portfolio: Portfolio;
  refresh: () => void;
  loading: boolean;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [service] = useState(() => new NetWorthService(new LocalStorageRepository()));
  const [portfolio, setPortfolio] = useState<Portfolio>(new Portfolio());
  const [loading, setLoading] = useState(true);

  const refresh = () => {
    setPortfolio(service.getPortfolio());
  };

  useEffect(() => {
    const init = async () => {
      await service.initialize();
      refresh();
      setLoading(false);
    };
    init();
  }, [service]);

  return (
    <PortfolioContext.Provider value={{ service, portfolio, refresh, loading }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within PortfolioProvider');
  }
  return context;
};