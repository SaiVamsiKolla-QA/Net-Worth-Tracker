/**
 * AssetForm Component
 * Form for adding/editing assets
 */

import React, { useState } from 'react';
import { usePortfolio } from '../../contexts/PortfolioContext';
import { AssetType, CryptoType, MetalUnit, AssetFormData } from '../../models/types';
import { ASSET_TYPES, CRYPTO_TYPES, METAL_UNITS } from '../../utils/constants';

interface AssetFormProps {
  onClose: () => void;
  editingAsset?: any;
}

const AssetForm: React.FC<AssetFormProps> = ({ onClose, editingAsset }) => {
  const { service, refresh } = usePortfolio();
  
  const [formData, setFormData] = useState<AssetFormData>({
    name: editingAsset?.name || '',
    type: editingAsset?.type || AssetType.CASH,
    value: editingAsset?.value || 0,
    cryptoDetails: editingAsset?.cryptoDetails || undefined,
    metalDetails: editingAsset?.metalDetails || undefined,
  });

  const isCrypto = [
    AssetType.CRYPTO_LONG_TERM,
    AssetType.CRO_CRYPTO,
  ].includes(formData.type);

  const isMetal = [AssetType.GOLD, AssetType.SILVER].includes(formData.type);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingAsset) {
        await service.updateAsset(editingAsset.id, formData);
      } else {
        await service.addAsset(formData);
      }
      refresh();
      onClose();
    } catch (error) {
      alert('Failed to save asset');
      console.error(error);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{editingAsset ? 'Edit Asset' : 'Add New Asset'}</h2>
          <button onClick={onClose} className="close-btn">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="asset-form">
          <div className="form-group">
            <label>Asset Name *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., My Savings Account"
              required
            />
          </div>

          <div className="form-group">
            <label>Asset Type *</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ 
                ...formData, 
                type: e.target.value as AssetType,
                cryptoDetails: undefined,
                metalDetails: undefined,
              })}
              required
            >
              {ASSET_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Crypto-specific fields */}
          {isCrypto && (
            <>
              <div className="form-group">
                <label>Coin Type *</label>
                <select
                  value={formData.cryptoDetails?.coinType || CryptoType.BTC}
                  onChange={(e) => setFormData({
                    ...formData,
                    cryptoDetails: {
                      ...formData.cryptoDetails!,
                      coinType: e.target.value as CryptoType,
                      quantity: formData.cryptoDetails?.quantity || 0,
                      pricePerCoin: formData.cryptoDetails?.pricePerCoin || 0,
                    }
                  })}
                  required
                >
                  {CRYPTO_TYPES.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Quantity *</label>
                <input
                  type="number"
                  step="0.00000001"
                  value={formData.cryptoDetails?.quantity || 0}
                  onChange={(e) => setFormData({
                    ...formData,
                    cryptoDetails: {
                      ...formData.cryptoDetails!,
                      coinType: formData.cryptoDetails?.coinType || CryptoType.BTC,
                      quantity: parseFloat(e.target.value) || 0,
                      pricePerCoin: formData.cryptoDetails?.pricePerCoin || 0,
                    }
                  })}
                  placeholder="0.5"
                  required
                />
              </div>

              <div className="form-group">
                <label>Price per Coin (CAD) *</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.cryptoDetails?.pricePerCoin || 0}
                  onChange={(e) => setFormData({
                    ...formData,
                    cryptoDetails: {
                      ...formData.cryptoDetails!,
                      coinType: formData.cryptoDetails?.coinType || CryptoType.BTC,
                      quantity: formData.cryptoDetails?.quantity || 0,
                      pricePerCoin: parseFloat(e.target.value) || 0,
                    }
                  })}
                  placeholder="60000.00"
                  required
                />
              </div>
            </>
          )}

          {/* Metal-specific fields */}
          {isMetal && (
            <>
              <div className="form-group">
                <label>Unit *</label>
                <select
                  value={formData.metalDetails?.unit || MetalUnit.GRAMS}
                  onChange={(e) => setFormData({
                    ...formData,
                    metalDetails: {
                      ...formData.metalDetails!,
                      unit: e.target.value as MetalUnit,
                      weight: formData.metalDetails?.weight || 0,
                      pricePerUnit: formData.metalDetails?.pricePerUnit || 0,
                    }
                  })}
                  required
                >
                  {METAL_UNITS.map((unit) => (
                    <option key={unit} value={unit}>{unit}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Weight *</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.metalDetails?.weight || 0}
                  onChange={(e) => setFormData({
                    ...formData,
                    metalDetails: {
                      ...formData.metalDetails!,
                      unit: formData.metalDetails?.unit || MetalUnit.GRAMS,
                      weight: parseFloat(e.target.value) || 0,
                      pricePerUnit: formData.metalDetails?.pricePerUnit || 0,
                    }
                  })}
                  placeholder="100"
                  required
                />
              </div>

              <div className="form-group">
                <label>Price per Unit (CAD) *</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.metalDetails?.pricePerUnit || 0}
                  onChange={(e) => setFormData({
                    ...formData,
                    metalDetails: {
                      ...formData.metalDetails!,
                      unit: formData.metalDetails?.unit || MetalUnit.GRAMS,
                      weight: formData.metalDetails?.weight || 0,
                      pricePerUnit: parseFloat(e.target.value) || 0,
                    }
                  })}
                  placeholder="75.00"
                  required
                />
              </div>
            </>
          )}

          {/* Simple value for other types */}
          {!isCrypto && !isMetal && (
            <div className="form-group">
              <label>Value (CAD) *</label>
              <input
                type="number"
                step="0.01"
                value={formData.value}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  value: parseFloat(e.target.value) || 0 
                })}
                placeholder="10000.00"
                required
              />
            </div>
          )}

          <div className="form-actions">
            <button type="button" onClick={onClose} className="btn btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {editingAsset ? 'Update Asset' : 'Add Asset'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AssetForm;