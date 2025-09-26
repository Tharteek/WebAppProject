import { Property, Tenant, Payment, MaintenanceRequest, DashboardStats } from '../types';

export const mockProperties: Property[] = [
  {
    id: '1',
    title: 'Modern Downtown Apartment',
    address: '123 Main Street',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    propertyType: 'apartment',
    bedrooms: 2,
    bathrooms: 2,
    squareFeet: 1200,
    monthlyRent: 3500,
    securityDeposit: 3500,
    status: 'occupied',
    description: 'Beautiful modern apartment with city views',
    imageUrl: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop',
    dateAdded: '2024-01-15',
    ownerId: 'owner1'
  },
  {
    id: '2',
    title: 'Suburban Family House',
    address: '456 Oak Avenue',
    city: 'Brooklyn',
    state: 'NY',
    zipCode: '11201',
    propertyType: 'house',
    bedrooms: 4,
    bathrooms: 3,
    squareFeet: 2400,
    monthlyRent: 4200,
    securityDeposit: 4200,
    status: 'available',
    description: 'Spacious family home with backyard',
    imageUrl: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop',
    dateAdded: '2024-02-01',
    ownerId: 'owner1'
  },
  {
    id: '3',
    title: 'Cozy Studio Loft',
    address: '789 Pine Street',
    city: 'Manhattan',
    state: 'NY',
    zipCode: '10002',
    propertyType: 'apartment',
    bedrooms: 1,
    bathrooms: 1,
    squareFeet: 650,
    monthlyRent: 2800,
    securityDeposit: 2800,
    status: 'maintenance',
    description: 'Charming studio in trendy neighborhood',
    imageUrl: 'https://images.pexels.com/photos/2029667/pexels-photo-2029667.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop',
    dateAdded: '2024-01-20',
    ownerId: 'owner1'
  },
  {
    id: '4',
    title: 'Luxury Penthouse',
    address: '321 Park Avenue',
    city: 'Manhattan',
    state: 'NY',
    zipCode: '10010',
    propertyType: 'condo',
    bedrooms: 3,
    bathrooms: 3,
    squareFeet: 2000,
    monthlyRent: 8500,
    securityDeposit: 8500,
    status: 'occupied',
    description: 'Luxury penthouse with amazing views',
    imageUrl: 'https://images.pexels.com/photos/2459/stairs-home-loft-lifestyle.jpg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop',
    dateAdded: '2024-01-10',
    ownerId: 'owner1'
  }
];

export const mockTenants: Tenant[] = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Smith',
    email: 'john.smith@email.com',
    phone: '(555) 123-4567',
    propertyId: '1',
    leaseStartDate: '2024-01-01',
    leaseEndDate: '2024-12-31',
    monthlyRent: 3500,
    securityDeposit: 3500,
    status: 'active',
    emergencyContact: {
      name: 'Jane Smith',
      phone: '(555) 987-6543'
    }
  },
  {
    id: '2',
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.johnson@email.com',
    phone: '(555) 234-5678',
    propertyId: '4',
    leaseStartDate: '2024-02-01',
    leaseEndDate: '2025-01-31',
    monthlyRent: 8500,
    securityDeposit: 8500,
    status: 'active',
    emergencyContact: {
      name: 'Mike Johnson',
      phone: '(555) 876-5432'
    }
  },
  {
    id: '3',
    firstName: 'Michael',
    lastName: 'Brown',
    email: 'michael.brown@email.com',
    phone: '(555) 345-6789',
    propertyId: '2',
    leaseStartDate: '2024-03-01',
    leaseEndDate: '2025-02-28',
    monthlyRent: 4200,
    securityDeposit: 4200,
    status: 'applicant',
    emergencyContact: {
      name: 'Lisa Brown',
      phone: '(555) 765-4321'
    }
  }
];

export const mockPayments: Payment[] = [
  {
    id: '1',
    tenantId: '1',
    propertyId: '1',
    amount: 3500,
    dueDate: '2024-01-01',
    paidDate: '2024-01-01',
    status: 'paid',
    type: 'rent',
    description: 'January 2024 Rent'
  },
  {
    id: '2',
    tenantId: '1',
    propertyId: '1',
    amount: 3500,
    dueDate: '2024-02-01',
    status: 'pending',
    type: 'rent',
    description: 'February 2024 Rent'
  },
  {
    id: '3',
    tenantId: '2',
    propertyId: '4',
    amount: 8500,
    dueDate: '2024-01-15',
    status: 'overdue',
    type: 'rent',
    description: 'January 2024 Rent - Late Payment'
  },
  {
    id: '4',
    tenantId: '2',
    propertyId: '4',
    amount: 8500,
    dueDate: '2024-02-01',
    paidDate: '2024-02-01',
    status: 'paid',
    type: 'rent',
    description: 'February 2024 Rent'
  }
];

export const mockMaintenanceRequests: MaintenanceRequest[] = [
  {
    id: '1',
    tenantId: '1',
    propertyId: '1',
    title: 'Leaky Kitchen Faucet',
    description: 'The kitchen faucet has been dripping constantly for the past week.',
    priority: 'medium',
    status: 'submitted',
    dateSubmitted: '2024-01-20',
    category: 'plumbing'
  },
  {
    id: '2',
    tenantId: '2',
    propertyId: '4',
    title: 'Broken Air Conditioning',
    description: 'AC unit stopped working completely. Very urgent as it\'s getting hot.',
    priority: 'urgent',
    status: 'in-progress',
    dateSubmitted: '2024-01-25',
    category: 'hvac'
  },
  {
    id: '3',
    tenantId: '1',
    propertyId: '1',
    title: 'Dishwasher Not Working',
    description: 'Dishwasher won\'t start. All buttons are unresponsive.',
    priority: 'high',
    status: 'completed',
    dateSubmitted: '2024-01-10',
    dateCompleted: '2024-01-15',
    category: 'appliance'
  },
  {
    id: '4',
    tenantId: '2',
    propertyId: '4',
    title: 'Light Fixture Installation',
    description: 'Request to install additional light fixture in the living room.',
    priority: 'low',
    status: 'submitted',
    dateSubmitted: '2024-01-28',
    category: 'electrical'
  }
];

export const mockDashboardStats: DashboardStats = {
  totalProperties: mockProperties.length,
  occupiedProperties: mockProperties.filter(p => p.status === 'occupied').length,
  vacantProperties: mockProperties.filter(p => p.status === 'available').length,
  totalTenants: mockTenants.filter(t => t.status === 'active').length,
  monthlyRevenue: mockTenants
    .filter(t => t.status === 'active')
    .reduce((sum, t) => sum + t.monthlyRent, 0),
  pendingPayments: mockPayments.filter(p => p.status === 'pending').length,
  maintenanceRequests: mockMaintenanceRequests.filter(m => m.status !== 'completed').length,
  occupancyRate: Math.round((mockProperties.filter(p => p.status === 'occupied').length / mockProperties.length) * 100)
};