import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const BookmarkCard = ({ bookmark, onRemove, onView, onAddTag }) => {
  const getBookmarkTypeConfig = (type) => {
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
      case 'discussion':
        return {
          icon: 'MessageSquare',
          label: 'Discussion',
          color: 'text-accent',
          bgColor: 'bg-accent/10'
        };
      case 'news':
        return {
          icon: 'Newspaper',
          label: 'News',
          color: 'text-success',
          bgColor: 'bg-success/10'
        };
      default:
        return {
          icon: 'Bookmark',
          label: 'Content',
          color: 'text-muted-foreground',
          bgColor: 'bg-muted'
        };
    }
  };

  const typeConfig = getBookmarkTypeConfig(bookmark.type);

  return (
    <div className="bg-card border border-border rounded-lg p-4 hover:elevation-1 transition-all duration-200">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-start space-x-3 flex-1">
          <div className="flex-shrink-0">
            {bookmark.thumbnail ? (
              <Image
                src={bookmark.thumbnail}
                alt={bookmark.title}
                className="w-12 h-12 rounded-lg object-cover"
              />
            ) : (
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${typeConfig.bgColor}`}>
                <Icon name={typeConfig.icon} size={20} className={typeConfig.color} />
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              <span className={`px-2 py-0.5 rounded-full text-xs font-caption font-medium ${typeConfig.color} ${typeConfig.bgColor}`}>
                {typeConfig.label}
              </span>
              <div className="flex items-center space-x-1 text-muted-foreground">
                <Icon name="Clock" size={12} />
                <span className="font-caption text-xs">
                  Saved {bookmark.savedDate}
                </span>
              </div>
            </div>
            <h3 className="font-body font-semibold text-base text-foreground mb-1 line-clamp-2">
              {bookmark.title}
            </h3>
            <p className="font-body text-sm text-muted-foreground line-clamp-2">
              {bookmark.description}
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onRemove(bookmark.id)}
          className="h-8 w-8 text-muted-foreground hover:text-error"
        >
          <Icon name="BookmarkX" size={16} />
        </Button>
      </div>

      {/* Tags */}
      {bookmark.tags && bookmark.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {bookmark.tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-muted text-muted-foreground rounded-full text-xs font-caption"
            >
              #{tag}
            </span>
          ))}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onAddTag(bookmark.id)}
            className="h-6 px-2 text-xs text-muted-foreground hover:text-foreground"
          >
            <Icon name="Plus" size={12} className="mr-1" />
            Add Tag
          </Button>
        </div>
      )}

      {/* Content Preview */}
      {bookmark.preview && (
        <div className="mb-3 p-3 bg-muted/30 rounded-lg">
          <p className="font-body text-sm text-foreground line-clamp-3">
            {bookmark.preview}
          </p>
        </div>
      )}

      {/* Metadata */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          {bookmark.author && (
            <div className="flex items-center space-x-1">
              <Icon name="User" size={14} />
              <span className="font-caption">{bookmark.author}</span>
            </div>
          )}
          {bookmark.location && (
            <div className="flex items-center space-x-1">
              <Icon name="MapPin" size={14} />
              <span className="font-caption">{bookmark.location}</span>
            </div>
          )}
          {bookmark.date && (
            <div className="flex items-center space-x-1">
              <Icon name="Calendar" size={14} />
              <span className="font-caption">{bookmark.date}</span>
            </div>
          )}
        </div>
        {bookmark.isUpdated && (
          <div className="flex items-center space-x-1 text-primary">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="font-caption text-xs font-medium">Updated</span>
          </div>
        )}
      </div>

      {/* Stats */}
      {bookmark.stats && (
        <div className="flex items-center space-x-4 mb-4 text-sm text-muted-foreground">
          {bookmark.stats.views && (
            <div className="flex items-center space-x-1">
              <Icon name="Eye" size={14} />
              <span className="font-caption">{bookmark.stats.views}</span>
            </div>
          )}
          {bookmark.stats.likes && (
            <div className="flex items-center space-x-1">
              <Icon name="ThumbsUp" size={14} />
              <span className="font-caption">{bookmark.stats.likes}</span>
            </div>
          )}
          {bookmark.stats.comments && (
            <div className="flex items-center space-x-1">
              <Icon name="MessageSquare" size={14} />
              <span className="font-caption">{bookmark.stats.comments}</span>
            </div>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between pt-3 border-t border-border">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onView(bookmark)}
          iconName="ExternalLink"
          iconPosition="left"
        >
          View Content
        </Button>
        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
          >
            <Icon name="Share2" size={16} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
          >
            <Icon name="Download" size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookmarkCard;