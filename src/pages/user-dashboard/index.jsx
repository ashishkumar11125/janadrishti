import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GlobalHeader from '../../components/ui/GlobalHeader';
import PrimaryTabNavigation from '../../components/ui/PrimaryTabNavigation';
import UserProfileHeader from './components/UserProfileHeader';
import DashboardTabs from './components/DashboardTabs';
import QuickActions from './components/QuickActions';
import EngagementStats from './components/EngagementStats';
import ReportCard from './components/ReportCard';
import FollowingCard from './components/FollowingCard';
import BookmarkCard from './components/BookmarkCard';
import ActivityTimelineItem from './components/ActivityTimelineItem';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Icon from '../../components/AppIcon';

const UserDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('reports');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [statsPeriod, setStatsPeriod] = useState('month');
  const [loading, setLoading] = useState(false);

  // Mock user data
  const userData = {
    id: 1,
    name: "Rajesh Kumar",
    email: "rajesh.kumar@email.com",
    profilePhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    location: "Chandigarh, India",
    constituency: "Chandigarh Lok Sabha",
    joinDate: "March 2023",
    isVerified: true,
    engagementScore: 78
  };

  const userStats = {
    totalReports: 12,
    following: 8,
    resolved: 5
  };

  const engagementStats = {
    reportsSubmitted: 12,
    reportsChange: 15,
    commentsPosted: 34,
    commentsChange: -5,
    issuesSupported: 28,
    supportsChange: 22,
    engagementScore: 78,
    engagementChange: 8,
    communityRank: 156,
    streakDays: 7,
    impactScore: 92
  };

  // Mock reports data
  const mockReports = [
    {
      id: 1,
      title: "Broken streetlight on Sector 15 main road",
      description: "The streetlight near the community center has been non-functional for over a week, causing safety concerns for evening commuters and pedestrians.",
      category: "infrastructure",
      location: "Sector 15, Chandigarh",
      status: "under_review",
      submittedDate: "2025-01-20",
      views: 156,
      supports: 23,
      comments: 8,
      hasNewResponse: true,
      media: [
        { thumbnail: "https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?w=100&h=100&fit=crop" },
        { thumbnail: "https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?w=100&h=100&fit=crop" }
      ]
    },
    {
      id: 2,
      title: "Water supply disruption in residential area",
      description: "Residents of Block A have been facing irregular water supply for the past three days. The issue seems to be related to pipeline maintenance.",
      category: "utilities",
      location: "Block A, Sector 22",
      status: "responded",
      submittedDate: "2025-01-18",
      views: 89,
      supports: 15,
      comments: 12,
      hasNewResponse: false,
      media: []
    },
    {
      id: 3,
      title: "Pothole causing traffic congestion",
      description: "A large pothole on the main connecting road is causing significant traffic delays during peak hours.",
      category: "transport",
      location: "Madhya Marg, Sector 8",
      status: "resolved",
      submittedDate: "2025-01-15",
      views: 234,
      supports: 41,
      comments: 19,
      hasNewResponse: false,
      media: [
        { thumbnail: "https://images.pixabay.com/photo/2016/11/29/05/45/asphalt-1867204_1280.jpg?w=100&h=100&fit=crop" }
      ]
    }
  ];

  // Mock following data
  const mockFollowing = [
    {
      id: 1,
      type: "politician",
      name: "Dr. Kirron Kher",
      description: "Member of Parliament, Chandigarh",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      location: "Chandigarh",
      followingSince: "Jan 2024",
      notificationsEnabled: true,
      hasNewUpdates: true,
      recentActivity: {
        title: "Announced new infrastructure development projects for Sector 17",
        time: "2 hours ago"
      },
      stats: {
        posts: 45,
        followers: 12500
      }
    },
    {
      id: 2,
      type: "issue",
      name: "Chandigarh Traffic Management",
      description: "Community discussion on improving traffic flow",
      avatar: null,
      location: "Chandigarh",
      followingSince: "Dec 2023",
      notificationsEnabled: false,
      hasNewUpdates: false,
      recentActivity: {
        title: "New traffic signal installed at Sector 35 intersection",
        time: "1 day ago"
      },
      stats: {
        comments: 156,
        supports: 89
      }
    }
  ];

  // Mock bookmarks data
  const mockBookmarks = [
    {
      id: 1,
      type: "politician",
      title: "MP Sharma\'s Infrastructure Development Plan",
      description: "Comprehensive plan for improving city infrastructure over the next 5 years",
      thumbnail: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=150&h=150&fit=crop",
      savedDate: "2 days ago",
      author: "MP Sharma",
      location: "Chandigarh",
      date: "Jan 22, 2025",
      isUpdated: true,
      tags: ["infrastructure", "development", "planning"],
      preview: "The comprehensive infrastructure development plan focuses on sustainable growth and improved connectivity across all sectors of the city.",
      stats: {
        views: 1250,
        likes: 89,
        comments: 23
      }
    },
    {
      id: 2,
      type: "issue",
      title: "Community Water Crisis Discussion",
      description: "Ongoing discussion about water supply issues in residential areas",
      thumbnail: null,
      savedDate: "1 week ago",
      author: "Citizens Forum",
      location: "Multiple Sectors",
      date: "Jan 15, 2025",
      isUpdated: false,
      tags: ["water", "utilities", "community"],
      preview: "Citizens are actively discussing solutions for the ongoing water supply challenges affecting multiple residential sectors.",
      stats: {
        views: 456,
        likes: 34,
        comments: 67
      }
    }
  ];

  // Mock activity data
  const mockActivities = [
    {
      id: 1,
      type: "report_submitted",
      description: "Submitted a new report about broken streetlight in Sector 15",
      timestamp: "2 hours ago",
      location: "Sector 15, Chandigarh",
      isPrivate: false,
      relatedContent: {
        title: "Broken streetlight on Sector 15 main road",
        description: "Safety concern for evening commuters",
        thumbnail: "https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?w=100&h=100&fit=crop"
      },
      metrics: {
        views: 156,
        interactions: 31
      },
      tags: ["infrastructure", "safety"],
      canEdit: true
    },
    {
      id: 2,
      type: "comment_posted",
      description: "Commented on water supply issue discussion",
      timestamp: "1 day ago",
      location: null,
      isPrivate: false,
      relatedContent: {
        title: "Water supply disruption in residential area",
        description: "Community discussion on solutions",
        thumbnail: null
      },
      metrics: {
        interactions: 12,
        shares: 3
      },
      tags: ["utilities", "community"],
      canEdit: true
    },
    {
      id: 3,
      type: "politician_followed",
      description: "Started following Dr. Kirron Kher for updates",
      timestamp: "3 days ago",
      location: null,
      isPrivate: false,
      relatedContent: {
        title: "Dr. Kirron Kher",
        description: "Member of Parliament, Chandigarh",
        thumbnail: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
      },
      metrics: null,
      tags: ["politicians", "following"],
      canEdit: false
    }
  ];

  const tabCounts = {
    reports: mockReports.length,
    following: mockFollowing.length,
    bookmarks: mockBookmarks.length,
    activity: mockActivities.length
  };

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'under_review', label: 'Under Review' },
    { value: 'responded', label: 'Responded' },
    { value: 'resolved', label: 'Resolved' },
    { value: 'rejected', label: 'Rejected' }
  ];

  const sortOptions = [
    { value: 'recent', label: 'Most Recent' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'popular', label: 'Most Popular' },
    { value: 'status', label: 'By Status' }
  ];

  // Filter and sort data based on current tab
  const getFilteredData = () => {
    let data = [];
    
    switch (activeTab) {
      case 'reports':
        data = mockReports;
        break;
      case 'following':
        data = mockFollowing;
        break;
      case 'bookmarks':
        data = mockBookmarks;
        break;
      case 'activity':
        data = mockActivities;
        break;
      default:
        data = [];
    }

    // Apply search filter
    if (searchQuery) {
      data = data.filter(item => 
        item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply status filter for reports
    if (activeTab === 'reports' && filterStatus !== 'all') {
      data = data.filter(item => item.status === filterStatus);
    }

    return data;
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setSearchQuery('');
    setFilterStatus('all');
  };

  const handleEditProfile = () => {
    // Navigate to profile settings
    console.log('Edit profile clicked');
  };

  const handleNewReport = () => {
    navigate('/issue-detail');
  };

  const handleSearchPoliticians = () => {
    navigate('/search-results?type=politicians');
  };

  const handleViewTrending = () => {
    navigate('/search-results?trending=true');
  };

  const handleSettings = () => {
    console.log('Settings clicked');
  };

  const handleViewReportDetails = (reportId) => {
    navigate(`/issue-detail?id=${reportId}`);
  };

  const handleEditReport = (reportId) => {
    console.log('Edit report:', reportId);
  };

  const handleShareReport = (report) => {
    console.log('Share report:', report);
  };

  const handleUnfollow = (itemId) => {
    console.log('Unfollow:', itemId);
  };

  const handleViewProfile = (item) => {
    if (item.type === 'politician') {
      navigate('/politician-profile');
    } else {
      navigate('/issue-detail');
    }
  };

  const handleToggleNotifications = (itemId) => {
    console.log('Toggle notifications:', itemId);
  };

  const handleRemoveBookmark = (bookmarkId) => {
    console.log('Remove bookmark:', bookmarkId);
  };

  const handleViewBookmark = (bookmark) => {
    if (bookmark.type === 'politician') {
      navigate('/politician-profile');
    } else {
      navigate('/issue-detail');
    }
  };

  const handleAddTag = (bookmarkId) => {
    console.log('Add tag to bookmark:', bookmarkId);
  };

  const handleViewActivityDetails = (activity) => {
    console.log('View activity details:', activity);
  };

  const filteredData = getFilteredData();

  return (
    <div className="min-h-screen bg-background">
      <GlobalHeader />
      <PrimaryTabNavigation />
      
      <main className="container mx-auto px-4 py-6 max-w-7xl">
        {/* User Profile Header */}
        <UserProfileHeader
          user={userData}
          stats={userStats}
          onEditProfile={handleEditProfile}
        />

        {/* Quick Actions */}
        <QuickActions
          onNewReport={handleNewReport}
          onSearchPoliticians={handleSearchPoliticians}
          onViewTrending={handleViewTrending}
          onSettings={handleSettings}
        />

        {/* Engagement Statistics */}
        <EngagementStats
          stats={engagementStats}
          period={statsPeriod}
          onPeriodChange={setStatsPeriod}
        />

        {/* Dashboard Tabs */}
        <DashboardTabs
          activeTab={activeTab}
          onTabChange={handleTabChange}
          tabCounts={tabCounts}
        />

        {/* Filters and Search */}
        <div className="bg-card border border-border rounded-lg p-4 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex-1 max-w-md">
              <Input
                type="search"
                placeholder={`Search ${activeTab}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="flex items-center space-x-3">
              {activeTab === 'reports' && (
                <Select
                  options={statusOptions}
                  value={filterStatus}
                  onChange={setFilterStatus}
                  className="min-w-[140px]"
                />
              )}
              <Select
                options={sortOptions}
                value={sortBy}
                onChange={setSortBy}
                className="min-w-[140px]"
              />
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="space-y-6">
          {loading ? (
            <div className="text-center py-12">
              <Icon name="Loader2" size={32} className="animate-spin text-muted-foreground mx-auto mb-4" />
              <p className="font-body text-muted-foreground">Loading {activeTab}...</p>
            </div>
          ) : filteredData.length === 0 ? (
            <div className="text-center py-12">
              <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
              <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                No {activeTab} found
              </h3>
              <p className="font-body text-muted-foreground mb-6">
                {searchQuery ? `No results for "${searchQuery}"` : `You haven't ${activeTab === 'reports' ? 'submitted any reports' : activeTab === 'following' ? 'followed anyone' : activeTab === 'bookmarks' ? 'bookmarked any content' : 'recorded any activity'} yet.`}
              </p>
              {activeTab === 'reports' && (
                <Button onClick={handleNewReport} iconName="Plus" iconPosition="left">
                  Submit Your First Report
                </Button>
              )}
              {activeTab === 'following' && (
                <Button onClick={handleSearchPoliticians} iconName="Search" iconPosition="left">
                  Find Politicians to Follow
                </Button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {activeTab === 'reports' && filteredData.map((report) => (
                <ReportCard
                  key={report.id}
                  report={report}
                  onViewDetails={handleViewReportDetails}
                  onEdit={handleEditReport}
                  onShare={handleShareReport}
                />
              ))}
              
              {activeTab === 'following' && filteredData.map((item) => (
                <FollowingCard
                  key={item.id}
                  item={item}
                  onUnfollow={handleUnfollow}
                  onViewProfile={handleViewProfile}
                  onToggleNotifications={handleToggleNotifications}
                />
              ))}
              
              {activeTab === 'bookmarks' && filteredData.map((bookmark) => (
                <BookmarkCard
                  key={bookmark.id}
                  bookmark={bookmark}
                  onRemove={handleRemoveBookmark}
                  onView={handleViewBookmark}
                  onAddTag={handleAddTag}
                />
              ))}
            </div>
          )}

          {/* Activity Timeline */}
          {activeTab === 'activity' && filteredData.length > 0 && (
            <div className="max-w-4xl mx-auto">
              <div className="space-y-0">
                {filteredData.map((activity, index) => (
                  <ActivityTimelineItem
                    key={activity.id}
                    activity={activity}
                    isLast={index === filteredData.length - 1}
                    onViewDetails={handleViewActivityDetails}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Load More Button */}
        {filteredData.length > 0 && filteredData.length >= 10 && (
          <div className="text-center mt-8">
            <Button variant="outline" size="lg">
              Load More {activeTab}
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default UserDashboard;