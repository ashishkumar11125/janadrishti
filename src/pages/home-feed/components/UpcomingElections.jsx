import React from 'react';

import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const UpcomingElections = () => {
  const upcomingElections = [
    {
      id: 1,
      title: "Chandigarh Municipal Corporation Elections",
      date: "2024-03-15",
      type: "Municipal",
      status: "Registration Open",
      daysLeft: 45,
      constituency: "All Wards",
      totalSeats: 35,
      registeredCandidates: 127
    },
    {
      id: 2,
      title: "Punjab Legislative Assembly By-Elections",
      date: "2024-04-20",
      type: "State",
      status: "Nominations Open",
      daysLeft: 80,
      constituency: "3 Constituencies",
      totalSeats: 3,
      registeredCandidates: 24
    },
    {
      id: 3,
      title: "Haryana Panchayat Elections",
      date: "2024-05-10",
      type: "Local",
      status: "Announced",
      daysLeft: 100,
      constituency: "Rural Areas",
      totalSeats: 156,
      registeredCandidates: 0
    }
  ];

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'registration open':
        return 'text-success bg-success/10';
      case 'nominations open':
        return 'text-warning bg-warning/10';
      case 'announced':
        return 'text-primary bg-primary/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="Vote" size={18} className="text-accent" />
          <h3 className="font-heading font-semibold text-sm text-foreground">
            Upcoming Elections
          </h3>
        </div>
        <Button variant="ghost" size="sm">
          View All
        </Button>
      </div>

      <div className="space-y-4">
        {upcomingElections.map((election) => (
          <div key={election.id} className="border border-border rounded-lg p-3 hover:bg-muted/30 transition-colors">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1 min-w-0">
                <h4 className="font-body font-semibold text-sm text-foreground mb-1 line-clamp-2">
                  {election.title}
                </h4>
                <div className="flex items-center space-x-2 mb-2">
                  <span className={`font-caption text-xs px-2 py-1 rounded-full ${getStatusColor(election.status)}`}>
                    {election.status}
                  </span>
                  <span className="font-caption text-xs text-muted-foreground px-2 py-1 bg-muted rounded-full">
                    {election.type}
                  </span>
                </div>
              </div>
              <div className="text-right flex-shrink-0 ml-3">
                <div className="font-body font-bold text-lg text-primary">
                  {election.daysLeft}
                </div>
                <div className="font-caption text-xs text-muted-foreground">
                  days left
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-3">
              <div>
                <div className="flex items-center space-x-1 mb-1">
                  <Icon name="Calendar" size={12} className="text-muted-foreground" />
                  <span className="font-caption text-xs text-muted-foreground">Date</span>
                </div>
                <span className="font-body text-sm text-foreground">
                  {formatDate(election.date)}
                </span>
              </div>
              <div>
                <div className="flex items-center space-x-1 mb-1">
                  <Icon name="MapPin" size={12} className="text-muted-foreground" />
                  <span className="font-caption text-xs text-muted-foreground">Area</span>
                </div>
                <span className="font-body text-sm text-foreground">
                  {election.constituency}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <Icon name="Users" size={12} className="text-muted-foreground" />
                  <span className="font-caption text-muted-foreground">
                    {election.totalSeats} seats
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="UserCheck" size={12} className="text-muted-foreground" />
                  <span className="font-caption text-muted-foreground">
                    {election.registeredCandidates} candidates
                  </span>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="text-xs h-6 px-2">
                Learn More
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-border">
        <Button variant="ghost" size="sm" className="w-full">
          <Icon name="Vote" size={16} className="mr-2" />
          Election Information Center
        </Button>
      </div>
    </div>
  );
};

export default UpcomingElections;