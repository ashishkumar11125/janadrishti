import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const NotificationCenter = ({ isOpen, onClose, onToggle }) => {
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(false);

  // Mock notifications data - in real app, this would come from WebSocket/API
  const mockNotifications = [
    {
      id: 1,
      title: 'New Issue Reported',
      message: 'Road repair needed in Sector 15, Chandigarh',
      time: '2 hours ago',
      type: 'issue',
      priority: 'high',
      unread: true,
      actionUrl: '/issue-detail?id=123'
    },
    {
      id: 2,
      title: 'Politician Update',
      message: 'MP Sharma posted a new development update about infrastructure projects',
      time: '4 hours ago',
      type: 'politician',
      priority: 'medium',
      unread: true,
      actionUrl: '/politician-profile?id=456'
    },
    {
      id: 3,
      title: 'Community Response',
      message: 'Your water supply issue received 12 new community responses',
      time: '6 hours ago',
      type: 'response',
      priority: 'medium',
      unread: true,
      actionUrl: '/issue-detail?id=789'
    },
    {
      id: 4,
      title: 'Verification Complete',
      message: 'Your submitted issue has been verified by local authorities',
      time: '1 day ago',
      type: 'verification',
      priority: 'low',
      unread: false,
      actionUrl: '/user-dashboard'
    },
    {
      id: 5,
      title: 'Weekly Summary',
      message: 'Your civic engagement summary for this week is ready',
      time: '2 days ago',
      type: 'summary',
      priority: 'low',
      unread: false,
      actionUrl: '/user-dashboard'
    }
  ];

  useEffect(() => {
    setNotifications(mockNotifications);
  }, []);

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'issue':
        return 'AlertCircle';
      case 'politician':
        return 'User';
      case 'response':
        return 'MessageCircle';
      case 'verification':
        return 'CheckCircle';
      case 'summary':
        return 'BarChart3';
      default:
        return 'Bell';
    }
  };

  const getNotificationColor = (type, priority) => {
    if (priority === 'high') return 'text-error';
    if (priority === 'medium') return 'text-warning';
    
    switch (type) {
      case 'issue':
        return 'text-error';
      case 'politician':
        return 'text-primary';
      case 'response':
        return 'text-accent';
      case 'verification':
        return 'text-success';
      default:
        return 'text-muted-foreground';
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'all') return true;
    if (filter === 'unread') return notification.unread;
    return notification.type === filter;
  });

  const unreadCount = notifications.filter(n => n.unread).length;

  const handleNotificationClick = (notification) => {
    // Mark as read
    setNotifications(prev => 
      prev.map(n => 
        n.id === notification.id ? { ...n, unread: false } : n
      )
    );

    // Navigate to action URL
    if (notification.actionUrl) {
      window.location.href = notification.actionUrl;
    }
    
    onClose();
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(n => ({ ...n, unread: false }))
    );
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/20 backdrop-blur-xs z-40"
        onClick={onClose}
      />

      {/* Notification Panel */}
      <div className="fixed top-16 right-4 w-96 max-w-[calc(100vw-2rem)] bg-popover border border-border rounded-lg elevation-4 z-50 animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center space-x-2">
            <Icon name="Bell" size={20} className="text-foreground" />
            <h3 className="font-heading font-semibold text-base text-foreground">
              Notifications
            </h3>
            {unreadCount > 0 && (
              <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full font-caption font-medium">
                {unreadCount}
              </span>
            )}
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={18} />
          </Button>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center space-x-1 p-4 border-b border-border bg-muted/30">
          {[
            { key: 'all', label: 'All', count: notifications.length },
            { key: 'unread', label: 'Unread', count: unreadCount },
            { key: 'issue', label: 'Issues', count: notifications.filter(n => n.type === 'issue').length },
            { key: 'politician', label: 'Politicians', count: notifications.filter(n => n.type === 'politician').length }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              className={`px-3 py-1.5 rounded-md text-xs font-caption font-medium transition-colors ${
                filter === tab.key
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>

        {/* Notifications List */}
        <div className="max-h-96 overflow-y-auto">
          {loading ? (
            <div className="p-8 text-center">
              <Icon name="Loader2" size={24} className="animate-spin text-muted-foreground mx-auto mb-2" />
              <p className="font-body text-sm text-muted-foreground">Loading notifications...</p>
            </div>
          ) : filteredNotifications.length === 0 ? (
            <div className="p-8 text-center">
              <Icon name="Bell" size={32} className="text-muted-foreground mx-auto mb-3" />
              <p className="font-body text-sm text-muted-foreground">
                {filter === 'all' ? 'No notifications yet' : `No ${filter} notifications`}
              </p>
            </div>
          ) : (
            filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                onClick={() => handleNotificationClick(notification)}
                className={`p-4 border-b border-border last:border-b-0 hover:bg-muted/50 transition-colors cursor-pointer ${
                  notification.unread ? 'bg-primary/5' : ''
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className={`flex-shrink-0 ${getNotificationColor(notification.type, notification.priority)}`}>
                    <Icon name={getNotificationIcon(notification.type)} size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <p className="font-body font-medium text-sm text-foreground pr-2">
                        {notification.title}
                      </p>
                      {notification.unread && (
                        <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-1" />
                      )}
                    </div>
                    <p className="font-body text-sm text-muted-foreground mt-1 line-clamp-2">
                      {notification.message}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <p className="font-caption text-xs text-muted-foreground">
                        {notification.time}
                      </p>
                      {notification.priority === 'high' && (
                        <span className="bg-error/10 text-error text-xs px-2 py-0.5 rounded-full font-caption font-medium">
                          High Priority
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Actions */}
        {notifications.length > 0 && (
          <div className="p-4 border-t border-border bg-muted/30">
            <div className="flex items-center justify-between space-x-2">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={markAllAsRead}
                disabled={unreadCount === 0}
              >
                Mark All Read
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={clearAllNotifications}
                className="text-error hover:text-error hover:bg-error/10"
              >
                Clear All
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default NotificationCenter;