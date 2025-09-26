import React, { useState } from 'react';
import { PaymentCard } from './PaymentCard';
import { Plus, Search, Filter } from 'lucide-react';
import { Payment, Tenant, Property } from '../../types';

interface PaymentsViewProps {
  payments: Payment[];
  tenants: Tenant[];
  properties: Property[];
}

export const PaymentsView: React.FC<PaymentsViewProps> = ({ payments, tenants, properties }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredPayments = payments.filter(payment => {
    const tenant = tenants.find(t => t.id === payment.tenantId);
    const property = properties.find(p => p.id === payment.propertyId);
    const tenantName = tenant ? `${tenant.firstName} ${tenant.lastName}` : '';
    const propertyTitle = property?.title || '';
    
    const matchesSearch = 
      tenantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      propertyTitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || payment.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getTenantName = (tenantId: string) => {
    const tenant = tenants.find(t => t.id === tenantId);
    return tenant ? `${tenant.firstName} ${tenant.lastName}` : 'Unknown Tenant';
  };

  const getPropertyTitle = (propertyId: string) => {
    const property = properties.find(p => p.id === propertyId);
    return property ? property.title : 'Unknown Property';
  };

  const totalPending = payments
    .filter(p => p.status === 'pending')
    .reduce((sum, p) => sum + p.amount, 0);

  const totalOverdue = payments
    .filter(p => p.status === 'overdue')
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Payments</h2>
          <p className="text-gray-600">Track rent payments and financial transactions</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Record Payment</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl p-6 text-white">
          <h3 className="text-sm font-medium opacity-90 mb-1">Total Collected</h3>
          <p className="text-2xl font-bold">
            ${payments.filter(p => p.status === 'paid').reduce((sum, p) => sum + p.amount, 0).toLocaleString()}
          </p>
        </div>
        <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl p-6 text-white">
          <h3 className="text-sm font-medium opacity-90 mb-1">Pending</h3>
          <p className="text-2xl font-bold">${totalPending.toLocaleString()}</p>
        </div>
        <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-xl p-6 text-white">
          <h3 className="text-sm font-medium opacity-90 mb-1">Overdue</h3>
          <p className="text-2xl font-bold">${totalOverdue.toLocaleString()}</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search payments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="paid">Paid</option>
          <option value="overdue">Overdue</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPayments.map((payment) => (
          <PaymentCard
            key={payment.id}
            payment={payment}
            tenantName={getTenantName(payment.tenantId)}
            propertyTitle={getPropertyTitle(payment.propertyId)}
            onMarkPaid={(id) => console.log('Mark payment as paid:', id)}
          />
        ))}
      </div>

      {filteredPayments.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Filter className="w-12 h-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No payments found</h3>
          <p className="text-gray-600">Try adjusting your search or record a new payment.</p>
        </div>
      )}
    </div>
  );
};