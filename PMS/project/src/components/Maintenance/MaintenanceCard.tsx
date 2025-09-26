import React from 'react';
import { Calendar, AlertTriangle, Clock, CheckCircle } from 'lucide-react';
import { MaintenanceRequest } from '../../types';

interface MaintenanceCardProps {
  request: MaintenanceRequest;
  tenantName: string;
  propertyTitle: string;
  onUpdateStatus: (id: string, status: MaintenanceRequest['status']) => void;
}

export const MaintenanceCard: React.FC<MaintenanceCardProps> = ({
  request,
  tenantName,
  propertyTitle,
  onUpdateStatus
}) => {
  const priorityColors = {
    low: 'bg-gray-50 text-gray-700 border-gray-200',
    medium: 'bg-blue-50 text-blue-700 border-blue-200',
    high: 'bg-orange-50 text-orange-700 border-orange-200',
    urgent: 'bg-red-50 text-red-700 border-red-200',
  };

  const statusColors = {
    submitted: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    'in-progress': 'bg-blue-50 text-blue-700 border-blue-200',
    completed: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  };

  const statusIcons = {
    submitted: Clock,
    'in-progress': AlertTriangle,
    completed: CheckCircle,
  };

  const StatusIcon = statusIcons[request.status];

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{request.title}</h3>
          <p className="text-sm text-gray-600 mb-2">{tenantName} - {propertyTitle}</p>
          <div className="flex items-center space-x-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${priorityColors[request.priority]}`}>
              {request.priority.toUpperCase()} Priority
            </span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium border flex items-center space-x-1 ${statusColors[request.status]}`}>
              <StatusIcon className="w-3 h-3" />
              <span>{request.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
            </span>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-sm text-gray-700 mb-3">{request.description}</p>
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            <span>Submitted: {new Date(request.dateSubmitted).toLocaleDateString()}</span>
          </div>
          {request.dateCompleted && (
            <div className="flex items-center text-emerald-600">
              <CheckCircle className="w-4 h-4 mr-1" />
              <span>Completed: {new Date(request.dateCompleted).toLocaleDateString()}</span>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-xs text-gray-500 uppercase tracking-wide">
          Category: {request.category}
        </div>
        {request.status !== 'completed' && (
          <select
            value={request.status}
            onChange={(e) => onUpdateStatus(request.id, e.target.value as MaintenanceRequest['status'])}
            className="text-xs border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="submitted">Submitted</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        )}
      </div>
    </div>
  );
};