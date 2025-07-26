import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const FeedCard = ({ post, onLike, onComment, onShare }) => {
  const [isLiked, setIsLiked] = useState(post.isLiked || false);
  const [likeCount, setLikeCount] = useState(post.likes || 0);
  const [showFullContent, setShowFullContent] = useState(false);

  const handleLike = () => {
    const newLikedState = !isLiked;
    setIsLiked(newLikedState);
    setLikeCount(prev => newLikedState ? prev + 1 : prev - 1);
    onLike(post.id, newLikedState);
  };

  const getPostTypeIcon = (type) => {
    switch (type) {
      case 'news':
        return 'Newspaper';
      case 'report':
        return 'AlertCircle';
      case 'discussion':
        return 'MessageCircle';
      case 'update':
        return 'Bell';
      default:
        return 'FileText';
    }
  };

  const getPostTypeColor = (type) => {
    switch (type) {
      case 'news':
        return 'text-primary';
      case 'report':
        return 'text-error';
      case 'discussion':
        return 'text-accent';
      case 'update':
        return 'text-success';
      default:
        return 'text-muted-foreground';
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const postTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - postTime) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h ago`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)}d ago`;
    }
  };

  const shouldTruncateContent = post.content.length > 200;
  const displayContent = shouldTruncateContent && !showFullContent 
    ? post.content.substring(0, 200) + '...' 
    : post.content;

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-4 elevation-1 hover:elevation-2 transition-all duration-200">
      {/* Header */}
      <div className="flex items-start space-x-3 mb-3">
        <Link to={`/politician-profile?id=${post.author.id}`}>
          <Image
            src={post.author.avatar}
            alt={post.author.name}
            className="w-10 h-10 rounded-full object-cover"
          />
        </Link>
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-1">
            <Link 
              to={`/politician-profile?id=${post.author.id}`}
              className="font-body font-semibold text-sm text-foreground hover:text-primary transition-colors"
            >
              {post.author.name}
            </Link>
            {post.author.verified && (
              <Icon name="BadgeCheck" size={16} className="text-primary" />
            )}
            <span className="font-caption text-xs text-muted-foreground px-2 py-1 bg-muted rounded-full">
              {post.author.role}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="font-caption text-xs text-muted-foreground">
              {formatTimeAgo(post.timestamp)}
            </span>
            <span className="text-muted-foreground">•</span>
            <div className="flex items-center space-x-1">
              <Icon 
                name={getPostTypeIcon(post.type)} 
                size={12} 
                className={getPostTypeColor(post.type)} 
              />
              <span className="font-caption text-xs text-muted-foreground capitalize">
                {post.type}
              </span>
            </div>
            {post.location && (
              <>
                <span className="text-muted-foreground">•</span>
                <div className="flex items-center space-x-1">
                  <Icon name="MapPin" size={12} className="text-muted-foreground" />
                  <span className="font-caption text-xs text-muted-foreground">
                    {post.location}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Icon name="MoreHorizontal" size={16} />
        </Button>
      </div>

      {/* Content */}
      <div className="mb-3">
        {post.title && (
          <h3 className="font-heading font-semibold text-base text-foreground mb-2">
            {post.title}
          </h3>
        )}
        <p className="font-body text-sm text-foreground leading-relaxed whitespace-pre-line">
          {displayContent}
        </p>
        {shouldTruncateContent && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowFullContent(!showFullContent)}
            className="mt-2 p-0 h-auto font-body text-sm text-primary hover:text-primary"
          >
            {showFullContent ? 'Show less' : 'Read more'}
          </Button>
        )}
      </div>

      {/* Media */}
      {post.media && post.media.length > 0 && (
        <div className="mb-3">
          {post.media.length === 1 ? (
            <div className="rounded-lg overflow-hidden">
              <Image
                src={post.media[0].url}
                alt={post.media[0].alt || 'Post media'}
                className="w-full h-64 object-cover"
              />
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2 rounded-lg overflow-hidden">
              {post.media.slice(0, 4).map((media, index) => (
                <div key={index} className="relative">
                  <Image
                    src={media.url}
                    alt={media.alt || `Post media ${index + 1}`}
                    className="w-full h-32 object-cover"
                  />
                  {index === 3 && post.media.length > 4 && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="font-body font-semibold text-white">
                        +{post.media.length - 4} more
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {post.tags.map((tag, index) => (
            <span
              key={index}
              className="font-caption text-xs text-primary bg-primary/10 px-2 py-1 rounded-full hover:bg-primary/20 transition-colors cursor-pointer"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Engagement Stats */}
      <div className="flex items-center justify-between py-2 border-t border-border">
        <div className="flex items-center space-x-4">
          <span className="font-caption text-xs text-muted-foreground">
            {likeCount.toLocaleString('en-IN')} likes
          </span>
          <span className="font-caption text-xs text-muted-foreground">
            {post.comments.toLocaleString('en-IN')} comments
          </span>
          <span className="font-caption text-xs text-muted-foreground">
            {post.shares.toLocaleString('en-IN')} shares
          </span>
        </div>
        {post.priority === 'high' && (
          <div className="flex items-center space-x-1">
            <Icon name="AlertTriangle" size={14} className="text-error" />
            <span className="font-caption text-xs text-error">High Priority</span>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-2 border-t border-border">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLike}
          className={`flex-1 ${isLiked ? 'text-error' : 'text-muted-foreground'}`}
          iconName={isLiked ? "Heart" : "Heart"}
          iconPosition="left"
        >
          Like
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onComment(post.id)}
          className="flex-1 text-muted-foreground"
          iconName="MessageCircle"
          iconPosition="left"
        >
          Comment
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onShare(post)}
          className="flex-1 text-muted-foreground"
          iconName="Share"
          iconPosition="left"
        >
          Share
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground"
        >
          <Icon name="Bookmark" size={16} />
        </Button>
      </div>
    </div>
  );
};

export default FeedCard;