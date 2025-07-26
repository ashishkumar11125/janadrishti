import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import Input from './Input';
import Select from './Select';

const SearchInterface = ({ isExpanded, onToggle, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('all');
  const [location, setLocation] = useState('');
  const [dateRange, setDateRange] = useState('');
  const [isVoiceSearch, setIsVoiceSearch] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const searchInputRef = useRef(null);

  // Mock data for suggestions and recent searches
  const mockSuggestions = [
    { type: 'politician', text: 'MP Sharma', category: 'Politicians' },
    { type: 'issue', text: 'Road repair Sector 15', category: 'Issues' },
    { type: 'issue', text: 'Water supply problem', category: 'Issues' },
    { type: 'politician', text: 'MLA Gupta development projects', category: 'Politicians' },
    { type: 'activity', text: 'Community meeting schedule', category: 'Activities' }
  ];

  const mockRecentSearches = [
    'Infrastructure development',
    'Local elections 2024',
    'MP Singh updates',
    'Chandigarh water crisis'
  ];

  const searchTypeOptions = [
    { value: 'all', label: 'All Results' },
    { value: 'politicians', label: 'Politicians' },
    { value: 'issues', label: 'Issues' },
    { value: 'activities', label: 'Activities' },
    { value: 'news', label: 'News & Updates' }
  ];

  const locationOptions = [
    { value: '', label: 'All Locations' },
    { value: 'chandigarh', label: 'Chandigarh' },
    { value: 'punjab', label: 'Punjab' },
    { value: 'haryana', label: 'Haryana' },
    { value: 'delhi', label: 'Delhi' }
  ];

  const dateRangeOptions = [
    { value: '', label: 'Any Time' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'year', label: 'This Year' }
  ];

  useEffect(() => {
    setRecentSearches(mockRecentSearches);
  }, []);

  useEffect(() => {
    if (searchQuery.length > 2) {
      const filtered = mockSuggestions.filter(suggestion =>
        suggestion.text.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [searchQuery]);

  useEffect(() => {
    if (isExpanded && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isExpanded]);

  const handleSearch = (query = searchQuery) => {
    if (!query.trim()) return;

    setIsLoading(true);
    
    // Add to recent searches
    const updatedRecent = [query, ...recentSearches.filter(s => s !== query)].slice(0, 5);
    setRecentSearches(updatedRecent);

    // Build search params
    const params = new URLSearchParams();
    params.set('q', query);
    if (searchType !== 'all') params.set('type', searchType);
    if (location) params.set('location', location);
    if (dateRange) params.set('date', dateRange);

    // Navigate to search results
    navigate(`/search-results?${params.toString()}`);
    
    // Close search interface
    onClose();
    setIsLoading(false);
  };

  const handleVoiceSearch = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.lang = 'en-IN';
      recognition.continuous = false;
      recognition.interimResults = false;

      setIsVoiceSearch(true);
      
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setSearchQuery(transcript);
        setIsVoiceSearch(false);
      };

      recognition.onerror = () => {
        setIsVoiceSearch(false);
      };

      recognition.onend = () => {
        setIsVoiceSearch(false);
      };

      recognition.start();
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion.text);
    handleSearch(suggestion.text);
  };

  const handleRecentSearchClick = (recentSearch) => {
    setSearchQuery(recentSearch);
    handleSearch(recentSearch);
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
  };

  if (!isExpanded) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/20 backdrop-blur-xs z-40"
        onClick={onClose}
      />

      {/* Search Interface */}
      <div className="fixed top-16 left-4 right-4 md:left-1/2 md:right-auto md:w-2xl md:-translate-x-1/2 bg-popover border border-border rounded-lg elevation-4 z-50 animate-scale-in">
        {/* Search Input */}
        <div className="p-4 border-b border-border">
          <div className="relative">
            <Input
              ref={searchInputRef}
              type="search"
              placeholder="Search politicians, issues, activities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="w-full pl-10 pr-20 py-3 text-base"
            />
            <Icon 
              name="Search" 
              size={20} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleVoiceSearch}
                disabled={isVoiceSearch}
                className="h-8 w-8"
              >
                <Icon 
                  name={isVoiceSearch ? "Loader2" : "Mic"} 
                  size={16} 
                  className={isVoiceSearch ? "animate-spin" : ""}
                />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="h-8 w-8"
              >
                <Icon name="X" size={16} />
              </Button>
            </div>
          </div>
        </div>

        {/* Advanced Filters */}
        <div className="p-4 border-b border-border bg-muted/30">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <Select
              label="Search Type"
              options={searchTypeOptions}
              value={searchType}
              onChange={setSearchType}
              className="text-sm"
            />
            <Select
              label="Location"
              options={locationOptions}
              value={location}
              onChange={setLocation}
              className="text-sm"
            />
            <Select
              label="Date Range"
              options={dateRangeOptions}
              value={dateRange}
              onChange={setDateRange}
              className="text-sm"
            />
          </div>
        </div>

        {/* Search Suggestions */}
        {suggestions.length > 0 && (
          <div className="max-h-48 overflow-y-auto border-b border-border">
            <div className="p-2">
              <p className="font-caption text-xs text-muted-foreground px-2 py-1">
                Suggestions
              </p>
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="w-full flex items-center space-x-3 px-3 py-2 hover:bg-muted rounded-md transition-colors text-left"
                >
                  <Icon 
                    name={suggestion.type === 'politician' ? 'User' : suggestion.type === 'issue' ? 'AlertCircle' : 'Activity'} 
                    size={16} 
                    className="text-muted-foreground flex-shrink-0" 
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-body text-sm text-foreground truncate">
                      {suggestion.text}
                    </p>
                    <p className="font-caption text-xs text-muted-foreground">
                      in {suggestion.category}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Recent Searches */}
        {recentSearches.length > 0 && suggestions.length === 0 && (
          <div className="max-h-48 overflow-y-auto">
            <div className="p-2">
              <div className="flex items-center justify-between px-2 py-1">
                <p className="font-caption text-xs text-muted-foreground">
                  Recent Searches
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearRecentSearches}
                  className="text-xs h-6 px-2"
                >
                  Clear
                </Button>
              </div>
              {recentSearches.map((recentSearch, index) => (
                <button
                  key={index}
                  onClick={() => handleRecentSearchClick(recentSearch)}
                  className="w-full flex items-center space-x-3 px-3 py-2 hover:bg-muted rounded-md transition-colors text-left"
                >
                  <Icon name="Clock" size={16} className="text-muted-foreground flex-shrink-0" />
                  <p className="font-body text-sm text-foreground truncate">
                    {recentSearch}
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Search Action */}
        <div className="p-4">
          <Button
            onClick={() => handleSearch()}
            disabled={!searchQuery.trim() || isLoading}
            loading={isLoading}
            className="w-full"
            iconName="Search"
            iconPosition="left"
          >
            {isLoading ? 'Searching...' : 'Search'}
          </Button>
        </div>
      </div>
    </>
  );
};

export default SearchInterface;