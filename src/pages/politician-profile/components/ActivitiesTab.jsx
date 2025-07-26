import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const ActivitiesTab = ({ activities }) => {
  const [filteredActivities, setFilteredActivities] = useState(activities);
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('recent');

  const activityTypeOptions = [
    { value: 'all', label: 'All Activities' },
    { value: 'parliamentary', label: 'Parliamentary' },
    { value: 'public', label: 'Public Events' },
    { value: 'social', label: 'Social Media' },
    { value: 'press', label: 'Press Releases' },
    { value: 'committee', label: 'Committee Work' }
  ];

  const sortOptions = [
    { value: 'recent', label: 'Most Recent' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'engagement', label: 'Most Engagement' }
  ];

  const getActivityIcon = (type) => {
    const iconMap = {
      parliamentary: 'Building',
      public: 'Users',
      social: 'Share2',
      press: 'FileText',
      committee: 'UserCheck'
    };
    return iconMap[type] || 'Activity';
  };

  const getActivityColor = (type) => {
    const colorMap = {
      parliamentary: 'text-primary',
      public: 'text-success',
      social: 'text-accent',
      press: 'text-warning',
      committee: 'text-secondary'
    };
    return colorMap[type] || 'text-muted-foreground';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const handleFilter = (type) => {
    setFilterType(type);
    if (type === 'all') {
      setFilteredActivities(activities);
    } else {
      setFilteredActivities(activities.filter(activity => activity.type === type));
    }
  };

  const handleSort = (sortType) => {
    setSortBy(sortType);
    const sorted = [...filteredActivities].sort((a, b) => {
      switch (sortType) {
        case 'recent':
          return new Date(b.date) - new Date(a.date);
        case 'oldest':
          return new Date(a.date) - new Date(b.date);
        case 'engagement':
          return (b.likes + b.comments + b.shares) - (a.likes + a.comments + a.shares);
        default:
          return 0;
      }
    });
    setFilteredActivities(sorted);
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-card rounded-lg border border-border p-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex flex-col md:flex-row md:items-center space-y-3 md:space-y-0 md:space-x-4">
            <Select
              options={activityTypeOptions}
              value={filterType}
              onChange={handleFilter}
              className="w-full md:w-48"
            />
            <Select
              options={sortOptions}
              value={sortBy}
              onChange={handleSort}
              className="w-full md:w-48"
            />
          </div>
          <div className="text-sm text-muted-foreground">
            {filteredActivities.length} activities found
          </div>
        </div>
      </div>

      {/* Activities List */}
      <div className="space-y-4">
        {filteredActivities.map((activity) => (
          <div key={activity.id} className="bg-card rounded-lg border border-border p-6 hover:elevation-1 transition-all duration-200">
            {/* Activity Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start space-x-3">
                <div className={`w-10 h-10 rounded-lg bg-muted flex items-center justify-center ${getActivityColor(activity.type)}`}>
                  <Icon name={getActivityIcon(activity.type)} size={20} />
                </div>
                <div className="flex-1">
                  <h3 className="font-body font-medium text-foreground text-lg">
                    {activity.title}
                  </h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="font-caption text-xs text-muted-foreground">
                      {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}
                    </span>
                    <span className="text-muted-foreground">•</span>
                    <span className="font-caption text-xs text-muted-foreground">
                      {formatDate(activity.date)}
                    </span>
                    {activity.location && (
                      <>
                        <span className="text-muted-foreground">•</span>
                        <span className="font-caption text-xs text-muted-foreground">
                          {activity.location}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <Button variant="ghost" size="icon">
                <Icon name="MoreHorizontal" size={20} />
              </Button>
            </div>

            {/* Activity Content */}
            <div className="mb-4">
              <p className="font-body text-sm text-foreground leading-relaxed">
                {activity.description}
              </p>
              
              {/* Activity Media */}
              {activity.media && activity.media.length > 0 && (
                <div className="mt-4">
                  {activity.media.length === 1 ? (
                    <div className="rounded-lg overflow-hidden">
                      <Image
                        src={activity.media[0].url}
                        alt={activity.media[0].alt}
                        className="w-full h-64 object-cover"
                      />
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-2">
                      {activity.media.slice(0, 4).map((media, index) => (
                        <div key={index} className="relative rounded-lg overflow-hidden">
                          <Image
                            src={media.url}
                            alt={media.alt}
                            className="w-full h-32 object-cover"
                          />
                          {index === 3 && activity.media.length > 4 && (
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                              <span className="text-white font-medium">
                                +{activity.media.length - 4} more
                              </span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Activity Tags */}
              {activity.tags && activity.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {activity.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Activity Engagement */}
            <div className="flex items-center justify-between pt-4 border-t border-border">
              <div className="flex items-center space-x-6">
                <button className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors">
                  <Icon name="Heart" size={18} />
                  <span className="font-caption text-sm">{activity.likes}</span>
                </button>
                <button className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors">
                  <Icon name="MessageCircle" size={18} />
                  <span className="font-caption text-sm">{activity.comments}</span>
                </button>
                <button className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors">
                  <Icon name="Share2" size={18} />
                  <span className="font-caption text-sm">{activity.shares}</span>
                </button>
              </div>
              
              {activity.source && (
                <div className="flex items-center space-x-2">
                  <Icon name="ExternalLink" size={14} className="text-muted-foreground" />
                  <a
                    href={activity.source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-caption text-xs text-primary hover:underline"
                  >
                    {activity.source.name}
                  </a>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      {filteredActivities.length >= 10 && (
        <div className="text-center">
          <Button variant="outline" iconName="ChevronDown" iconPosition="right">
            Load More Activities
          </Button>
        </div>
      )}
    </div>
  );
};

export default ActivitiesTab;