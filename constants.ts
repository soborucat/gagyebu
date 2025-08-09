import { TransactionCategory } from './types';

export const DEFAULT_CATEGORIES: TransactionCategory[] = [
  TransactionCategory.FOOD,
  TransactionCategory.TRANSPORT,
  TransactionCategory.HOUSING,
  TransactionCategory.UTILITIES,
  TransactionCategory.ENTERTAINMENT,
  TransactionCategory.HEALTHCARE,
  TransactionCategory.EDUCATION,
  TransactionCategory.SALARY,
  TransactionCategory.INVESTMENT,
  TransactionCategory.GIFTS,
  TransactionCategory.OTHER,
];

export const LOCAL_STORAGE_KEY_TRANSACTIONS = 'householdLedgerTransactions_v1_ko';
export const LOCAL_STORAGE_KEY_CATEGORIES = 'householdLedgerCategories_v1_ko';

export const PIE_CHART_COLORS = [
  '#0EA5E9', // Sky-500 (Primary)
  '#14B8A6', // Teal-500 (Secondary)
  '#F59E0B', // Amber-500 (Accent)
  '#22C55E', // Green-500 (Success)
  '#EF4444', // Red-500 (Error)
  '#8B5CF6', // Violet-500
  '#EC4899', // Pink-500
  '#6366F1', // Indigo-500
  '#F97316', // Orange-500
  '#6B7280', // Gray-500
];