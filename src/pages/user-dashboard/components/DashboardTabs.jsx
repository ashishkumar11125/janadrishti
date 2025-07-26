import React from 'react';
import Icon from '../../../components/AppIcon';

const DashboardTabs = ({ activeTab, onTabChange, tabCounts }) => {
  const tabs = [
    {
      id: 'reports',
      label: 'My Reports',
      icon: 'FileText',
      count: tabCounts.reports,
      description: 'Issues and reports you\'ve submitted'
    },
    {
      id: 'following',
      label: 'Following',
      icon: 'Users',
      count: tabCounts.following,
      description: 'Politicians and topics you follow'
    },
    {
      id: 'bookmarks',
      label: 'Bookmarks',
      icon: 'Bookmark',
      count: tabCounts.bookmarks,
      description: 'Saved content for later review'
    },
    {
      id: 'activity',
      label: 'Activity',
      icon: 'Activity',
      count: tabCounts.activity,
      description: 'Your engagement history'
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg mb-6 overflow-hidden">
      {/* Desktop Tabs */}
      <div className="hidden lg:flex">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex-1 px-6 py-4 text-left transition-all duration-200 border-b-2 ${
              activeTab === tab.id
                ? 'border-primary bg-primary/5 text-primary' :'border-transparent hover:bg-muted text-muted-foreground hover:text-foreground'
            }`}
          >
            <div className="flex items-center space-x-3">
              <Icon 
                name={tab.icon} 
                size={20} 
                className={activeTab === tab.id ? 'text-primary' : 'text-muted-foreground'} 
              />
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-body font-semibold text-base">
                    {tab.label}
                  </span>
                  {tab.count > 0 && (
                    <span className={`px-2 py-1 rounded-full text-xs font-caption font-medium ${
                      activeTab === tab.id
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {tab.count}
                    </span>
                  )}
                </div>
                <p className="font-caption text-sm text-muted-foreground mt-1">
                  {tab.description}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Mobile Tabs */}
      <div className="lg:hidden">
        <div className="flex overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex-shrink-0 px-4 py-3 flex flex-col items-center space-y-1 min-w-0 transition-all duration-200 border-b-2 ${
                activeTab === tab.id
                  ? 'border-primary bg-primary/5 text-primary' :'border-transparent text-muted-foreground'
              }`}
            >
              <div className="relative">
                <Icon 
                  name={tab.icon} 
                  size={20} 
                  className={activeTab === tab.id ? 'text-primary' : 'text-muted-foreground'} 
                />
                {tab.count > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-caption font-medium">
                    {tab.count > 99 ? '99+' : tab.count}
                  </span>
                )}
              </div>
              <span className="font-caption text-xs font-medium truncate max-w-full">
                {tab.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardTabs;