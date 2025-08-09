
import React from 'react';
import { Transaction } from '../types';
import TransactionItem from './TransactionItem';

interface TransactionListProps {
  transactions: Transaction[];
  onDeleteTransaction: (id: string) => void;
  isFiltered: boolean;
  totalUnfilteredTransactions: number;
  viewedMonth: Date;
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions, onDeleteTransaction, isFiltered, totalUnfilteredTransactions, viewedMonth }) => {
  if (totalUnfilteredTransactions === 0) {
    return (
      <div className="text-center py-8">
        <img src="https://picsum.photos/seed/emptyLedgerNow/300/200" alt="거래 없음" className="mx-auto mb-4 rounded-md opacity-75" />
        <p className="text-neutral text-lg">아직 거래 내역이 없습니다. 시작하려면 하나 추가하세요!</p>
      </div>
    );
  }

  if (transactions.length === 0 && isFiltered) {
    return (
      <div className="text-center py-8">
         <img src="https://picsum.photos/seed/filterEmptyNow/300/200" alt="필터 결과 없음" className="mx-auto mb-4 rounded-md opacity-75" />
        <p className="text-neutral text-lg">선택하신 조건에 해당하는 거래 내역이 없습니다.</p>
      </div>
    );
  }
  
  if (transactions.length === 0 && !isFiltered && totalUnfilteredTransactions > 0) {
    return (
      <div className="text-center py-8">
        <img src="https://picsum.photos/seed/genericEmptyNow/300/200" alt="데이터 없음" className="mx-auto mb-4 rounded-md opacity-75" />
        <p className="text-neutral text-lg">표시할 거래 내역이 없습니다.</p>
      </div>
    );
  }

  return (
    <ul className="space-y-1">
      {transactions.map((transaction) => (
        <TransactionItem key={transaction.id} transaction={transaction} onDelete={onDeleteTransaction} />
      ))}
    </ul>
  );
};

export default TransactionList;