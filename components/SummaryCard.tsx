import React from 'react';

interface SummaryCardProps {
  title: string;
  amount: number;
  icon: React.ReactElement<React.SVGProps<SVGSVGElement>>;
  iconBgClass: string; // e.g., 'bg-success-light'
  textColorClass: string; // e.g., 'text-success'
}

const SummaryCard: React.FC<SummaryCardProps> = ({ title, amount, icon, iconBgClass, textColorClass }) => {
  return (
    <div className="bg-base-100 p-6 rounded-xl shadow-card hover:shadow-card-hover flex items-center space-x-4 transform hover:scale-105 transition-transform duration-200">
      <div className={`p-3 rounded-full ${iconBgClass}`}>
        {React.cloneElement(icon, { className: `h-8 w-8 ${textColorClass}` })}
      </div>
      <div>
        <p className="text-sm text-neutral font-medium">{title}</p>
        <p className={`text-2xl font-bold ${textColorClass}`}>
          {amount.toLocaleString('ko-KR', { style: 'currency', currency: 'KRW' })}
        </p>
      </div>
    </div>
  );
};

export default SummaryCard;