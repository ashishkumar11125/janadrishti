import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const FollowingCard = ({ item, onUnfollow, onViewProfile, onToggleNotifications }) => {
  const getItemTypeConfig = (type) => {
    switch (type) {
      case 'politician':
        return {
          icon: 'User',
          label: 'Politician',
          color: 'text-primary',
          bgColor: 'bg-primary/10'
        };
      case 'issue':
        return {
          icon: 'AlertCircle',
          label: 'Issue',
          color: 'text-error',
          bgColor: 'bg-error/10'
        };
      case 'topic':
        return {
          icon: 'Hash',
          label: 'Topic',
          color: 'text-accent',
          bgColor: 'bg-accent/10'
        };
      default:
        return {
          icon: 'Bookmark',
          label: 'Item',
          color: 'text-muted-foreground',
          bgColor: 'bg-muted'
        };
    }
  };

  const typeConfig = getItemTypeConfig(item.type);

  return (
    <div className="bg-card border border-border rounded-lg p-4 hover:elevation-1 transition-all duration-200">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-start space-x-3 flex-1">
          <div className="flex-shrink-0">
            {item.avatar ? (
              <Image
                src={item.avatar}
                alt={item.name}
                className="w-12 h-12 rounded-full object-cover"
              />
            ) : (
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${typeConfig.bgColor}`}>
                <Icon name={typeConfig.icon} size={20} className={typeConfig.color} />
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              <h3 className="font-body font-semibold text-base text-foreground truncate">
                {item.name}
              </h3>
              <span className={`px-2 py-0.5 rounded-full text-xs font-caption font-medium ${typeConfig.color} ${typeConfig.bgColor}`}>
                {typeConfig.label}
              </span>
            </div>
            <p className="font-body text-sm text-muted-foreground mb-2 line-clamp-1">
              {item.description}
            </p>
            <div className="flex items-center space-x-4 text-xs text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Icon name="Calendar" size={12} />
                <span className="font-caption">Following since {item.followingSince}</span>
              </div>
              {item.location && (
                <div className="flex items-center space-x-1">
                  <Icon name="MapPin" size={12} />
                  <span className="font-caption">{item.location}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      {item.recentActivity && (
        <div className="mb-4 p-3 bg-muted/30 rounded-lg">
          <div className="flex items-start space-x-2">
            <Icon name="Activity" size={16} className="text-muted-foreground flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="font-body text-sm text-foreground line-clamp-2">
                {item.recentActivity.title}
              </p>
              <p className="font-caption text-xs text-muted-foreground mt-1">
                {item.recentActivity.time}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          {item.type === 'politician' && (
            <>
              <div className="flex items-center space-x-1">
                <Icon name="FileText" size={14} className="text-muted-foreground" />
                <span className="font-caption text-sm text-muted-foreground">
                  {item.stats?.posts || 0} posts
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Users" size={14} className="text-muted-foreground" />
                <span className="font-caption text-sm text-muted-foreground">
                  {item.stats?.followers || 0} followers
                </span>
              </div>
            </>
          )}
          {item.type === 'issue' && (
            <>
              <div className="flex items-center space-x-1">
                <Icon name="MessageSquare" size={14} className="text-muted-foreground" />
                <span className="font-caption text-sm text-muted-foreground">
                  {item.stats?.comments || 0} comments
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="ThumbsUp" size={14} className="text-muted-foreground" />
                <span className="font-caption text-sm text-muted-foreground">
                  {item.stats?.supports || 0} supports
                </span>
              </div>
            </>
          )}
        </div>
        {item.hasNewUpdates && (
          <div className="flex items-center space-x-1 text-primary">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="font-caption text-xs font-medium">New Updates</span>
          </div>
        )}
      </div>

      {/* Notification Settings */}
      <div className="flex items-center justify-between mb-4 p-2 bg-muted/20 rounded-lg">
        <div className="flex items-center space-x-2">
          <Icon name="Bell" size={16} className="text-muted-foreground" />
          <span className="font-body text-sm text-foreground">Notifications</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onToggleNotifications(item.id)}
          className={item.notificationsEnabled ? 'text-primary' : 'text-muted-foreground'}
        >
          {item.notificationsEnabled ? 'On' : 'Off'}
        </Button>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-3 border-t border-border">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onViewProfile(item)}
          iconName="ExternalLink"
          iconPosition="left"
        >
          View Profile
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onUnfollow(item.id)}
          iconName="UserMinus"
          iconPosition="left"
        >
          Unfollow
        </Button>
      </div>
    </div>
  );
};

export default FollowingCard;