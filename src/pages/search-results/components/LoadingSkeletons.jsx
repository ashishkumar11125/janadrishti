import React from 'react';

const LoadingSkeletons = ({ count = 6, viewType = 'card' }) => {
  if (viewType === 'list') {
    return (
      <div className="space-y-4">
        {Array.from({ length: count }).map((_, index) => (
          <div key={index} className="bg-card border border-border rounded-lg p-4 animate-pulse">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-muted rounded-lg flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-16 h-5 bg-muted rounded-full" />
                  <div className="w-20 h-5 bg-muted rounded-full" />
                </div>
                <div className="w-3/4 h-5 bg-muted rounded mb-2" />
                <div className="w-full h-4 bg-muted rounded mb-1" />
                <div className="w-2/3 h-4 bg-muted rounded mb-3" />
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-3 bg-muted rounded" />
                  <div className="w-24 h-3 bg-muted rounded" />
                  <div className="w-16 h-3 bg-muted rounded" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="bg-card border border-border rounded-lg overflow-hidden animate-pulse">
          <div className="aspect-video w-full bg-muted" />
          <div className="p-4">
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-16 h-5 bg-muted rounded-full" />
              <div className="w-20 h-5 bg-muted rounded-full" />
            </div>
            <div className="w-3/4 h-6 bg-muted rounded mb-2" />
            <div className="w-full h-4 bg-muted rounded mb-1" />
            <div className="w-full h-4 bg-muted rounded mb-1" />
            <div className="w-2/3 h-4 bg-muted rounded mb-4" />
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="w-20 h-3 bg-muted rounded" />
                <div className="w-24 h-3 bg-muted rounded" />
              </div>
              <div className="w-16 h-3 bg-muted rounded" />
            </div>
            <div className="w-full h-8 bg-muted rounded" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeletons;