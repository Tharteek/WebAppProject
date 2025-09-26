import React, { useState } from 'react';
import { Header } from './components/Layout/Header';
import { Dashboard } from './components/Dashboard/Dashboard';
import { PropertiesView } from './components/Properties/PropertiesView';
import { TenantsView } from './components/Tenants/TenantsView';
import { PaymentsView } from './components/Payments/PaymentsView';
import { MaintenanceView } from './components/Maintenance/MaintenanceView';
import { 
  mockProperties, 
  mockTenants, 
  mockPayments, 
  mockMaintenanceRequests, 
  mockDashboardStats 
} from './data/mockData';

function App() {
  const [currentView, setCurrentView] = useState('dashboard');

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard stats={mockDashboardStats} />;
      case 'properties':
        return <PropertiesView properties={mockProperties} />;
      case 'tenants':
        return <TenantsView tenants={mockTenants} properties={mockProperties} />;
      case 'payments':
        return <PaymentsView 
          payments={mockPayments} 
          tenants={mockTenants} 
          properties={mockProperties} 
        />;
      case 'maintenance':
        return <MaintenanceView 
          requests={mockMaintenanceRequests} 
          tenants={mockTenants} 
          properties={mockProperties} 
        />;
      default:
        return <Dashboard stats={mockDashboardStats} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentView={currentView} onViewChange={setCurrentView} />
      <main className="transition-all duration-300 ease-in-out">
        {renderView()}
      </main>
    </div>
  );
}

export default App;