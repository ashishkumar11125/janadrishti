import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import Input from './Input';

const GlobalHeader = () => {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to search results
      window.location.href = `/search-results?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  const handleNotificationToggle = () => {
    setIsNotificationOpen(!isNotificationOpen);
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const notifications = [
    {
      id: 1,
      title: 'New Issue Reported',
      message: 'Road repair needed in your area',
      time: '2 hours ago',
      type: 'issue',
      unread: true
    },
    {
      id: 2,
      title: 'Politician Update',
      message: 'MP Sharma posted a new update',
      time: '4 hours ago',
      type: 'politician',
      unread: true
    },
    {
      id: 3,
      title: 'Community Response',
      message: 'Your issue received 5 new responses',
      time: '1 day ago',
      type: 'response',
      unread: false
    }
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border elevation-2">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Logo */}
        <Link to="/home-feed" className="flex items-center space-x-2 flex-shrink-0">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Icon name="Eye" size={20} color="white" />
          </div>
          <span className="font-heading font-semibold text-xl text-foreground hidden sm:block">
            Janadrishti
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          <Link 
            to="/home-feed" 
            className={`font-body font-medium text-sm transition-colors hover:text-primary ${
              location.pathname === '/home-feed' ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            Home
          </Link>
          <Link 
            to="/search-results" 
            className={`font-body font-medium text-sm transition-colors hover:text-primary ${
              location.pathname === '/search-results' ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            Search
          </Link>
          <Link 
            to="/issue-detail" 
            className={`font-body font-medium text-sm transition-colors hover:text-primary ${
              location.pathname === '/issue-detail' ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            Issues
          </Link>
          <Link 
            to="/politician-profile" 
            className={`font-body font-medium text-sm transition-colors hover:text-primary ${
              location.pathname === '/politician-profile' ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            Politicians
          </Link>
        </nav>

        {/* Search Bar - Desktop */}
        <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
          <form onSubmit={handleSearchSubmit} className="w-full">
            <div className="relative">
              <Input
                type="search"
                placeholder="Search politicians, issues, activities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-muted border-0 rounded-lg focus:bg-card focus:ring-2 focus:ring-primary"
              />
              <Icon 
                name="Search" 
                size={18} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
              />
            </div>
          </form>
        </div>

        {/* Right Actions */}
        <div className="flex items-center space-x-2">
          {/* Mobile Search Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsSearchExpanded(!isSearchExpanded)}
          >
            <Icon name="Search" size={20} />
          </Button>

          {/* Notifications */}
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleNotificationToggle}
              className="relative"
            >
              <Icon name="Bell" size={20} />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-error text-error-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-caption font-medium">
                  {unreadCount}
                </span>
              )}
            </Button>

            {/* Notification Dropdown */}
            {isNotificationOpen && (
              <div className="absolute right-0 top-full mt-2 w-80 bg-popover border border-border rounded-lg elevation-3 animate-scale-in">
                <div className="p-4 border-b border-border">
                  <h3 className="font-heading font-semibold text-sm text-foreground">
                    Notifications
                  </h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 border-b border-border last:border-b-0 hover:bg-muted transition-colors cursor-pointer ${
                        notification.unread ? 'bg-muted/50' : ''
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`w-2 h-2 rounded-full mt-2 ${
                          notification.unread ? 'bg-primary' : 'bg-muted-foreground'
                        }`} />
                        <div className="flex-1 min-w-0">
                          <p className="font-body font-medium text-sm text-foreground">
                            {notification.title}
                          </p>
                          <p className="font-body text-sm text-muted-foreground mt-1">
                            {notification.message}
                          </p>
                          <p className="font-caption text-xs text-muted-foreground mt-2">
                            {notification.time}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 border-t border-border">
                  <Button variant="ghost" size="sm" className="w-full">
                    View All Notifications
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* User Dashboard Link */}
          <Button variant="ghost" size="icon" asChild>
            <Link to="/user-dashboard">
              <Icon name="User" size={20} />
            </Link>
          </Button>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={handleMobileMenuToggle}
          >
            <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
          </Button>
        </div>
      </div>

      {/* Mobile Search Expanded */}
      {isSearchExpanded && (
        <div className="md:hidden border-t border-border bg-card p-4 animate-slide-up">
          <form onSubmit={handleSearchSubmit}>
            <div className="relative">
              <Input
                type="search"
                placeholder="Search politicians, issues, activities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-muted border-0 rounded-lg focus:bg-card focus:ring-2 focus:ring-primary"
                autoFocus
              />
              <Icon 
                name="Search" 
                size={18} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
              />
            </div>
          </form>
        </div>
      )}

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-border bg-card animate-slide-up">
          <nav className="p-4 space-y-4">
            <Link 
              to="/home-feed" 
              className={`block font-body font-medium text-base py-2 transition-colors hover:text-primary ${
                location.pathname === '/home-feed' ? 'text-primary' : 'text-foreground'
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/search-results" 
              className={`block font-body font-medium text-base py-2 transition-colors hover:text-primary ${
                location.pathname === '/search-results' ? 'text-primary' : 'text-foreground'
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Search
            </Link>
            <Link 
              to="/issue-detail" 
              className={`block font-body font-medium text-base py-2 transition-colors hover:text-primary ${
                location.pathname === '/issue-detail' ? 'text-primary' : 'text-foreground'
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Issues
            </Link>
            <Link 
              to="/politician-profile" 
              className={`block font-body font-medium text-base py-2 transition-colors hover:text-primary ${
                location.pathname === '/politician-profile' ? 'text-primary' : 'text-foreground'
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Politicians
            </Link>
            <div className="border-t border-border pt-4">
              <Link 
                to="/user-dashboard" 
                className="flex items-center space-x-3 font-body font-medium text-base py-2 text-foreground hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Icon name="User" size={20} />
                <span>Dashboard</span>
              </Link>
            </div>
          </nav>
        </div>
      )}

      {/* Overlay for mobile dropdowns */}
      {(isNotificationOpen || isMobileMenuOpen || isSearchExpanded) && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-xs z-[-1]"
          onClick={() => {
            setIsNotificationOpen(false);
            setIsMobileMenuOpen(false);
            setIsSearchExpanded(false);
          }}
        />
      )}
    </header>
  );
};

export default GlobalHeader;