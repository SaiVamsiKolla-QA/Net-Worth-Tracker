/**
 * SummaryCards Component
 * Displays financial metrics and ratios
 */

import React from 'react';
import { formatCurrency, formatPercentage } from '../../utils/formatters';

interface SummaryCardsProps {
  debtToAssetRatio: number;
  liquidityRatio: number;
  monthlyExpenses: number;
  totalInterest: number;
}

const SummaryCards: React.FC<SummaryCardsProps> = ({
  debtToAssetRatio,
  liquidityRatio,
  monthlyExpenses,
  totalInterest,
}) => {
  return (
    <div className="summary-cards grid grid-4">
      <div className="card">
        <h3>Debt-to-Asset Ratio</h3>
        <p className="metric">{formatPercentage(debtToAssetRatio)}</p>
        <small>Lower is better</small>
      </div>

      <div className="card">
        <h3>Liquidity Ratio</h3>
        <p className="metric">
          {liquidityRatio === Infinity ? '∞' : liquidityRatio.toFixed(2)}
        </p>
        <small>Can you cover debts?</small>
      </div>

      <div className="card">
        <h3>Monthly Expenses</h3>
        <p className="metric">{formatCurrency(monthlyExpenses)}</p>
        <small>Recurring costs</small>
      </div>

      <div className="card">
        <h3>Total Loan Interest</h3>
        <p className="metric">{formatCurrency(totalInterest)}</p>
        <small>Over loan lifetime</small>
      </div>
    </div>
  );
};

export default SummaryCards;