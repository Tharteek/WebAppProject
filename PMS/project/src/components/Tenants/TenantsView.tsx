import React, { useState } from 'react';
import { TenantCard } from './TenantCard';
import { Plus, Search, UserPlus } from 'lucide-react';
import { Tenant, Property } from '../../types';

interface TenantsViewProps {
  tenants: Tenant[];
  properties: Property[];
}

export const TenantsView: React.FC<TenantsViewProps> = ({ tenants, properties }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredTenants = tenants.filter(tenant => {
    const matchesSearch = 
      `${tenant.firstName} ${tenant.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tenant.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || tenant.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getPropertyTitle = (propertyId: string) => {
    const property = properties.find(p => p.id === propertyId);
    return property ? property.title : 'Unknown Property';
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Tenants</h2>
          <p className="text-gray-600">Manage your tenant relationships</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2">
          <UserPlus className="w-4 h-4" />
          <span>Add Tenant</span>
        </button>
      </div>

      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search tenants..."
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
          <option value="active">Active</option>
          <option value="applicant">Applicant</option>
          <option value="former">Former</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTenants.map((tenant) => (
          <TenantCard
            key={tenant.id}
            tenant={tenant}
            propertyTitle={getPropertyTitle(tenant.propertyId)}
            onContact={(id) => console.log('Contact tenant:', id)}
            onViewDetails={(id) => console.log('View tenant details:', id)}
          />
        ))}
      </div>

      {filteredTenants.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <UserPlus className="w-12 h-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No tenants found</h3>
          <p className="text-gray-600">Try adjusting your search or add a new tenant.</p>
        </div>
      )}
    </div>
  );
};