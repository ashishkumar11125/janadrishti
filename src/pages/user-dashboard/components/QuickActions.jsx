import React from 'react';
import Icon from '../../../components/AppIcon';


const QuickActions = ({ onNewReport, onSearchPoliticians, onViewTrending, onSettings }) => {
  const quickActions = [
    {
      id: 'new-report',
      label: 'Report Issue',
      description: 'Submit a new civic issue',
      icon: 'Plus',
      color: 'bg-primary text-primary-foreground',
      onClick: onNewReport
    },
    {
      id: 'search-politicians',
      label: 'Find Politicians',
      description: 'Discover representatives',
      icon: 'Search',
      color: 'bg-accent text-accent-foreground',
      onClick: onSearchPoliticians
    },
    {
      id: 'trending',
      label: 'Trending Issues',
      description: 'See what\'s popular',
      icon: 'TrendingUp',
      color: 'bg-success text-success-foreground',
      onClick: onViewTrending
    },
    {
      id: 'settings',
      label: 'Settings',
      description: 'Manage preferences',
      icon: 'Settings',
      color: 'bg-secondary text-secondary-foreground',
      onClick: onSettings
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <h2 className="font-heading font-semibold text-lg text-foreground mb-4">
        Quick Actions
      </h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {quickActions.map((action) => (
          <button
            key={action.id}
            onClick={action.onClick}
            className="group p-4 rounded-lg border border-border hover:border-primary/50 transition-all duration-200 hover:elevation-1 text-left"
          >
            <div className={`w-12 h-12 rounded-lg ${action.color} flex items-center justify-center mb-3 group-hover:scale-105 transition-transform duration-200`}>
              <Icon name={action.icon} size={20} />
            </div>
            <h3 className="font-body font-semibold text-sm text-foreground mb-1">
              {action.label}
            </h3>
            <p className="font-caption text-xs text-muted-foreground">
              {action.description}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;