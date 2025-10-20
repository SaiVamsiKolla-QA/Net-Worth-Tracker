/**
 * LiabilityList Component
 * Displays all liabilities with edit/delete actions
 */

import React, { useState } from 'react';
import { usePortfolio } from '../../contexts/PortfolioContext';
import { formatCurrency } from '../../utils/formatters';
import LiabilityForm from './LiabilityForm';

const LiabilityList: React.FC = () => {
  const { portfolio, service, refresh } = usePortfolio();
  const [showForm, setShowForm] = useState(false);
  const [editingLiability, setEditingLiability] = useState<any>(null);

  const liabilities = portfolio.liabilities;

  const handleDelete = async (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      await service.deleteLiability(id);
      refresh();
    }
  };

  const handleEdit = (liability: any) => {
    setEditingLiability(liability);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingLiability(null);
  };

  return (
    <div className="liability-list-container">
      <div className="list-header">
        <h1>Liabilities</h1>
        <button onClick={() => setShowForm(true)} className="btn btn-primary">
          ➕ Add Liability
        </button>
      </div>

      {liabilities.length === 0 ? (
        <div className="empty-state">
          <p>No liabilities yet. Click "Add Liability" to get started!</p>
        </div>
      ) : (
        <div className="liabilities-grid">
          {liabilities.map((liability) => (
            <div key={liability.id} className="liability-card card">
              <div className="card-header">
                <h3>{liability.name}</h3>
                <span className="liability-type">{liability.type}</span>
              </div>

              <div className="card-body">
                <div className="liability-value text-negative">
                  {formatCurrency(liability.getValue())}
                </div>

                {liability.isLoan() && liability.loanDetails && (
                  <div className="liability-details">
                    <small>
                      Principal: {formatCurrency(liability.loanDetails.principal)}
                      <br />
                      Rate: {liability.loanDetails.interestRate}% APR
                      <br />
                      Payment: {formatCurrency(liability.loanDetails.monthlyPayment)}/mo
                      <br />
                      Remaining: {liability.loanDetails.remainingMonths} months
                      <br />
                      <strong>Total Interest: {formatCurrency(liability.getTotalInterest())}</strong>
                    </small>
                  </div>
                )}

                {liability.isRecurring() && liability.recurringDetails && (
                  <div className="liability-details">
                    <small>
                      Monthly: {formatCurrency(liability.recurringDetails.monthlyAmount)}
                      <br />
                      Annual: {formatCurrency(liability.recurringDetails.annualAmount)}
                    </small>
                  </div>
                )}
              </div>

              <div className="card-actions">
                <button 
                  onClick={() => handleEdit(liability)} 
                  className="btn btn-secondary"
                >
                  ✏️ Edit
                </button>
                <button 
                  onClick={() => handleDelete(liability.id, liability.name)} 
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
        <h3>Total Liabilities: {formatCurrency(service.getSummary().totalLiabilities)}</h3>
      </div>

      {showForm && (
        <LiabilityForm 
          onClose={handleCloseForm} 
          editingLiability={editingLiability}
        />
      )}
    </div>
  );
};

export default LiabilityList;