import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const FilterPanel = ({ isOpen, onClose, className = '' }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const contentTypes = [
    { value: 'politicians', label: 'Politicians' },
    { value: 'issues', label: 'Issues' },
    { value: 'activities', label: 'Activities' },
    { value: 'discussions', label: 'Discussions' }
  ];

  const dateRanges = [
    { value: '', label: 'Any Time' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'year', label: 'This Year' }
  ];

  const locations = [
    { value: '', label: 'All Locations' },
    { value: 'chandigarh', label: 'Chandigarh' },
    { value: 'punjab', label: 'Punjab' },
    { value: 'haryana', label: 'Haryana' },
    { value: 'delhi', label: 'Delhi' },
    { value: 'uttar-pradesh', label: 'Uttar Pradesh' },
    { value: 'maharashtra', label: 'Maharashtra' }
  ];

  const politicalParties = [
    { value: 'bjp', label: 'Bharatiya Janata Party (BJP)' },
    { value: 'congress', label: 'Indian National Congress' },
    { value: 'aap', label: 'Aam Aadmi Party (AAP)' },
    { value: 'sp', label: 'Samajwadi Party' },
    { value: 'bsp', label: 'Bahujan Samaj Party' },
    { value: 'tmc', label: 'All India Trinamool Congress' }
  ];

  const issueCategories = [
    { value: 'infrastructure', label: 'Infrastructure' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'education', label: 'Education' },
    { value: 'transportation', label: 'Transportation' },
    { value: 'environment', label: 'Environment' },
    { value: 'corruption', label: 'Corruption' }
  ];

  const engagementLevels = [
    { value: 'high', label: 'High Engagement (100+ interactions)' },
    { value: 'medium', label: 'Medium Engagement (10-99 interactions)' },
    { value: 'low', label: 'Low Engagement (1-9 interactions)' }
  ];

  const updateFilter = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value && value !== '') {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    navigate(`/search-results?${newParams.toString()}`);
  };

  const toggleContentType = (type, checked) => {
    const currentTypes = searchParams.get('type')?.split(',') || [];
    let newTypes;
    
    if (checked) {
      newTypes = [...currentTypes, type];
    } else {
      newTypes = currentTypes.filter(t => t !== type);
    }
    
    updateFilter('type', newTypes.length > 0 ? newTypes.join(',') : '');
  };

  const clearAllFilters = () => {
    const newParams = new URLSearchParams();
    const query = searchParams.get('q');
    if (query) {
      newParams.set('q', query);
    }
    navigate(`/search-results?${newParams.toString()}`);
  };

  const activeFiltersCount = Array.from(searchParams.entries()).filter(([key]) => key !== 'q').length;
  const selectedTypes = searchParams.get('type')?.split(',') || [];

  return (
    <div className={`bg-card border-r border-border ${className}`}>
      {/* Mobile Header */}
      <div className="lg:hidden flex items-center justify-between p-4 border-b border-border">
        <h3 className="font-heading font-semibold text-lg text-foreground">Filters</h3>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <Icon name="X" size={20} />
        </Button>
      </div>

      {/* Desktop Header */}
      <div className="hidden lg:block p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="font-heading font-semibold text-base text-foreground">Filters</h3>
          {activeFiltersCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              Clear All ({activeFiltersCount})
            </Button>
          )}
        </div>
      </div>

      <div className="p-4 space-y-6 overflow-y-auto max-h-[calc(100vh-200px)]">
        {/* Content Type */}
        <div>
          <h4 className="font-body font-medium text-sm text-foreground mb-3">Content Type</h4>
          <div className="space-y-2">
            {contentTypes.map((type) => (
              <Checkbox
                key={type.value}
                label={type.label}
                checked={selectedTypes.includes(type.value)}
                onChange={(e) => toggleContentType(type.value, e.target.checked)}
                size="sm"
              />
            ))}
          </div>
        </div>

        {/* Date Range */}
        <div>
          <Select
            label="Date Range"
            options={dateRanges}
            value={searchParams.get('date') || ''}
            onChange={(value) => updateFilter('date', value)}
            className="text-sm"
          />
        </div>

        {/* Location */}
        <div>
          <Select
            label="Location"
            options={locations}
            value={searchParams.get('location') || ''}
            onChange={(value) => updateFilter('location', value)}
            searchable
            className="text-sm"
          />
        </div>

        {/* Political Party */}
        <div>
          <Select
            label="Political Party"
            options={politicalParties}
            value={searchParams.get('party') || ''}
            onChange={(value) => updateFilter('party', value)}
            searchable
            className="text-sm"
          />
        </div>

        {/* Issue Category */}
        <div>
          <Select
            label="Issue Category"
            options={issueCategories}
            value={searchParams.get('category') || ''}
            onChange={(value) => updateFilter('category', value)}
            className="text-sm"
          />
        </div>

        {/* Engagement Level */}
        <div>
          <Select
            label="Engagement Level"
            options={engagementLevels}
            value={searchParams.get('engagement') || ''}
            onChange={(value) => updateFilter('engagement', value)}
            className="text-sm"
          />
        </div>

        {/* Mobile Clear All Button */}
        <div className="lg:hidden pt-4 border-t border-border">
          <Button
            variant="outline"
            onClick={clearAllFilters}
            disabled={activeFiltersCount === 0}
            className="w-full"
          >
            Clear All Filters ({activeFiltersCount})
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;