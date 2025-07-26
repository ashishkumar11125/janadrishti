import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const OfficialResponse = ({ responses }) => {
  const [expandedResponse, setExpandedResponse] = useState(null);

  const toggleExpanded = (responseId) => {
    setExpandedResponse(expandedResponse === responseId ? null : responseId);
  };

  const getRatingColor = (rating) => {
    if (rating >= 4) return 'text-success';
    if (rating >= 3) return 'text-warning';
    return 'text-error';
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="Star"
        size={14}
        className={index < rating ? 'text-warning fill-current' : 'text-muted-foreground'}
      />
    ));
  };

  if (!responses || responses.length === 0) {
    return (
      <div className="bg-card border-t border-border">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <h2 className="font-heading font-semibold text-xl text-foreground mb-6">
            Official Response
          </h2>
          <div className="text-center py-8">
            <Icon name="Clock" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h3 className="font-body font-medium text-base text-foreground mb-2">
              Awaiting Official Response
            </h3>
            <p className="font-body text-sm text-muted-foreground max-w-md mx-auto">
              Local authorities have been notified about this issue. Official response is expected within 72 hours of submission.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border-t border-border">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h2 className="font-heading font-semibold text-xl text-foreground mb-6">
          Official Response ({responses.length})
        </h2>

        <div className="space-y-6">
          {responses.map((response) => (
            <div key={response.id} className="border border-border rounded-lg overflow-hidden">
              {/* Response Header */}
              <div className="bg-primary/5 border-b border-border p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <Image
                      src={response.officialAvatar}
                      alt={response.officialName}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-body font-semibold text-base text-foreground">
                          {response.officialName}
                        </h3>
                        <Icon name="BadgeCheck" size={16} className="text-primary" />
                      </div>
                      <p className="font-body text-sm text-muted-foreground mb-1">
                        {response.designation} • {response.department}
                      </p>
                      <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                        <span>Responded on {response.responseDate}</span>
                        <span>•</span>
                        <span>{response.responseTime}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      response.status === 'Action Taken' ? 'bg-success/10 text-success' :
                      response.status === 'In Progress' ? 'bg-warning/10 text-warning' :
                      response.status === 'Under Review'? 'bg-accent/10 text-accent' : 'bg-muted text-muted-foreground'
                    }`}>
                      {response.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Response Content */}
              <div className="p-4">
                <div className="mb-4">
                  <p className="font-body text-sm text-foreground leading-relaxed">
                    {expandedResponse === response.id ? response.fullResponse : 
                     `${response.fullResponse.substring(0, 200)}...`}
                  </p>
                  {response.fullResponse.length > 200 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleExpanded(response.id)}
                      className="mt-2 p-0 h-auto font-medium text-primary hover:text-primary/80"
                    >
                      {expandedResponse === response.id ? 'Show Less' : 'Read More'}
                    </Button>
                  )}
                </div>

                {/* Action Items */}
                {response.actionItems && response.actionItems.length > 0 && (
                  <div className="mb-4">
                    <h4 className="font-body font-semibold text-sm text-foreground mb-2">
                      Action Items:
                    </h4>
                    <ul className="space-y-2">
                      {response.actionItems.map((item, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <Icon name="CheckCircle" size={16} className="text-success flex-shrink-0 mt-0.5" />
                          <span className="font-body text-sm text-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Timeline */}
                {response.timeline && (
                  <div className="mb-4">
                    <h4 className="font-body font-semibold text-sm text-foreground mb-2">
                      Expected Timeline:
                    </h4>
                    <div className="bg-muted/30 rounded-lg p-3">
                      <div className="flex items-center space-x-2">
                        <Icon name="Calendar" size={16} className="text-primary" />
                        <span className="font-body text-sm text-foreground">
                          {response.timeline}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Attachments */}
                {response.attachments && response.attachments.length > 0 && (
                  <div className="mb-4">
                    <h4 className="font-body font-semibold text-sm text-foreground mb-2">
                      Supporting Documents:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {response.attachments.map((attachment, index) => (
                        <a
                          key={index}
                          href={attachment.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center space-x-2 px-3 py-2 bg-muted rounded-lg text-sm text-foreground hover:bg-muted/80 transition-colors"
                        >
                          <Icon name="FileText" size={14} />
                          <span>{attachment.name}</span>
                          <Icon name="ExternalLink" size={12} className="text-muted-foreground" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Community Rating */}
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="flex items-center space-x-3">
                    <span className="font-body text-sm text-muted-foreground">
                      Community Rating:
                    </span>
                    <div className="flex items-center space-x-1">
                      {renderStars(response.communityRating)}
                      <span className={`font-body text-sm font-medium ml-2 ${getRatingColor(response.communityRating)}`}>
                        {response.communityRating.toFixed(1)}
                      </span>
                      <span className="font-caption text-xs text-muted-foreground">
                        ({response.ratingCount} ratings)
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" iconName="ThumbsUp" iconPosition="left">
                      Helpful ({response.helpfulCount})
                    </Button>
                    <Button variant="ghost" size="sm" iconName="MessageCircle" iconPosition="left">
                      Discuss
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Response Quality Info */}
        <div className="mt-8 p-4 bg-accent/5 border border-accent/20 rounded-lg">
          <div className="flex items-start space-x-3">
            <Icon name="Info" size={20} className="text-accent flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-body font-semibold text-base text-foreground mb-2">
                About Official Responses
              </h3>
              <p className="font-body text-sm text-muted-foreground">
                All official responses are verified and come from authorized government representatives. 
                Community ratings help improve response quality and accountability. You can rate responses 
                based on clarity, helpfulness, and follow-through on commitments.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfficialResponse;