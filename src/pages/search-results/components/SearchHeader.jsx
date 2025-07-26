import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const SearchHeader = ({ onFiltersToggle, resultsCount, isLoading }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [isVoiceSearch, setIsVoiceSearch] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const newParams = new URLSearchParams(searchParams);
      newParams.set('q', searchQuery.trim());
      navigate(`/search-results?${newParams.toString()}`);
    }
  };

  const handleVoiceSearch = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.lang = 'hi-IN';
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

  const clearSearch = () => {
    setSearchQuery('');
    navigate('/search-results');
  };

  return (
    <div className="bg-card border-b border-border sticky top-16 z-30">
      <div className="max-w-7xl mx-auto px-4 py-4">
        {/* Search Form */}
        <form onSubmit={handleSearch} className="mb-4">
          <div className="relative max-w-2xl">
            <Input
              type="search"
              placeholder="Search politicians, issues, activities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-20 py-3 text-base bg-muted border-0 rounded-lg focus:bg-card focus:ring-2 focus:ring-primary"
            />
            <Icon 
              name="Search" 
              size={20} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={handleVoiceSearch}
                disabled={isVoiceSearch}
                className="h-8 w-8"
              >
                <Icon 
                  name={isVoiceSearch ? "Loader2" : "Mic"} 
                  size={16} 
                  className={isVoiceSearch ? "animate-spin text-primary" : "text-muted-foreground"}
                />
              </Button>
              {searchQuery && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={clearSearch}
                  className="h-8 w-8"
                >
                  <Icon name="X" size={16} className="text-muted-foreground" />
                </Button>
              )}
            </div>
          </div>
        </form>

        {/* Results Info & Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              {isLoading ? (
                <Icon name="Loader2" size={16} className="animate-spin text-muted-foreground" />
              ) : (
                <Icon name="Search" size={16} className="text-muted-foreground" />
              )}
              <span className="font-body text-sm text-muted-foreground">
                {isLoading ? 'Searching...' : `${resultsCount.toLocaleString('en-IN')} results`}
                {searchParams.get('q') && (
                  <span className="ml-1">
                    for "<span className="font-medium text-foreground">{searchParams.get('q')}</span>"
                  </span>
                )}
              </span>
            </div>
            
            {/* Active Filters Indicator */}
            {Array.from(searchParams.entries()).filter(([key]) => key !== 'q').length > 0 && (
              <div className="flex items-center space-x-1">
                <Icon name="Filter" size={14} className="text-primary" />
                <span className="font-caption text-xs text-primary">
                  {Array.from(searchParams.entries()).filter(([key]) => key !== 'q').length} filters active
                </span>
              </div>
            )}
          </div>

          {/* Mobile Filter Toggle */}
          <Button
            variant="outline"
            size="sm"
            onClick={onFiltersToggle}
            iconName="SlidersHorizontal"
            iconPosition="left"
            className="lg:hidden"
          >
            Filters
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchHeader;