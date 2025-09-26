import React from 'react';
import { Mail, Phone, Calendar, DollarSign, MapPin } from 'lucide-react';
import { Tenant } from '../../types';

interface TenantCardProps {
  tenant: Tenant;
  propertyTitle: string;
  onContact: (id: string) => void;
  onViewDetails: (id: string) => void;
}

export const TenantCard: React.FC<TenantCardProps> = ({ 
  tenant, 
  propertyTitle, 
  onContact, 
  onViewDetails 
}) => {
  const statusColors = {
    active: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    former: 'bg-gray-50 text-gray-700 border-gray-200',
    applicant: 'bg-blue-50 text-blue-700 border-blue-200',
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
            {getInitials(tenant.firstName, tenant.lastName)}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {tenant.firstName} {tenant.lastName}
            </h3>
            <div className="flex items-center text-gray-600 text-sm">
              <MapPin className="w-3 h-3 mr-1" />
              {propertyTitle}
            </div>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusColors[tenant.status]}`}>
          {tenant.status.charAt(0).toUpperCase() + tenant.status.slice(1)}
        </span>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center text-gray-600">
          <Mail className="w-4 h-4 mr-2" />
          <span className="text-sm">{tenant.email}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <Phone className="w-4 h-4 mr-2" />
          <span className="text-sm">{tenant.phone}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <Calendar className="w-4 h-4 mr-2" />
          <span className="text-sm">Lease: {new Date(tenant.leaseStartDate).toLocaleDateString()} - {new Date(tenant.leaseEndDate).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center text-gray-900">
          <DollarSign className="w-4 h-4 mr-2 text-emerald-600" />
          <span className="text-sm font-medium">${tenant.monthlyRent}/month</span>
        </div>
      </div>

      <div className="flex space-x-2">
        <button
          onClick={() => onContact(tenant.id)}
          className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 text-sm"
        >
          Contact
        </button>
        <button
          onClick={() => onViewDetails(tenant.id)}
          className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-200 text-sm"
        >
          View Details
        </button>
      </div>
    </div>
  );
};