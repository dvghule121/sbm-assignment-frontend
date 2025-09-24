import { useState } from 'react';
import ExpenseList from '../ExpenseList';
import ExpenseSummary from '../ExpenseSummary';
import Modal from '../ui/Modal';
import AddExpenseForm from '../AddExpenseForm';
import useModal from '../../hooks/useModal';

const MainContent = ({ activeTab }) => {
  const { isOpen: showAddForm, openModal, closeModal } = useModal();
  const [searchTerm, setSearchTerm] = useState('');
  const [refreshExpenses, setRefreshExpenses] = useState(0);

  const handleExpenseAdded = () => {
    setRefreshExpenses(prev => prev + 1);
  };

  const renderExpensesTab = () => {
    return (
      <div className="expenses-tab">
        <div className="tab-header" aria-label="Recent Expenses header">
          <h1 className="app-title">Recent Expenses</h1>
          <div className="tab-actions">
            <div className="search-container">
              <input
                type="text"
                placeholder="Search expenses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
                aria-label="Search expenses"
              />
            </div>
            <button
              onClick={openModal}
              className="add-expense-btn"
              aria-label="Add new expense"
            >
              + Add Expense
            </button>
          </div>
        </div>
        <ExpenseList
          searchTerm={searchTerm}
          refreshTrigger={refreshExpenses}
        />
      </div>
    );
  };

  const renderReportsTab = () => {
    return (
      <div className="reports-tab">
        <div className="tab-header">
          <h1 className='app-title'>Expense Reports & Summary</h1>
        </div>
        <ExpenseSummary />
      </div>
    );
  };

  return (
    <div className="main-content">
      {activeTab === 'expenses' ? renderExpensesTab() : renderReportsTab()}

      <Modal
        isOpen={showAddForm}
        onClose={closeModal}
        title="Add New Expense"
      >
        <AddExpenseForm
          onExpenseAdded={handleExpenseAdded}
          onClose={closeModal}
        />
      </Modal>
    </div>
  );
};

export default MainContent;