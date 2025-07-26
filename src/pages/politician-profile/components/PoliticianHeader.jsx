import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const PoliticianHeader = ({ politician, onFollow, onMessage, onShare }) => {
  const [isFollowing, setIsFollowing] = useState(politician.isFollowing);
  const [followersCount, setFollowersCount] = useState(politician.followersCount);

  const handleFollow = () => {
    const newFollowingState = !isFollowing;
    setIsFollowing(newFollowingState);
    setFollowersCount(prev => newFollowingState ? prev + 1 : prev - 1);
    onFollow(newFollowingState);
  };

  const getPartyColor = (party) => {
    const partyColors = {
      'BJP': 'bg-orange-500',
      'Congress': 'bg-blue-600',
      'AAP': 'bg-blue-400',
      'TMC': 'bg-green-600',
      'DMK': 'bg-red-600',
      'Independent': 'bg-gray-600'
    };
    return partyColors[party] || 'bg-gray-600';
  };

  return (
    <div className="bg-card border-b border-border">
      {/* Cover Photo */}
      <div className="relative h-32 md:h-48 bg-gradient-to-r from-primary/20 to-accent/20 overflow-hidden">
        <Image
          src={politician.coverPhoto}
          alt={`${politician.name} cover`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Profile Section */}
      <div className="relative px-4 pb-6">
        {/* Profile Photo */}
        <div className="flex flex-col md:flex-row md:items-end md:space-x-6 -mt-16 md:-mt-20">
          <div className="relative">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-card bg-card overflow-hidden elevation-2">
              <Image
                src={politician.profilePhoto}
                alt={politician.name}
                className="w-full h-full object-cover"
              />
            </div>
            {politician.isVerified && (
              <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-primary rounded-full flex items-center justify-center border-2 border-card">
                <Icon name="CheckCircle" size={16} color="white" />
              </div>
            )}
          </div>

          {/* Action Buttons - Desktop */}
          <div className="hidden md:flex items-center space-x-3 ml-auto mb-2">
            <Button
              variant={isFollowing ? "outline" : "default"}
              onClick={handleFollow}
              iconName={isFollowing ? "UserMinus" : "UserPlus"}
              iconPosition="left"
            >
              {isFollowing ? 'Following' : 'Follow'}
            </Button>
            <Button
              variant="outline"
              onClick={onMessage}
              iconName="MessageCircle"
              iconPosition="left"
            >
              Message
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onShare}
            >
              <Icon name="Share2" size={20} />
            </Button>
          </div>
        </div>

        {/* Profile Info */}
        <div className="mt-4 md:mt-0">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between">
            <div className="flex-1">
              <h1 className="font-heading font-bold text-2xl md:text-3xl text-foreground">
                {politician.name}
              </h1>
              
              <div className="flex flex-wrap items-center gap-2 mt-2">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium text-white ${getPartyColor(politician.party)}`}>
                  {politician.party}
                </span>
                <span className="text-muted-foreground text-sm">•</span>
                <span className="font-body font-medium text-sm text-foreground">
                  {politician.position}
                </span>
              </div>

              <p className="font-body text-sm text-muted-foreground mt-1">
                {politician.constituency}, {politician.state}
              </p>

              {/* Stats */}
              <div className="flex items-center space-x-6 mt-4">
                <div className="text-center">
                  <p className="font-heading font-bold text-lg text-foreground">
                    {followersCount.toLocaleString('en-IN')}
                  </p>
                  <p className="font-caption text-xs text-muted-foreground">Followers</p>
                </div>
                <div className="text-center">
                  <p className="font-heading font-bold text-lg text-foreground">
                    {politician.totalActivities}
                  </p>
                  <p className="font-caption text-xs text-muted-foreground">Activities</p>
                </div>
                <div className="text-center">
                  <p className="font-heading font-bold text-lg text-foreground">
                    {politician.responseRate}%
                  </p>
                  <p className="font-caption text-xs text-muted-foreground">Response Rate</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons - Mobile */}
          <div className="flex md:hidden items-center space-x-3 mt-4">
            <Button
              variant={isFollowing ? "outline" : "default"}
              onClick={handleFollow}
              iconName={isFollowing ? "UserMinus" : "UserPlus"}
              iconPosition="left"
              className="flex-1"
            >
              {isFollowing ? 'Following' : 'Follow'}
            </Button>
            <Button
              variant="outline"
              onClick={onMessage}
              iconName="MessageCircle"
              iconPosition="left"
              className="flex-1"
            >
              Message
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onShare}
            >
              <Icon name="Share2" size={20} />
            </Button>
          </div>

          {/* Contact Info */}
          {politician.contactInfo && (
            <div className="flex flex-wrap items-center gap-4 mt-4 pt-4 border-t border-border">
              {politician.contactInfo.email && (
                <a
                  href={`mailto:${politician.contactInfo.email}`}
                  className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Icon name="Mail" size={16} />
                  <span>Email</span>
                </a>
              )}
              {politician.contactInfo.phone && (
                <a
                  href={`tel:${politician.contactInfo.phone}`}
                  className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Icon name="Phone" size={16} />
                  <span>Call</span>
                </a>
              )}
              {politician.contactInfo.website && (
                <a
                  href={politician.contactInfo.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Icon name="Globe" size={16} />
                  <span>Website</span>
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PoliticianHeader;