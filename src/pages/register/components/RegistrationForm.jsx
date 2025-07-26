import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
    preferredLanguage: 'en',
    state: '',
    district: '',
    agreeToTerms: false,
    ageVerification: false,
    emailNotifications: true,
    smsNotifications: false
  });
  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState(0);

  const languageOptions = [
    { value: 'en', label: 'English' },
    { value: 'hi', label: 'हिंदी (Hindi)' },
    { value: 'ta', label: 'தமிழ் (Tamil)' },
    { value: 'te', label: 'తెలుగు (Telugu)' },
    { value: 'bn', label: 'বাংলা (Bengali)' },
    { value: 'mr', label: 'मराठी (Marathi)' },
    { value: 'gu', label: 'ગુજરાતી (Gujarati)' },
    { value: 'kn', label: 'ಕನ್ನಡ (Kannada)' },
    { value: 'ml', label: 'മലയാളം (Malayalam)' },
    { value: 'pa', label: 'ਪੰਜਾਬੀ (Punjabi)' }
  ];

  const stateOptions = [
    { value: '', label: 'Select State' },
    { value: 'andhra-pradesh', label: 'Andhra Pradesh' },
    { value: 'assam', label: 'Assam' },
    { value: 'bihar', label: 'Bihar' },
    { value: 'chandigarh', label: 'Chandigarh' },
    { value: 'delhi', label: 'Delhi' },
    { value: 'gujarat', label: 'Gujarat' },
    { value: 'haryana', label: 'Haryana' },
    { value: 'karnataka', label: 'Karnataka' },
    { value: 'kerala', label: 'Kerala' },
    { value: 'maharashtra', label: 'Maharashtra' },
    { value: 'punjab', label: 'Punjab' },
    { value: 'rajasthan', label: 'Rajasthan' },
    { value: 'tamil-nadu', label: 'Tamil Nadu' },
    { value: 'telangana', label: 'Telangana' },
    { value: 'uttar-pradesh', label: 'Uttar Pradesh' },
    { value: 'west-bengal', label: 'West Bengal' }
  ];

  const districtOptions = {
    'chandigarh': [
      { value: 'chandigarh', label: 'Chandigarh' }
    ],
    'delhi': [
      { value: 'central-delhi', label: 'Central Delhi' },
      { value: 'east-delhi', label: 'East Delhi' },
      { value: 'new-delhi', label: 'New Delhi' },
      { value: 'north-delhi', label: 'North Delhi' },
      { value: 'south-delhi', label: 'South Delhi' },
      { value: 'west-delhi', label: 'West Delhi' }
    ],
    'punjab': [
      { value: 'amritsar', label: 'Amritsar' },
      { value: 'ludhiana', label: 'Ludhiana' },
      { value: 'jalandhar', label: 'Jalandhar' },
      { value: 'patiala', label: 'Patiala' },
      { value: 'mohali', label: 'Mohali' }
    ],
    'haryana': [
      { value: 'gurgaon', label: 'Gurgaon' },
      { value: 'faridabad', label: 'Faridabad' },
      { value: 'panipat', label: 'Panipat' },
      { value: 'ambala', label: 'Ambala' },
      { value: 'karnal', label: 'Karnal' }
    ]
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[a-z]/.test(password)) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password) && /[!@#$%^&*]/.test(password)) strength += 25;
    return strength;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    if (field === 'password') {
      setPasswordStrength(calculatePasswordStrength(value));
    }
    
    if (field === 'state') {
      setFormData(prev => ({ ...prev, district: '' }));
    }
    
    // Clear field-specific errors
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    if (step === 1) {
      if (!formData.fullName.trim()) {
        newErrors.fullName = 'Full name is required';
      } else if (formData.fullName.length < 2) {
        newErrors.fullName = 'Name must be at least 2 characters';
      }
      
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
      
      if (!formData.mobile.trim()) {
        newErrors.mobile = 'Mobile number is required';
      } else if (!/^[6-9]\d{9}$/.test(formData.mobile)) {
        newErrors.mobile = 'Please enter a valid 10-digit mobile number';
      }
      
      if (!formData.password) {
        newErrors.password = 'Password is required';
      } else if (formData.password.length < 8) {
        newErrors.password = 'Password must be at least 8 characters';
      }
      
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }
    
    if (step === 2) {
      if (!formData.state) {
        newErrors.state = 'Please select your state';
      }
      
      if (!formData.district) {
        newErrors.district = 'Please select your district';
      }
    }
    
    if (step === 3) {
      if (!formData.agreeToTerms) {
        newErrors.agreeToTerms = 'You must agree to the terms and conditions';
      }
      
      if (!formData.ageVerification) {
        newErrors.ageVerification = 'You must confirm you are 18 years or older';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async () => {
    if (!validateStep(3)) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Navigate to verification or home
      navigate('/home-feed');
    }, 2000);
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength < 25) return 'bg-error';
    if (passwordStrength < 50) return 'bg-warning';
    if (passwordStrength < 75) return 'bg-accent';
    return 'bg-success';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength < 25) return 'Weak';
    if (passwordStrength < 50) return 'Fair';
    if (passwordStrength < 75) return 'Good';
    return 'Strong';
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div>
        <h2 className="font-heading font-semibold text-xl text-foreground mb-2">
          Account Details
        </h2>
        <p className="font-body text-sm text-muted-foreground">
          Create your Janadrishti account to start engaging with political activities
        </p>
      </div>

      <div className="space-y-4">
        <Input
          label="Full Name"
          type="text"
          placeholder="Enter your full name"
          value={formData.fullName}
          onChange={(e) => handleInputChange('fullName', e.target.value)}
          error={errors.fullName}
          required
        />

        <Input
          label="Email Address"
          type="email"
          placeholder="Enter your email address"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          error={errors.email}
          required
        />

        <Input
          label="Mobile Number"
          type="tel"
          placeholder="Enter 10-digit mobile number"
          value={formData.mobile}
          onChange={(e) => handleInputChange('mobile', e.target.value)}
          error={errors.mobile}
          required
        />

        <div>
          <Input
            label="Password"
            type="password"
            placeholder="Create a strong password"
            value={formData.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
            error={errors.password}
            required
          />
          {formData.password && (
            <div className="mt-2">
              <div className="flex items-center justify-between mb-1">
                <span className="font-caption text-xs text-muted-foreground">
                  Password Strength
                </span>
                <span className={`font-caption text-xs font-medium ${
                  passwordStrength < 50 ? 'text-error' : 'text-success'
                }`}>
                  {getPasswordStrengthText()}
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                  style={{ width: `${passwordStrength}%` }}
                />
              </div>
            </div>
          )}
        </div>

        <Input
          label="Confirm Password"
          type="password"
          placeholder="Confirm your password"
          value={formData.confirmPassword}
          onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
          error={errors.confirmPassword}
          required
        />

        <Select
          label="Preferred Language"
          options={languageOptions}
          value={formData.preferredLanguage}
          onChange={(value) => handleInputChange('preferredLanguage', value)}
          searchable
        />
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div>
        <h2 className="font-heading font-semibold text-xl text-foreground mb-2">
          Location Preferences
        </h2>
        <p className="font-body text-sm text-muted-foreground">
          Help us show you relevant political activities and representatives in your area
        </p>
      </div>

      <div className="space-y-4">
        <Select
          label="State"
          options={stateOptions}
          value={formData.state}
          onChange={(value) => handleInputChange('state', value)}
          error={errors.state}
          required
          searchable
        />

        <Select
          label="District"
          options={formData.state ? (districtOptions[formData.state] || []) : []}
          value={formData.district}
          onChange={(value) => handleInputChange('district', value)}
          error={errors.district}
          required
          disabled={!formData.state}
          searchable
        />

        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Icon name="MapPin" size={20} className="text-primary flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-body font-medium text-sm text-foreground mb-1">
                Quick Location Fill
              </h3>
              <p className="font-body text-xs text-muted-foreground mb-3">
                Allow location access to automatically fill your state and district
              </p>
              <Button variant="outline" size="sm">
                <Icon name="MapPin" size={16} className="mr-2" />
                Use Current Location
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="font-body font-medium text-sm text-foreground">
            Notification Preferences
          </h3>
          
          <Checkbox
            label="Email Notifications"
            description="Receive updates about political activities and issues via email"
            checked={formData.emailNotifications}
            onChange={(e) => handleInputChange('emailNotifications', e.target.checked)}
          />
          
          <Checkbox
            label="SMS Notifications"
            description="Get important alerts and updates via SMS"
            checked={formData.smsNotifications}
            onChange={(e) => handleInputChange('smsNotifications', e.target.checked)}
          />
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div>
        <h2 className="font-heading font-semibold text-xl text-foreground mb-2">
          Terms & Verification
        </h2>
        <p className="font-body text-sm text-muted-foreground">
          Please review and accept our terms to complete your registration
        </p>
      </div>

      <div className="space-y-4">
        <Checkbox
          label="I agree to the Terms of Service and Privacy Policy"
          description="By checking this box, you agree to our platform guidelines and data handling practices"
          error={errors.agreeToTerms}
          checked={formData.agreeToTerms}
          onChange={(e) => handleInputChange('agreeToTerms', e.target.checked)}
          required
        />

        <Checkbox
          label="I confirm that I am 18 years of age or older"
          description="You must be at least 18 years old to participate in political discussions"
          error={errors.ageVerification}
          checked={formData.ageVerification}
          onChange={(e) => handleInputChange('ageVerification', e.target.checked)}
          required
        />

        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Icon name="Shield" size={20} className="text-primary flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-body font-medium text-sm text-foreground mb-1">
                Your Privacy Matters
              </h3>
              <p className="font-body text-xs text-muted-foreground">
                We protect your personal information and will never share it without your consent. 
                Your political views and activities remain private unless you choose to make them public.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-muted/50 rounded-lg p-4">
          <h3 className="font-body font-medium text-sm text-foreground mb-2">
            Account Summary
          </h3>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Name:</span>
              <span className="text-foreground">{formData.fullName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Email:</span>
              <span className="text-foreground">{formData.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Mobile:</span>
              <span className="text-foreground">+91 {formData.mobile}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Location:</span>
              <span className="text-foreground">
                {formData.district}, {stateOptions.find(s => s.value === formData.state)?.label}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Language:</span>
              <span className="text-foreground">
                {languageOptions.find(l => l.value === formData.preferredLanguage)?.label}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-md mx-auto">
      {currentStep === 1 && renderStep1()}
      {currentStep === 2 && renderStep2()}
      {currentStep === 3 && renderStep3()}

      <div className="flex items-center justify-between pt-6 mt-6 border-t border-border">
        {currentStep > 1 ? (
          <Button variant="outline" onClick={handlePrevious}>
            <Icon name="ChevronLeft" size={16} className="mr-2" />
            Previous
          </Button>
        ) : (
          <div />
        )}

        {currentStep < 3 ? (
          <Button onClick={handleNext}>
            Next
            <Icon name="ChevronRight" size={16} className="ml-2" />
          </Button>
        ) : (
          <Button 
            onClick={handleSubmit} 
            loading={isLoading}
            disabled={!formData.agreeToTerms || !formData.ageVerification}
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </Button>
        )}
      </div>
    </div>
  );
};

export default RegistrationForm;