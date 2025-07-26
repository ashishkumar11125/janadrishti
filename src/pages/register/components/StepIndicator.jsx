import React from 'react';
import Icon from '../../../components/AppIcon';

const StepIndicator = ({ currentStep, totalSteps = 3 }) => {
  const steps = [
    { number: 1, title: 'Account Details', description: 'Basic information' },
    { number: 2, title: 'Location', description: 'State & district' },
    { number: 3, title: 'Verification', description: 'Terms & confirmation' }
  ];

  return (
    <div className="w-full mb-8">
      {/* Mobile Step Indicator */}
      <div className="md:hidden">
        <div className="flex items-center justify-between mb-4">
          <span className="font-caption text-sm text-muted-foreground">
            Step {currentStep} of {totalSteps}
          </span>
          <span className="font-caption text-sm text-primary font-medium">
            {Math.round((currentStep / totalSteps) * 100)}% Complete
          </span>
        </div>
        
        <div className="w-full bg-muted rounded-full h-2 mb-4">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
        
        <div className="text-center">
          <h2 className="font-heading font-semibold text-lg text-foreground">
            {steps[currentStep - 1].title}
          </h2>
          <p className="font-body text-sm text-muted-foreground">
            {steps[currentStep - 1].description}
          </p>
        </div>
      </div>

      {/* Desktop Step Indicator */}
      <div className="hidden md:block">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <React.Fragment key={step.number}>
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-200 ${
                    step.number < currentStep
                      ? 'bg-primary border-primary text-primary-foreground'
                      : step.number === currentStep
                      ? 'bg-primary border-primary text-primary-foreground'
                      : 'bg-card border-border text-muted-foreground'
                  }`}
                >
                  {step.number < currentStep ? (
                    <Icon name="Check" size={16} />
                  ) : (
                    <span className="font-caption font-medium text-sm">
                      {step.number}
                    </span>
                  )}
                </div>
                
                <div className="mt-2 text-center">
                  <p
                    className={`font-body font-medium text-sm ${
                      step.number <= currentStep ? 'text-foreground' : 'text-muted-foreground'
                    }`}
                  >
                    {step.title}
                  </p>
                  <p className="font-caption text-xs text-muted-foreground mt-1">
                    {step.description}
                  </p>
                </div>
              </div>
              
              {index < steps.length - 1 && (
                <div className="flex-1 mx-4">
                  <div
                    className={`h-0.5 transition-all duration-200 ${
                      step.number < currentStep ? 'bg-primary' : 'bg-border'
                    }`}
                  />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StepIndicator;