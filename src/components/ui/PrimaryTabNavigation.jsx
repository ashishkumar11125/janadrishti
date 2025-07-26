import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const PrimaryTabNavigation = () => {
  const location = useLocation();

  const navigationItems = [
    {
      label: 'Home',
      path: '/home-feed',
      icon: 'Home',
      tooltip: 'Political activity feed and community discussions'
    },
    {
      label: 'Search',
      path: '/search-results',
      icon: 'Search',
      tooltip: 'Discover politicians, issues, and activities'
    },
    {
      label: 'Issues',
      path: '/issue-detail',
      icon: 'AlertCircle',
      tooltip: 'Citizen-reported issues and community problems'
    },
    {
      label: 'Politicians',
      path: '/politician-profile',
      icon: 'Users',
      tooltip: 'Politician profiles and transparency information'
    },
    {
      label: 'Dashboard',
      path: '/user-dashboard',
      icon: 'BarChart3',
      tooltip: 'Personal civic engagement and activity tracking'
    }
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      {/* Desktop Navigation - Integrated into header space */}
      <nav className="hidden lg:flex items-center justify-center bg-card border-b border-border">
        <div className="flex items-center space-x-8 px-6 py-3">
          {navigationItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-body font-medium text-sm transition-all duration-200 hover:bg-muted group ${
                isActive(item.path)
                  ? 'text-primary bg-primary/10 border border-primary/20' :'text-muted-foreground hover:text-foreground'
              }`}
              title={item.tooltip}
            >
              <Icon 
                name={item.icon} 
                size={18} 
                className={`transition-colors ${
                  isActive(item.path) ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'
                }`}
              />
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>

      {/* Mobile Navigation - Bottom tabs */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-card border-t border-border elevation-3">
        <div className="flex items-center justify-around px-2 py-2 safe-area-pb">
          {navigationItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center min-w-0 flex-1 px-2 py-2 rounded-lg transition-all duration-200 ${
                isActive(item.path)
                  ? 'text-primary bg-primary/10' :'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
              title={item.tooltip}
            >
              <div className="relative">
                <Icon 
                  name={item.icon} 
                  size={20} 
                  className={`transition-colors ${
                    isActive(item.path) ? 'text-primary' : 'text-muted-foreground'
                  }`}
                />
                {isActive(item.path) && (
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full animate-scale-in" />
                )}
              </div>
              <span className={`font-caption text-xs mt-1 transition-colors truncate max-w-full ${
                isActive(item.path) ? 'text-primary font-medium' : 'text-muted-foreground'
              }`}>
                {item.label}
              </span>
            </Link>
          ))}
        </div>
      </nav>

      {/* Mobile content spacer */}
      <div className="lg:hidden h-20" />
    </>
  );
};

export default PrimaryTabNavigation;