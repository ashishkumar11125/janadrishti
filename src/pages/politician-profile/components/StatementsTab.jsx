import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';

const StatementsTab = ({ statements }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [filteredStatements, setFilteredStatements] = useState(statements);

  const typeOptions = [
    { value: 'all', label: 'All Statements' },
    { value: 'press', label: 'Press Releases' },
    { value: 'speech', label: 'Speeches' },
    { value: 'interview', label: 'Interviews' },
    { value: 'social', label: 'Social Media' },
    { value: 'parliament', label: 'Parliamentary' }
  ];

  const sortOptions = [
    { value: 'recent', label: 'Most Recent' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'engagement', label: 'Most Engagement' }
  ];

  const getStatementIcon = (type) => {
    const iconMap = {
      press: 'FileText',
      speech: 'Mic',
      interview: 'MessageCircle',
      social: 'Share2',
      parliament: 'Building'
    };
    return iconMap[type] || 'MessageSquare';
  };

  const getStatementColor = (type) => {
    const colorMap = {
      press: 'text-primary',
      speech: 'text-success',
      interview: 'text-accent',
      social: 'text-warning',
      parliament: 'text-secondary'
    };
    return colorMap[type] || 'text-muted-foreground';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    applyFilters(query, filterType, sortBy);
  };

  const handleTypeFilter = (type) => {
    setFilterType(type);
    applyFilters(searchQuery, type, sortBy);
  };

  const handleSort = (sort) => {
    setSortBy(sort);
    applyFilters(searchQuery, filterType, sort);
  };

  const applyFilters = (query, type, sort) => {
    let filtered = statements;

    if (query) {
      filtered = filtered.filter(statement =>
        statement.title.toLowerCase().includes(query.toLowerCase()) ||
        statement.content.toLowerCase().includes(query.toLowerCase()) ||
        statement.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
      );
    }

    if (type !== 'all') {
      filtered = filtered.filter(statement => statement.type === type);
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sort) {
        case 'recent':
          return new Date(b.date) - new Date(a.date);
        case 'oldest':
          return new Date(a.date) - new Date(b.date);
        case 'engagement':
          return (b.likes + b.comments + b.shares) - (a.likes + a.comments + a.shares);
        default:
          return 0;
      }
    });

    setFilteredStatements(filtered);
  };

  const truncateContent = (content, maxLength = 300) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-card rounded-lg border border-border p-4">
        <div className="space-y-4">
          <Input
            type="search"
            placeholder="Search statements, speeches, interviews..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full"
          />
          <div className="flex flex-col md:flex-row md:items-center space-y-3 md:space-y-0 md:space-x-4">
            <Select
              options={typeOptions}
              value={filterType}
              onChange={handleTypeFilter}
              className="w-full md:w-48"
            />
            <Select
              options={sortOptions}
              value={sortBy}
              onChange={handleSort}
              className="w-full md:w-48"
            />
            <div className="text-sm text-muted-foreground">
              {filteredStatements.length} statements found
            </div>
          </div>
        </div>
      </div>

      {/* Statements List */}
      <div className="space-y-4">
        {filteredStatements.map((statement) => (
          <div key={statement.id} className="bg-card rounded-lg border border-border p-6 hover:elevation-1 transition-all duration-200">
            {/* Statement Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start space-x-3">
                <div className={`w-10 h-10 rounded-lg bg-muted flex items-center justify-center ${getStatementColor(statement.type)}`}>
                  <Icon name={getStatementIcon(statement.type)} size={20} />
                </div>
                <div className="flex-1">
                  <h3 className="font-body font-medium text-foreground text-lg">
                    {statement.title}
                  </h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="font-caption text-xs text-muted-foreground">
                      {statement.type.charAt(0).toUpperCase() + statement.type.slice(1)}
                    </span>
                    <span className="text-muted-foreground">•</span>
                    <span className="font-caption text-xs text-muted-foreground">
                      {formatDate(statement.date)}
                    </span>
                    {statement.venue && (
                      <>
                        <span className="text-muted-foreground">•</span>
                        <span className="font-caption text-xs text-muted-foreground">
                          {statement.venue}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <Button variant="ghost" size="icon">
                <Icon name="MoreHorizontal" size={20} />
              </Button>
            </div>

            {/* Statement Content */}
            <div className="mb-4">
              <p className="font-body text-sm text-foreground leading-relaxed">
                {truncateContent(statement.content)}
              </p>
              
              {statement.content.length > 300 && (
                <Button variant="ghost" size="sm" className="mt-2 p-0 h-auto">
                  Read more
                </Button>
              )}
            </div>

            {/* Statement Media */}
            {statement.media && statement.media.length > 0 && (
              <div className="mb-4">
                {statement.media[0].type === 'video' ? (
                  <div className="relative rounded-lg overflow-hidden bg-black">
                    <div className="aspect-video flex items-center justify-center">
                      <Button variant="ghost" size="lg" iconName="Play" className="text-white">
                        Play Video
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="rounded-lg overflow-hidden">
                    <Image
                      src={statement.media[0].url}
                      alt={statement.media[0].alt}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                )}
              </div>
            )}

            {/* Key Points */}
            {statement.keyPoints && statement.keyPoints.length > 0 && (
              <div className="mb-4 p-4 bg-primary/5 rounded-lg">
                <h4 className="font-body font-medium text-foreground mb-3">Key Points:</h4>
                <ul className="space-y-2">
                  {statement.keyPoints.map((point, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <Icon name="CheckCircle" size={14} className="text-primary mt-0.5 flex-shrink-0" />
                      <span className="font-body text-sm text-foreground">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Statement Tags */}
            {statement.tags && statement.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {statement.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Statement Engagement */}
            <div className="flex items-center justify-between pt-4 border-t border-border">
              <div className="flex items-center space-x-6">
                <button className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors">
                  <Icon name="Heart" size={18} />
                  <span className="font-caption text-sm">{statement.likes}</span>
                </button>
                <button className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors">
                  <Icon name="MessageCircle" size={18} />
                  <span className="font-caption text-sm">{statement.comments}</span>
                </button>
                <button className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors">
                  <Icon name="Share2" size={18} />
                  <span className="font-caption text-sm">{statement.shares}</span>
                </button>
              </div>
              
              <div className="flex items-center space-x-2">
                {statement.source && (
                  <>
                    <Icon name="ExternalLink" size={14} className="text-muted-foreground" />
                    <a
                      href={statement.source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-caption text-xs text-primary hover:underline"
                    >
                      {statement.source.name}
                    </a>
                  </>
                )}
              </div>
            </div>

            {/* Quote Highlight */}
            {statement.quote && (
              <div className="mt-4 p-4 bg-accent/5 border-l-4 border-accent rounded-r-lg">
                <blockquote className="font-body text-sm text-foreground italic">
                  "{statement.quote}"
                </blockquote>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Load More */}
      {filteredStatements.length >= 10 && (
        <div className="text-center">
          <Button variant="outline" iconName="ChevronDown" iconPosition="right">
            Load More Statements
          </Button>
        </div>
      )}
    </div>
  );
};

export default StatementsTab;