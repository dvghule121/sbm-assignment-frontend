import React from 'react';

// Shimmer loader for expense list items
export const ExpenseListShimmer = () => {
  return (
    <div className="expense-list-shimmer">
      {[...Array(5)].map((_, index) => (
        <div key={index} className="shimmer-item">
          <div className="shimmer-header">
            <div className="shimmer-title"></div>
            <div className="shimmer-amount"></div>
          </div>
          <div className="shimmer-details">
            <div className="shimmer-category"></div>
            <div className="shimmer-date"></div>
          </div>
          <div className="shimmer-description"></div>
          <div className="shimmer-actions">
            <div className="shimmer-btn"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Shimmer loader for expense summary
export const ExpenseSummaryShimmer = () => {
  return (
    <div className="expense-summary-shimmer">
      <div className="stats-grid-shimmer">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="stat-card-shimmer">
            <div className="shimmer-stat-title"></div>
            <div className="shimmer-stat-value"></div>
          </div>
        ))}
      </div>
      <div className="chart-shimmer">
        <div className="shimmer-pie-chart"></div>
      </div>
      <div className="table-shimmer">
        <div className="shimmer-table-header"></div>
        {[...Array(5)].map((_, index) => (
          <div key={index} className="shimmer-table-row"></div>
        ))}
      </div>
    </div>
  );
};

export default { ExpenseListShimmer, ExpenseSummaryShimmer };