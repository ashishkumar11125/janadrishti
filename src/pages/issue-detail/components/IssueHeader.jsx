import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const IssueHeader = ({ issue, onShare, onBookmark, isBookmarked }) => {
  const [showShareMenu, setShowShareMenu] = useState(false);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'resolved':
        return 'bg-success text-success-foreground';
      case 'in-progress':
        return 'bg-warning text-warning-foreground';
      case 'under-review':
        return 'bg-accent text-accent-foreground';
      case 'rejected':
        return 'bg-destructive text-destructive-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const handleShare = (platform) => {
    onShare(platform);
    setShowShareMenu(false);
  };

  return (
    <div className="bg-card border-b border-border">
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-4">
          <Link to="/home-feed" className="hover:text-primary transition-colors">
            Home
          </Link>
          <Icon name="ChevronRight" size={16} />
          <Link to="/search-results?type=issues" className="hover:text-primary transition-colors">
            Issues
          </Link>
          <Icon name="ChevronRight" size={16} />
          <span className="text-foreground">Issue #{issue.id}</span>
        </nav>

        {/* Issue Header */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-start gap-3 mb-3">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-error/10 rounded-lg flex items-center justify-center">
                  <Icon name="AlertCircle" size={24} className="text-error" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="font-heading font-bold text-2xl lg:text-3xl text-foreground mb-2 leading-tight">
                  {issue.title}
                </h1>
                <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Icon name="Calendar" size={16} />
                    <span>Reported on {issue.submissionDate}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Icon name="MapPin" size={16} />
                    <span>{issue.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Icon name="User" size={16} />
                    <span>by {issue.reporter}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Status and Category */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(issue.status)}`}>
                {issue.status}
              </span>
              <span className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm font-medium">
                {issue.category}
              </span>
              {issue.priority === 'high' && (
                <span className="px-3 py-1 bg-error/10 text-error rounded-full text-sm font-medium">
                  High Priority
                </span>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <Button
              variant="outline"
              size="sm"
              onClick={onBookmark}
              iconName={isBookmarked ? "Bookmark" : "BookmarkPlus"}
              iconPosition="left"
            >
              {isBookmarked ? 'Saved' : 'Save'}
            </Button>
            
            <div className="relative">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowShareMenu(!showShareMenu)}
                iconName="Share2"
                iconPosition="left"
              >
                Share
              </Button>
              
              {showShareMenu && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-lg elevation-3 z-10">
                  <div className="p-2">
                    <button
                      onClick={() => handleShare('twitter')}
                      className="w-full flex items-center gap-3 px-3 py-2 hover:bg-muted rounded-md transition-colors text-left"
                    >
                      <Icon name="Twitter" size={16} />
                      <span className="font-body text-sm">Share on Twitter</span>
                    </button>
                    <button
                      onClick={() => handleShare('facebook')}
                      className="w-full flex items-center gap-3 px-3 py-2 hover:bg-muted rounded-md transition-colors text-left"
                    >
                      <Icon name="Facebook" size={16} />
                      <span className="font-body text-sm">Share on Facebook</span>
                    </button>
                    <button
                      onClick={() => handleShare('whatsapp')}
                      className="w-full flex items-center gap-3 px-3 py-2 hover:bg-muted rounded-md transition-colors text-left"
                    >
                      <Icon name="MessageCircle" size={16} />
                      <span className="font-body text-sm">Share on WhatsApp</span>
                    </button>
                    <button
                      onClick={() => handleShare('copy')}
                      className="w-full flex items-center gap-3 px-3 py-2 hover:bg-muted rounded-md transition-colors text-left"
                    >
                      <Icon name="Copy" size={16} />
                      <span className="font-body text-sm">Copy Link</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            <Button
              variant="outline"
              size="sm"
              iconName="Flag"
              iconPosition="left"
            >
              Report
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueHeader;