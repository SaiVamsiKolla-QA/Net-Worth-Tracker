import React, { useState } from 'react';
import { usePortfolio } from '../../contexts/PortfolioContext';
import NetWorthCard from './NetWorthCard';
import SummaryCards from './SummaryCards';
import NetWorthChart from './NetWorthChart';
import { formatCurrency } from '../../utils/formatters';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  const { service, portfolio, refresh } = usePortfolio();
  const [projectionMonths, setProjectionMonths] = useState(12);

  const summary = service.getSummary();
  const projections = service.getProjections(projectionMonths);
  const snapshots = portfolio.getSnapshotsSorted();

  const handleCreateSnapshot = async () => {
    await service.createSnapshot();
    refresh();
  };

  const handleExport = async () => {
    try {
      const data = await service.exportData();
      const blob = new Blob([data], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `networth-backup-${new Date().toISOString().split('T')[0]}.json`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Export failed:', error);
    }
  };

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      await service.importData(text);
      refresh();
      alert('Data imported successfully!');
    } catch (error) {
      console.error('Import failed:', error);
      alert('Failed to import data. Please check the file format.');
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Net Worth Dashboard</h1>
        <div className="dashboard-actions">
          <button onClick={handleCreateSnapshot} className="btn btn-primary">
            📸 Take Snapshot
          </button>
          <button onClick={handleExport} className="btn btn-secondary">
            💾 Export Data
          </button>
          <label htmlFor="import-file" className="btn btn-secondary">
            📂 Import Data
            <input
              id="import-file"
              type="file"
              accept=".json"
              onChange={handleImport}
              style={{ display: 'none' }}
            />
          </label>
        </div>
      </div>

      <NetWorthCard
        totalAssets={summary.totalAssets}
        totalLiabilities={summary.totalLiabilities}
        netWorth={summary.netWorth}
      />

      <SummaryCards
        debtToAssetRatio={summary.debtToAssetRatio}
        liquidityRatio={summary.liquidityRatio}
        monthlyExpenses={summary.monthlyRecurringExpenses}
        totalInterest={summary.totalLoanInterest}
      />

      <div className="chart-section">
        <div className="chart-header">
          <h2>Net Worth Over Time</h2>
          <select
            value={projectionMonths}
            onChange={(e) => setProjectionMonths(Number(e.target.value))}
            className="projection-select"
          >
            <option value={3}>3 Months</option>
            <option value={6}>6 Months</option>
            <option value={12}>12 Months</option>
            <option value={24}>24 Months</option>
            <option value={36}>36 Months</option>
          </select>
        </div>
        <NetWorthChart snapshots={snapshots} projections={projections} />
      </div>

      <div className="snapshots-section">
        <h2>Historical Snapshots</h2>
        {snapshots.length === 0 ? (
          <p className="empty-state">
            No snapshots yet. Click "Take Snapshot" to save your current net worth.
          </p>
        ) : (
          <div className="snapshots-list">
            {snapshots.map((snapshot) => (
              <div key={snapshot.id} className="snapshot-card">
                <div className="snapshot-date">{snapshot.getFormattedDate()}</div>
                <div className="snapshot-value">
                  <span className="label">Net Worth:</span>
                  <span className={`value ${snapshot.netWorth >= 0 ? 'positive' : 'negative'}`}>
                    {formatCurrency(snapshot.netWorth)}
                  </span>
                </div>
                <div className="snapshot-details">
                  <span>Assets: {formatCurrency(snapshot.totalAssets)}</span>
                  <span>Liabilities: {formatCurrency(snapshot.totalLiabilities)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;