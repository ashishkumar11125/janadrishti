import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ActivityTimelineItem = ({ activity, isLast, onViewDetails }) => {
  const getActivityConfig = (type) => {
    switch (type) {
      case 'report_submitted':
        return {
          icon: 'FileText',
          color: 'text-primary',
          bgColor: 'bg-primary',
          title: 'Report Submitted'
        };
      case 'comment_posted':
        return {
          icon: 'MessageSquare',
          color: 'text-accent',
          bgColor: 'bg-accent',
          title: 'Comment Posted'
        };
      case 'politician_followed':
        return {
          icon: 'UserPlus',
          color: 'text-success',
          bgColor: 'bg-success',
          title: 'Politician Followed'
        };
      case 'issue_supported':
        return {
          icon: 'ThumbsUp',
          color: 'text-warning',
          bgColor: 'bg-warning',
          title: 'Issue Supported'
        };
      case 'content_shared':
        return {
          icon: 'Share2',
          color: 'text-secondary',
          bgColor: 'bg-secondary',
          title: 'Content Shared'
        };
      case 'profile_updated':
        return {
          icon: 'Settings',
          color: 'text-muted-foreground',
          bgColor: 'bg-muted-foreground',
          title: 'Profile Updated'
        };
      case 'bookmark_added':
        return {
          icon: 'Bookmark',
          color: 'text-accent',
          bgColor: 'bg-accent',
          title: 'Content Bookmarked'
        };
      case 'vote_cast':
        return {
          icon: 'Vote',
          color: 'text-primary',
          bgColor: 'bg-primary',
          title: 'Vote Cast'
        };
      default:
        return {
          icon: 'Activity',
          color: 'text-muted-foreground',
          bgColor: 'bg-muted-foreground',
          title: 'Activity'
        };
    }
  };

  const config = getActivityConfig(activity.type);

  return (
    <div className="flex space-x-4">
      {/* Timeline Icon */}
      <div className="flex flex-col items-center">
        <div className={`w-10 h-10 rounded-full ${config.bgColor} flex items-center justify-center flex-shrink-0`}>
          <Icon name={config.icon} size={18} color="white" />
        </div>
        {!isLast && (
          <div className="w-0.5 h-8 bg-border mt-2" />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 pb-8">
        <div className="bg-card border border-border rounded-lg p-4 hover:elevation-1 transition-all duration-200">
          {/* Header */}
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <h4 className="font-body font-semibold text-base text-foreground mb-1">
                {config.title}
              </h4>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Icon name="Clock" size={14} />
                  <span className="font-caption">{activity.timestamp}</span>
                </div>
                {activity.location && (
                  <div className="flex items-center space-x-1">
                    <Icon name="MapPin" size={14} />
                    <span className="font-caption">{activity.location}</span>
                  </div>
                )}
              </div>
            </div>
            {activity.isPrivate && (
              <div className="flex items-center space-x-1 text-muted-foreground">
                <Icon name="Lock" size={14} />
                <span className="font-caption text-xs">Private</span>
              </div>
            )}
          </div>

          {/* Description */}
          <p className="font-body text-sm text-foreground mb-3">
            {activity.description}
          </p>

          {/* Related Content */}
          {activity.relatedContent && (
            <div className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg mb-3">
              {activity.relatedContent.thumbnail && (
                <Image
                  src={activity.relatedContent.thumbnail}
                  alt={activity.relatedContent.title}
                  className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                />
              )}
              <div className="flex-1 min-w-0">
                <h5 className="font-body font-medium text-sm text-foreground mb-1 line-clamp-1">
                  {activity.relatedContent.title}
                </h5>
                <p className="font-body text-xs text-muted-foreground line-clamp-2">
                  {activity.relatedContent.description}
                </p>
              </div>
            </div>
          )}

          {/* Metrics */}
          {activity.metrics && (
            <div className="flex items-center space-x-4 mb-3 text-sm text-muted-foreground">
              {activity.metrics.views && (
                <div className="flex items-center space-x-1">
                  <Icon name="Eye" size={14} />
                  <span className="font-caption">{activity.metrics.views} views</span>
                </div>
              )}
              {activity.metrics.interactions && (
                <div className="flex items-center space-x-1">
                  <Icon name="Heart" size={14} />
                  <span className="font-caption">{activity.metrics.interactions} interactions</span>
                </div>
              )}
              {activity.metrics.shares && (
                <div className="flex items-center space-x-1">
                  <Icon name="Share2" size={14} />
                  <span className="font-caption">{activity.metrics.shares} shares</span>
                </div>
              )}
            </div>
          )}

          {/* Tags */}
          {activity.tags && activity.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {activity.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-muted text-muted-foreground rounded-full text-xs font-caption"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-between pt-3 border-t border-border">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onViewDetails(activity)}
              iconName="ExternalLink"
              iconPosition="left"
            >
              View Details
            </Button>
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
              >
                <Icon name="Share2" size={16} />
              </Button>
              {activity.canEdit && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                >
                  <Icon name="Edit2" size={16} />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityTimelineItem;