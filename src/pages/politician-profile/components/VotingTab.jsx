import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';

const VotingTab = ({ votingRecord, attendanceStats }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterVote, setFilterVote] = useState('all');
  const [filteredRecords, setFilteredRecords] = useState(votingRecord);

  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'economic', label: 'Economic Policy' },
    { value: 'social', label: 'Social Issues' },
    { value: 'infrastructure', label: 'Infrastructure' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'education', label: 'Education' },
    { value: 'environment', label: 'Environment' }
  ];

  const voteOptions = [
    { value: 'all', label: 'All Votes' },
    { value: 'yes', label: 'Voted Yes' },
    { value: 'no', label: 'Voted No' },
    { value: 'abstain', label: 'Abstained' },
    { value: 'absent', label: 'Absent' }
  ];

  const getVoteIcon = (vote) => {
    switch (vote) {
      case 'yes':
        return 'CheckCircle';
      case 'no':
        return 'XCircle';
      case 'abstain':
        return 'MinusCircle';
      case 'absent':
        return 'Clock';
      default:
        return 'Circle';
    }
  };

  const getVoteColor = (vote) => {
    switch (vote) {
      case 'yes':
        return 'text-success';
      case 'no':
        return 'text-error';
      case 'abstain':
        return 'text-warning';
      case 'absent':
        return 'text-muted-foreground';
      default:
        return 'text-muted-foreground';
    }
  };

  const getVoteBgColor = (vote) => {
    switch (vote) {
      case 'yes':
        return 'bg-success/10';
      case 'no':
        return 'bg-error/10';
      case 'abstain':
        return 'bg-warning/10';
      case 'absent':
        return 'bg-muted';
      default:
        return 'bg-muted';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    applyFilters(query, filterCategory, filterVote);
  };

  const handleCategoryFilter = (category) => {
    setFilterCategory(category);
    applyFilters(searchQuery, category, filterVote);
  };

  const handleVoteFilter = (vote) => {
    setFilterVote(vote);
    applyFilters(searchQuery, filterCategory, vote);
  };

  const applyFilters = (query, category, vote) => {
    let filtered = votingRecord;

    if (query) {
      filtered = filtered.filter(record =>
        record.billTitle.toLowerCase().includes(query.toLowerCase()) ||
        record.description.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (category !== 'all') {
      filtered = filtered.filter(record => record.category === category);
    }

    if (vote !== 'all') {
      filtered = filtered.filter(record => record.vote === vote);
    }

    setFilteredRecords(filtered);
  };

  return (
    <div className="space-y-6">
      {/* Attendance Statistics */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="font-heading font-semibold text-lg text-foreground mb-4">
          Parliamentary Attendance
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-primary/10 rounded-lg">
            <Icon name="Calendar" size={24} className="text-primary mx-auto mb-2" />
            <p className="font-heading font-bold text-xl text-foreground">
              {attendanceStats.totalSessions}
            </p>
            <p className="font-caption text-xs text-muted-foreground">Total Sessions</p>
          </div>
          <div className="text-center p-4 bg-success/10 rounded-lg">
            <Icon name="CheckCircle" size={24} className="text-success mx-auto mb-2" />
            <p className="font-heading font-bold text-xl text-foreground">
              {attendanceStats.attended}
            </p>
            <p className="font-caption text-xs text-muted-foreground">Attended</p>
          </div>
          <div className="text-center p-4 bg-error/10 rounded-lg">
            <Icon name="XCircle" size={24} className="text-error mx-auto mb-2" />
            <p className="font-heading font-bold text-xl text-foreground">
              {attendanceStats.missed}
            </p>
            <p className="font-caption text-xs text-muted-foreground">Missed</p>
          </div>
          <div className="text-center p-4 bg-accent/10 rounded-lg">
            <Icon name="Percent" size={24} className="text-accent mx-auto mb-2" />
            <p className="font-heading font-bold text-xl text-foreground">
              {attendanceStats.percentage}%
            </p>
            <p className="font-caption text-xs text-muted-foreground">Attendance Rate</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-card rounded-lg border border-border p-4">
        <div className="space-y-4">
          <Input
            type="search"
            placeholder="Search bills and legislation..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full"
          />
          <div className="flex flex-col md:flex-row md:items-center space-y-3 md:space-y-0 md:space-x-4">
            <Select
              options={categoryOptions}
              value={filterCategory}
              onChange={handleCategoryFilter}
              className="w-full md:w-48"
            />
            <Select
              options={voteOptions}
              value={filterVote}
              onChange={handleVoteFilter}
              className="w-full md:w-48"
            />
            <div className="text-sm text-muted-foreground">
              {filteredRecords.length} records found
            </div>
          </div>
        </div>
      </div>

      {/* Voting Records */}
      <div className="space-y-4">
        {filteredRecords.map((record) => (
          <div key={record.id} className="bg-card rounded-lg border border-border p-6">
            {/* Record Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="font-body font-medium text-foreground text-lg">
                    {record.billTitle}
                  </h3>
                  <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full font-medium">
                    {record.category}
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <span>Bill No: {record.billNumber}</span>
                  <span>•</span>
                  <span>{formatDate(record.date)}</span>
                  <span>•</span>
                  <span>{record.session}</span>
                </div>
              </div>
              
              {/* Vote Status */}
              <div className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${getVoteBgColor(record.vote)}`}>
                <Icon 
                  name={getVoteIcon(record.vote)} 
                  size={18} 
                  className={getVoteColor(record.vote)}
                />
                <span className={`font-medium text-sm ${getVoteColor(record.vote)}`}>
                  {record.vote.charAt(0).toUpperCase() + record.vote.slice(1)}
                </span>
              </div>
            </div>

            {/* Bill Description */}
            <div className="mb-4">
              <p className="font-body text-sm text-foreground leading-relaxed">
                {record.description}
              </p>
            </div>

            {/* Vote Breakdown */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 p-4 bg-muted/30 rounded-lg">
              <div className="text-center">
                <p className="font-heading font-bold text-lg text-success">
                  {record.voteBreakdown.yes}
                </p>
                <p className="font-caption text-xs text-muted-foreground">Yes</p>
              </div>
              <div className="text-center">
                <p className="font-heading font-bold text-lg text-error">
                  {record.voteBreakdown.no}
                </p>
                <p className="font-caption text-xs text-muted-foreground">No</p>
              </div>
              <div className="text-center">
                <p className="font-heading font-bold text-lg text-warning">
                  {record.voteBreakdown.abstain}
                </p>
                <p className="font-caption text-xs text-muted-foreground">Abstain</p>
              </div>
              <div className="text-center">
                <p className="font-heading font-bold text-lg text-muted-foreground">
                  {record.voteBreakdown.absent}
                </p>
                <p className="font-caption text-xs text-muted-foreground">Absent</p>
              </div>
            </div>

            {/* Rationale */}
            {record.rationale && (
              <div className="mb-4 p-4 bg-primary/5 border-l-4 border-primary rounded-r-lg">
                <h4 className="font-body font-medium text-foreground mb-2">
                  Voting Rationale:
                </h4>
                <p className="font-body text-sm text-muted-foreground">
                  {record.rationale}
                </p>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-border">
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="sm" iconName="ExternalLink" iconPosition="left">
                  View Full Bill
                </Button>
                <Button variant="ghost" size="sm" iconName="FileText" iconPosition="left">
                  Voting Details
                </Button>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className={`text-sm font-medium ${
                  record.result === 'Passed' ? 'text-success' : 'text-error'
                }`}>
                  {record.result}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      {filteredRecords.length >= 10 && (
        <div className="text-center">
          <Button variant="outline" iconName="ChevronDown" iconPosition="right">
            Load More Records
          </Button>
        </div>
      )}
    </div>
  );
};

export default VotingTab;