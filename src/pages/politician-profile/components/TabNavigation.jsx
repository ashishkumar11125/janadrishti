import React from 'react';
import Icon from '../../../components/AppIcon';

const TabNavigation = ({ activeTab, onTabChange, tabs }) => {
  const getTabIcon = (tabKey) => {
    const iconMap = {
      biography: 'User',
      activities: 'Activity',
      voting: 'Vote',
      statements: 'MessageSquare',
      feedback: 'Star'
    };
    return iconMap[tabKey] || 'Circle';
  };

  return (
    <div className="bg-card border-b border-border sticky top-16 z-30">
      {/* Desktop Tabs */}
      <div className="hidden md:flex">
        <div className="flex space-x-8 px-6 py-4">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => onTabChange(tab.key)}
              className={`flex items-center space-x-2 pb-2 border-b-2 transition-all duration-200 ${
                activeTab === tab.key
                  ? 'border-primary text-primary font-medium' :'border-transparent text-muted-foreground hover:text-foreground hover:border-muted'
              }`}
            >
              <Icon 
                name={getTabIcon(tab.key)} 
                size={18} 
                className={activeTab === tab.key ? 'text-primary' : 'text-muted-foreground'}
              />
              <span className="font-body text-sm">{tab.label}</span>
              {tab.count && (
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                  activeTab === tab.key
                    ? 'bg-primary/10 text-primary' :'bg-muted text-muted-foreground'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile Tabs - Horizontal Scroll */}
      <div className="md:hidden overflow-x-auto scrollbar-hide">
        <div className="flex space-x-1 px-4 py-3 min-w-max">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => onTabChange(tab.key)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all duration-200 ${
                activeTab === tab.key
                  ? 'bg-primary text-primary-foreground font-medium'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
              }`}
            >
              <Icon 
                name={getTabIcon(tab.key)} 
                size={16} 
                className={activeTab === tab.key ? 'text-primary-foreground' : 'text-muted-foreground'}
              />
              <span className="font-body text-sm">{tab.label}</span>
              {tab.count && (
                <span className={`px-1.5 py-0.5 rounded-full text-xs font-medium ${
                  activeTab === tab.key
                    ? 'bg-primary-foreground/20 text-primary-foreground'
                    : 'bg-background text-muted-foreground'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TabNavigation;