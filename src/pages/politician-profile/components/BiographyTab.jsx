import React from 'react';
import Icon from '../../../components/AppIcon';


const BiographyTab = ({ politician }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Personal Information */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="font-heading font-semibold text-lg text-foreground mb-4">
          Personal Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="font-body text-sm text-muted-foreground">Full Name</p>
            <p className="font-body font-medium text-foreground">{politician.fullName}</p>
          </div>
          <div>
            <p className="font-body text-sm text-muted-foreground">Date of Birth</p>
            <p className="font-body font-medium text-foreground">
              {formatDate(politician.dateOfBirth)} ({politician.age} years)
            </p>
          </div>
          <div>
            <p className="font-body text-sm text-muted-foreground">Place of Birth</p>
            <p className="font-body font-medium text-foreground">{politician.placeOfBirth}</p>
          </div>
          <div>
            <p className="font-body text-sm text-muted-foreground">Spouse</p>
            <p className="font-body font-medium text-foreground">{politician.spouse || 'Not disclosed'}</p>
          </div>
        </div>
      </div>

      {/* Education */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="font-heading font-semibold text-lg text-foreground mb-4">
          Educational Background
        </h3>
        <div className="space-y-4">
          {politician.education.map((edu, index) => (
            <div key={index} className="flex items-start space-x-4 p-4 bg-muted/30 rounded-lg">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name="GraduationCap" size={20} className="text-primary" />
              </div>
              <div className="flex-1">
                <h4 className="font-body font-medium text-foreground">{edu.degree}</h4>
                <p className="font-body text-sm text-muted-foreground">{edu.institution}</p>
                <p className="font-caption text-xs text-muted-foreground mt-1">{edu.year}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Political Career Timeline */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="font-heading font-semibold text-lg text-foreground mb-4">
          Political Career Timeline
        </h3>
        <div className="space-y-6">
          {politician.careerTimeline.map((milestone, index) => (
            <div key={index} className="relative flex items-start space-x-4">
              {/* Timeline Line */}
              {index !== politician.careerTimeline.length - 1 && (
                <div className="absolute left-5 top-12 w-0.5 h-16 bg-border" />
              )}
              
              {/* Timeline Dot */}
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center flex-shrink-0 z-10">
                <Icon name="Calendar" size={16} color="white" />
              </div>
              
              {/* Content */}
              <div className="flex-1 pb-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <h4 className="font-body font-medium text-foreground">{milestone.position}</h4>
                  <span className="font-caption text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full mt-1 md:mt-0">
                    {milestone.duration}
                  </span>
                </div>
                <p className="font-body text-sm text-muted-foreground mt-1">{milestone.organization}</p>
                {milestone.description && (
                  <p className="font-body text-sm text-foreground mt-2">{milestone.description}</p>
                )}
                {milestone.achievements && milestone.achievements.length > 0 && (
                  <div className="mt-3">
                    <p className="font-body text-sm font-medium text-foreground mb-2">Key Achievements:</p>
                    <ul className="space-y-1">
                      {milestone.achievements.map((achievement, achIndex) => (
                        <li key={achIndex} className="flex items-start space-x-2">
                          <Icon name="CheckCircle" size={14} className="text-success mt-0.5 flex-shrink-0" />
                          <span className="font-body text-sm text-muted-foreground">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Assets & Liabilities */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="font-heading font-semibold text-lg text-foreground mb-4">
          Assets & Liabilities Declaration
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-success/10 rounded-lg">
            <Icon name="TrendingUp" size={24} className="text-success mx-auto mb-2" />
            <p className="font-heading font-bold text-xl text-foreground">
              ₹{politician.assets.total.toLocaleString('en-IN')}
            </p>
            <p className="font-caption text-xs text-muted-foreground">Total Assets</p>
          </div>
          <div className="text-center p-4 bg-warning/10 rounded-lg">
            <Icon name="TrendingDown" size={24} className="text-warning mx-auto mb-2" />
            <p className="font-heading font-bold text-xl text-foreground">
              ₹{politician.liabilities.total.toLocaleString('en-IN')}
            </p>
            <p className="font-caption text-xs text-muted-foreground">Total Liabilities</p>
          </div>
          <div className="text-center p-4 bg-primary/10 rounded-lg">
            <Icon name="Calculator" size={24} className="text-primary mx-auto mb-2" />
            <p className="font-heading font-bold text-xl text-foreground">
              ₹{(politician.assets.total - politician.liabilities.total).toLocaleString('en-IN')}
            </p>
            <p className="font-caption text-xs text-muted-foreground">Net Worth</p>
          </div>
        </div>
        <p className="font-caption text-xs text-muted-foreground mt-4 text-center">
          Last updated: {formatDate(politician.assetsLastUpdated)}
        </p>
      </div>

      {/* Criminal Cases */}
      {politician.criminalCases && politician.criminalCases.length > 0 && (
        <div className="bg-card rounded-lg border border-border p-6">
          <h3 className="font-heading font-semibold text-lg text-foreground mb-4">
            Criminal Cases
          </h3>
          <div className="space-y-4">
            {politician.criminalCases.map((case_, index) => (
              <div key={index} className="p-4 bg-error/5 border border-error/20 rounded-lg">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-body font-medium text-foreground">{case_.title}</h4>
                    <p className="font-body text-sm text-muted-foreground mt-1">{case_.court}</p>
                    <p className="font-body text-sm text-muted-foreground">Case No: {case_.caseNumber}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    case_.status === 'Pending' ? 'bg-warning/10 text-warning' :
                    case_.status === 'Acquitted'? 'bg-success/10 text-success' : 'bg-error/10 text-error'
                  }`}>
                    {case_.status}
                  </span>
                </div>
                <p className="font-caption text-xs text-muted-foreground mt-2">
                  Filed: {formatDate(case_.filedDate)}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Contact Information */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="font-heading font-semibold text-lg text-foreground mb-4">
          Contact Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Office Address */}
          <div>
            <h4 className="font-body font-medium text-foreground mb-3">Office Address</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <Icon name="MapPin" size={18} className="text-muted-foreground mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-body text-sm text-foreground">{politician.contactInfo.officeAddress}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Icon name="Phone" size={18} className="text-muted-foreground flex-shrink-0" />
                <a 
                  href={`tel:${politician.contactInfo.phone}`}
                  className="font-body text-sm text-primary hover:underline"
                >
                  {politician.contactInfo.phone}
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Icon name="Mail" size={18} className="text-muted-foreground flex-shrink-0" />
                <a 
                  href={`mailto:${politician.contactInfo.email}`}
                  className="font-body text-sm text-primary hover:underline"
                >
                  {politician.contactInfo.email}
                </a>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="font-body font-medium text-foreground mb-3">Social Media</h4>
            <div className="space-y-3">
              {politician.socialMedia.map((social, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <Icon name="ExternalLink" size={18} className="text-muted-foreground flex-shrink-0" />
                  <a 
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body text-sm text-primary hover:underline"
                  >
                    {social.platform}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BiographyTab;