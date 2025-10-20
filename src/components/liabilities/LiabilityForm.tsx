/**
 * LiabilityForm Component
 * Form for adding/editing liabilities
 */

import React, { useState } from 'react';
import { usePortfolio } from '../../contexts/PortfolioContext';
import { LiabilityType, LiabilityFormData } from '../../models/types';
import { LIABILITY_TYPES } from '../../utils/constants';

interface LiabilityFormProps {
  onClose: () => void;
  editingLiability?: any;
}

const LiabilityForm: React.FC<LiabilityFormProps> = ({ onClose, editingLiability }) => {
  const { service, refresh } = usePortfolio();
  
  const [formData, setFormData] = useState<LiabilityFormData>({
    name: editingLiability?.name || '',
    type: editingLiability?.type || LiabilityType.CREDIT_CARD,
    value: editingLiability?.value || 0,
    loanDetails: editingLiability?.loanDetails || undefined,
    recurringDetails: editingLiability?.recurringDetails || undefined,
  });

  const isLoan = [
    LiabilityType.CAR_LOAN,
    LiabilityType.HOME_LOAN,
    LiabilityType.LINE_OF_CREDIT,
  ].includes(formData.type);

  const isRecurring = [
    LiabilityType.CAR_INSURANCE,
    LiabilityType.HOME_INSURANCE,
    LiabilityType.HEALTH_INSURANCE,
    LiabilityType.LIFE_INSURANCE,
    LiabilityType.PROPERTY_TAX,
    LiabilityType.SECURITY_BILLS,
  ].includes(formData.type);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingLiability) {
        await service.updateLiability(editingLiability.id, formData);
      } else {
        await service.addLiability(formData);
      }
      refresh();
      onClose();
    } catch (error) {
      alert('Failed to save liability');
      console.error(error);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{editingLiability ? 'Edit Liability' : 'Add New Liability'}</h2>
          <button onClick={onClose} className="close-btn">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="liability-form">
          <div className="form-group">
            <label>Liability Name *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., Credit Card Visa"
              required
            />
          </div>

          <div className="form-group">
            <label>Liability Type *</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ 
                ...formData, 
                type: e.target.value as LiabilityType,
                loanDetails: undefined,
                recurringDetails: undefined,
              })}
              required
            >
              {LIABILITY_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Loan-specific fields */}
          {isLoan && (
            <>
              <div className="form-group">
                <label>Principal Amount (CAD) *</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.loanDetails?.principal || 0}
                  onChange={(e) => setFormData({
                    ...formData,
                    loanDetails: {
                      ...formData.loanDetails!,
                      principal: parseFloat(e.target.value) || 0,
                      interestRate: formData.loanDetails?.interestRate || 0,
                      monthlyPayment: formData.loanDetails?.monthlyPayment || 0,
                      remainingMonths: formData.loanDetails?.remainingMonths || 0,
                    }
                  })}
                  placeholder="25000.00"
                  required
                />
              </div>

              <div className="form-group">
                <label>Interest Rate (%) *</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.loanDetails?.interestRate || 0}
                  onChange={(e) => setFormData({
                    ...formData,
                    loanDetails: {
                      ...formData.loanDetails!,
                      principal: formData.loanDetails?.principal || 0,
                      interestRate: parseFloat(e.target.value) || 0,
                      monthlyPayment: formData.loanDetails?.monthlyPayment || 0,
                      remainingMonths: formData.loanDetails?.remainingMonths || 0,
                    }
                  })}
                  placeholder="4.5"
                  required
                />
              </div>

              <div className="form-group">
                <label>Monthly Payment (CAD) *</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.loanDetails?.monthlyPayment || 0}
                  onChange={(e) => setFormData({
                    ...formData,
                    loanDetails: {
                      ...formData.loanDetails!,
                      principal: formData.loanDetails?.principal || 0,
                      interestRate: formData.loanDetails?.interestRate || 0,
                      monthlyPayment: parseFloat(e.target.value) || 0,
                      remainingMonths: formData.loanDetails?.remainingMonths || 0,
                    }
                  })}
                  placeholder="467.00"
                  required
                />
              </div>

              <div className="form-group">
                <label>Remaining Months *</label>
                <input
                  type="number"
                  value={formData.loanDetails?.remainingMonths || 0}
                  onChange={(e) => setFormData({
                    ...formData,
                    loanDetails: {
                      ...formData.loanDetails!,
                      principal: formData.loanDetails?.principal || 0,
                      interestRate: formData.loanDetails?.interestRate || 0,
                      monthlyPayment: formData.loanDetails?.monthlyPayment || 0,
                      remainingMonths: parseInt(e.target.value) || 0,
                    }
                  })}
                  placeholder="60"
                  required
                />
              </div>
            </>
          )}

          {/* Recurring expense fields */}
          {isRecurring && (
            <>
              <div className="form-group">
                <label>Monthly Amount (CAD) *</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.recurringDetails?.monthlyAmount || 0}
                  onChange={(e) => {
                    const monthly = parseFloat(e.target.value) || 0;
                    setFormData({
                      ...formData,
                      recurringDetails: {
                        monthlyAmount: monthly,
                        annualAmount: monthly * 12,
                      }
                    });
                  }}
                  placeholder="200.00"
                  required
                />
              </div>

              <div className="form-group">
                <label>Annual Amount (CAD)</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.recurringDetails?.annualAmount || 0}
                  readOnly
                  disabled
                  style={{ background: 'var(--bg-tertiary)' }}
                />
                <small>Auto-calculated (Monthly × 12)</small>
              </div>
            </>
          )}

          {/* Simple value for other types */}
          {!isLoan && !isRecurring && (
            <div className="form-group">
              <label>Amount (CAD) *</label>
              <input
                type="number"
                step="0.01"
                value={formData.value}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  value: parseFloat(e.target.value) || 0 
                })}
                placeholder="5000.00"
                required
              />
            </div>
          )}

          <div className="form-actions">
            <button type="button" onClick={onClose} className="btn btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {editingLiability ? 'Update Liability' : 'Add Liability'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LiabilityForm;