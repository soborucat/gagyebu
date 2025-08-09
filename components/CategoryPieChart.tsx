import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Transaction, TransactionType, ChartDataPoint } from '../types';
import { PIE_CHART_COLORS } from '../constants';


interface CategoryPieChartProps {
  transactions: Transaction[];
  viewedMonth: Date;
}

const CategoryPieChart: React.FC<CategoryPieChartProps> = ({ transactions, viewedMonth }) => {
  const expenseData = transactions
    .filter((t) => t.type === TransactionType.EXPENSE)
    .reduce((acc, curr) => {
      const category = curr.category;
      acc[category] = (acc[category] || 0) + curr.amount;
      return acc;
    }, {} as Record<string, number>);

  const chartData: ChartDataPoint[] = Object.entries(expenseData)
    .map(([name, value]) => ({ name, value }))
    .sort((a,b) => b.value - a.value); // Sort for consistent color assignment potentially

  const formattedMonth = viewedMonth.toLocaleString('ko-KR', {
    year: 'numeric',
    month: 'long',
  });
  const chartTitle = `${formattedMonth} 지출 분석`;

  if (chartData.length === 0) {
    return (
      <div className="bg-base-100 p-6 rounded-xl shadow-card text-center">
        <h2 className="text-2xl font-semibold text-base-content mb-4 text-center">{chartTitle}</h2>
         <img src="https://picsum.photos/seed/noChartsYet/300/200" alt="지출 데이터 없음" className="mx-auto mb-4 rounded-md opacity-75" />
        <p className="text-neutral">해당 월에 표시할 지출 데이터가 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="bg-base-100 p-6 rounded-xl shadow-card">
      <h2 className="text-2xl font-semibold text-base-content mb-4 text-center">{chartTitle}</h2>
      <div style={{ width: '100%', height: 400 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={120}
              fill="#8884d8"
              dataKey="value"
              nameKey="name"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {chartData.map((_entry, index) => (
                <Cell key={`cell-${index}`} fill={PIE_CHART_COLORS[index % PIE_CHART_COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value: number) => value.toLocaleString('ko-KR', { style: 'currency', currency: 'KRW' })}
              contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '0.5rem', backdropFilter: 'blur(5px)' }}
              itemStyle={{ color: '#1f2937'}}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CategoryPieChart;