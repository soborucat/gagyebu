
import { useState, useEffect, useCallback } from 'react';
import { Transaction, TransactionCategory } from '../types';
import { DEFAULT_CATEGORIES, LOCAL_STORAGE_KEY_TRANSACTIONS, LOCAL_STORAGE_KEY_CATEGORIES } from '../constants';

export const useTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [categories, setCategories] = useState<string[]>(DEFAULT_CATEGORIES);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    try {
      const storedTransactions = localStorage.getItem(LOCAL_STORAGE_KEY_TRANSACTIONS);
      if (storedTransactions) {
        setTransactions(JSON.parse(storedTransactions));
      }
      const storedCategories = localStorage.getItem(LOCAL_STORAGE_KEY_CATEGORIES);
      if (storedCategories) {
        const parsedCategories = JSON.parse(storedCategories);
        // Ensure default categories are always present
        setCategories(Array.from(new Set([...DEFAULT_CATEGORIES, ...parsedCategories])));
      } else {
        setCategories(DEFAULT_CATEGORIES);
      }
    } catch (error) {
      console.error("Failed to load data from localStorage:", error);
      // Initialize with empty/default if parsing fails
      setTransactions([]);
      setCategories(DEFAULT_CATEGORIES);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isLoading) { // Only save after initial load
      localStorage.setItem(LOCAL_STORAGE_KEY_TRANSACTIONS, JSON.stringify(transactions));
    }
  }, [transactions, isLoading]);

  useEffect(() => {
    if (!isLoading) { // Only save after initial load
        localStorage.setItem(LOCAL_STORAGE_KEY_CATEGORIES, JSON.stringify(categories));
    }
  }, [categories, isLoading]);

  const addTransaction = useCallback((transaction: Omit<Transaction, 'id'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: `${Date.now().toString()}-${Math.random().toString(36).substring(2, 9)}`,
    };
    setTransactions(prev => [newTransaction, ...prev].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
    
    // Add category if it's new and not empty/whitespace
    if (transaction.category && !categories.includes(transaction.category.trim()) && transaction.category.trim() !== '') {
      setCategories(prev => Array.from(new Set([...prev, transaction.category.trim()])));
    }
  }, [categories]);

  const deleteTransaction = useCallback((id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  }, []);
  
  const addCategory = useCallback((category: string) => {
    const trimmedCategory = category.trim();
    if (trimmedCategory && !categories.includes(trimmedCategory)) {
      setCategories(prev => Array.from(new Set([...prev, trimmedCategory])));
    }
  }, [categories]);

  return { transactions, addTransaction, deleteTransaction, categories, addCategory, isLoading };
};
