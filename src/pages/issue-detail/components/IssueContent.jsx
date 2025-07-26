import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const IssueContent = ({ issue }) => {
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const handleMediaClick = (media, index) => {
    setSelectedMedia({ ...media, index });
  };

  const closeMediaViewer = () => {
    setSelectedMedia(null);
  };

  const navigateMedia = (direction) => {
    if (!selectedMedia) return;
    
    const currentIndex = selectedMedia.index;
    const newIndex = direction === 'next' 
      ? (currentIndex + 1) % issue.media.length
      : (currentIndex - 1 + issue.media.length) % issue.media.length;
    
    setSelectedMedia({ ...issue.media[newIndex], index: newIndex });
  };

  return (
    <div className="bg-card">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Description */}
            <div className="mb-8">
              <h2 className="font-heading font-semibold text-xl text-foreground mb-4">
                Issue Description
              </h2>
              <div className="prose prose-gray max-w-none">
                <p className="font-body text-base text-foreground leading-relaxed">
                  {showFullDescription ? issue.description : `${issue.description.substring(0, 300)}...`}
                </p>
                {issue.description.length > 300 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowFullDescription(!showFullDescription)}
                    className="mt-2 p-0 h-auto font-medium text-primary hover:text-primary/80"
                  >
                    {showFullDescription ? 'Show Less' : 'Read More'}
                  </Button>
                )}
              </div>
            </div>

            {/* Media Gallery */}
            {issue.media && issue.media.length > 0 && (
              <div className="mb-8">
                <h3 className="font-heading font-semibold text-lg text-foreground mb-4">
                  Evidence & Media ({issue.media.length})
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {issue.media.map((media, index) => (
                    <div
                      key={index}
                      className="relative aspect-square bg-muted rounded-lg overflow-hidden cursor-pointer group"
                      onClick={() => handleMediaClick(media, index)}
                    >
                      <Image
                        src={media.url}
                        alt={media.caption || `Evidence ${index + 1}`}
                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                        <Icon 
                          name={media.type === 'video' ? 'Play' : 'ZoomIn'} 
                          size={24} 
                          className="text-white opacity-0 group-hover:opacity-100 transition-opacity"
                        />
                      </div>
                      {media.type === 'video' && (
                        <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-xs">
                          <Icon name="Video" size={12} className="inline mr-1" />
                          Video
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Additional Details */}
            <div className="mb-8">
              <h3 className="font-heading font-semibold text-lg text-foreground mb-4">
                Additional Information
              </h3>
              <div className="bg-muted/30 rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-body text-sm text-muted-foreground">Affected Citizens</span>
                  <span className="font-body text-sm font-medium text-foreground">{issue.affectedCount}+ people</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-body text-sm text-muted-foreground">Estimated Cost</span>
                  <span className="font-body text-sm font-medium text-foreground">₹{issue.estimatedCost}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-body text-sm text-muted-foreground">Urgency Level</span>
                  <span className={`font-body text-sm font-medium ${
                    issue.urgency === 'High' ? 'text-error' : 
                    issue.urgency === 'Medium' ? 'text-warning' : 'text-success'
                  }`}>
                    {issue.urgency}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Reporter Info */}
            <div className="bg-muted/30 rounded-lg p-4 mb-6">
              <h3 className="font-heading font-semibold text-base text-foreground mb-3">
                Reported By
              </h3>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <Icon name="User" size={20} className="text-primary" />
                </div>
                <div>
                  <p className="font-body font-medium text-sm text-foreground">
                    {issue.reporter}
                  </p>
                  <p className="font-caption text-xs text-muted-foreground">
                    Verified Citizen
                  </p>
                </div>
              </div>
            </div>

            {/* Location Map */}
            <div className="bg-muted/30 rounded-lg p-4 mb-6">
              <h3 className="font-heading font-semibold text-base text-foreground mb-3">
                Location
              </h3>
              <div className="aspect-video bg-muted rounded-lg overflow-hidden mb-3">
                <iframe
                  width="100%"
                  height="100%"
                  loading="lazy"
                  title={issue.location}
                  referrerPolicy="no-referrer-when-downgrade"
                  src={`https://www.google.com/maps?q=${issue.coordinates.lat},${issue.coordinates.lng}&z=15&output=embed`}
                  className="border-0"
                />
              </div>
              <p className="font-body text-sm text-muted-foreground">
                {issue.location}
              </p>
            </div>

            {/* Quick Stats */}
            <div className="bg-muted/30 rounded-lg p-4">
              <h3 className="font-heading font-semibold text-base text-foreground mb-3">
                Community Support
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Icon name="ThumbsUp" size={16} className="text-success" />
                    <span className="font-body text-sm text-foreground">Supporters</span>
                  </div>
                  <span className="font-body text-sm font-medium text-foreground">{issue.supportCount}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Icon name="MessageCircle" size={16} className="text-primary" />
                    <span className="font-body text-sm text-foreground">Comments</span>
                  </div>
                  <span className="font-body text-sm font-medium text-foreground">{issue.commentCount}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Icon name="Eye" size={16} className="text-muted-foreground" />
                    <span className="font-body text-sm text-foreground">Views</span>
                  </div>
                  <span className="font-body text-sm font-medium text-foreground">{issue.viewCount}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Media Viewer Modal */}
      {selectedMedia && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            <Button
              variant="ghost"
              size="icon"
              onClick={closeMediaViewer}
              className="absolute top-4 right-4 z-10 bg-black/50 text-white hover:bg-black/70"
            >
              <Icon name="X" size={24} />
            </Button>
            
            {issue.media.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => navigateMedia('prev')}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 text-white hover:bg-black/70"
                >
                  <Icon name="ChevronLeft" size={24} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => navigateMedia('next')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 text-white hover:bg-black/70"
                >
                  <Icon name="ChevronRight" size={24} />
                </Button>
              </>
            )}

            <div className="bg-white rounded-lg overflow-hidden">
              <Image
                src={selectedMedia.url}
                alt={selectedMedia.caption || 'Evidence'}
                className="w-full h-auto max-h-[80vh] object-contain"
              />
              {selectedMedia.caption && (
                <div className="p-4 bg-card">
                  <p className="font-body text-sm text-foreground">{selectedMedia.caption}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IssueContent;