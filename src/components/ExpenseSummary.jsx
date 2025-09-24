import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
// removed: import { expenseAPI } from '../services/api';
import useExpenseSummary from '../hooks/useExpenseSummary';
import { ExpenseSummaryShimmer } from './ui/ShimmerLoader';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const ExpenseSummary = () => {
  const { summaryData, loading, error, metrics } = useExpenseSummary();

  if (loading) return <ExpenseSummaryShimmer />;
  if (error) return <div className="error">{error}</div>;
  if (summaryData.length === 0) return <div className="no-data">No expense data available for summary</div>;

  const { totalAmount, topCategory, categoryCount, avgPerExpense, topCategoryAmount, topPercent } = metrics;

  // Prepare data for pie chart
  const chartData = {
    labels: summaryData.map(item => item.category),
    datasets: [
      {
        label: 'Expenses by Category',
        data: summaryData.map(item => parseFloat(item.total_amount)),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
          '#FF6384',
          '#C9CBCF'
        ],
        borderColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
          '#FF6384',
          '#C9CBCF'
        ],
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          padding: 20,
          usePointStyle: true,
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.parsed;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: ₹${value.toFixed(2)} (${percentage}%)`;
          }
        }
      }
    }
  };

  return (
    <div className="expense-summary">
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-title">Total Spent</div>
          <div className="stat-value">₹{totalAmount.toFixed(2)}</div>
        </div>
        <div className="stat-card">
          <div className="stat-title">Top Category</div>
          <div className="stat-value">{topCategory.category}</div>
          <div className="stat-sub">₹{topCategoryAmount.toFixed(2)} ({topPercent}%)</div>
        </div>
        <div className="stat-card">
          <div className="stat-title">Categories</div>
          <div className="stat-value">{categoryCount}</div>
        </div>
        <div className="stat-card">
          <div className="stat-title">Avg/Expense</div>
          <div className="stat-value">₹{avgPerExpense.toFixed(2)}</div>
        </div>
      </div>

      <div className="chart-container">
        <div className="pie-chart">
          <Pie data={chartData} options={chartOptions} />
        </div>
      </div>

      <div className="summary-table">
        <h3>Category Breakdown</h3>
        <table>
          <thead>
            <tr>
              <th>Category</th>
              <th>Amount</th>
              <th>Count</th>
              <th>Percentage</th>
            </tr>
          </thead>
          <tbody>
            {summaryData.map((item, index) => (
              <tr key={index}>
                <td>{item.category}</td>
                <td>₹{parseFloat(item.total_amount).toFixed(2)}</td>
                <td>{item.count}</td>
                <td>{((parseFloat(item.total_amount) / totalAmount) * 100).toFixed(1)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExpenseSummary;