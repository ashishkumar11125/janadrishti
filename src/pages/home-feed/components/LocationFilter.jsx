import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LocationFilter = ({ currentLocation, onLocationChange }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const locations = [
    { id: 'chandigarh', name: 'Chandigarh', type: 'city' },
    { id: 'punjab', name: 'Punjab', type: 'state' },
    { id: 'haryana', name: 'Haryana', type: 'state' },
    { id: 'delhi', name: 'Delhi', type: 'city' },
    { id: 'national', name: 'National', type: 'country' }
  ];

  const handleLocationSelect = (location) => {
    onLocationChange(location);
    setIsExpanded(false);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Icon name="MapPin" size={18} className="text-primary" />
          <h3 className="font-heading font-semibold text-sm text-foreground">
            Your Location
          </h3>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
          iconPosition="right"
        >
          Change
        </Button>
      </div>

      <div className="flex items-center space-x-2 mb-3">
        <div className="w-2 h-2 bg-success rounded-full" />
        <span className="font-body text-sm text-foreground">
          {currentLocation.name}
        </span>
        <span className="font-caption text-xs text-muted-foreground px-2 py-1 bg-muted rounded-full">
          {currentLocation.type}
        </span>
      </div>

      {isExpanded && (
        <div className="space-y-2 animate-slide-up">
          {locations.map((location) => (
            <button
              key={location.id}
              onClick={() => handleLocationSelect(location)}
              className={`w-full flex items-center justify-between p-2 rounded-md transition-colors hover:bg-muted ${
                currentLocation.id === location.id ? 'bg-primary/10 border border-primary/20' : ''
              }`}
            >
              <div className="flex items-center space-x-2">
                <span className="font-body text-sm text-foreground">
                  {location.name}
                </span>
                <span className="font-caption text-xs text-muted-foreground">
                  {location.type}
                </span>
              </div>
              {currentLocation.id === location.id && (
                <Icon name="Check" size={16} className="text-primary" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LocationFilter;