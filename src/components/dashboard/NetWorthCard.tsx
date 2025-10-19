import React from 'react';
import { formatCurrency } from '../../utils/formatters';

interface NetWorthCardProps {
  totalAssets: number;
  totalLiabilities: number;
  netWorth: number;
}

const NetWorthCard: React.FC<NetWorthCardProps> = ({
  totalAssets,
  totalLiabilities,
  netWorth,
}) => {
  return (
    <div className="net-worth-card card">
      <h2>Current Net Worth</h2>
      <div className="net-worth-summary">
        <div className="summary-item">
          <span className="label">Total Assets</span>
          <span className="value text-positive">{formatCurrency(totalAssets)}</span>
        </div>
        <div className="summary-item">
          <span className="label">Total Liabilities</span>
          <span className="value text-negative">{formatCurrency(totalLiabilities)}</span>
        </div>
        <div className="summary-item highlight">
          <span className="label">Net Worth</span>
          <span className={`value ${netWorth >= 0 ? 'text-positive' : 'text-negative'}`}>
            {formatCurrency(netWorth)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default NetWorthCard;