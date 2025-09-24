import { useState, useEffect, useCallback } from 'react';
import { expenseAPI } from '../services/api';

export default function useExpenses(refreshTrigger) {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [creating, setCreating] = useState(false);

  const fetchExpenses = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const response = await expenseAPI.getExpenses();
      setExpenses(response.data.results || response.data);
    } catch (err) {
      console.error('Error fetching expenses:', err);
      setError('Failed to load expenses');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses, refreshTrigger]);

  const createExpense = useCallback(async (expense) => {
    setError('');
    setCreating(true);
    try {
      await expenseAPI.createExpense(expense);
      await fetchExpenses();
      return { success: true };
    } catch (err) {
      console.error('Error adding expense:', err);
      if (err.response?.data) {
        const errorMessages = Object.values(err.response.data).flat();
        setError(errorMessages.join(', '));
      } else {
        setError('Failed to add expense. Please try again.');
      }
    } finally {
      setCreating(false);
    }
    return { success: false };
  }, [fetchExpenses]);

  const updateExpense = useCallback(async (id, expense) => {
    setError('');
    try {
      await expenseAPI.updateExpense(id, expense);
      await fetchExpenses();
      return { success: true };
    } catch (err) {
      console.error('Error updating expense:', err);
      setError('Failed to update expense.');
      return { success: false };
    }
  }, [fetchExpenses]);

  const deleteExpense = useCallback(async (id) => {
    setError('');
    try {
      await expenseAPI.deleteExpense(id);
      await fetchExpenses();
      return { success: true };
    } catch (err) {
      console.error('Error deleting expense:', err);
      setError('Failed to delete expense.');
      return { success: false };
    }
  }, [fetchExpenses]);

  const refresh = useCallback(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  return {
    expenses,
    loading,
    error,
    refresh,
    creating,
    createExpense,
    updateExpense,
    deleteExpense,
  };
}