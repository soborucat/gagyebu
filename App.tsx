
import React, { useMemo, useState } from 'react';
import Header from './components/Header';
import SummaryCard from './components/SummaryCard';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import CategoryPieChart from './components/CategoryPieChart';
import Footer from './components/Footer';
import { useTransactions } from './hooks/useTransactions';
import { TransactionType } from './types';
import { ArrowUpIcon } from './components/icons/ArrowUpIcon';
import { ArrowDownIcon } from './components/icons/ArrowDownIcon';
import { WalletIcon } from './components/icons/WalletIcon';
import LoadingSpinner from './components/LoadingSpinner';
import MonthNavigator from './components/MonthNavigator';

const App: React.FC = () => {
  const { transactions, addTransaction, deleteTransaction, categories, addCategory, isLoading: isLoadingTransactions } = useTransactions();
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string | null>(null);
  const [viewedMonth, setViewedMonth] = useState(new Date());

  const summary = useMemo(() => {
    let totalIncome = 0;
    let totalExpenses = 0;
    transactions.forEach(t => {
      if (t.type === TransactionType.INCOME) {
        totalIncome += t.amount;
      } else {
        totalExpenses += t.amount;
      }
    });
    return {
      income: totalIncome,
      expenses: totalExpenses,
      balance: totalIncome - totalExpenses,
    };
  }, [transactions]);

  const filteredTransactions = useMemo(() => {
    const year = viewedMonth.getFullYear();
    const month = viewedMonth.getMonth();

    const monthlyFiltered = transactions.filter(t => {
      // 'YYYY-MM-DD' 문자열에서 연도와 월을 추출하여 비교 (시간대 문제 방지)
      const [tYear, tMonth] = t.date.split('-').map(Number);
      return tYear === year && (tMonth - 1) === month;
    });

    if (!selectedCategoryFilter) {
      return monthlyFiltered;
    }
    return monthlyFiltered.filter(t => t.category === selectedCategoryFilter);
  }, [transactions, viewedMonth, selectedCategoryFilter]);
  
  const isCurrentMonthView = useMemo(() => {
    const today = new Date();
    return today.getFullYear() === viewedMonth.getFullYear() && today.getMonth() === viewedMonth.getMonth();
  }, [viewedMonth]);

  const sortedCategories = useMemo(() => {
    return [...categories].sort((a, b) => a.localeCompare(b, 'ko'));
  }, [categories]);

  if (isLoadingTransactions) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-base-200">
        <LoadingSpinner />
        <p className="mt-4 text-lg text-neutral">금융 데이터를 불러오는 중입니다...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-base-200">
      <Header />
      <main className="container mx-auto p-4 sm:p-6 lg:p-8 flex-grow">
        {/* Summary Section */}
        <section id="summary" className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <SummaryCard 
              title="총 수입" 
              amount={summary.income} 
              icon={<ArrowUpIcon />} 
              iconBgClass="bg-success-light"
              textColorClass="text-success" 
            />
            <SummaryCard 
              title="총 지출" 
              amount={summary.expenses} 
              icon={<ArrowDownIcon />} 
              iconBgClass="bg-error-light"
              textColorClass="text-error"
            />
            <SummaryCard 
              title="순 잔액" 
              amount={summary.balance} 
              icon={<WalletIcon />} 
              iconBgClass={summary.balance >= 0 ? 'bg-teal-100' : 'bg-error-light'} // Using teal for balance as secondary
              textColorClass={summary.balance >= 0 ? 'text-secondary' : 'text-error'}
            />
          </div>
        </section>

        {/* Form and Chart Section */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-8">
          <div className="lg:col-span-3">
            <section id="add-transaction">
              <TransactionForm addTransaction={addTransaction} categories={categories} addCategory={addCategory}/>
            </section>
          </div>
          <div className="lg:col-span-2">
            <section id="expense-chart">
              <CategoryPieChart transactions={filteredTransactions} viewedMonth={viewedMonth} />
            </section>
          </div>
        </div>

        {/* Transaction List Section */}
        <section id="transaction-list" className="bg-base-100 p-6 rounded-xl shadow-card">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
            <h2 className="text-2xl font-semibold text-base-content mb-3 sm:mb-0">거래 내역</h2>
            
            <MonthNavigator
              currentMonth={viewedMonth}
              onMonthChange={setViewedMonth}
            />

            <div className="w-full sm:w-auto">
              <label htmlFor="category-filter" className="sr-only">카테고리 필터</label>
              <select
                id="category-filter"
                value={selectedCategoryFilter || 'ALL'}
                onChange={(e) => setSelectedCategoryFilter(e.target.value === 'ALL' ? null : e.target.value)}
                className="w-full sm:w-48 p-2.5 border border-base-300 rounded-lg shadow-sm focus:ring-2 focus:ring-primary-focus focus:border-primary-focus bg-base-100 text-sm appearance-none"
              >
                <option value="ALL">모든 카테고리</option>
                {sortedCategories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>
          <TransactionList 
            transactions={filteredTransactions} 
            onDeleteTransaction={deleteTransaction}
            isFiltered={selectedCategoryFilter !== null || !isCurrentMonthView}
            totalUnfilteredTransactions={transactions.length}
            viewedMonth={viewedMonth}
          />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default App;