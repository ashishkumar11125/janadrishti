import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TrendingTopics = ({ onTopicClick }) => {
  const trendingTopics = [
    {
      id: 1,
      topic: '#InfrastructureDevelopment',
      posts: 1247,
      trend: 'up',
      category: 'Development'
    },
    {
      id: 2,
      topic: '#LocalElections2024',
      posts: 892,
      trend: 'up',
      category: 'Elections'
    },
    {
      id: 3,
      topic: '#WaterCrisis',
      posts: 634,
      trend: 'down',
      category: 'Issues'
    },
    {
      id: 4,
      topic: '#DigitalIndia',
      posts: 445,
      trend: 'up',
      category: 'Technology'
    },
    {
      id: 5,
      topic: '#FarmerSupport',
      posts: 321,
      trend: 'stable',
      category: 'Agriculture'
    }
  ];

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
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="TrendingUp" size={18} className="text-accent" />
          <h3 className="font-heading font-semibold text-sm text-foreground">
            Trending Topics
          </h3>
        </div>
        <Button variant="ghost" size="sm">
          View All
        </Button>
      </div>

      <div className="space-y-3">
        {trendingTopics.map((item) => (
          <button
            key={item.id}
            onClick={() => onTopicClick(item.topic)}
            className="w-full flex items-center justify-between p-2 rounded-md hover:bg-muted transition-colors text-left"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                <span className="font-body font-medium text-sm text-primary truncate">
                  {item.topic}
                </span>
                <Icon 
                  name={getTrendIcon(item.trend)} 
                  size={14} 
                  className={getTrendColor(item.trend)} 
                />
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-caption text-xs text-muted-foreground">
                  {item.posts.toLocaleString('en-IN')} posts
                </span>
                <span className="font-caption text-xs text-muted-foreground px-2 py-0.5 bg-muted rounded-full">
                  {item.category}
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TrendingTopics;