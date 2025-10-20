/**
 * AssetList Component
 * Displays all assets with edit/delete actions
 */

import React, { useState } from 'react';
import { usePortfolio } from '../../contexts/PortfolioContext';
import { formatCurrency } from '../../utils/formatters';
import AssetForm from './AssetForm';

const AssetList: React.FC = () => {
  const { portfolio, service, refresh } = usePortfolio();
  const [showForm, setShowForm] = useState(false);
  const [editingAsset, setEditingAsset] = useState<any>(null);

  const assets = portfolio.assets;

  const handleDelete = async (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      await service.deleteAsset(id);
      refresh();
    }
  };

  const handleEdit = (asset: any) => {
    setEditingAsset(asset);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingAsset(null);
  };

  return (
    <div className="asset-list-container">
      <div className="list-header">
        <h1>Assets</h1>
        <button onClick={() => setShowForm(true)} className="btn btn-primary">
          ➕ Add Asset
        </button>
      </div>

      {assets.length === 0 ? (
        <div className="empty-state">
          <p>No assets yet. Click "Add Asset" to get started!</p>
        </div>
      ) : (
        <div className="assets-grid">
          {assets.map((asset) => (
            <div key={asset.id} className="asset-card card">
              <div className="card-header">
                <h3>{asset.name}</h3>
                <span className="asset-type">{asset.type}</span>
              </div>

              <div className="card-body">
                <div className="asset-value">
                  {formatCurrency(asset.getValue())}
                </div>

                {asset.isCrypto() && asset.cryptoDetails && (
                  <div className="asset-details">
                    <small>
                      {asset.cryptoDetails.quantity} {asset.cryptoDetails.coinType}
                      <br />
                      @ {formatCurrency(asset.cryptoDetails.pricePerCoin)} each
                    </small>
                  </div>
                )}

                {asset.isPreciousMetal() && asset.metalDetails && (
                  <div className="asset-details">
                    <small>
                      {asset.metalDetails.weight} {asset.metalDetails.unit}
                      <br />
                      @ {formatCurrency(asset.metalDetails.pricePerUnit)} per unit
                    </small>
                  </div>
                )}
              </div>

              <div className="card-actions">
                <button 
                  onClick={() => handleEdit(asset)} 
                  className="btn btn-secondary"
                >
                  ✏️ Edit
                </button>
                <button 
                  onClick={() => handleDelete(asset.id, asset.name)} 
                  className="btn btn-danger"
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="summary-bar">
        <h3>Total Assets: {formatCurrency(service.getSummary().totalAssets)}</h3>
      </div>

      {showForm && (
        <AssetForm 
          onClose={handleCloseForm} 
          editingAsset={editingAsset}
        />
      )}
    </div>
  );
};

export default AssetList;