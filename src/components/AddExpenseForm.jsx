import { useState } from 'react';
import useExpenses from '../hooks/useExpenses';

const AddExpenseForm = ({ onExpenseAdded, onClose }) => {
  const [error, setError] = useState('');
  const [newExpense, setNewExpense] = useState({
    title: '',
    amount: '',
    category: '',
    date: new Date().toISOString().split('T')[0],
    description: ''
  });
  const { createExpense, creating } = useExpenses();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const result = await createExpense(newExpense);
    if (result.success) {
      setNewExpense({ 
        title: '', 
        amount: '', 
        category: '', 
        date: new Date().toISOString().split('T')[0],
        description: ''
      });
      if (onExpenseAdded) onExpenseAdded();
      if (onClose) onClose();
    } else {
      // error state is set inside hook; optionally show generic fallback
      setError(prev => prev || 'Failed to add expense. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="expense-form">
      {error && <div className="error">{error}</div>}
      
      <input
        type="text"
        placeholder="Title"
        value={newExpense.title}
        onChange={(e) => setNewExpense({...newExpense, title: e.target.value})}
        required
      />
      
      <input
        type="number"
        step="0.01"
        placeholder="Amount"
        value={newExpense.amount}
        onChange={(e) => setNewExpense({...newExpense, amount: e.target.value})}
        required
      />
      
      <select
        value={newExpense.category}
        onChange={(e) => setNewExpense({...newExpense, category: e.target.value})}
        required
      >
        <option value="">Select Category</option>
        <option value="Food">Food</option>
        <option value="Transport">Transport</option>
        <option value="Entertainment">Entertainment</option>
        <option value="Utilities">Utilities</option>
        <option value="Healthcare">Healthcare</option>
        <option value="Shopping">Shopping</option>
        <option value="Education">Education</option>
        <option value="Other">Other</option>
      </select>
      
      <input
        type="date"
        value={newExpense.date}
        onChange={(e) => setNewExpense({...newExpense, date: e.target.value})}
        required
      />
      
      <input
        type="text"
        placeholder="Description (optional)"
        value={newExpense.description}
        onChange={(e) => setNewExpense({...newExpense, description: e.target.value})}
      />
      
      <button type="submit" className="add-btn" disabled={creating}>{creating ? "Adding" : "Add Expense" }</button>
    </form>
  );
};

export default AddExpenseForm;