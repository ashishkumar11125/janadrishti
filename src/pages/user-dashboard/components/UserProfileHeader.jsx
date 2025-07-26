import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const UserProfileHeader = ({ user, stats, onEditProfile }) => {
  const getEngagementLevel = (score) => {
    if (score >= 80) return { level: 'Expert', color: 'text-success', bgColor: 'bg-success/10' };
    if (score >= 60) return { level: 'Active', color: 'text-primary', bgColor: 'bg-primary/10' };
    if (score >= 40) return { level: 'Engaged', color: 'text-accent', bgColor: 'bg-accent/10' };
    return { level: 'Beginner', color: 'text-muted-foreground', bgColor: 'bg-muted' };
  };

  const engagement = getEngagementLevel(user.engagementScore);

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6 elevation-1">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        {/* User Info */}
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Image
              src={user.profilePhoto}
              alt={user.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            {user.isVerified && (
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-success rounded-full flex items-center justify-center">
                <Icon name="Check" size={14} color="white" />
              </div>
            )}
          </div>
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <h1 className="font-heading font-semibold text-xl text-foreground">
                {user.name}
              </h1>
              <span className={`px-2 py-1 rounded-full text-xs font-caption font-medium ${engagement.color} ${engagement.bgColor}`}>
                {engagement.level}
              </span>
            </div>
            <p className="font-body text-sm text-muted-foreground mb-2">
              {user.location} • Member since {user.joinDate}
            </p>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Icon name="Award" size={16} className="text-accent" />
                <span className="font-caption text-sm font-medium text-foreground">
                  {user.engagementScore}/100
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="MapPin" size={16} className="text-muted-foreground" />
                <span className="font-caption text-sm text-muted-foreground">
                  {user.constituency}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 lg:gap-6">
          <div className="text-center">
            <div className="font-heading font-bold text-2xl text-primary mb-1">
              {stats.totalReports}
            </div>
            <div className="font-caption text-xs text-muted-foreground">
              Reports
            </div>
          </div>
          <div className="text-center">
            <div className="font-heading font-bold text-2xl text-accent mb-1">
              {stats.following}
            </div>
            <div className="font-caption text-xs text-muted-foreground">
              Following
            </div>
          </div>
          <div className="text-center">
            <div className="font-heading font-bold text-2xl text-success mb-1">
              {stats.resolved}
            </div>
            <div className="font-caption text-xs text-muted-foreground">
              Resolved
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onEditProfile}
            iconName="Settings"
            iconPosition="left"
          >
            Settings
          </Button>
          <Button
            variant="default"
            size="sm"
            iconName="Plus"
            iconPosition="left"
          >
            New Report
          </Button>
        </div>
      </div>

      {/* Engagement Progress */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between mb-2">
          <span className="font-body text-sm font-medium text-foreground">
            Civic Engagement Score
          </span>
          <span className="font-caption text-sm text-muted-foreground">
            {user.engagementScore}/100
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div
            className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all duration-300"
            style={{ width: `${user.engagementScore}%` }}
          />
        </div>
        <p className="font-caption text-xs text-muted-foreground mt-2">
          Complete your profile and engage more to increase your civic score
        </p>
      </div>
    </div>
  );
};

export default UserProfileHeader;