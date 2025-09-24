import { useState, useEffect, useCallback } from 'react';
import { expenseAPI } from '../services/api';

export default function useExpenseSummary() {
  const [summaryData, setSummaryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchSummary = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const response = await expenseAPI.getSummary();
      setSummaryData(response.data);
    } catch (err) {
      console.error('Error fetching summary:', err);
      setError('Failed to load expense summary');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSummary();
  }, [fetchSummary]);

  const totalAmount = summaryData.reduce((sum, item) => sum + parseFloat(item.total_amount), 0);
  const totalCount = summaryData.reduce((sum, item) => sum + (parseInt(item.count, 10) || 0), 0);
  const topCategory = summaryData[0]
    ? summaryData.reduce((prev, curr) => parseFloat(curr.total_amount) > parseFloat(prev.total_amount) ? curr : prev, summaryData[0])
    : { category: '-', total_amount: 0, count: 0 };
  const categoryCount = summaryData.length;
  const avgPerExpense = totalCount ? totalAmount / totalCount : 0;
  const topCategoryAmount = parseFloat(topCategory.total_amount || 0);
  const topPercent = totalAmount ? ((topCategoryAmount / totalAmount) * 100).toFixed(1) : '0.0';

  return {
    summaryData,
    loading,
    error,
    refresh: fetchSummary,
    metrics: {
      totalAmount,
      totalCount,
      topCategory,
      categoryCount,
      avgPerExpense,
      topCategoryAmount,
      topPercent,
    }
  };
}