import React from 'react';
import { Transaction, TransactionType } from '../types';
import { ArrowUpIcon } from './icons/ArrowUpIcon';
import { ArrowDownIcon } from './icons/ArrowDownIcon';

interface TransactionItemProps {
  transaction: Transaction;
  onDelete: (id: string) => void;
}

const TransactionItem: React.FC<TransactionItemProps> = ({ transaction, onDelete }) => {
  const isIncome = transaction.type === TransactionType.INCOME;
  const amountColor = isIncome ? 'text-success' : 'text-error';
  const IconComponent = isIncome ? ArrowUpIcon : ArrowDownIcon;
  const iconBgColor = isIncome ? 'bg-success-light' : 'bg-error-light';

  return (
    <li className="bg-base-100 p-4 my-2 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
      <div className="flex items-center space-x-3">
        <span className={`p-2 rounded-full ${iconBgColor}`}>
          <IconComponent className={`h-5 w-5 ${amountColor}`} />
        </span>
        <div>
          <p className="font-semibold text-base-content">{transaction.description}</p>
          <p className="text-xs text-neutral">
            {new Date(transaction.date).toLocaleDateString('en-CA')} {/* YYYY-MM-DD format */}
            <span className="mx-1">|</span>
            <span className="bg-base-300 text-neutral-focus px-2 py-0.5 rounded-full text-xs">{transaction.category}</span>
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-3 self-end sm:self-center">
        <p className={`text-lg font-semibold ${amountColor}`}>
          {isIncome ? '+' : '-'}
          {transaction.amount.toLocaleString('ko-KR', { style: 'currency', currency: 'KRW' })}
        </p>
        <button
          onClick={() => onDelete(transaction.id)}
          className="text-neutral hover:text-error transition-colors p-1"
          aria-label="거래 삭제"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12.56 0c.342.052.682.107 1.022.166m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
          </svg>
        </button>
      </div>
    </li>
  );
};

export default TransactionItem;