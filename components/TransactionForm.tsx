import React, { useState, useEffect } from 'react';
import { Transaction, TransactionType, TransactionCategory } from '../types';
import { PlusIcon } from './icons/PlusIcon';

interface TransactionFormProps {
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  categories: string[];
  addCategory: (category: string) => void;
}

const TransactionForm: React.FC<TransactionFormProps> = ({ addTransaction, categories, addCategory }) => {
  const today = new Date().toISOString().split('T')[0];
  const [date, setDate] = useState<string>(today);
  const [description, setDescription] = useState<string>('');
  const [amount, setAmount] = useState<string>(''); // Store as string to handle empty input
  const [type, setType] = useState<TransactionType>(TransactionType.EXPENSE);
  const [category, setCategory] = useState<string>(TransactionCategory.FOOD);
  const [customCategory, setCustomCategory] = useState<string>('');
  const [showCustomCategoryInput, setShowCustomCategoryInput] = useState<boolean>(false);

  const availableCategories = Array.from(new Set([...Object.values(TransactionCategory), ...categories]));

  useEffect(() => {
    // Set default category based on type
    if (type === TransactionType.INCOME) {
      setCategory(TransactionCategory.SALARY);
    } else {
      setCategory(TransactionCategory.FOOD);
    }
  }, [type]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numericAmount = parseFloat(amount);
    if (!description || isNaN(numericAmount) || numericAmount <= 0) {
      alert('모든 필드를 올바르게 입력해주세요. 금액은 양수여야 합니다.');
      return;
    }

    let finalCategory = category;
    if (category === '---ADD_NEW---') {
        if (!customCategory.trim()) {
            alert('새 카테고리 이름을 입력해주세요.');
            return;
        }
        finalCategory = customCategory.trim();
        addCategory(finalCategory);
    }
    
    addTransaction({ date, description, amount: numericAmount, type, category: finalCategory });
    
    // Reset form
    setDate(today);
    setDescription('');
    setAmount('');
    setType(TransactionType.EXPENSE);
    setCategory(type === TransactionType.INCOME ? TransactionCategory.SALARY : TransactionCategory.FOOD);
    setCustomCategory('');
    setShowCustomCategoryInput(false);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === '---ADD_NEW---') {
        setShowCustomCategoryInput(true);
        setCategory(value); // Keep select on "Add New"
    } else {
        setShowCustomCategoryInput(false);
        setCategory(value);
    }
  };

  const inputBaseClass = "w-full p-3 border border-base-300 rounded-lg shadow-sm focus:ring-2 focus:ring-primary-focus focus:border-primary-focus transition-colors duration-150 bg-base-100";
  const labelBaseClass = "block text-sm font-medium text-neutral mb-1";

  return (
    <div className="bg-base-100 p-6 mb-8 rounded-xl shadow-card">
      <h2 className="text-2xl font-semibold text-base-content mb-6">새 거래 추가</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="date" className={labelBaseClass}>날짜</label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className={inputBaseClass}
              required
            />
          </div>
          <div>
            <label htmlFor="description" className={labelBaseClass}>설명</label>
            <input
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="예: 식료품, 급여"
              className={inputBaseClass}
              required
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="amount" className={labelBaseClass}>금액</label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              step="0.01"
              min="0.01"
              className={inputBaseClass}
              required
            />
          </div>
          <div>
            <label htmlFor="type" className={labelBaseClass}>유형</label>
            <select
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value as TransactionType)}
              className={`${inputBaseClass} appearance-none`}
            >
              <option value={TransactionType.INCOME}>수입</option>
              <option value={TransactionType.EXPENSE}>지출</option>
            </select>
          </div>
        </div>
        <div>
          <label htmlFor="category" className={labelBaseClass}>카테고리</label>
          <select
            id="category"
            value={category}
            onChange={handleCategoryChange}
            className={`${inputBaseClass} appearance-none`}
          >
            {availableCategories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
            <option value="---ADD_NEW---">-- 새 카테고리 추가 --</option>
          </select>
        </div>

        {showCustomCategoryInput && (
            <div>
                <label htmlFor="customCategory" className={labelBaseClass}>새 카테고리 이름</label>
                <input
                type="text"
                id="customCategory"
                value={customCategory}
                onChange={(e) => setCustomCategory(e.target.value)}
                placeholder="새 카테고리 이름을 입력하세요"
                className={inputBaseClass}
                />
            </div>
        )}

        <button
          type="submit"
          className="w-full flex items-center justify-center bg-primary hover:bg-primary-focus text-primary-content font-semibold py-3 px-4 rounded-lg shadow-md transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-focus focus:ring-opacity-50"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          거래 추가
        </button>
      </form>
    </div>
  );
};

export default TransactionForm;