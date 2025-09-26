import React from 'react';
import { Calendar, DollarSign, AlertCircle, CheckCircle } from 'lucide-react';
import { Payment } from '../../types';

interface PaymentCardProps {
  payment: Payment;
  tenantName: string;
  propertyTitle: string;
  onMarkPaid: (id: string) => void;
}

export const PaymentCard: React.FC<PaymentCardProps> = ({
  payment,
  tenantName,
  propertyTitle,
  onMarkPaid
}) => {
  const statusColors = {
    pending: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    paid: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    overdue: 'bg-red-50 text-red-700 border-red-200',
  };

  const statusIcons = {
    pending: AlertCircle,
    paid: CheckCircle,
    overdue: AlertCircle,
  };

  const StatusIcon = statusIcons[payment.status];

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{tenantName}</h3>
          <p className="text-sm text-gray-600">{propertyTitle}</p>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center space-x-1 ${statusColors[payment.status]}`}>
            <StatusIcon className="w-3 h-3" />
            <span>{payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}</span>
          </span>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center text-gray-600">
            <DollarSign className="w-4 h-4 mr-2 text-emerald-600" />
            <span className="text-sm">Amount</span>
          </div>
          <span className="text-lg font-bold text-gray-900">${payment.amount}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center text-gray-600">
            <Calendar className="w-4 h-4 mr-2" />
            <span className="text-sm">Due Date</span>
          </div>
          <span className="text-sm text-gray-900">{new Date(payment.dueDate).toLocaleDateString()}</span>
        </div>

        {payment.paidDate && (
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Paid Date</span>
            <span className="text-sm text-emerald-600 font-medium">
              {new Date(payment.paidDate).toLocaleDateString()}
            </span>
          </div>
        )}

        <div className="pt-2 border-t border-gray-100">
          <p className="text-sm text-gray-600">{payment.description}</p>
          <p className="text-xs text-gray-500 mt-1">Type: {payment.type.charAt(0).toUpperCase() + payment.type.slice(1)}</p>
        </div>
      </div>

      {payment.status === 'pending' && (
        <button
          onClick={() => onMarkPaid(payment.id)}
          className="w-full bg-emerald-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-emerald-700 transition-colors duration-200"
        >
          Mark as Paid
        </button>
      )}
    </div>
  );
};