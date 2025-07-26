import React from 'react';
import Icon from '../../../components/AppIcon';

const StatusTimeline = ({ timeline }) => {
  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'submitted':
        return 'FileText';
      case 'under-review':
        return 'Search';
      case 'in-progress':
        return 'Settings';
      case 'resolved':
        return 'CheckCircle';
      case 'rejected':
        return 'XCircle';
      default:
        return 'Circle';
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'submitted':
        return 'text-muted-foreground bg-muted';
      case 'under-review':
        return 'text-accent bg-accent/10';
      case 'in-progress':
        return 'text-warning bg-warning/10';
      case 'resolved':
        return 'text-success bg-success/10';
      case 'rejected':
        return 'text-destructive bg-destructive/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  return (
    <div className="bg-card border-t border-border">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h2 className="font-heading font-semibold text-xl text-foreground mb-6">
          Status Timeline
        </h2>
        
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border" />
          
          <div className="space-y-6">
            {timeline.map((item, index) => (
              <div key={index} className="relative flex items-start space-x-4">
                {/* Timeline Icon */}
                <div className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center ${getStatusColor(item.status)}`}>
                  <Icon name={getStatusIcon(item.status)} size={20} />
                </div>
                
                {/* Timeline Content */}
                <div className="flex-1 min-w-0 pb-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                    <h3 className="font-body font-semibold text-base text-foreground">
                      {item.title}
                    </h3>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Icon name="Calendar" size={14} />
                      <span>{item.date}</span>
                      <Icon name="Clock" size={14} />
                      <span>{item.time}</span>
                    </div>
                  </div>
                  
                  <p className="font-body text-sm text-muted-foreground mb-3">
                    {item.description}
                  </p>
                  
                  {item.responsibleParty && (
                    <div className="flex items-center space-x-2 mb-3">
                      <Icon name="User" size={14} className="text-muted-foreground" />
                      <span className="font-body text-sm text-foreground">
                        {item.responsibleParty}
                      </span>
                      {item.verified && (
                        <Icon name="BadgeCheck" size={14} className="text-primary" />
                      )}
                    </div>
                  )}
                  
                  {item.attachments && item.attachments.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {item.attachments.map((attachment, attachIndex) => (
                        <a
                          key={attachIndex}
                          href={attachment.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center space-x-1 px-2 py-1 bg-muted rounded text-xs text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <Icon name="Paperclip" size={12} />
                          <span>{attachment.name}</span>
                        </a>
                      ))}
                    </div>
                  )}
                  
                  {item.estimatedCompletion && (
                    <div className="mt-3 p-3 bg-accent/10 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Icon name="Clock" size={16} className="text-accent" />
                        <span className="font-body text-sm font-medium text-foreground">
                          Estimated Completion: {item.estimatedCompletion}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Next Steps */}
        <div className="mt-8 p-4 bg-primary/5 border border-primary/20 rounded-lg">
          <div className="flex items-start space-x-3">
            <Icon name="Info" size={20} className="text-primary flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-body font-semibold text-base text-foreground mb-2">
                What happens next?
              </h3>
              <p className="font-body text-sm text-muted-foreground">
                The local authorities are currently reviewing this issue. You will receive notifications about any updates or when official action is taken. Community support helps prioritize issues for faster resolution.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusTimeline;