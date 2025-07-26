import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ResultCard = ({ result, viewType = 'card' }) => {
  const [isFollowing, setIsFollowing] = useState(result.isFollowing || false);
  const [isBookmarked, setIsBookmarked] = useState(result.isBookmarked || false);

  const handleFollow = (e) => {
    e.preventDefault();
    setIsFollowing(!isFollowing);
  };

  const handleBookmark = (e) => {
    e.preventDefault();
    setIsBookmarked(!isBookmarked);
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'politician':
        return 'User';
      case 'issue':
        return 'AlertCircle';
      case 'activity':
        return 'Activity';
      case 'discussion':
        return 'MessageCircle';
      default:
        return 'FileText';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'politician':
        return 'text-primary bg-primary/10';
      case 'issue':
        return 'text-error bg-error/10';
      case 'activity':
        return 'text-accent bg-accent/10';
      case 'discussion':
        return 'text-success bg-success/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'resolved':
        return 'text-success bg-success/10';
      case 'in-progress':
        return 'text-warning bg-warning/10';
      case 'pending':
        return 'text-error bg-error/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  if (viewType === 'list') {
    return (
      <Link
        to={result.url}
        className="block bg-card border border-border rounded-lg p-4 hover:elevation-2 transition-all duration-200 hover:border-primary/20"
      >
        <div className="flex items-start space-x-4">
          {/* Image/Avatar */}
          <div className="flex-shrink-0">
            {result.image ? (
              <div className="w-12 h-12 rounded-lg overflow-hidden">
                <Image
                  src={result.image}
                  alt={result.title}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getTypeColor(result.type)}`}>
                <Icon name={getTypeIcon(result.type)} size={20} />
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-caption font-medium ${getTypeColor(result.type)}`}>
                    <Icon name={getTypeIcon(result.type)} size={12} className="mr-1" />
                    {result.type.charAt(0).toUpperCase() + result.type.slice(1)}
                  </span>
                  {result.status && (
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-caption font-medium ${getStatusColor(result.status)}`}>
                      {result.status.charAt(0).toUpperCase() + result.status.slice(1)}
                    </span>
                  )}
                </div>
                <h3 className="font-heading font-semibold text-base text-foreground mb-1 line-clamp-1">
                  {result.title}
                </h3>
                <p className="font-body text-sm text-muted-foreground line-clamp-2 mb-2">
                  {result.description}
                </p>
                <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                  {result.location && (
                    <div className="flex items-center space-x-1">
                      <Icon name="MapPin" size={12} />
                      <span>{result.location}</span>
                    </div>
                  )}
                  {result.date && (
                    <div className="flex items-center space-x-1">
                      <Icon name="Calendar" size={12} />
                      <span>{result.date}</span>
                    </div>
                  )}
                  {result.engagement && (
                    <div className="flex items-center space-x-1">
                      <Icon name="Heart" size={12} />
                      <span>{result.engagement} interactions</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-1 ml-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleBookmark}
                  className="h-8 w-8"
                >
                  <Icon 
                    name={isBookmarked ? "Bookmark" : "BookmarkPlus"} 
                    size={16} 
                    className={isBookmarked ? "text-primary" : "text-muted-foreground"}
                  />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to={result.url}
      className="block bg-card border border-border rounded-lg overflow-hidden hover:elevation-2 transition-all duration-200 hover:border-primary/20"
    >
      {/* Image */}
      {result.image && (
        <div className="aspect-video w-full overflow-hidden">
          <Image
            src={result.image}
            alt={result.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-caption font-medium ${getTypeColor(result.type)}`}>
              <Icon name={getTypeIcon(result.type)} size={12} className="mr-1" />
              {result.type.charAt(0).toUpperCase() + result.type.slice(1)}
            </span>
            {result.status && (
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-caption font-medium ${getStatusColor(result.status)}`}>
                {result.status.charAt(0).toUpperCase() + result.status.slice(1)}
              </span>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleBookmark}
            className="h-8 w-8 -mt-1"
          >
            <Icon 
              name={isBookmarked ? "Bookmark" : "BookmarkPlus"} 
              size={16} 
              className={isBookmarked ? "text-primary" : "text-muted-foreground"}
            />
          </Button>
        </div>

        {/* Title & Description */}
        <h3 className="font-heading font-semibold text-lg text-foreground mb-2 line-clamp-2">
          {result.title}
        </h3>
        <p className="font-body text-sm text-muted-foreground line-clamp-3 mb-4">
          {result.description}
        </p>

        {/* Metadata */}
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
          <div className="flex items-center space-x-4">
            {result.location && (
              <div className="flex items-center space-x-1">
                <Icon name="MapPin" size={12} />
                <span>{result.location}</span>
              </div>
            )}
            {result.date && (
              <div className="flex items-center space-x-1">
                <Icon name="Calendar" size={12} />
                <span>{result.date}</span>
              </div>
            )}
          </div>
          {result.engagement && (
            <div className="flex items-center space-x-1">
              <Icon name="Heart" size={12} />
              <span>{result.engagement}</span>
            </div>
          )}
        </div>

        {/* Actions */}
        {result.type === 'politician' && (
          <Button
            variant={isFollowing ? "outline" : "default"}
            size="sm"
            onClick={handleFollow}
            iconName={isFollowing ? "UserMinus" : "UserPlus"}
            iconPosition="left"
            className="w-full"
          >
            {isFollowing ? 'Following' : 'Follow'}
          </Button>
        )}

        {result.type === 'discussion' && (
          <Button
            variant="outline"
            size="sm"
            iconName="MessageCircle"
            iconPosition="left"
            className="w-full"
          >
            Join Discussion
          </Button>
        )}

        {result.type === 'issue' && (
          <Button
            variant="outline"
            size="sm"
            iconName="Plus"
            iconPosition="left"
            className="w-full"
          >
            Support Issue
          </Button>
        )}
      </div>
    </Link>
  );
};

export default ResultCard;