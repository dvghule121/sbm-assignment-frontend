import { FaTrash } from 'react-icons/fa';
import useExpenses from '../hooks/useExpenses';
import { ExpenseListShimmer } from './ui/ShimmerLoader';

const ExpenseList = ({ searchTerm, refreshTrigger }) => {

  // hook to manage expenses
  // refreshTrigger is used to refresh the list when an expense is added or deleted
  const { expenses, loading, error, deleteExpense } = useExpenses(refreshTrigger);

  const handleDeleteExpense = async (id) => {
    await deleteExpense(id);
  };

  if (loading) {
    return <ExpenseListShimmer />;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }
  return (
    <div className="expense-container">
      <div className="expense-list">

        {expenses.length === 0 ? (
          <div className="no-expenses">
            <h3>No expenses yet</h3>
            <p>Add your first expense to get started!</p>
          </div>
        ) : (
          expenses
            .filter(expense =>
              !searchTerm ||
              expense.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
              expense.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
              expense.description?.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((expense) => (
              <div key={expense.id} className="expense-item">
                <div className="expense-header">
                  <h3 className="expense-title">{expense.title}</h3>
                  <span className="expense-amount">₹{expense.amount}</span>
                </div>
                <div className="expense-details">
                  <span className="expense-category">{expense.category}</span>
                  <span className="expense-date">{new Date(expense.date).toLocaleDateString()}</span>
                </div>
                {expense.description && (
                  <div className="expense-description">{expense.description}</div>
                )}
                <div className="expense-actions">
                  <button
                    onClick={() => handleDeleteExpense(expense.id)}
                    className="delete-btn"
                    title="Delete expense"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))
        )}
      </div>
    </div>
  );
};

export default ExpenseList;