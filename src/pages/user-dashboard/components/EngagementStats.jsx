import React from 'react';
import Icon from '../../../components/AppIcon';

const EngagementStats = ({ stats, period, onPeriodChange }) => {
  const statItems = [
    {
      id: 'reports',
      label: 'Reports Submitted',
      value: stats.reportsSubmitted,
      change: stats.reportsChange,
      icon: 'FileText',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      id: 'comments',
      label: 'Comments Posted',
      value: stats.commentsPosted,
      change: stats.commentsChange,
      icon: 'MessageSquare',
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    },
    {
      id: 'supports',
      label: 'Issues Supported',
      value: stats.issuesSupported,
      change: stats.supportsChange,
      icon: 'ThumbsUp',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      id: 'engagement',
      label: 'Engagement Score',
      value: stats.engagementScore,
      change: stats.engagementChange,
      icon: 'Award',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      suffix: '/100'
    }
  ];

  const periods = [
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'This Quarter' },
    { value: 'year', label: 'This Year' }
  ];

  const getChangeIcon = (change) => {
    if (change > 0) return 'TrendingUp';
    if (change < 0) return 'TrendingDown';
    return 'Minus';
  };

  const getChangeColor = (change) => {
    if (change > 0) return 'text-success';
    if (change < 0) return 'text-error';
    return 'text-muted-foreground';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading font-semibold text-lg text-foreground">
          Engagement Statistics
        </h2>
        <div className="flex items-center space-x-2">
          <select
            value={period}
            onChange={(e) => onPeriodChange(e.target.value)}
            className="px-3 py-1.5 bg-muted border border-border rounded-lg text-sm font-body text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {periods.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statItems.map((stat) => (
          <div
            key={stat.id}
            className="p-4 rounded-lg border border-border hover:elevation-1 transition-all duration-200"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                <Icon name={stat.icon} size={18} className={stat.color} />
              </div>
              {stat.change !== undefined && (
                <div className={`flex items-center space-x-1 ${getChangeColor(stat.change)}`}>
                  <Icon name={getChangeIcon(stat.change)} size={14} />
                  <span className="font-caption text-xs font-medium">
                    {Math.abs(stat.change)}%
                  </span>
                </div>
              )}
            </div>
            <div className="mb-1">
              <span className="font-heading font-bold text-2xl text-foreground">
                {stat.value}
              </span>
              {stat.suffix && (
                <span className="font-body text-lg text-muted-foreground">
                  {stat.suffix}
                </span>
              )}
            </div>
            <p className="font-caption text-xs text-muted-foreground">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* Additional Insights */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="font-heading font-bold text-lg text-primary mb-1">
              #{stats.communityRank}
            </div>
            <p className="font-caption text-xs text-muted-foreground">
              Community Rank
            </p>
          </div>
          <div className="text-center">
            <div className="font-heading font-bold text-lg text-accent mb-1">
              {stats.streakDays}
            </div>
            <p className="font-caption text-xs text-muted-foreground">
              Day Streak
            </p>
          </div>
          <div className="text-center">
            <div className="font-heading font-bold text-lg text-success mb-1">
              {stats.impactScore}
            </div>
            <p className="font-caption text-xs text-muted-foreground">
              Impact Score
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EngagementStats;