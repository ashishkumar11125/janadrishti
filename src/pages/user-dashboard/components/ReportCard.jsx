import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ReportCard = ({ report, onViewDetails, onEdit, onShare }) => {
  const getStatusConfig = (status) => {
    switch (status) {
      case 'under_review':
        return {
          label: 'Under Review',
          color: 'text-warning',
          bgColor: 'bg-warning/10',
          icon: 'Clock'
        };
      case 'responded':
        return {
          label: 'Responded',
          color: 'text-primary',
          bgColor: 'bg-primary/10',
          icon: 'MessageCircle'
        };
      case 'resolved':
        return {
          label: 'Resolved',
          color: 'text-success',
          bgColor: 'bg-success/10',
          icon: 'CheckCircle'
        };
      case 'rejected':
        return {
          label: 'Rejected',
          color: 'text-error',
          bgColor: 'bg-error/10',
          icon: 'XCircle'
        };
      default:
        return {
          label: 'Submitted',
          color: 'text-muted-foreground',
          bgColor: 'bg-muted',
          icon: 'FileText'
        };
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'infrastructure':
        return 'Construction';
      case 'healthcare':
        return 'Heart';
      case 'education':
        return 'GraduationCap';
      case 'environment':
        return 'Leaf';
      case 'transport':
        return 'Car';
      case 'utilities':
        return 'Zap';
      default:
        return 'AlertCircle';
    }
  };

  const status = getStatusConfig(report.status);
  const categoryIcon = getCategoryIcon(report.category);

  return (
    <div className="bg-card border border-border rounded-lg p-4 hover:elevation-2 transition-all duration-200">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-start space-x-3 flex-1">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
              <Icon name={categoryIcon} size={20} className="text-muted-foreground" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-body font-semibold text-base text-foreground mb-1 line-clamp-2">
              {report.title}
            </h3>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Icon name="Calendar" size={14} />
                <span className="font-caption">{report.submittedDate}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="MapPin" size={14} />
                <span className="font-caption">{report.location}</span>
              </div>
            </div>
          </div>
        </div>
        <div className={`px-2 py-1 rounded-full flex items-center space-x-1 ${status.bgColor}`}>
          <Icon name={status.icon} size={14} className={status.color} />
          <span className={`font-caption text-xs font-medium ${status.color}`}>
            {status.label}
          </span>
        </div>
      </div>

      {/* Description */}
      <p className="font-body text-sm text-muted-foreground mb-4 line-clamp-2">
        {report.description}
      </p>

      {/* Media Preview */}
      {report.media && report.media.length > 0 && (
        <div className="flex space-x-2 mb-4 overflow-x-auto">
          {report.media.slice(0, 3).map((media, index) => (
            <div key={index} className="flex-shrink-0">
              <Image
                src={media.thumbnail}
                alt={`Report media ${index + 1}`}
                className="w-16 h-16 rounded-lg object-cover"
              />
            </div>
          ))}
          {report.media.length > 3 && (
            <div className="flex-shrink-0 w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
              <span className="font-caption text-xs text-muted-foreground">
                +{report.media.length - 3}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Stats */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <Icon name="Eye" size={16} className="text-muted-foreground" />
            <span className="font-caption text-sm text-muted-foreground">
              {report.views}
            </span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="ThumbsUp" size={16} className="text-muted-foreground" />
            <span className="font-caption text-sm text-muted-foreground">
              {report.supports}
            </span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="MessageSquare" size={16} className="text-muted-foreground" />
            <span className="font-caption text-sm text-muted-foreground">
              {report.comments}
            </span>
          </div>
        </div>
        {report.hasNewResponse && (
          <div className="flex items-center space-x-1 text-primary">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="font-caption text-xs font-medium">New Response</span>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-3 border-t border-border">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onViewDetails(report.id)}
          iconName="ExternalLink"
          iconPosition="left"
        >
          View Details
        </Button>
        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onEdit(report.id)}
            className="h-8 w-8"
          >
            <Icon name="Edit2" size={16} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onShare(report)}
            className="h-8 w-8"
          >
            <Icon name="Share2" size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReportCard;