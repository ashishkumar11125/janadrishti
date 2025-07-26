import React from 'react';

const LoadingSkeleton = ({ count = 3 }) => {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="bg-card border border-border rounded-lg p-4 animate-pulse">
          {/* Header */}
          <div className="flex items-start space-x-3 mb-3">
            <div className="w-10 h-10 bg-muted rounded-full" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-2">
                <div className="h-4 bg-muted rounded w-32" />
                <div className="h-3 bg-muted rounded w-16" />
              </div>
              <div className="flex items-center space-x-2">
                <div className="h-3 bg-muted rounded w-20" />
                <div className="h-3 bg-muted rounded w-12" />
                <div className="h-3 bg-muted rounded w-24" />
              </div>
            </div>
            <div className="w-8 h-8 bg-muted rounded" />
          </div>

          {/* Content */}
          <div className="mb-3">
            <div className="h-4 bg-muted rounded w-3/4 mb-2" />
            <div className="space-y-2">
              <div className="h-3 bg-muted rounded w-full" />
              <div className="h-3 bg-muted rounded w-5/6" />
              <div className="h-3 bg-muted rounded w-4/5" />
            </div>
          </div>

          {/* Media placeholder */}
          <div className="h-48 bg-muted rounded-lg mb-3" />

          {/* Tags */}
          <div className="flex space-x-2 mb-3">
            <div className="h-6 bg-muted rounded-full w-16" />
            <div className="h-6 bg-muted rounded-full w-20" />
            <div className="h-6 bg-muted rounded-full w-14" />
          </div>

          {/* Engagement stats */}
          <div className="flex items-center justify-between py-2 border-t border-border">
            <div className="flex items-center space-x-4">
              <div className="h-3 bg-muted rounded w-16" />
              <div className="h-3 bg-muted rounded w-20" />
              <div className="h-3 bg-muted rounded w-18" />
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-between pt-2 border-t border-border">
            <div className="h-8 bg-muted rounded w-16" />
            <div className="h-8 bg-muted rounded w-20" />
            <div className="h-8 bg-muted rounded w-16" />
            <div className="w-8 h-8 bg-muted rounded" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;