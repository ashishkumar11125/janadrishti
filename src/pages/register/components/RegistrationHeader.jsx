import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const RegistrationHeader = () => {
  return (
    <div className="text-center mb-8">
      {/* Logo */}
      <Link to="/home-feed" className="inline-flex items-center space-x-3 mb-6">
        <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
          <Icon name="Eye" size={24} color="white" />
        </div>
        <span className="font-heading font-bold text-2xl text-foreground">
          Janadrishti
        </span>
      </Link>

      {/* Welcome Message */}
      <div className="space-y-2">
        <h1 className="font-heading font-bold text-2xl md:text-3xl text-foreground">
          Join the Movement
        </h1>
        <p className="font-body text-base text-muted-foreground max-w-md mx-auto">
          Create your account to engage with political activities, report issues, and make your voice heard in Indian democracy
        </p>
      </div>

      {/* Trust Indicators */}
      <div className="flex items-center justify-center space-x-6 mt-6 pt-6 border-t border-border">
        <div className="flex items-center space-x-2">
          <Icon name="Shield" size={16} className="text-success" />
          <span className="font-caption text-xs text-muted-foreground">
            Secure & Private
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="Users" size={16} className="text-primary" />
          <span className="font-caption text-xs text-muted-foreground">
            50K+ Citizens
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="Verified" size={16} className="text-accent" />
          <span className="font-caption text-xs text-muted-foreground">
            Verified Platform
          </span>
        </div>
      </div>
    </div>
  );
};

export default RegistrationHeader;