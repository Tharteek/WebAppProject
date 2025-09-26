import React from 'react';
import { StatsCard } from './StatsCard';
import { Building2, Users, DollarSign, Wrench, TrendingUp, AlertTriangle } from 'lucide-react';
import { DashboardStats } from '../../types';

interface DashboardProps {
  stats: DashboardStats;
}

export const Dashboard: React.FC<DashboardProps> = ({ stats }) => {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Dashboard Overview</h2>
        <p className="text-gray-600">Welcome back! Here's what's happening with your properties.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Properties"
          value={stats.totalProperties}
          change="+2 this month"
          changeType="increase"
          icon={Building2}
          color="blue"
        />
        <StatsCard
          title="Active Tenants"
          value={stats.totalTenants}
          change="98% occupancy"
          changeType="increase"
          icon={Users}
          color="green"
        />
        <StatsCard
          title="Monthly Revenue"
          value={`$${stats.monthlyRevenue.toLocaleString()}`}
          change="+8.2% from last month"
          changeType="increase"
          icon={DollarSign}
          color="purple"
        />
        <StatsCard
          title="Pending Maintenance"
          value={stats.maintenanceRequests}
          change="2 urgent"
          changeType="neutral"
          icon={Wrench}
          color="orange"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Property Performance</h3>
            <TrendingUp className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Occupancy Rate</span>
              <span className="text-sm font-medium text-gray-900">{stats.occupancyRate}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-emerald-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${stats.occupancyRate}%` }}
              ></div>
            </div>
            <div className="pt-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Occupied: {stats.occupiedProperties}</span>
                <span className="text-gray-600">Vacant: {stats.vacantProperties}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
            <AlertTriangle className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <p className="text-sm text-gray-700">New tenant application received</p>
              <span className="text-xs text-gray-500 ml-auto">2h ago</span>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-orange-50 rounded-lg">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <p className="text-sm text-gray-700">Maintenance request submitted</p>
              <span className="text-xs text-gray-500 ml-auto">4h ago</span>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
              <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
              <p className="text-sm text-gray-700">Rent payment received</p>
              <span className="text-xs text-gray-500 ml-auto">1d ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};