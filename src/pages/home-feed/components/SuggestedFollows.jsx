import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const SuggestedFollows = ({ onFollow }) => {
  const suggestedPoliticians = [
    {
      id: 1,
      name: "Dr. Rajesh Sharma",
      role: "Member of Parliament",
      party: "Indian National Congress",
      constituency: "Chandigarh",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      followers: 45200,
      isVerified: true,
      recentActivity: "Posted about infrastructure development 2 hours ago"
    },
    {
      id: 2,
      name: "Priya Gupta",
      role: "Member of Legislative Assembly",
      party: "Bharatiya Janata Party",
      constituency: "Sector 15, Chandigarh",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      followers: 28900,
      isVerified: true,
      recentActivity: "Addressed water supply issues yesterday"
    },
    {
      id: 3,
      name: "Amit Singh",
      role: "Municipal Councillor",
      party: "Aam Aadmi Party",
      constituency: "Ward 12, Chandigarh",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      followers: 12400,
      isVerified: false,
      recentActivity: "Organized community meeting last week"
    }
  ];

  const handleFollow = (politicianId) => {
    onFollow(politicianId);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="UserPlus" size={18} className="text-primary" />
          <h3 className="font-heading font-semibold text-sm text-foreground">
            Suggested Follows
          </h3>
        </div>
        <Button variant="ghost" size="sm" asChild>
          <Link to="/search-results?type=politicians">
            View All
          </Link>
        </Button>
      </div>

      <div className="space-y-4">
        {suggestedPoliticians.map((politician) => (
          <div key={politician.id} className="flex items-start space-x-3">
            <Link to={`/politician-profile?id=${politician.id}`}>
              <Image
                src={politician.avatar}
                alt={politician.name}
                className="w-12 h-12 rounded-full object-cover"
              />
            </Link>
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                <Link 
                  to={`/politician-profile?id=${politician.id}`}
                  className="font-body font-semibold text-sm text-foreground hover:text-primary transition-colors truncate"
                >
                  {politician.name}
                </Link>
                {politician.isVerified && (
                  <Icon name="BadgeCheck" size={14} className="text-primary flex-shrink-0" />
                )}
              </div>
              <p className="font-caption text-xs text-muted-foreground mb-1">
                {politician.role} • {politician.party}
              </p>
              <p className="font-caption text-xs text-muted-foreground mb-2">
                {politician.constituency}
              </p>
              <div className="flex items-center justify-between">
                <span className="font-caption text-xs text-muted-foreground">
                  {politician.followers.toLocaleString('en-IN')} followers
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleFollow(politician.id)}
                  iconName="UserPlus"
                  iconPosition="left"
                  className="text-xs"
                >
                  Follow
                </Button>
              </div>
              <p className="font-caption text-xs text-muted-foreground mt-2 line-clamp-2">
                {politician.recentActivity}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-border">
        <Button variant="ghost" size="sm" className="w-full" asChild>
          <Link to="/search-results?type=politicians">
            <Icon name="Search" size={16} className="mr-2" />
            Discover More Politicians
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default SuggestedFollows;