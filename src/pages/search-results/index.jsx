import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import GlobalHeader from '../../components/ui/GlobalHeader';
import PrimaryTabNavigation from '../../components/ui/PrimaryTabNavigation';
import SearchHeader from './components/SearchHeader';
import FilterPanel from './components/FilterPanel';
import SortControls from './components/SortControls';
import ResultCard from './components/ResultCard';
import SearchSuggestions from './components/SearchSuggestions';
import LoadingSkeletons from './components/LoadingSkeletons';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  // Mock search results data
  const mockResults = [
    {
      id: 1,
      type: 'politician',
      title: 'Rajesh Sharma - Member of Parliament',
      description: 'Serving Chandigarh constituency since 2019. Active in infrastructure development and digital governance initiatives. Recently launched smart city projects.',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
      location: 'Chandigarh',
      date: '2 days ago',
      engagement: '1.2k',
      url: '/politician-profile?id=1',
      isFollowing: false,
      isBookmarked: false,
      status: null
    },
    {
      id: 2,
      type: 'issue',
      title: 'Water Supply Disruption in Sector 15',
      description: 'Residents of Sector 15 facing severe water shortage for the past week. Multiple complaints filed with municipal corporation. Urgent intervention required.',
      image: 'https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg?auto=compress&cs=tinysrgb&w=400',
      location: 'Sector 15, Chandigarh',
      date: '5 hours ago',
      engagement: '847',
      url: '/issue-detail?id=2',
      isFollowing: false,
      isBookmarked: true,
      status: 'pending'
    },
    {
      id: 3,
      type: 'activity',
      title: 'Public Meeting on Budget Allocation',
      description: 'Town hall meeting scheduled to discuss the upcoming budget allocation for infrastructure projects. Citizens invited to participate and share feedback.',
      image: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=400',
      location: 'Community Center, Sector 17',
      date: 'Tomorrow, 6:00 PM',
      engagement: '234',
      url: '/issue-detail?id=3',
      isFollowing: false,
      isBookmarked: false,
      status: null
    },
    {
      id: 4,
      type: 'discussion',
      title: 'Digital India Initiative Progress',
      description: 'Community discussion on the progress of Digital India initiatives in our region. Share your experiences and suggestions for improvement.',
      image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=400',
      location: 'Online Discussion',
      date: '1 day ago',
      engagement: '156',
      url: '/issue-detail?id=4',
      isFollowing: false,
      isBookmarked: false,
      status: null
    },
    {
      id: 5,
      type: 'politician',
      title: 'Priya Gupta - MLA Constituency 42',
      description: 'Dedicated to women empowerment and education reform. Leading initiatives for skill development and employment generation in rural areas.',
      image: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=400',
      location: 'Punjab',
      date: '3 days ago',
      engagement: '892',
      url: '/politician-profile?id=5',
      isFollowing: true,
      isBookmarked: false,
      status: null
    },
    {
      id: 6,
      type: 'issue',
      title: 'Road Repair Required on GT Road',
      description: 'Major potholes and damaged road surface causing traffic congestion and accidents. Local authorities have been notified multiple times.',
      image: 'https://images.pexels.com/photos/2885578/pexels-photo-2885578.jpeg?auto=compress&cs=tinysrgb&w=400',
      location: 'GT Road, Ludhiana',
      date: '1 week ago',
      engagement: '1.5k',
      url: '/issue-detail?id=6',
      isFollowing: false,
      isBookmarked: false,
      status: 'in-progress'
    },
    {
      id: 7,
      type: 'activity',
      title: 'Healthcare Facility Inauguration',
      description: 'New primary healthcare center inaugurated in rural area. Equipped with modern facilities and telemedicine capabilities.',
      image: 'https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=400',
      location: 'Village Khanna, Punjab',
      date: '4 days ago',
      engagement: '678',
      url: '/issue-detail?id=7',
      isFollowing: false,
      isBookmarked: true,
      status: null
    },
    {
      id: 8,
      type: 'discussion',
      title: 'Environmental Protection Measures',
      description: 'Open forum to discuss environmental challenges and propose sustainable solutions for our community. Join the conversation.',
      image: 'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=400',
      location: 'Environmental Forum',
      date: '6 hours ago',
      engagement: '423',
      url: '/issue-detail?id=8',
      isFollowing: false,
      isBookmarked: false,
      status: null
    }
  ];

  const searchQuery = searchParams.get('q') || '';
  const currentView = searchParams.get('view') || 'card';

  useEffect(() => {
    if (searchQuery) {
      performSearch();
    } else {
      setResults(mockResults);
    }
  }, [searchParams]);

  const performSearch = async () => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Filter results based on search parameters
    let filteredResults = mockResults;
    
    if (searchQuery) {
      filteredResults = filteredResults.filter(result =>
        result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        result.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    const type = searchParams.get('type');
    if (type) {
      const types = type.split(',');
      filteredResults = filteredResults.filter(result => types.includes(result.type));
    }

    const location = searchParams.get('location');
    if (location) {
      filteredResults = filteredResults.filter(result =>
        result.location.toLowerCase().includes(location.toLowerCase())
      );
    }

    const status = searchParams.get('status');
    if (status) {
      filteredResults = filteredResults.filter(result => result.status === status);
    }

    // Sort results
    const sort = searchParams.get('sort') || 'relevance';
    switch (sort) {
      case 'recent':
        filteredResults.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case 'popular':
        filteredResults.sort((a, b) => parseInt(b.engagement) - parseInt(a.engagement));
        break;
      case 'engagement':
        filteredResults.sort((a, b) => parseInt(b.engagement) - parseInt(a.engagement));
        break;
      default:
        // Keep relevance order
        break;
    }

    setResults(filteredResults);
    setIsLoading(false);
  };

  const loadMore = () => {
    setPage(prev => prev + 1);
    // In real app, this would load more results
    setHasMore(false);
  };

  const toggleFilters = () => {
    setIsFiltersOpen(!isFiltersOpen);
  };

  const closeFilters = () => {
    setIsFiltersOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <GlobalHeader />
      <PrimaryTabNavigation />
      
      <div className="pt-16 lg:pt-20">
        <SearchHeader 
          onFiltersToggle={toggleFilters}
          resultsCount={results.length}
          isLoading={isLoading}
        />
        
        <div className="max-w-7xl mx-auto flex">
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <div className="sticky top-32 h-[calc(100vh-8rem)]">
              <FilterPanel onClose={closeFilters} />
            </div>
          </div>

          {/* Mobile Filter Overlay */}
          {isFiltersOpen && (
            <>
              <div 
                className="lg:hidden fixed inset-0 bg-black/20 backdrop-blur-xs z-40"
                onClick={closeFilters}
              />
              <div className="lg:hidden fixed left-0 top-16 bottom-0 w-80 z-50 animate-slide-up">
                <FilterPanel isOpen={isFiltersOpen} onClose={closeFilters} />
              </div>
            </>
          )}

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            <SortControls />
            
            <div className="p-4 lg:p-6">
              <div className="flex gap-6">
                {/* Results */}
                <div className="flex-1">
                  {isLoading ? (
                    <LoadingSkeletons count={6} viewType={currentView} />
                  ) : results.length === 0 ? (
                    <div className="text-center py-12">
                      <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
                      <h3 className="font-heading font-semibold text-xl text-foreground mb-2">
                        No Results Found
                      </h3>
                      <p className="font-body text-muted-foreground mb-6 max-w-md mx-auto">
                        {searchQuery 
                          ? `We couldn't find any results for "${searchQuery}". Try adjusting your search terms or filters.`
                          : 'Start searching to discover politicians, issues, and activities in your area.'
                        }
                      </p>
                      <Button
                        variant="outline"
                        onClick={() => window.location.href = '/search-results'}
                        iconName="RotateCcw"
                        iconPosition="left"
                      >
                        Clear Search
                      </Button>
                    </div>
                  ) : (
                    <>
                      {currentView === 'list' ? (
                        <div className="space-y-4">
                          {results.map((result) => (
                            <ResultCard 
                              key={result.id} 
                              result={result} 
                              viewType="list"
                            />
                          ))}
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                          {results.map((result) => (
                            <ResultCard 
                              key={result.id} 
                              result={result} 
                              viewType="card"
                            />
                          ))}
                        </div>
                      )}

                      {/* Load More */}
                      {hasMore && results.length > 0 && (
                        <div className="text-center mt-8">
                          <Button
                            variant="outline"
                            onClick={loadMore}
                            iconName="ChevronDown"
                            iconPosition="right"
                          >
                            Load More Results
                          </Button>
                        </div>
                      )}
                    </>
                  )}
                </div>

                {/* Desktop Suggestions Sidebar */}
                <div className="hidden xl:block w-80 flex-shrink-0">
                  <div className="sticky top-32">
                    <SearchSuggestions />
                  </div>
                </div>
              </div>

              {/* Mobile Suggestions */}
              {!isLoading && results.length > 0 && (
                <div className="xl:hidden mt-8">
                  <SearchSuggestions />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;