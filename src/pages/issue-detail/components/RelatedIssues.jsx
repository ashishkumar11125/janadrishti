import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const RelatedIssues = ({ issues }) => {
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

  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'text-error';
      case 'medium':
        return 'text-warning';
      case 'low':
        return 'text-success';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <div className="bg-card border-t border-border">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-heading font-semibold text-xl text-foreground">
            Related Issues ({issues.length})
          </h2>
          <Link
            to="/search-results?type=issues"
            className="font-body text-sm text-primary hover:text-primary/80 transition-colors"
          >
            View All Issues →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {issues.map((issue) => (
            <Link
              key={issue.id}
              to={`/issue-detail?id=${issue.id}`}
              className="block bg-card border border-border rounded-lg overflow-hidden hover:border-primary/30 hover:elevation-2 transition-all duration-200"
            >
              {/* Issue Image */}
              {issue.thumbnail && (
                <div className="aspect-video bg-muted overflow-hidden">
                  <Image
                    src={issue.thumbnail}
                    alt={issue.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="p-4">
                {/* Status and Category */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(issue.status)}`}>
                      {issue.status}
                    </span>
                    <span className="px-2 py-1 bg-secondary/10 text-secondary rounded-full text-xs font-medium">
                      {issue.category}
                    </span>
                  </div>
                  {issue.priority && (
                    <div className="flex items-center space-x-1">
                      <Icon name="AlertTriangle" size={14} className={getPriorityColor(issue.priority)} />
                      <span className={`text-xs font-medium ${getPriorityColor(issue.priority)}`}>
                        {issue.priority}
                      </span>
                    </div>
                  )}
                </div>

                {/* Title */}
                <h3 className="font-body font-semibold text-base text-foreground mb-2 line-clamp-2">
                  {issue.title}
                </h3>

                {/* Description */}
                <p className="font-body text-sm text-muted-foreground mb-3 line-clamp-2">
                  {issue.description}
                </p>

                {/* Location and Date */}
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                  <div className="flex items-center space-x-1">
                    <Icon name="MapPin" size={12} />
                    <span>{issue.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Calendar" size={12} />
                    <span>{issue.submissionDate}</span>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Icon name="ThumbsUp" size={14} className="text-success" />
                      <span className="font-caption text-xs text-muted-foreground">
                        {issue.supportCount}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="MessageCircle" size={14} className="text-primary" />
                      <span className="font-caption text-xs text-muted-foreground">
                        {issue.commentCount}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Eye" size={14} className="text-muted-foreground" />
                      <span className="font-caption text-xs text-muted-foreground">
                        {issue.viewCount}
                      </span>
                    </div>
                  </div>
                  
                  {/* Similarity Score */}
                  <div className="flex items-center space-x-1">
                    <Icon name="Target" size={12} className="text-accent" />
                    <span className="font-caption text-xs text-accent font-medium">
                      {issue.similarityScore}% match
                    </span>
                  </div>
                </div>

                {/* Reporter */}
                <div className="flex items-center space-x-2 mt-3 pt-3 border-t border-border">
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                    <Icon name="User" size={12} className="text-primary" />
                  </div>
                  <span className="font-caption text-xs text-muted-foreground">
                    Reported by {issue.reporter}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* No Related Issues */}
        {issues.length === 0 && (
          <div className="text-center py-8">
            <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h3 className="font-body font-medium text-base text-foreground mb-2">
              No Related Issues Found
            </h3>
            <p className="font-body text-sm text-muted-foreground max-w-md mx-auto">
              This appears to be a unique issue in your area. Your report helps build awareness for similar problems.
            </p>
          </div>
        )}

        {/* Matching Algorithm Info */}
        <div className="mt-8 p-4 bg-muted/30 rounded-lg">
          <div className="flex items-start space-x-3">
            <Icon name="Zap" size={20} className="text-accent flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-body font-semibold text-base text-foreground mb-2">
                How We Find Related Issues
              </h3>
              <p className="font-body text-sm text-muted-foreground">
                Our algorithm matches issues based on location proximity, category similarity, and keyword analysis. 
                This helps identify patterns and coordinate community efforts for faster resolution.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RelatedIssues;