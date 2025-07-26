import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import GlobalHeader from '../../components/ui/GlobalHeader';
import PrimaryTabNavigation from '../../components/ui/PrimaryTabNavigation';
import LocationFilter from './components/LocationFilter';
import TrendingTopics from './components/TrendingTopics';
import ContentFilters from './components/ContentFilters';
import FeedCard from './components/FeedCard';
import SuggestedFollows from './components/SuggestedFollows';
import UpcomingElections from './components/UpcomingElections';
import LoadingSkeleton from './components/LoadingSkeleton';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const HomeFeed = () => {
  const navigate = useNavigate();
  const [currentLocation, setCurrentLocation] = useState({
    id: 'chandigarh',
    name: 'Chandigarh',
    type: 'city'
  });
  const [feedPosts, setFeedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    postType: 'all',
    timeRange: 'all',
    politicalLevel: 'all',
    sortBy: 'recent'
  });

  // Mock feed data
  const mockFeedPosts = [
    {
      id: 1,
      author: {
        id: 1,
        name: "Dr. Rajesh Sharma",
        role: "Member of Parliament",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        verified: true
      },
      type: "news",
      title: "Infrastructure Development Update",
      content: `Major progress on the Chandigarh Metro Rail project! Phase 1 construction is now 75% complete.\n\nKey achievements this month:\n• 12 stations completed\n• Track laying finished for 8km stretch\n• Safety systems installation underway\n\nExpected completion: December 2024. This will revolutionize public transport in our city and reduce traffic congestion significantly.`,
      media: [
        {
          url: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&h=400&fit=crop",
          alt: "Metro construction site"
        }
      ],
      tags: ["Infrastructure", "MetroRail", "PublicTransport"],
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      location: "Chandigarh",
      likes: 1247,
      comments: 89,
      shares: 156,
      isLiked: false,
      priority: "high"
    },
    {
      id: 2,
      author: {
        id: 2,
        name: "Priya Gupta",
        role: "MLA",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
        verified: true
      },
      type: "report",
      title: "Water Supply Issue Resolution",
      content: `Addressing the water supply concerns raised by residents of Sector 15.\n\nImmediate actions taken:\n• Emergency water tankers deployed\n• Repair work on main pipeline started\n• Alternative supply arrangements made\n\nWe expect normal supply to resume by tomorrow evening. Thank you for your patience.`,
      media: [
        {
          url: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&h=400&fit=crop",
          alt: "Water pipeline repair work"
        }
      ],
      tags: ["WaterSupply", "Infrastructure", "CitizenService"],
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
      location: "Sector 15, Chandigarh",
      likes: 892,
      comments: 156,
      shares: 67,
      isLiked: true,
      priority: "medium"
    },
    {
      id: 3,
      author: {
        id: 3,
        name: "Amit Singh",
        role: "Municipal Councillor",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        verified: false
      },
      type: "discussion",
      content: `Community meeting scheduled for this Saturday at 10 AM in Sector 12 Community Center.\n\nAgenda:\n• Discuss new park development proposal\n• Address street lighting concerns\n• Plan for upcoming cleanliness drive\n• Q&A session with residents\n\nAll residents are welcome to participate and share their valuable suggestions.`,
      tags: ["CommunityMeeting", "LocalGovernance", "CitizenEngagement"],
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
      location: "Sector 12, Chandigarh",
      likes: 234,
      comments: 45,
      shares: 23,
      isLiked: false,
      priority: "low"
    },
    {
      id: 4,
      author: {
        id: 4,
        name: "Sunita Rani",
        role: "Deputy Mayor",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
        verified: true
      },
      type: "update",
      title: "Digital India Initiative Progress",
      content: `Proud to announce that Chandigarh has achieved 95% digital literacy rate!\n\nKey milestones:\n• 50,000+ citizens trained in digital skills\n• 200+ digital service centers established\n• 85% government services now available online\n\nOur goal is to make Chandigarh India's first fully digital city by 2025.`,
      media: [
        {
          url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop",
          alt: "Digital literacy training session"
        },
        {
          url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop",
          alt: "Digital service center"
        }
      ],
      tags: ["DigitalIndia", "Technology", "SkillDevelopment"],
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
      location: "Chandigarh",
      likes: 1856,
      comments: 234,
      shares: 445,
      isLiked: false,
      priority: "medium"
    },
    {
      id: 5,
      author: {
        id: 5,
        name: "Ravi Kumar",
        role: "Citizen",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
        verified: false
      },
      type: "report",
      title: "Street Light Issue - Sector 22",
      content: `Multiple street lights are not working in Sector 22, Block A for the past week. This is causing safety concerns for residents, especially during evening hours.\n\nAffected areas:\n• Main road from Gate 1 to Gate 3\n• Internal roads in Block A\n• Park area near community center\n\nRequest immediate attention from concerned authorities.`,
      tags: ["StreetLights", "Safety", "Infrastructure"],
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      location: "Sector 22, Chandigarh",
      likes: 156,
      comments: 23,
      shares: 12,
      isLiked: false,
      priority: "high"
    }
  ];

  // Load initial feed data
  useEffect(() => {
    const loadFeedData = async () => {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setFeedPosts(mockFeedPosts);
      setLoading(false);
    };

    loadFeedData();
  }, []);

  // Handle pull to refresh
  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    // Simulate refresh API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setFeedPosts(mockFeedPosts);
    setRefreshing(false);
  }, []);

  // Handle infinite scroll
  const loadMorePosts = useCallback(async () => {
    if (!hasMore || loading) return;
    
    setLoading(true);
    // Simulate loading more posts
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In real app, this would fetch more posts from API
    const morePosts = mockFeedPosts.map(post => ({
      ...post,
      id: post.id + feedPosts.length,
      timestamp: new Date(post.timestamp.getTime() - (feedPosts.length * 60 * 60 * 1000))
    }));
    
    setFeedPosts(prev => [...prev, ...morePosts]);
    setPage(prev => prev + 1);
    
    // Simulate end of data after 3 pages
    if (page >= 3) {
      setHasMore(false);
    }
    
    setLoading(false);
  }, [feedPosts.length, hasMore, loading, page]);

  // Handle scroll for infinite loading
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || loading) {
        return;
      }
      loadMorePosts();
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadMorePosts, loading]);

  // Handle post interactions
  const handleLike = (postId, isLiked) => {
    setFeedPosts(prev => 
      prev.map(post => 
        post.id === postId 
          ? { ...post, isLiked, likes: isLiked ? post.likes + 1 : post.likes - 1 }
          : post
      )
    );
  };

  const handleComment = (postId) => {
    navigate(`/issue-detail?id=${postId}&action=comment`);
  };

  const handleShare = (post) => {
    if (navigator.share) {
      navigator.share({
        title: post.title || `Post by ${post.author.name}`,
        text: post.content.substring(0, 100) + '...',
        url: window.location.origin + `/issue-detail?id=${post.id}`
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      const shareText = `${post.title || 'Political Update'}\n\n${post.content.substring(0, 200)}...\n\nRead more: ${window.location.origin}/issue-detail?id=${post.id}`;
      navigator.clipboard.writeText(shareText);
      // In real app, show toast notification
      alert('Link copied to clipboard!');
    }
  };

  const handleTopicClick = (topic) => {
    navigate(`/search-results?q=${encodeURIComponent(topic)}`);
  };

  const handleFollow = (politicianId) => {
    // In real app, this would make API call to follow politician
    console.log('Following politician:', politicianId);
  };

  return (
    <div className="min-h-screen bg-background">
      <GlobalHeader />
      <PrimaryTabNavigation />
      
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar - Desktop Only */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <LocationFilter 
                currentLocation={currentLocation}
                onLocationChange={setCurrentLocation}
              />
              <TrendingTopics onTopicClick={handleTopicClick} />
            </div>
          </div>

          {/* Main Feed */}
          <div className="lg:col-span-2">
            {/* Mobile Location & Trending */}
            <div className="lg:hidden mb-6">
              <LocationFilter 
                currentLocation={currentLocation}
                onLocationChange={setCurrentLocation}
              />
              <TrendingTopics onTopicClick={handleTopicClick} />
            </div>

            {/* Content Filters */}
            <ContentFilters 
              activeFilters={filters}
              onFilterChange={setFilters}
            />

            {/* Pull to Refresh Indicator */}
            {refreshing && (
              <div className="flex items-center justify-center py-4 mb-4">
                <Icon name="RefreshCw" size={20} className="animate-spin text-primary mr-2" />
                <span className="font-body text-sm text-muted-foreground">Refreshing feed...</span>
              </div>
            )}

            {/* Feed Posts */}
            {loading && feedPosts.length === 0 ? (
              <LoadingSkeleton count={3} />
            ) : (
              <div className="space-y-4">
                {feedPosts.map((post) => (
                  <FeedCard
                    key={post.id}
                    post={post}
                    onLike={handleLike}
                    onComment={handleComment}
                    onShare={handleShare}
                  />
                ))}
              </div>
            )}

            {/* Load More Indicator */}
            {loading && feedPosts.length > 0 && (
              <div className="flex items-center justify-center py-8">
                <Icon name="Loader2" size={24} className="animate-spin text-primary mr-2" />
                <span className="font-body text-sm text-muted-foreground">Loading more posts...</span>
              </div>
            )}

            {/* End of Feed */}
            {!hasMore && feedPosts.length > 0 && (
              <div className="text-center py-8">
                <Icon name="CheckCircle" size={24} className="text-success mx-auto mb-2" />
                <p className="font-body text-sm text-muted-foreground">
                  You're all caught up! Check back later for new updates.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRefresh}
                  className="mt-4"
                  iconName="RefreshCw"
                  iconPosition="left"
                >
                  Refresh Feed
                </Button>
              </div>
            )}

            {/* Empty State */}
            {!loading && feedPosts.length === 0 && (
              <div className="text-center py-12">
                <Icon name="Newspaper" size={48} className="text-muted-foreground mx-auto mb-4" />
                <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                  No posts available
                </h3>
                <p className="font-body text-sm text-muted-foreground mb-4">
                  Try adjusting your filters or check back later for new content.
                </p>
                <Button
                  variant="outline"
                  onClick={handleRefresh}
                  iconName="RefreshCw"
                  iconPosition="left"
                >
                  Refresh Feed
                </Button>
              </div>
            )}
          </div>

          {/* Right Sidebar - Desktop Only */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <SuggestedFollows onFollow={handleFollow} />
              <UpcomingElections />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Suggested Follows & Elections */}
      <div className="lg:hidden px-4 pb-6">
        <SuggestedFollows onFollow={handleFollow} />
        <UpcomingElections />
      </div>
    </div>
  );
};

export default HomeFeed;