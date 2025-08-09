export enum TransactionType {
  INCOME = '수입',
  EXPENSE = '지출',
}

export enum TransactionCategory {
  FOOD = '음식',
  TRANSPORT = '교통',
  HOUSING = '주거',
  UTILITIES = '공과금',
  ENTERTAINMENT = '오락',
  HEALTHCARE = '건강관리',
  EDUCATION = '교육',
  SALARY = '급여',
  INVESTMENT = '투자',
  GIFTS = '선물',
  OTHER = '기타',
}

export interface Transaction {
  id: string;
  date: string; // YYYY-MM-DD
  description: string;
  amount: number;
  type: TransactionType;
  category: TransactionCategory | string; // Allow custom categories as strings
}

export interface ChartDataPoint {
  name: string;
  value: number;
}