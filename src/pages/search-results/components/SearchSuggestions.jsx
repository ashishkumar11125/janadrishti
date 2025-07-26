import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SearchSuggestions = ({ className = '' }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const relatedSearches = [
    "Infrastructure development projects",
    "Local election candidates 2024",
    "Water supply issues Chandigarh",
    "MP Sharma recent activities",
    "Road repair complaints",
    "Healthcare facility improvements"
  ];

  const trendingQueries = [
    { query: "Budget 2024 announcements", trend: "up", count: "2.3k searches" },
    { query: "Municipal election updates", trend: "up", count: "1.8k searches" },
    { query: "Pollution control measures", trend: "stable", count: "1.2k searches" },
    { query: "Public transport expansion", trend: "up", count: "980 searches" },
    { query: "Digital governance initiatives", trend: "down", count: "750 searches" }
  ];

  const quickFilters = [
    { label: "This Week", params: { date: 'week' } },
    { label: "My Location", params: { location: 'chandigarh' } },
    { label: "High Priority", params: { engagement: 'high' } },
    { label: "Politicians Only", params: { type: 'politicians' } },
    { label: "Resolved Issues", params: { status: 'resolved' } }
  ];

  const handleRelatedSearch = (query) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('q', query);
    navigate(`/search-results?${newParams.toString()}`);
  };

  const handleQuickFilter = (filterParams) => {
    const newParams = new URLSearchParams(searchParams);
    Object.entries(filterParams).forEach(([key, value]) => {
      newParams.set(key, value);
    });
    navigate(`/search-results?${newParams.toString()}`);
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up':
        return 'TrendingUp';
      case 'down':
        return 'TrendingDown';
      default:
        return 'Minus';
    }
  };

  const getTrendColor = (trend) => {
    switch (trend) {
      case 'up':
        return 'text-success';
      case 'down':
        return 'text-error';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <div className={`bg-card border border-border rounded-lg p-6 ${className}`}>
      {/* Quick Filters */}
      <div className="mb-8">
        <h3 className="font-heading font-semibold text-base text-foreground mb-4">
          Quick Filters
        </h3>
        <div className="flex flex-wrap gap-2">
          {quickFilters.map((filter, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              onClick={() => handleQuickFilter(filter.params)}
              className="text-xs"
            >
              {filter.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Related Searches */}
      <div className="mb-8">
        <h3 className="font-heading font-semibold text-base text-foreground mb-4">
          Related Searches
        </h3>
        <div className="space-y-2">
          {relatedSearches.map((search, index) => (
            <button
              key={index}
              onClick={() => handleRelatedSearch(search)}
              className="w-full flex items-center space-x-3 p-2 hover:bg-muted rounded-lg transition-colors text-left group"
            >
              <Icon 
                name="Search" 
                size={14} 
                className="text-muted-foreground group-hover:text-primary flex-shrink-0" 
              />
              <span className="font-body text-sm text-foreground group-hover:text-primary">
                {search}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Trending Queries */}
      <div>
        <h3 className="font-heading font-semibold text-base text-foreground mb-4">
          Trending Now
        </h3>
        <div className="space-y-3">
          {trendingQueries.map((item, index) => (
            <button
              key={index}
              onClick={() => handleRelatedSearch(item.query)}
              className="w-full flex items-start space-x-3 p-2 hover:bg-muted rounded-lg transition-colors text-left group"
            >
              <Icon 
                name={getTrendIcon(item.trend)} 
                size={16} 
                className={`${getTrendColor(item.trend)} flex-shrink-0 mt-0.5`}
              />
              <div className="flex-1 min-w-0">
                <p className="font-body text-sm text-foreground group-hover:text-primary line-clamp-1">
                  {item.query}
                </p>
                <p className="font-caption text-xs text-muted-foreground mt-1">
                  {item.count}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Voice Search Tip */}
      <div className="mt-8 p-4 bg-primary/5 border border-primary/20 rounded-lg">
        <div className="flex items-start space-x-3">
          <Icon name="Mic" size={20} className="text-primary flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-body font-medium text-sm text-foreground mb-1">
              Try Voice Search
            </h4>
            <p className="font-body text-xs text-muted-foreground">
              Search in Hindi, English, or your regional language using voice commands.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchSuggestions;