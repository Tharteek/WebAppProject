import React from 'react';
import { MapPin, Bed, Bath, Square, DollarSign, Users } from 'lucide-react';
import { Property } from '../../types';

interface PropertyCardProps {
  property: Property;
  onEdit: (id: string) => void;
  onView: (id: string) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property, onEdit, onView }) => {
  const statusColors = {
    available: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    occupied: 'bg-blue-50 text-blue-700 border-blue-200',
    maintenance: 'bg-orange-50 text-orange-700 border-orange-200',
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative">
        <img
          src={property.imageUrl}
          alt={property.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 right-3">
          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusColors[property.status]}`}>
            {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{property.title}</h3>
        <div className="flex items-center text-gray-600 mb-3">
          <MapPin className="w-4 h-4 mr-1" />
          <span className="text-sm">{property.address}, {property.city}</span>
        </div>
        
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="flex items-center text-gray-600">
            <Bed className="w-4 h-4 mr-1" />
            <span className="text-sm">{property.bedrooms} beds</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Bath className="w-4 h-4 mr-1" />
            <span className="text-sm">{property.bathrooms} baths</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Square className="w-4 h-4 mr-1" />
            <span className="text-sm">{property.squareFeet} sq ft</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center text-gray-900">
            <DollarSign className="w-5 h-5 text-emerald-600 mr-1" />
            <span className="text-lg font-bold">${property.monthlyRent}/mo</span>
          </div>
          <span className="text-sm text-gray-500">
            Type: {property.propertyType.charAt(0).toUpperCase() + property.propertyType.slice(1)}
          </span>
        </div>
        
        <div className="flex space-x-2">
          <button
            onClick={() => onView(property.id)}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
          >
            View Details
          </button>
          <button
            onClick={() => onEdit(property.id)}
            className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-200"
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};