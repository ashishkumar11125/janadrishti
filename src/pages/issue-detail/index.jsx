import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import GlobalHeader from '../../components/ui/GlobalHeader';
import PrimaryTabNavigation from '../../components/ui/PrimaryTabNavigation';
import IssueHeader from './components/IssueHeader';
import IssueContent from './components/IssueContent';
import StatusTimeline from './components/StatusTimeline';
import CommunityEngagement from './components/CommunityEngagement';
import OfficialResponse from './components/OfficialResponse';
import RelatedIssues from './components/RelatedIssues';

const IssueDetail = () => {
  const [searchParams] = useSearchParams();
  const issueId = searchParams.get('id') || '1';
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');

  // Mock issue data
  const issueData = {
    id: issueId,
    title: "Severe Water Logging and Poor Drainage System in Sector 15",
    description: `The drainage system in Sector 15 has been completely inadequate for the past two years, causing severe water logging during monsoon season. The problem has worsened significantly this year, with water accumulating up to 2-3 feet in residential areas.\n\nThe main issues include:\n- Blocked storm water drains that haven't been cleaned in months\n- Inadequate drainage capacity for the increased population\n- Poor road construction that creates water pockets\n- Lack of proper waste management leading to drain blockages\n\nThis affects over 500 families in the area and poses serious health risks including waterborne diseases, mosquito breeding, and property damage. Children cannot go to school during heavy rains, and elderly residents face mobility challenges.\n\nImmediate action is required to prevent further deterioration of the situation and potential health emergencies in the community.`,
    submissionDate: "15 July 2025",
    location: "Sector 15, Chandigarh, Punjab",
    coordinates: { lat: 30.7333, lng: 76.7794 },
    status: "Under Review",
    category: "Infrastructure",
    priority: "high",
    urgency: "High",
    reporter: "Rajesh Kumar",
    supportCount: 127,
    commentCount: 23,
    viewCount: 1456,
    affectedCount: 500,
    estimatedCost: "15,00,000",
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800",
        caption: "Water logging in residential area during monsoon"
      },
      {
        type: "image", 
        url: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=800",
        caption: "Blocked drainage system with accumulated waste"
      },
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800", 
        caption: "Road damage caused by water stagnation"
      },
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1574263867128-a3d5c1b1deae?w=800",
        caption: "Community members affected by flooding"
      }
    ]
  };

  // Mock timeline data
  const timelineData = [
    {
      status: "submitted",
      title: "Issue Reported",
      description: "Citizen reported severe water logging and drainage problems in Sector 15 residential area.",
      date: "15 July 2025",
      time: "10:30 AM",
      responsibleParty: "Rajesh Kumar (Citizen)",
      verified: true
    },
    {
      status: "under-review",
      title: "Under Municipal Review",
      description: "Municipal Corporation has acknowledged the issue and assigned it to the Public Works Department for assessment.",
      date: "16 July 2025", 
      time: "2:15 PM",
      responsibleParty: "Municipal Corporation Chandigarh",
      verified: true,
      attachments: [
        { name: "Acknowledgment Letter.pdf", url: "#" }
      ]
    },
    {
      status: "in-progress",
      title: "Site Inspection Scheduled",
      description: "Engineering team will conduct on-site inspection to assess drainage infrastructure and prepare action plan.",
      date: "18 July 2025",
      time: "9:00 AM",
      responsibleParty: "PWD Engineering Department",
      verified: true,
      estimatedCompletion: "20 July 2025"
    }
  ];

  // Mock official responses
  const officialResponses = [
    {
      id: 1,
      officialName: "Dr. Anita Sharma",
      officialAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150",
      designation: "Municipal Engineer",
      department: "Public Works Department",
      responseDate: "17 July 2025",
      responseTime: "3:45 PM",
      status: "In Progress",
      fullResponse: `Thank you for bringing this critical infrastructure issue to our attention. After reviewing the submitted evidence and conducting a preliminary assessment, we have identified this as a high-priority matter requiring immediate intervention.\n\nOur engineering team has confirmed that the drainage system in Sector 15 was designed for a smaller population and is now inadequate for current residential density. The recent monsoon has exposed these limitations, and we understand the significant inconvenience this has caused to residents.\n\nWe have allocated emergency funds for immediate relief measures and are preparing a comprehensive solution that includes drain cleaning, capacity enhancement, and improved waste management protocols.`,
      actionItems: [
        "Emergency drain cleaning and debris removal (Completed)",
        "Installation of additional storm water drains",
        "Road repair and proper gradient correction",
        "Implementation of regular maintenance schedule"
      ],
      timeline: "Complete resolution expected by 15 August 2025",
      attachments: [
        { name: "Technical Assessment Report.pdf", url: "#" },
        { name: "Proposed Solution Plan.pdf", url: "#" }
      ],
      communityRating: 4.2,
      ratingCount: 45,
      helpfulCount: 38
    }
  ];

  // Mock related issues
  const relatedIssues = [
    {
      id: 2,
      title: "Poor Road Conditions and Potholes in Sector 12",
      description: "Multiple potholes and damaged road surface causing traffic issues and vehicle damage.",
      location: "Sector 12, Chandigarh",
      submissionDate: "12 July 2025",
      status: "In Progress",
      category: "Infrastructure", 
      priority: "medium",
      supportCount: 89,
      commentCount: 15,
      viewCount: 892,
      reporter: "Priya Singh",
      similarityScore: 85,
      thumbnail: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400"
    },
    {
      id: 3,
      title: "Inadequate Street Lighting in Residential Areas",
      description: "Several street lights are non-functional creating safety concerns for residents.",
      location: "Sector 18, Chandigarh",
      submissionDate: "10 July 2025", 
      status: "Under Review",
      category: "Public Safety",
      priority: "high",
      supportCount: 156,
      commentCount: 28,
      viewCount: 1203,
      reporter: "Amit Patel",
      similarityScore: 72,
      thumbnail: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=400"
    },
    {
      id: 4,
      title: "Garbage Collection Delays in Multiple Sectors",
      description: "Irregular waste collection leading to hygiene issues and pest problems.",
      location: "Sectors 14-16, Chandigarh",
      submissionDate: "8 July 2025",
      status: "Resolved", 
      category: "Sanitation",
      priority: "medium",
      supportCount: 203,
      commentCount: 42,
      viewCount: 1567,
      reporter: "Sunita Verma",
      similarityScore: 68,
      thumbnail: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400"
    },
    {
      id: 5,
      title: "Water Supply Interruption During Peak Hours",
      description: "Inconsistent water supply affecting daily activities and causing inconvenience.",
      location: "Sector 20, Chandigarh",
      submissionDate: "5 July 2025",
      status: "In Progress",
      category: "Utilities",
      priority: "high", 
      supportCount: 134,
      commentCount: 31,
      viewCount: 1089,
      reporter: "Vikram Gupta",
      similarityScore: 64,
      thumbnail: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=400"
    }
  ];

  useEffect(() => {
    // Check for saved language preference
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'en';
    setCurrentLanguage(savedLanguage);

    // Check if issue is bookmarked
    const bookmarkedIssues = JSON.parse(localStorage.getItem('bookmarkedIssues') || '[]');
    setIsBookmarked(bookmarkedIssues.includes(issueId));
  }, [issueId]);

  const handleShare = (platform) => {
    const issueUrl = `${window.location.origin}/issue-detail?id=${issueId}`;
    const shareText = `Check out this important civic issue: ${issueData.title}`;

    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(issueUrl)}`, '_blank');
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(issueUrl)}`, '_blank');
        break;
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(`${shareText} ${issueUrl}`)}`, '_blank');
        break;
      case 'copy':
        navigator.clipboard.writeText(issueUrl);
        alert('Link copied to clipboard!');
        break;
      default:
        break;
    }
  };

  const handleBookmark = () => {
    const bookmarkedIssues = JSON.parse(localStorage.getItem('bookmarkedIssues') || '[]');
    
    if (isBookmarked) {
      const updatedBookmarks = bookmarkedIssues.filter(id => id !== issueId);
      localStorage.setItem('bookmarkedIssues', JSON.stringify(updatedBookmarks));
      setIsBookmarked(false);
    } else {
      bookmarkedIssues.push(issueId);
      localStorage.setItem('bookmarkedIssues', JSON.stringify(bookmarkedIssues));
      setIsBookmarked(true);
    }
  };

  const handleSupport = (supported) => {
    // In real app, this would make API call to update support count
    console.log(`Issue ${supported ? 'supported' : 'unsupported'}`);
  };

  const handleComment = (comment) => {
    // In real app, this would make API call to add comment
    console.log('New comment:', comment);
  };

  return (
    <div className="min-h-screen bg-background">
      <GlobalHeader />
      <PrimaryTabNavigation />
      
      <main className="pt-16 lg:pt-20">
        <IssueHeader 
          issue={issueData}
          onShare={handleShare}
          onBookmark={handleBookmark}
          isBookmarked={isBookmarked}
        />
        
        <IssueContent issue={issueData} />
        
        <StatusTimeline timeline={timelineData} />
        
        <OfficialResponse responses={officialResponses} />
        
        <CommunityEngagement 
          issue={issueData}
          onSupport={handleSupport}
          onComment={handleComment}
        />
        
        <RelatedIssues issues={relatedIssues} />
      </main>
    </div>
  );
};

export default IssueDetail;