import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const FeedbackTab = ({ feedbackData, onSubmitFeedback, onSubmitQuestion }) => {
  const [activeSection, setActiveSection] = useState('overview');
  const [newFeedback, setNewFeedback] = useState({
    rating: 0,
    category: '',
    comment: '',
    anonymous: false
  });
  const [newQuestion, setNewQuestion] = useState({
    title: '',
    description: '',
    category: '',
    anonymous: false
  });
  const [filterRating, setFilterRating] = useState('all');
  const [sortBy, setSortBy] = useState('recent');

  const sections = [
    { key: 'overview', label: 'Overview', icon: 'BarChart3' },
    { key: 'feedback', label: 'Citizen Feedback', icon: 'MessageSquare' },
    { key: 'questions', label: 'Public Questions', icon: 'HelpCircle' },
    { key: 'submit', label: 'Submit Feedback', icon: 'Plus' }
  ];

  const categoryOptions = [
    { value: '', label: 'Select Category' },
    { value: 'performance', label: 'Overall Performance' },
    { value: 'communication', label: 'Communication' },
    { value: 'responsiveness', label: 'Responsiveness' },
    { value: 'transparency', label: 'Transparency' },
    { value: 'local_issues', label: 'Local Issues' },
    { value: 'policy', label: 'Policy Positions' }
  ];

  const ratingOptions = [
    { value: 'all', label: 'All Ratings' },
    { value: '5', label: '5 Stars' },
    { value: '4', label: '4 Stars' },
    { value: '3', label: '3 Stars' },
    { value: '2', label: '2 Stars' },
    { value: '1', label: '1 Star' }
  ];

  const sortOptions = [
    { value: 'recent', label: 'Most Recent' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'rating_high', label: 'Highest Rating' },
    { value: 'rating_low', label: 'Lowest Rating' },
    { value: 'helpful', label: 'Most Helpful' }
  ];

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const renderStars = (rating, interactive = false, onRatingChange = null) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => interactive && onRatingChange && onRatingChange(star)}
            className={`${interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'} transition-transform`}
            disabled={!interactive}
          >
            <Icon
              name={star <= rating ? "Star" : "Star"}
              size={16}
              className={star <= rating ? "text-yellow-400 fill-current" : "text-gray-300"}
            />
          </button>
        ))}
      </div>
    );
  };

  const handleSubmitFeedback = () => {
    if (newFeedback.rating && newFeedback.category && newFeedback.comment) {
      onSubmitFeedback(newFeedback);
      setNewFeedback({ rating: 0, category: '', comment: '', anonymous: false });
      setActiveSection('feedback');
    }
  };

  const handleSubmitQuestion = () => {
    if (newQuestion.title && newQuestion.description && newQuestion.category) {
      onSubmitQuestion(newQuestion);
      setNewQuestion({ title: '', description: '', category: '', anonymous: false });
      setActiveSection('questions');
    }
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Rating Summary */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="font-heading font-semibold text-lg text-foreground mb-4">
          Citizen Rating Summary
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-foreground mb-2">
              {feedbackData.averageRating.toFixed(1)}
            </div>
            <div className="flex justify-center mb-2">
              {renderStars(Math.round(feedbackData.averageRating))}
            </div>
            <p className="text-sm text-muted-foreground">
              Based on {feedbackData.totalFeedback} reviews
            </p>
          </div>
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((rating) => {
              const count = feedbackData.ratingBreakdown[rating] || 0;
              const percentage = (count / feedbackData.totalFeedback) * 100;
              return (
                <div key={rating} className="flex items-center space-x-3">
                  <span className="text-sm font-medium w-8">{rating}★</span>
                  <div className="flex-1 bg-muted rounded-full h-2">
                    <div
                      className="bg-yellow-400 h-2 rounded-full"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-muted-foreground w-12">{count}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Category Ratings */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="font-heading font-semibold text-lg text-foreground mb-4">
          Performance by Category
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(feedbackData.categoryRatings).map(([category, rating]) => (
            <div key={category} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <span className="font-body text-sm text-foreground capitalize">
                {category.replace('_', ' ')}
              </span>
              <div className="flex items-center space-x-2">
                {renderStars(Math.round(rating))}
                <span className="font-medium text-sm text-foreground">
                  {rating.toFixed(1)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderFeedback = () => (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-card rounded-lg border border-border p-4">
        <div className="flex flex-col md:flex-row md:items-center space-y-3 md:space-y-0 md:space-x-4">
          <Select
            options={ratingOptions}
            value={filterRating}
            onChange={setFilterRating}
            className="w-full md:w-48"
          />
          <Select
            options={sortOptions}
            value={sortBy}
            onChange={setSortBy}
            className="w-full md:w-48"
          />
          <div className="text-sm text-muted-foreground">
            {feedbackData.feedback.length} reviews
          </div>
        </div>
      </div>

      {/* Feedback List */}
      <div className="space-y-4">
        {feedbackData.feedback.map((feedback) => (
          <div key={feedback.id} className="bg-card rounded-lg border border-border p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-muted rounded-full overflow-hidden">
                  {feedback.anonymous ? (
                    <div className="w-full h-full bg-muted flex items-center justify-center">
                      <Icon name="User" size={20} className="text-muted-foreground" />
                    </div>
                  ) : (
                    <Image
                      src={feedback.user.avatar}
                      alt={feedback.user.name}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div>
                  <h4 className="font-body font-medium text-foreground">
                    {feedback.anonymous ? 'Anonymous Citizen' : feedback.user.name}
                  </h4>
                  <div className="flex items-center space-x-2 mt-1">
                    {renderStars(feedback.rating)}
                    <span className="text-sm text-muted-foreground">•</span>
                    <span className="text-sm text-muted-foreground">
                      {formatDate(feedback.date)}
                    </span>
                  </div>
                </div>
              </div>
              <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full">
                {feedback.category.replace('_', ' ')}
              </span>
            </div>

            <p className="font-body text-sm text-foreground leading-relaxed mb-4">
              {feedback.comment}
            </p>

            <div className="flex items-center justify-between pt-4 border-t border-border">
              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors">
                  <Icon name="ThumbsUp" size={16} />
                  <span className="text-sm">{feedback.helpful}</span>
                </button>
                <button className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors">
                  <Icon name="MessageCircle" size={16} />
                  <span className="text-sm">Reply</span>
                </button>
              </div>
              {feedback.verified && (
                <div className="flex items-center space-x-1 text-success">
                  <Icon name="CheckCircle" size={14} />
                  <span className="text-xs">Verified</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderQuestions = () => (
    <div className="space-y-4">
      {feedbackData.questions.map((question) => (
        <div key={question.id} className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-muted rounded-full overflow-hidden">
                {question.anonymous ? (
                  <div className="w-full h-full bg-muted flex items-center justify-center">
                    <Icon name="User" size={20} className="text-muted-foreground" />
                  </div>
                ) : (
                  <Image
                    src={question.user.avatar}
                    alt={question.user.name}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <div className="flex-1">
                <h4 className="font-body font-medium text-foreground">
                  {question.title}
                </h4>
                <p className="text-sm text-muted-foreground">
                  by {question.anonymous ? 'Anonymous Citizen' : question.user.name} • {formatDate(question.date)}
                </p>
              </div>
            </div>
            <span className={`px-2 py-1 text-xs rounded-full font-medium ${
              question.status === 'answered' ? 'bg-success/10 text-success' :
              question.status === 'pending'? 'bg-warning/10 text-warning' : 'bg-muted text-muted-foreground'
            }`}>
              {question.status}
            </span>
          </div>

          <p className="font-body text-sm text-foreground leading-relaxed mb-4">
            {question.description}
          </p>

          {question.answer && (
            <div className="p-4 bg-primary/5 border-l-4 border-primary rounded-r-lg mb-4">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="MessageSquare" size={16} className="text-primary" />
                <span className="font-body font-medium text-sm text-foreground">Official Response</span>
              </div>
              <p className="font-body text-sm text-foreground">
                {question.answer}
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                Answered on {formatDate(question.answeredDate)}
              </p>
            </div>
          )}

          <div className="flex items-center space-x-4 pt-4 border-t border-border">
            <button className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors">
              <Icon name="ThumbsUp" size={16} />
              <span className="text-sm">{question.upvotes}</span>
            </button>
            <button className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors">
              <Icon name="MessageCircle" size={16} />
              <span className="text-sm">{question.comments}</span>
            </button>
            <button className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors">
              <Icon name="Share2" size={16} />
              <span className="text-sm">Share</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  const renderSubmitForm = () => (
    <div className="space-y-6">
      {/* Submit Feedback */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="font-heading font-semibold text-lg text-foreground mb-4">
          Submit Feedback
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block font-body text-sm font-medium text-foreground mb-2">
              Overall Rating
            </label>
            {renderStars(newFeedback.rating, true, (rating) => 
              setNewFeedback(prev => ({ ...prev, rating }))
            )}
          </div>
          
          <Select
            label="Category"
            options={categoryOptions}
            value={newFeedback.category}
            onChange={(value) => setNewFeedback(prev => ({ ...prev, category: value }))}
            required
          />

          <div>
            <label className="block font-body text-sm font-medium text-foreground mb-2">
              Your Feedback
            </label>
            <textarea
              value={newFeedback.comment}
              onChange={(e) => setNewFeedback(prev => ({ ...prev, comment: e.target.value }))}
              placeholder="Share your thoughts about this politician's performance..."
              className="w-full p-3 border border-border rounded-lg resize-none h-32 font-body text-sm"
              required
            />
          </div>

          <Checkbox
            label="Submit anonymously"
            checked={newFeedback.anonymous}
            onChange={(e) => setNewFeedback(prev => ({ ...prev, anonymous: e.target.checked }))}
          />

          <Button
            onClick={handleSubmitFeedback}
            disabled={!newFeedback.rating || !newFeedback.category || !newFeedback.comment}
            iconName="Send"
            iconPosition="left"
          >
            Submit Feedback
          </Button>
        </div>
      </div>

      {/* Submit Question */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="font-heading font-semibold text-lg text-foreground mb-4">
          Ask a Public Question
        </h3>
        <div className="space-y-4">
          <Input
            label="Question Title"
            type="text"
            value={newQuestion.title}
            onChange={(e) => setNewQuestion(prev => ({ ...prev, title: e.target.value }))}
            placeholder="What would you like to ask?"
            required
          />

          <div>
            <label className="block font-body text-sm font-medium text-foreground mb-2">
              Question Details
            </label>
            <textarea
              value={newQuestion.description}
              onChange={(e) => setNewQuestion(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Provide more details about your question..."
              className="w-full p-3 border border-border rounded-lg resize-none h-32 font-body text-sm"
              required
            />
          </div>

          <Select
            label="Category"
            options={categoryOptions}
            value={newQuestion.category}
            onChange={(value) => setNewQuestion(prev => ({ ...prev, category: value }))}
            required
          />

          <Checkbox
            label="Ask anonymously"
            checked={newQuestion.anonymous}
            onChange={(e) => setNewQuestion(prev => ({ ...prev, anonymous: e.target.checked }))}
          />

          <Button
            onClick={handleSubmitQuestion}
            disabled={!newQuestion.title || !newQuestion.description || !newQuestion.category}
            iconName="HelpCircle"
            iconPosition="left"
          >
            Submit Question
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Section Navigation */}
      <div className="bg-card rounded-lg border border-border p-4">
        <div className="flex flex-wrap gap-2">
          {sections.map((section) => (
            <button
              key={section.key}
              onClick={() => setActiveSection(section.key)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                activeSection === section.key
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
              }`}
            >
              <Icon name={section.icon} size={16} />
              <span className="font-body text-sm">{section.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Section Content */}
      {activeSection === 'overview' && renderOverview()}
      {activeSection === 'feedback' && renderFeedback()}
      {activeSection === 'questions' && renderQuestions()}
      {activeSection === 'submit' && renderSubmitForm()}
    </div>
  );
};

export default FeedbackTab;