import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'increase' | 'decrease' | 'neutral';
  icon: LucideIcon;
  color: 'blue' | 'green' | 'orange' | 'purple' | 'red';
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  change,
  changeType = 'neutral',
  icon: Icon,
  color
}) => {
  const colorClasses = {
    blue: 'bg-blue-500 text-blue-50',
    green: 'bg-emerald-500 text-emerald-50',
    orange: 'bg-orange-500 text-orange-50',
    purple: 'bg-purple-500 text-purple-50',
    red: 'bg-red-500 text-red-50',
  };

  const changeClasses = {
    increase: 'text-emerald-600 bg-emerald-50',
    decrease: 'text-red-600 bg-red-50',
    neutral: 'text-gray-600 bg-gray-50',
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mb-2">{value}</p>
          {change && (
            <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${changeClasses[changeType]}`}>
              {change}
            </span>
          )}
        </div>
        <div className={`p-3 rounded-xl ${colorClasses[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
};