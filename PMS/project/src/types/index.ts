export interface Property {
  id: string;
  title: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  propertyType: 'apartment' | 'house' | 'condo' | 'commercial';
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  monthlyRent: number;
  securityDeposit: number;
  status: 'available' | 'occupied' | 'maintenance';
  description: string;
  imageUrl: string;
  dateAdded: string;
  ownerId: string;
}

export interface Tenant {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  propertyId: string;
  leaseStartDate: string;
  leaseEndDate: string;
  monthlyRent: number;
  securityDeposit: number;
  status: 'active' | 'former' | 'applicant';
  emergencyContact: {
    name: string;
    phone: string;
  };
}

export interface Payment {
  id: string;
  tenantId: string;
  propertyId: string;
  amount: number;
  dueDate: string;
  paidDate?: string;
  status: 'pending' | 'paid' | 'overdue';
  type: 'rent' | 'deposit' | 'fee';
  description: string;
}

export interface MaintenanceRequest {
  id: string;
  tenantId: string;
  propertyId: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'submitted' | 'in-progress' | 'completed';
  dateSubmitted: string;
  dateCompleted?: string;
  category: 'plumbing' | 'electrical' | 'hvac' | 'appliance' | 'structural' | 'other';
}

export interface DashboardStats {
  totalProperties: number;
  occupiedProperties: number;
  vacantProperties: number;
  totalTenants: number;
  monthlyRevenue: number;
  pendingPayments: number;
  maintenanceRequests: number;
  occupancyRate: number;
}