import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import GlobalHeader from '../../components/ui/GlobalHeader';
import PrimaryTabNavigation from '../../components/ui/PrimaryTabNavigation';
import PoliticianHeader from './components/PoliticianHeader';
import TabNavigation from './components/TabNavigation';
import BiographyTab from './components/BiographyTab';
import ActivitiesTab from './components/ActivitiesTab';
import VotingTab from './components/VotingTab';
import StatementsTab from './components/StatementsTab';
import FeedbackTab from './components/FeedbackTab';
import Icon from '../../components/AppIcon';

const PoliticianProfile = () => {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState('biography');
  const [loading, setLoading] = useState(true);
  const [politician, setPolitician] = useState(null);

  // Mock politician data
  const mockPolitician = {
    id: searchParams.get('id') || '1',
    name: 'Dr. Rajesh Kumar Sharma',
    fullName: 'Dr. Rajesh Kumar Sharma',
    position: 'Member of Parliament (Lok Sabha)',
    party: 'BJP',
    constituency: 'Chandigarh',
    state: 'Chandigarh',
    profilePhoto: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400',
    coverPhoto: 'https://images.pexels.com/photos/1550337/pexels-photo-1550337.jpeg?auto=compress&cs=tinysrgb&w=1200',
    isVerified: true,
    isFollowing: false,
    followersCount: 45678,
    totalActivities: 234,
    responseRate: 78,
    age: 52,
    dateOfBirth: '1972-03-15',
    placeOfBirth: 'Chandigarh, India',
    spouse: 'Mrs. Priya Sharma',
    education: [
      {
        degree: 'Ph.D. in Political Science',
        institution: 'Panjab University, Chandigarh',
        year: '2001'
      },
      {
        degree: 'Master of Arts (Political Science)',
        institution: 'Delhi University, Delhi',
        year: '1996'
      },
      {
        degree: 'Bachelor of Arts',
        institution: 'Government College, Chandigarh',
        year: '1994'
      }
    ],
    careerTimeline: [
      {
        position: 'Member of Parliament (Lok Sabha)',
        organization: 'Parliament of India',
        duration: '2019 - Present',
        description: 'Representing Chandigarh constituency in the lower house of Indian Parliament.',
        achievements: [
          'Introduced 3 private member bills on urban development',
          'Member of Standing Committee on Urban Development',
          'Achieved 85% attendance in parliamentary sessions'
        ]
      },
      {
        position: 'Member of Legislative Assembly',
        organization: 'Chandigarh Legislative Assembly',
        duration: '2012 - 2019',
        description: 'Served as MLA representing Chandigarh constituency.',
        achievements: [
          'Initiated Smart City project for Chandigarh',
          'Established 5 new healthcare centers',
          'Led environmental conservation initiatives'
        ]
      },
      {
        position: 'Municipal Councillor',
        organization: 'Chandigarh Municipal Corporation',
        duration: '2007 - 2012',
        description: 'Elected representative in local municipal governance.',
        achievements: [
          'Improved waste management systems',
          'Enhanced public transportation',
          'Promoted digital governance initiatives'
        ]
      }
    ],
    assets: {
      total: 2500000,
      breakdown: {
        immovable: 1800000,
        movable: 700000
      }
    },
    liabilities: {
      total: 450000
    },
    assetsLastUpdated: '2024-01-15',
    criminalCases: [
      {
        title: 'Election Code Violation',
        court: 'District Court, Chandigarh',
        caseNumber: 'CC/2019/456',
        status: 'Acquitted',
        filedDate: '2019-05-20'
      }
    ],
    contactInfo: {
      email: 'mp.chandigarh@parliament.gov.in',
      phone: '+91-172-2740123',
      website: 'https://rajeshsharma.gov.in',
      officeAddress: 'MP Office, Sector 1, Chandigarh - 160001'
    },
    socialMedia: [
      { platform: 'Twitter', url: 'https://twitter.com/rajeshsharma' },
      { platform: 'Facebook', url: 'https://facebook.com/rajeshsharmaofficial' },
      { platform: 'Instagram', url: 'https://instagram.com/rajeshsharma' }
    ]
  };

  // Mock activities data
  const mockActivities = [
    {
      id: 1,
      type: 'parliamentary',
      title: 'Participated in Budget Session Discussion on Urban Development',
      description: `Actively participated in the budget session discussion focusing on urban development initiatives for smart cities. Raised concerns about infrastructure development in tier-2 cities and proposed amendments to increase funding allocation for sustainable urban planning projects.`,
      date: '2025-01-20',
      location: 'Parliament House, New Delhi',
      media: [
        {
          url: 'https://images.pexels.com/photos/8828786/pexels-photo-8828786.jpeg?auto=compress&cs=tinysrgb&w=800',
          alt: 'Parliament session discussion'
        }
      ],
      tags: ['budget', 'urban development', 'infrastructure'],
      likes: 234,
      comments: 45,
      shares: 67,
      source: {
        name: 'Lok Sabha TV',
        url: 'https://loksabhatv.nic.in'
      }
    },
    {
      id: 2,
      type: 'public',
      title: 'Inaugurated New Community Health Center in Sector 45',
      description: `Inaugurated a state-of-the-art community health center in Sector 45, Chandigarh. The facility will serve over 25,000 residents and includes modern diagnostic equipment, emergency services, and specialized clinics for women and children healthcare.`,
      date: '2025-01-18',
      location: 'Sector 45, Chandigarh',
      media: [
        {
          url: 'https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=800',
          alt: 'Health center inauguration'
        },
        {
          url: 'https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=800',
          alt: 'Medical equipment'
        }
      ],
      tags: ['healthcare', 'community', 'inauguration'],
      likes: 567,
      comments: 89,
      shares: 123
    },
    {
      id: 3,
      type: 'social',
      title: 'Shared Update on Environmental Conservation Initiative',
      description: `Proud to announce that our tree plantation drive has successfully planted over 10,000 saplings across Chandigarh. This initiative is part of our commitment to making Chandigarh a carbon-neutral city by 2030. Thank you to all volunteers and citizens who participated.`,
      date: '2025-01-15',
      media: [
        {
          url: 'https://images.pexels.com/photos/1072824/pexels-photo-1072824.jpeg?auto=compress&cs=tinysrgb&w=800',
          alt: 'Tree plantation drive'
        }
      ],
      tags: ['environment', 'tree plantation', 'sustainability'],
      likes: 892,
      comments: 156,
      shares: 234,
      source: {
        name: 'Twitter',
        url: 'https://twitter.com/rajeshsharma'
      }
    }
  ];

  // Mock voting record data
  const mockVotingRecord = [
    {
      id: 1,
      billTitle: 'The Digital India Infrastructure Development Bill 2024',
      billNumber: 'LS-2024/DIB/001',
      category: 'infrastructure',
      description: `A comprehensive bill aimed at accelerating digital infrastructure development across India, including broadband connectivity, digital payment systems, and e-governance platforms. The bill proposes an investment of ₹2 lakh crores over the next five years.`,
      date: '2024-12-15',
      session: 'Winter Session 2024',
      vote: 'yes',
      voteBreakdown: {
        yes: 287,
        no: 156,
        abstain: 23,
        absent: 77
      },
      result: 'Passed',
      rationale: `Voted in favor as this bill aligns with our vision of Digital India and will significantly boost connectivity in rural and semi-urban areas. The proposed infrastructure development will create employment opportunities and enhance digital literacy.`
    },
    {
      id: 2,
      billTitle: 'The Healthcare Access and Affordability Act 2024',
      billNumber: 'LS-2024/HAA/002',
      category: 'healthcare',
      description: `Legislation focused on improving healthcare accessibility and affordability for all citizens, including provisions for universal health insurance, telemedicine services, and strengthening primary healthcare infrastructure.`,
      date: '2024-11-28',
      session: 'Winter Session 2024',
      vote: 'yes',
      voteBreakdown: {
        yes: 312,
        no: 134,
        abstain: 18,
        absent: 79
      },
      result: 'Passed',
      rationale: `Strongly supported this bill as healthcare is a fundamental right. The provisions for universal health insurance and telemedicine will particularly benefit rural populations and economically disadvantaged sections of society.`
    }
  ];

  // Mock attendance stats
  const mockAttendanceStats = {
    totalSessions: 156,
    attended: 132,
    missed: 24,
    percentage: 85
  };

  // Mock statements data
  const mockStatements = [
    {
      id: 1,
      type: 'press',
      title: 'Statement on Smart City Development Progress in Chandigarh',
      content: `I am pleased to announce significant progress in Chandigarh's Smart City mission. Over the past year, we have successfully implemented 15 major projects including smart traffic management systems, IoT-based waste management, and digital governance platforms.\n\nThe smart traffic system has reduced congestion by 30% during peak hours, while our digital governance initiatives have made 85% of citizen services available online. We are on track to achieve our goal of making Chandigarh a model smart city for the entire nation.\n\nOur focus remains on sustainable development that improves quality of life while preserving Chandigarh's unique architectural heritage and green spaces.`,
      date: '2025-01-22',
      venue: 'Press Club, Chandigarh',
      media: [
        {
          type: 'image',
          url: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=800',
          alt: 'Smart city infrastructure'
        }
      ],
      keyPoints: [
        '15 major Smart City projects completed',
        '30% reduction in traffic congestion',
        '85% of citizen services now available online',
        'Focus on sustainable development and heritage preservation'
      ],
      tags: ['smart city', 'development', 'technology', 'governance'],
      likes: 456,
      comments: 78,
      shares: 123,
      source: {
        name: 'The Tribune',
        url: 'https://tribuneindia.com'
      },
      quote: 'Our vision is to make Chandigarh a model smart city that balances technological advancement with environmental sustainability.'
    },
    {
      id: 2,
      type: 'speech',
      title: 'Parliamentary Speech on Women Safety and Empowerment',
      content: `Honorable Speaker, I rise today to address one of the most critical issues facing our nation - women safety and empowerment. While we have made significant legislative progress, the ground reality demands more concrete action.\n\nIn my constituency of Chandigarh, we have implemented several initiatives including 24/7 women helplines, self-defense training programs, and women-only transport services during late hours. These measures have resulted in a 40% increase in women's participation in night-shift employment.\n\nHowever, true empowerment goes beyond safety measures. We need comprehensive policies that ensure equal opportunities in education, employment, and entrepreneurship. I propose the establishment of women entrepreneurship hubs in every district to provide financial support, mentorship, and market access to women-led businesses.`,
      date: '2025-01-10',venue: 'Lok Sabha, Parliament House',
      keyPoints: [
        '24/7 women helplines established','40% increase in women\'s night-shift employment',
        'Proposal for women entrepreneurship hubs',
        'Focus on equal opportunities in all sectors'
      ],
      tags: ['women safety', 'empowerment', 'entrepreneurship', 'employment'],
      likes: 789,
      comments: 145,
      shares: 267,
      source: {
        name: 'Lok Sabha TV',
        url: 'https://loksabhatv.nic.in'
      }
    }
  ];

  // Mock feedback data
  const mockFeedbackData = {
    averageRating: 4.2,
    totalFeedback: 1247,
    ratingBreakdown: {
      5: 523,
      4: 387,
      3: 201,
      2: 89,
      1: 47
    },
    categoryRatings: {
      performance: 4.3,
      communication: 4.1,
      responsiveness: 3.9,
      transparency: 4.4,
      local_issues: 4.2,
      policy: 4.0
    },
    feedback: [
      {
        id: 1,
        user: {
          name: 'Amit Gupta',
          avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
        },
        rating: 5,
        category: 'performance',
        comment: `Dr. Sharma has been exceptional in addressing local issues. The new health center in our sector has made healthcare accessible to thousands of families. His regular town halls keep us informed about ongoing projects and future plans.`,
        date: '2025-01-20',
        helpful: 23,
        verified: true,
        anonymous: false
      },
      {
        id: 2,
        user: {
          name: 'Anonymous Citizen',
          avatar: ''
        },
        rating: 4,
        category: 'communication',
        comment: `Good communication through social media and regular updates. However, would appreciate more direct interaction with citizens during non-election periods. Overall satisfied with the transparency in governance.`,
        date: '2025-01-18',
        helpful: 15,
        verified: false,
        anonymous: true
      }
    ],
    questions: [
      {
        id: 1,
        user: {
          name: 'Priya Singh',
          avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
        },
        title: 'When will the metro connectivity to Panchkula be completed?',
        description: `The metro extension to Panchkula has been pending for several years. Many residents commute daily between Chandigarh and Panchkula for work. Can you provide an updated timeline for this project?`,
        category: 'infrastructure',
        date: '2025-01-15',
        status: 'answered',
        answer: `Thank you for this important question. The metro extension to Panchkula is currently in the final approval stage with the central government. We expect construction to begin by March 2025, with completion targeted for December 2026. I am personally following up with the Ministry of Urban Development to expedite the approval process.`,
        answeredDate: '2025-01-17',
        upvotes: 67,
        comments: 12,
        anonymous: false
      },
      {
        id: 2,
        user: {
          name: 'Anonymous Citizen',
          avatar: ''
        },
        title: 'What measures are being taken to control air pollution?',
        description: `Air quality in Chandigarh has been deteriorating, especially during winter months. What specific steps are being taken to address this environmental concern?`,
        category: 'environment',
        date: '2025-01-12',
        status: 'pending',
        upvotes: 89,
        comments: 23,
        anonymous: true
      }
    ]
  };

  const tabs = [
    { key: 'biography', label: 'Biography', count: null },
    { key: 'activities', label: 'Activities', count: mockActivities.length },
    { key: 'voting', label: 'Voting Record', count: mockVotingRecord.length },
    { key: 'statements', label: 'Statements', count: mockStatements.length },
    { key: 'feedback', label: 'Feedback', count: mockFeedbackData.totalFeedback }
  ];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setPolitician(mockPolitician);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleFollow = (isFollowing) => {
    console.log('Follow status changed:', isFollowing);
  };

  const handleMessage = () => {
    console.log('Message politician');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${politician.name} - Political Profile`,
        text: `Check out ${politician.name}'s political profile and activities`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Profile link copied to clipboard!');
    }
  };

  const handleSubmitFeedback = (feedback) => {
    console.log('New feedback submitted:', feedback);
    // In real app, this would make an API call
  };

  const handleSubmitQuestion = (question) => {
    console.log('New question submitted:', question);
    // In real app, this would make an API call
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <GlobalHeader />
        <PrimaryTabNavigation />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <Icon name="Loader2" size={32} className="animate-spin text-primary mx-auto mb-4" />
            <p className="font-body text-muted-foreground">Loading politician profile...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!politician) {
    return (
      <div className="min-h-screen bg-background">
        <GlobalHeader />
        <PrimaryTabNavigation />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <Icon name="AlertCircle" size={32} className="text-error mx-auto mb-4" />
            <h2 className="font-heading font-semibold text-xl text-foreground mb-2">
              Politician Not Found
            </h2>
            <p className="font-body text-muted-foreground">
              The politician profile you're looking for doesn't exist or has been removed.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <GlobalHeader />
      <PrimaryTabNavigation />
      
      <main className="pt-16 lg:pt-32">
        {/* Politician Header */}
        <PoliticianHeader
          politician={politician}
          onFollow={handleFollow}
          onMessage={handleMessage}
          onShare={handleShare}
        />

        {/* Tab Navigation */}
        <TabNavigation
          activeTab={activeTab}
          onTabChange={setActiveTab}
          tabs={tabs}
        />

        {/* Tab Content */}
        <div className="max-w-6xl mx-auto px-4 py-6">
          {activeTab === 'biography' && (
            <BiographyTab politician={politician} />
          )}
          
          {activeTab === 'activities' && (
            <ActivitiesTab activities={mockActivities} />
          )}
          
          {activeTab === 'voting' && (
            <VotingTab 
              votingRecord={mockVotingRecord}
              attendanceStats={mockAttendanceStats}
            />
          )}
          
          {activeTab === 'statements' && (
            <StatementsTab statements={mockStatements} />
          )}
          
          {activeTab === 'feedback' && (
            <FeedbackTab
              feedbackData={mockFeedbackData}
              onSubmitFeedback={handleSubmitFeedback}
              onSubmitQuestion={handleSubmitQuestion}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default PoliticianProfile;