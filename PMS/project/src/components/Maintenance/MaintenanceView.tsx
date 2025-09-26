import React, { useState } from 'react';
import { MaintenanceCard } from './MaintenanceCard';
import { Plus, Search, Filter, Wrench } from 'lucide-react';
import { MaintenanceRequest, Tenant, Property } from '../../types';

interface MaintenanceViewProps {
  requests: MaintenanceRequest[];
  tenants: Tenant[];
  properties: Property[];
}

export const MaintenanceView: React.FC<MaintenanceViewProps> = ({ 
  requests, 
  tenants, 
  properties 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');

  const filteredRequests = requests.filter(request => {
    const tenant = tenants.find(t => t.id === request.tenantId);
    const property = properties.find(p => p.id === request.propertyId);
    const tenantName = tenant ? `${tenant.firstName} ${tenant.lastName}` : '';
    const propertyTitle = property?.title || '';
    
    const matchesSearch = 
      request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tenantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      propertyTitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || request.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || request.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getTenantName = (tenantId: string) => {
    const tenant = tenants.find(t => t.id === tenantId);
    return tenant ? `${tenant.firstName} ${tenant.lastName}` : 'Unknown Tenant';
  };

  const getPropertyTitle = (propertyId: string) => {
    const property = properties.find(p => p.id === propertyId);
    return property ? property.title : 'Unknown Property';
  };

  const urgentCount = requests.filter(r => r.priority === 'urgent' && r.status !== 'completed').length;
  const inProgressCount = requests.filter(r => r.status === 'in-progress').length;
  const completedThisMonth = requests.filter(r => {
    const completedDate = r.dateCompleted ? new Date(r.dateCompleted) : null;
    const now = new Date();
    return completedDate && 
           completedDate.getMonth() === now.getMonth() && 
           completedDate.getFullYear() === now.getFullYear();
  }).length;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Maintenance</h2>
          <p className="text-gray-600">Track and manage maintenance requests</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>New Request</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-xl p-6 text-white">
          <div className="flex items-center space-x-2 mb-2">
            <Wrench className="w-5 h-5" />
            <h3 className="text-sm font-medium opacity-90">Urgent Requests</h3>
          </div>
          <p className="text-2xl font-bold">{urgentCount}</p>
        </div>
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <h3 className="text-sm font-medium opacity-90 mb-2">In Progress</h3>
          <p className="text-2xl font-bold">{inProgressCount}</p>
        </div>
        <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl p-6 text-white">
          <h3 className="text-sm font-medium opacity-90 mb-2">Completed This Month</h3>
          <p className="text-2xl font-bold">{completedThisMonth}</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search maintenance requests..."
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
          <option value="submitted">Submitted</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">All Priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
          <option value="urgent">Urgent</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRequests.map((request) => (
          <MaintenanceCard
            key={request.id}
            request={request}
            tenantName={getTenantName(request.tenantId)}
            propertyTitle={getPropertyTitle(request.propertyId)}
            onUpdateStatus={(id, status) => console.log('Update maintenance status:', id, status)}
          />
        ))}
      </div>

      {filteredRequests.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Filter className="w-12 h-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No maintenance requests found</h3>
          <p className="text-gray-600">Try adjusting your filters or create a new request.</p>
        </div>
      )}
    </div>
  );
};