import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const SortControls = ({ className = '' }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const sortOptions = [
    { value: 'relevance', label: 'Most Relevant' },
    { value: 'recent', label: 'Most Recent' },
    { value: 'popular', label: 'Most Popular' },
    { value: 'engagement', label: 'Most Engaged' },
    { value: 'proximity', label: 'Nearest Location' }
  ];

  const viewOptions = [
    { value: 'card', label: 'Card View' },
    { value: 'list', label: 'List View' },
    { value: 'compact', label: 'Compact View' }
  ];

  const updateSort = (value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value && value !== 'relevance') {
      newParams.set('sort', value);
    } else {
      newParams.delete('sort');
    }
    navigate(`/search-results?${newParams.toString()}`);
  };

  const updateView = (value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value && value !== 'card') {
      newParams.set('view', value);
    } else {
      newParams.delete('view');
    }
    navigate(`/search-results?${newParams.toString()}`);
  };

  const currentSort = searchParams.get('sort') || 'relevance';
  const currentView = searchParams.get('view') || 'card';

  return (
    <div className={`flex items-center justify-between bg-muted/30 px-4 py-3 border-b border-border ${className}`}>
      <div className="flex items-center space-x-4">
        {/* Sort By */}
        <div className="flex items-center space-x-2">
          <Icon name="ArrowUpDown" size={16} className="text-muted-foreground" />
          <Select
            options={sortOptions}
            value={currentSort}
            onChange={updateSort}
            className="min-w-[140px]"
          />
        </div>

        {/* Active Sort Indicator */}
        {currentSort !== 'relevance' && (
          <div className="flex items-center space-x-1 text-primary">
            <Icon name="Check" size={14} />
            <span className="font-caption text-xs">
              Sorted by {sortOptions.find(opt => opt.value === currentSort)?.label}
            </span>
          </div>
        )}
      </div>

      {/* View Options - Desktop Only */}
      <div className="hidden md:flex items-center space-x-2">
        <Icon name="LayoutGrid" size={16} className="text-muted-foreground" />
        <Select
          options={viewOptions}
          value={currentView}
          onChange={updateView}
          className="min-w-[120px]"
        />
      </div>
    </div>
  );
};

export default SortControls;