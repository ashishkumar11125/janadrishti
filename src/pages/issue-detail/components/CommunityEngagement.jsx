import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Image from '../../../components/AppImage';

const CommunityEngagement = ({ issue, onSupport, onComment }) => {
  const [newComment, setNewComment] = useState('');
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [sortBy, setSortBy] = useState('newest');
  const [isSupported, setIsSupported] = useState(false);

  const comments = [
    {
      id: 1,
      author: "Priya Sharma",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150",
      content: "I\'ve been facing the same issue in my area. The water logging during monsoon is getting worse every year. Thank you for reporting this!",
      timestamp: "2 hours ago",
      likes: 12,
      replies: [
        {
          id: 11,
          author: "Rajesh Kumar",
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
          content: "Same here! We need immediate action from the municipal corporation.",
          timestamp: "1 hour ago",
          likes: 5
        }
      ]
    },
    {
      id: 2,
      author: "Municipal Officer",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
      content: "Thank you for bringing this to our attention. Our team will conduct a site inspection within the next 48 hours. We\'ll update the status once we have more information.",
      timestamp: "4 hours ago",
      likes: 28,
      isOfficial: true,
      replies: []
    },
    {
      id: 3,
      author: "Amit Patel",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
      content: "This has been an ongoing problem for months. I have additional photos from last week's flooding if needed.",
      timestamp: "6 hours ago",
      likes: 8,
      hasAttachment: true,
      replies: []
    }
  ];

  const handleSupport = () => {
    setIsSupported(!isSupported);
    onSupport(!isSupported);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      onComment(newComment);
      setNewComment('');
      setShowCommentForm(false);
    }
  };

  const sortedComments = [...comments].sort((a, b) => {
    if (sortBy === 'newest') return b.id - a.id;
    if (sortBy === 'oldest') return a.id - b.id;
    if (sortBy === 'popular') return b.likes - a.likes;
    return 0;
  });

  return (
    <div className="bg-card border-t border-border">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Engagement Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h2 className="font-heading font-semibold text-xl text-foreground">
            Community Discussion ({comments.length})
          </h2>
          
          <div className="flex items-center space-x-3">
            <Button
              variant={isSupported ? "default" : "outline"}
              size="sm"
              onClick={handleSupport}
              iconName="ThumbsUp"
              iconPosition="left"
            >
              {isSupported ? 'Supported' : 'Support'} ({issue.supportCount + (isSupported ? 1 : 0)})
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowCommentForm(!showCommentForm)}
              iconName="MessageCircle"
              iconPosition="left"
            >
              Comment
            </Button>
          </div>
        </div>

        {/* Comment Form */}
        {showCommentForm && (
          <div className="mb-6 p-4 bg-muted/30 rounded-lg">
            <form onSubmit={handleCommentSubmit}>
              <Input
                type="text"
                placeholder="Share your thoughts or additional information..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="mb-3"
              />
              <div className="flex items-center justify-between">
                <p className="font-caption text-xs text-muted-foreground">
                  Be respectful and constructive in your comments
                </p>
                <div className="flex items-center space-x-2">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowCommentForm(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    size="sm"
                    disabled={!newComment.trim()}
                  >
                    Post Comment
                  </Button>
                </div>
              </div>
            </form>
          </div>
        )}

        {/* Sort Options */}
        <div className="flex items-center space-x-4 mb-6">
          <span className="font-body text-sm text-muted-foreground">Sort by:</span>
          <div className="flex items-center space-x-2">
            {[
              { value: 'newest', label: 'Newest' },
              { value: 'oldest', label: 'Oldest' },
              { value: 'popular', label: 'Most Liked' }
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => setSortBy(option.value)}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  sortBy === option.value
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Comments List */}
        <div className="space-y-6">
          {sortedComments.map((comment) => (
            <div key={comment.id} className="border-b border-border last:border-b-0 pb-6 last:pb-0">
              <div className="flex items-start space-x-3">
                <Image
                  src={comment.avatar}
                  alt={comment.author}
                  className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                />
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-2">
                    <h4 className="font-body font-semibold text-sm text-foreground">
                      {comment.author}
                    </h4>
                    {comment.isOfficial && (
                      <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full text-xs font-medium">
                        Official
                      </span>
                    )}
                    <span className="font-caption text-xs text-muted-foreground">
                      {comment.timestamp}
                    </span>
                  </div>
                  
                  <p className="font-body text-sm text-foreground mb-3 leading-relaxed">
                    {comment.content}
                  </p>
                  
                  {comment.hasAttachment && (
                    <div className="mb-3">
                      <div className="inline-flex items-center space-x-2 px-3 py-2 bg-muted rounded-lg text-sm">
                        <Icon name="Paperclip" size={14} className="text-muted-foreground" />
                        <span className="text-foreground">Additional evidence attached</span>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-center space-x-4">
                    <button className="flex items-center space-x-1 text-muted-foreground hover:text-foreground transition-colors">
                      <Icon name="ThumbsUp" size={14} />
                      <span className="font-caption text-xs">{comment.likes}</span>
                    </button>
                    <button className="flex items-center space-x-1 text-muted-foreground hover:text-foreground transition-colors">
                      <Icon name="MessageCircle" size={14} />
                      <span className="font-caption text-xs">Reply</span>
                    </button>
                    <button className="flex items-center space-x-1 text-muted-foreground hover:text-foreground transition-colors">
                      <Icon name="Flag" size={14} />
                      <span className="font-caption text-xs">Report</span>
                    </button>
                  </div>
                  
                  {/* Replies */}
                  {comment.replies && comment.replies.length > 0 && (
                    <div className="mt-4 pl-4 border-l-2 border-border space-y-4">
                      {comment.replies.map((reply) => (
                        <div key={reply.id} className="flex items-start space-x-3">
                          <Image
                            src={reply.avatar}
                            alt={reply.author}
                            className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-1">
                              <h5 className="font-body font-semibold text-sm text-foreground">
                                {reply.author}
                              </h5>
                              <span className="font-caption text-xs text-muted-foreground">
                                {reply.timestamp}
                              </span>
                            </div>
                            <p className="font-body text-sm text-foreground mb-2">
                              {reply.content}
                            </p>
                            <div className="flex items-center space-x-4">
                              <button className="flex items-center space-x-1 text-muted-foreground hover:text-foreground transition-colors">
                                <Icon name="ThumbsUp" size={12} />
                                <span className="font-caption text-xs">{reply.likes}</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="mt-8 text-center">
          <Button variant="outline" size="sm">
            Load More Comments
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CommunityEngagement;