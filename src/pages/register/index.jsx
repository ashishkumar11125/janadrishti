import React from 'react';
import { Link } from 'react-router-dom';
import GlobalHeader from '../../components/ui/GlobalHeader';
import PrimaryTabNavigation from '../../components/ui/PrimaryTabNavigation';
import RegistrationHeader from './components/RegistrationHeader';
import StepIndicator from './components/StepIndicator';
import RegistrationForm from './components/RegistrationForm';
import SocialRegistration from './components/SocialRegistration';
import Icon from '../../components/AppIcon';

const Register = () => {
  return (
    <div className="min-h-screen bg-background">
      <GlobalHeader />
      <PrimaryTabNavigation />
      
      <main className="pt-32 lg:pt-24 pb-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Welcome & Features */}
            <div className="lg:sticky lg:top-32">
              <RegistrationHeader />
              
              {/* Features List */}
              <div className="hidden lg:block mt-12">
                <h2 className="font-heading font-semibold text-xl text-foreground mb-6">
                  Why Join Janadrishti?
                </h2>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name="Eye" size={20} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-body font-semibold text-base text-foreground mb-1">
                        Political Transparency
                      </h3>
                      <p className="font-body text-sm text-muted-foreground">
                        Track your representatives' activities, promises, and performance with real-time updates and verified information.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name="AlertCircle" size={20} className="text-accent" />
                    </div>
                    <div>
                      <h3 className="font-body font-semibold text-base text-foreground mb-1">
                        Report Issues
                      </h3>
                      <p className="font-body text-sm text-muted-foreground">
                        Report local problems, infrastructure issues, and civic concerns directly to authorities and your community.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name="Users" size={20} className="text-success" />
                    </div>
                    <div>
                      <h3 className="font-body font-semibold text-base text-foreground mb-1">
                        Community Engagement
                      </h3>
                      <p className="font-body text-sm text-muted-foreground">
                        Connect with fellow citizens, participate in discussions, and collaborate on solutions for local issues.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name="Globe" size={20} className="text-secondary" />
                    </div>
                    <div>
                      <h3 className="font-body font-semibold text-base text-foreground mb-1">
                        Multi-Language Support
                      </h3>
                      <p className="font-body text-sm text-muted-foreground">
                        Access content in Hindi and regional Indian languages to participate in your preferred language.
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Testimonial */}
                <div className="mt-12 bg-primary/5 border border-primary/20 rounded-lg p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon name="Quote" size={20} className="text-primary" />
                    </div>
                    <div>
                      <p className="font-body text-sm text-foreground mb-3 italic">
                        "Janadrishti has transformed how I engage with local politics. I can now track my MLA's promises and report issues directly. It's democracy in action!"
                      </p>
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                          <span className="font-caption text-xs text-primary-foreground font-medium">
                            P
                          </span>
                        </div>
                        <div>
                          <p className="font-body font-medium text-sm text-foreground">
                            Priya Sharma
                          </p>
                          <p className="font-caption text-xs text-muted-foreground">
                            Active Citizen, Delhi
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Column - Registration Form */}
            <div className="w-full">
              <div className="bg-card border border-border rounded-xl elevation-2 p-6 lg:p-8">
                <StepIndicator currentStep={1} />
                <RegistrationForm />
                <SocialRegistration />
                
                {/* Login Link */}
                <div className="text-center mt-8 pt-6 border-t border-border">
                  <p className="font-body text-sm text-muted-foreground">
                    Already have an account?{' '}
                    <Link 
                      to="/login" 
                      className="text-primary hover:text-primary/80 font-medium transition-colors"
                    >
                      Sign in here
                    </Link>
                  </p>
                </div>
              </div>
              
              {/* Security Notice */}
              <div className="mt-6 bg-muted/50 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Icon name="Lock" size={16} className="text-muted-foreground flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-body text-xs text-muted-foreground">
                      Your data is protected with industry-standard encryption. We comply with Indian data protection laws and will never share your personal information without consent.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Register;