import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const ContentFilters = ({ activeFilters, onFilterChange }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const postTypeOptions = [
    { value: 'all', label: 'All Posts' },
    { value: 'news', label: 'News & Updates' },
    { value: 'report', label: 'Citizen Reports' },
    { value: 'discussion', label: 'Discussions' },
    { value: 'announcement', label: 'Announcements' }
  ];

  const timeRangeOptions = [
    { value: 'all', label: 'All Time' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' }
  ];

  const politicalLevelOptions = [
    { value: 'all', label: 'All Levels' },
    { value: 'local', label: 'Local' },
    { value: 'state', label: 'State' },
    { value: 'national', label: 'National' }
  ];

  const sortOptions = [
    { value: 'recent', label: 'Most Recent' },
    { value: 'popular', label: 'Most Popular' },
    { value: 'trending', label: 'Trending' },
    { value: 'relevant', label: 'Most Relevant' }
  ];

  const handleFilterChange = (filterType, value) => {
    onFilterChange({
      ...activeFilters,
      [filterType]: value
    });
  };

  const getActiveFilterCount = () => {
    return Object.values(activeFilters).filter(value => value !== 'all').length;
  };

  const clearAllFilters = () => {
    onFilterChange({
      postType: 'all',
      timeRange: 'all',
      politicalLevel: 'all',
      sortBy: 'recent'
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Icon name="Filter" size={18} className="text-primary" />
          <h3 className="font-heading font-semibold text-sm text-foreground">
            Content Filters
          </h3>
          {getActiveFilterCount() > 0 && (
            <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full font-caption font-medium">
              {getActiveFilterCount()}
            </span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          {getActiveFilterCount() > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="text-xs"
            >
              Clear All
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
            iconPosition="right"
          >
            {isExpanded ? 'Less' : 'More'}
          </Button>
        </div>
      </div>

      {/* Quick Filters */}
      <div className="flex flex-wrap gap-2 mb-3">
        {postTypeOptions.slice(0, 4).map((option) => (
          <button
            key={option.value}
            onClick={() => handleFilterChange('postType', option.value)}
            className={`px-3 py-1.5 rounded-full text-xs font-caption font-medium transition-colors ${
              activeFilters.postType === option.value
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted-foreground/10'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      {/* Expanded Filters */}
      {isExpanded && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-3 border-t border-border animate-slide-up">
          <Select
            label="Post Type"
            options={postTypeOptions}
            value={activeFilters.postType}
            onChange={(value) => handleFilterChange('postType', value)}
            className="text-sm"
          />
          <Select
            label="Time Range"
            options={timeRangeOptions}
            value={activeFilters.timeRange}
            onChange={(value) => handleFilterChange('timeRange', value)}
            className="text-sm"
          />
          <Select
            label="Political Level"
            options={politicalLevelOptions}
            value={activeFilters.politicalLevel}
            onChange={(value) => handleFilterChange('politicalLevel', value)}
            className="text-sm"
          />
          <Select
            label="Sort By"
            options={sortOptions}
            value={activeFilters.sortBy}
            onChange={(value) => handleFilterChange('sortBy', value)}
            className="text-sm"
          />
        </div>
      )}
    </div>
  );
};

export default ContentFilters;