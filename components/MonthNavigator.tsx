
import React from 'react';
import { ChevronLeftIcon } from './icons/ChevronLeftIcon';
import { ChevronRightIcon } from './icons/ChevronRightIcon';

interface MonthNavigatorProps {
  currentMonth: Date;
  onMonthChange: (newMonth: Date) => void;
}

const MonthNavigator: React.FC<MonthNavigatorProps> = ({ currentMonth, onMonthChange }) => {
  const handlePrevious = () => {
    onMonthChange(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNext = () => {
    onMonthChange(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };
  
  const handleCurrent = () => {
    onMonthChange(new Date());
  };

  const formattedMonth = currentMonth.toLocaleString('ko-KR', {
    year: 'numeric',
    month: 'long',
  });
  
  const isCurrentMonth = () => {
      const today = new Date();
      return today.getFullYear() === currentMonth.getFullYear() && today.getMonth() === currentMonth.getMonth();
  }

  return (
    <div className="flex items-center justify-center gap-2 flex-grow">
      <button onClick={handlePrevious} className="p-2 rounded-full hover:bg-base-200 transition-colors" aria-label="이전 달">
        <ChevronLeftIcon className="h-6 w-6" />
      </button>
      <span className="text-lg font-semibold w-32 text-center tabular-nums">{formattedMonth}</span>
      <button onClick={handleNext} className="p-2 rounded-full hover:bg-base-200 transition-colors" aria-label="다음 달">
        <ChevronRightIcon className="h-6 w-6" />
      </button>
      <button 
        onClick={handleCurrent}
        disabled={isCurrentMonth()}
        className="ml-2 px-3 py-1.5 text-sm font-medium border border-base-300 rounded-lg hover:bg-base-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        이번 달
      </button>
    </div>
  );
};

export default MonthNavigator;
