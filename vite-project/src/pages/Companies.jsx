import React, { useState, useEffect } from "react";
import {
  BuildingOfficeIcon,
  MagnifyingGlassIcon,
  BriefcaseIcon,
  ArrowRightIcon,
  ChartBarIcon,
  UsersIcon,
  GlobeAltIcon,
  AdjustmentsHorizontalIcon,
  UserGroupIcon,
  PencilIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";
import { useParams, useNavigate } from 'react-router-dom';
import CompanyRegistrationForm from '../components/CompanyRegistrationForm';

function Companies() {
  const { action } = useParams();
  const navigate = useNavigate();
  const [companies, setCompanies] = useState([
    {
      id: 1,
      name: "TechCorp",
      description:
        "Leading technology company specializing in software development and cloud solutions. We build innovative products that transform businesses.",
      industry: "Technology",
      openPositions: 5,
      location: "San Francisco, CA",
      size: "1000-5000",
      founded: 2010,
      rating: 4.8,
      culture: ["Innovation", "Collaboration", "Growth"],
      benefits: [
        "Remote Work",
        "Health Insurance",
        "Professional Development",
        "Stock Options",
      ],
      logo: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      id: 2,
      name: "DesignHub",
      description:
        "Creative agency focused on UI/UX design and digital experiences. We create beautiful, functional interfaces for web and mobile applications.",
      industry: "Design",
      openPositions: 3,
      location: "New York, NY",
      size: "50-200",
      founded: 2015,
      rating: 4.5,
      culture: ["Creativity", "Flexibility", "Work-Life Balance"],
      benefits: [
        "Flexible Hours",
        "Health Insurance",
        "Creative Workspace",
        "Learning Budget",
      ],
      logo: "https://randomuser.me/api/portraits/women/2.jpg",
    },
    {
      id: 3,
      name: "DataSystems",
      description:
        "Data analytics and business intelligence solutions provider. We help organizations harness the power of data to make better decisions.",
      industry: "Data",
      openPositions: 4,
      location: "Boston, MA",
      size: "500-1000",
      founded: 2012,
      rating: 4.6,
      culture: ["Data-Driven", "Innovation", "Learning"],
      benefits: [
        "Hybrid Work",
        "Comprehensive Benefits",
        "Training Programs",
        "Generous PTO",
      ],
      logo: "https://randomuser.me/api/portraits/men/3.jpg",
    },
    {
      id: 4,
      name: "CloudNine",
      description:
        "Cloud infrastructure and DevOps services company. We enable businesses to build, deploy, and scale applications with confidence.",
      industry: "Technology",
      openPositions: 7,
      location: "Seattle, WA",
      size: "200-500",
      founded: 2013,
      rating: 4.7,
      culture: ["Teamwork", "Technical Excellence", "Customer Focus"],
      benefits: [
        "Remote Work",
        "Stock Options",
        "Wellness Programs",
        "Competitive Salary",
      ],
      logo: "https://randomuser.me/api/portraits/women/4.jpg",
    },
    {
      id: 5,
      name: "GreenTech",
      description:
        "Sustainable technology solutions provider focusing on renewable energy and environmental impact. Building a greener future through innovation.",
      industry: "CleanTech",
      openPositions: 6,
      location: "Austin, TX",
      size: "100-500",
      founded: 2016,
      rating: 4.9,
      culture: ["Sustainability", "Impact", "Innovation"],
      benefits: [
        "Hybrid Work",
        "Unlimited PTO",
        "Volunteer Time",
        "Green Commuter Benefits",
      ],
      logo: "https://randomuser.me/api/portraits/men/5.jpg",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [companyData, setCompanyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalCompanies: 0,
    totalPositions: 0,
    avgHiringTime: 0,
    avgMatchQuality: 0
  });
  const [featuredCompanies, setFeaturedCompanies] = useState([]);
  const [recentHires, setRecentHires] = useState([]);

  useEffect(() => {
    setMounted(true);
    
    // Check if we're in register mode
    if (action === "register") {
      setIsRegistering(true);
      setLoading(false);
    } else {
      // Check if a company profile already exists
      const savedCompanyData = localStorage.getItem('companyData');
      
      if (savedCompanyData) {
        // Company already exists - load it
        loadCompanyData(JSON.parse(savedCompanyData));
      }
      
      // Load demo data
      loadDemoData();
    }
  }, [action]);

  const loadCompanyData = (data) => {
    setCompanyData(data);
    setLoading(false);
    
    // Update real-time stats
    const updateStatsInterval = setInterval(() => {
      setCompanyData(prev => {
        if (!prev) return null;
        
        return {
          ...prev,
          stats: {
            ...prev.stats,
            potentialMatches: Math.floor(Math.random() * 15) + prev.stats.potentialMatches
          }
        };
      });
    }, 5000);
    
    return () => clearInterval(updateStatsInterval);
  };
  
  const loadDemoData = () => {
    // Sample data for the companies page
    setFeaturedCompanies([
      {
        id: 1,
        name: 'TechFlow',
        logo: '🏢',
        industry: 'Technology',
        location: 'San Francisco, CA',
        openPositions: 7,
        description: 'Leading software development company focused on innovative solutions'
      },
      {
        id: 2,
        name: 'DataCore Systems',
        logo: '💾',
        industry: 'Data Analytics',
        location: 'New York, NY',
        openPositions: 4,
        description: 'Specializing in data analytics and business intelligence solutions'
      },
      {
        id: 3,
        name: 'MediTech Solutions',
        logo: '🏥',
        industry: 'Healthcare',
        location: 'Boston, MA',
        openPositions: 3,
        description: 'Developing cutting-edge healthcare technology systems'
      }
    ]);
    
    setRecentHires([
      {
        id: 1,
        position: 'Senior React Developer',
        company: 'CloudSystems',
        date: '2 days ago',
        matchPercentage: 94
      },
      {
        id: 2,
        position: 'Backend Engineer',
        company: 'FinTech Innovations',
        date: '1 week ago',
        matchPercentage: 87
      },
      {
        id: 3,
        position: 'UX Designer',
        company: 'CreativeHub',
        date: '2 weeks ago',
        matchPercentage: 92
      }
    ]);
    
    setStats({
      totalCompanies: 253,
      totalPositions: 876,
      avgHiringTime: 12,
      avgMatchQuality: 89
    });
    
    // Simulate stats updates
    const statsInterval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        totalPositions: prev.totalPositions + (Math.random() > 0.7 ? 1 : 0),
        avgMatchQuality: Math.min(99, prev.avgMatchQuality + (Math.random() > 0.8 ? 0.1 : 0))
      }));
    }, 8000);
    
    return () => clearInterval(statsInterval);
  };

  const handleSaveCompany = (data) => {
    setCompanyData(data);
    setIsRegistering(false);
    
    // Navigate to company view
    navigate('/companies');
  };

  // Filter companies based on search term and selected industry
  const filteredCompanies = companies.filter(
    (company) =>
      (company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.location.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedIndustry === "all" || company.industry === selectedIndustry)
  );

  // Sort filtered companies based on sortBy selection
  const sortedCompanies = [...filteredCompanies].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.name.localeCompare(b.name);
      case "rating":
        return b.rating - a.rating;
      case "positions":
        return b.openPositions - a.openPositions;
      case "founded":
        return b.founded - a.founded;
      default:
        return 0;
    }
  });

  // Get unique industries for filtering
  const industries = [
    "all",
    ...new Set(companies.map((company) => company.industry)),
  ];

  // Handle view opportunities click
  const viewOpportunities = (companyId) => {
    console.log(`Viewing opportunities for company ${companyId}`);
  };

  // Render star rating
  const renderRating = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <StarIcon key={`full-${i}`} className="h-4 w-4 text-yellow-400" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative">
          <StarIcon className="h-4 w-4 text-gray-300" />
          <div className="absolute inset-0 overflow-hidden w-1/2">
            <StarIcon className="h-4 w-4 text-yellow-400" />
          </div>
        </div>
      );
    }

    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <StarIcon key={`empty-${i}`} className="h-4 w-4 text-gray-300" />
      );
    }

    return (
      <div className="flex items-center">
        {stars}
        <span className="ml-1 text-sm text-gray-600">{rating.toFixed(1)}</span>
      </div>
    );
  };

  // Company registration form view
  if (isRegistering) {
  return (
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className={`transition-all duration-500 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}>
            <button
              onClick={() => navigate('/companies')}
              className="mb-6 inline-flex items-center text-sm text-purple-600 hover:text-purple-800 font-medium"
            >
              <ArrowLeftIcon className="h-4 w-4 mr-1" />
              Back to Companies
            </button>
            
            <div className="bg-white rounded-2xl shadow-md overflow-hidden">
              <div className="px-6 py-8">
                <CompanyRegistrationForm 
                  onSave={handleSaveCompany}
                  onCancel={() => navigate('/companies')}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Company profile view (if company is registered)
  if (companyData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div
            className={`bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-500 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            {/* Company Header */}
            <div className="relative bg-gradient-to-r from-purple-600 to-indigo-600 px-8 py-12">
              {/* Abstract background shapes */}
              <div className="absolute inset-0 overflow-hidden opacity-20">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-white rounded-full"></div>
                <div className="absolute bottom-10 left-10 w-20 h-20 bg-white rounded-full"></div>
                <div className="absolute top-20 left-1/3 w-16 h-16 bg-white rounded-full"></div>
              </div>

              <div className="flex flex-col md:flex-row md:items-center relative z-10">
                <div className="h-28 w-28 md:h-32 md:w-32 rounded-xl bg-white p-1 ring-4 ring-white/30 shadow-lg flex items-center justify-center">
                  <BuildingOfficeIcon className="h-20 w-20 text-purple-600" />
                </div>

                <div className="md:ml-8 mt-6 md:mt-0">
                  <h1 className="text-3xl font-bold text-white">
                    {companyData.name}
                  </h1>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-900/30 text-white">
                      {companyData.industry}
                    </span>
                    {companyData.location && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-900/30 text-white">
                        {companyData.location}
                      </span>
                    )}
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-900/30 text-white">
                      {companyData.size}
                    </span>
                  </div>

                  <p className="text-purple-100 mt-2 max-w-xl">
                    {companyData.description}
                  </p>

                  <div className="flex items-center space-x-6 mt-4">
                    <div className="flex items-center">
                      <BriefcaseIcon className="h-5 w-5 text-yellow-400 mr-1.5" />
                      <span className="text-white">
                        {companyData.jobPositions?.length} Open Positions
                      </span>
                    </div>

                    <div className="flex items-center">
                      <ChartBarIcon className="h-5 w-5 text-yellow-400 mr-1.5" />
                      <span className="text-white">
                        {companyData.stats?.potentialMatches} Potential Matches
                      </span>
                    </div>
                </div>
              </div>

                <div className="mt-6 md:mt-0 md:ml-auto flex">
                  <button
                    onClick={() => setIsRegistering(true)}
                    className="px-4 py-2 bg-white text-purple-600 rounded-md hover:bg-purple-50 transition-colors font-medium flex items-center"
                  >
                    <PencilIcon className="h-5 w-5 mr-1.5" />
                    Edit Company
                  </button>
                </div>
              </div>
            </div>

            {/* Company Content */}
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-8">
                  {/* Open Positions */}
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                      <BriefcaseIcon className="h-6 w-6 text-purple-600 mr-2" />
                      Open Positions
                    </h2>
                    
                    {companyData.jobPositions && companyData.jobPositions.length > 0 ? (
                      <div className="space-y-4">
                        {companyData.jobPositions.map(position => (
                          <div 
                            key={position.id}
                            className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow"
                          >
                            <div className="flex justify-between">
                              <div>
                                <h3 className="font-medium text-gray-900">{position.title}</h3>
                                <p className="text-sm text-gray-600">{position.department} • {position.level}</p>
                              </div>
                              <div className="flex items-start">
                                {position.remote && (
                                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                    Remote
                                  </span>
                                )}
          </div>
        </div>

                            <div className="flex justify-between items-center mt-4">
                              <span className="text-sm text-gray-500">
                                Posted {new Date(position.createdAt).toLocaleDateString()}
                              </span>
                              <button className="text-sm text-purple-600 hover:text-purple-800 font-medium inline-flex items-center">
                                View Details
                                <ArrowRightIcon className="ml-1 h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12 bg-gray-50 rounded-xl">
                        <BriefcaseIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                          No open positions
                        </h3>
                        <p className="text-gray-600 max-w-md mx-auto mb-6">
                          You haven't added any open positions yet. Add positions to start matching with candidates.
                        </p>
                      </div>
                    )}
                  </div>
                  
                  {/* Recent Applicants (Simulated) */}
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                      <UserGroupIcon className="h-6 w-6 text-purple-600 mr-2" />
                      Recent Applicants
                    </h2>
                    
                    <div className="bg-gray-50 rounded-xl p-6">
                      <div className="mb-4">
                        <p className="text-gray-600">
                          As you post positions, candidate matches will appear here.
          </p>
        </div>

                      <div className="flex justify-center">
                        <button className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors font-medium flex items-center">
                          Find Candidates
                          <ArrowRightIcon className="ml-1.5 h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-8">
                  {/* Company Stats */}
                  <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                    <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                      <ChartBarIcon className="h-5 w-5 text-purple-600 mr-2" />
                      Hiring Statistics
                    </h2>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-purple-50 p-4 rounded-lg">
                        <div className="text-2xl font-bold text-purple-700">
                          {companyData.stats?.averageTimeToHire}
                        </div>
                        <div className="text-sm text-gray-600">Time to hire</div>
                      </div>
                      <div className="bg-purple-50 p-4 rounded-lg">
                        <div className="text-2xl font-bold text-purple-700">
                          {companyData.stats?.candidateQuality}
                        </div>
                        <div className="text-sm text-gray-600">Match quality</div>
                      </div>
                      <div className="bg-purple-50 p-4 rounded-lg">
                        <div className="text-2xl font-bold text-purple-700">
                          {companyData.jobPositions?.length || 0}
                        </div>
                        <div className="text-sm text-gray-600">Open positions</div>
                      </div>
                      <div className="bg-purple-50 p-4 rounded-lg animate-pulse-slow">
                        <div className="text-2xl font-bold text-purple-700">
                          {companyData.stats?.potentialMatches}
                        </div>
                        <div className="text-sm text-gray-600">Potential matches</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Contact Information */}
                  <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                    <h2 className="text-lg font-bold text-gray-900 mb-4">
                      Contact Information
                    </h2>
                    
                    <div className="space-y-3">
                    <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="font-medium">{companyData.email}</p>
                      </div>
                      
                      {companyData.website && (
                        <div>
                          <p className="text-sm text-gray-500">Website</p>
                          <a 
                            href={companyData.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium text-purple-600 hover:text-purple-800"
                          >
                            {companyData.website}
                          </a>
                        </div>
                      )}
                      
                      {companyData.location && (
                        <div>
                          <p className="text-sm text-gray-500">Location</p>
                          <p className="font-medium">{companyData.location}</p>
                        </div>
                      )}
                    </div>
                      </div>
                  
                  {/* Quick Actions */}
                  <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                    <h2 className="text-lg font-bold text-gray-900 mb-4">
                      Quick Actions
                    </h2>
                    
                    <div className="space-y-3">
                      <button 
                        onClick={() => setIsRegistering(true)}
                        className="w-full text-left px-4 py-3 flex items-center bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <PencilIcon className="h-5 w-5 text-purple-600 mr-3" />
                        <span>Edit Company Profile</span>
                      </button>
                      
                      <button className="w-full text-left px-4 py-3 flex items-center bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                        <BriefcaseIcon className="h-5 w-5 text-purple-600 mr-3" />
                        <span>Add Position</span>
                      </button>
                      
                      <button className="w-full text-left px-4 py-3 flex items-center bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                        <UserGroupIcon className="h-5 w-5 text-purple-600 mr-3" />
                        <span>View Applicants</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Companies overview (default view)
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-20">
        <div className={`transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Header section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Find and Join Great Companies</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10">
              Connect with industry-leading companies looking for skilled developers like you. Or register your own company to find top talent.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={() => navigate('/companies/register')}
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 transition-colors transform hover:-translate-y-1 hover:shadow-lg duration-200"
              >
                Register Your Company
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </button>
              <button className="inline-flex items-center justify-center px-6 py-3 border border-purple-200 text-base font-medium rounded-md text-purple-600 bg-white hover:bg-purple-50 transition-colors transform hover:-translate-y-1 hover:shadow-md hover:border-purple-300 duration-200">
                Browse Companies
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </button>
            </div>
          </div>
          
          {/* Stats section */}
          <div className="bg-white rounded-2xl shadow-md overflow-hidden mb-16">
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-5">
              <h2 className="text-xl font-bold text-white flex items-center">
                <ChartBarIcon className="h-6 w-6 mr-2" />
                Platform Statistics
              </h2>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">{stats.totalCompanies}</div>
                <div className="text-sm text-gray-600 mt-1">Active Companies</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">{stats.totalPositions}+</div>
                <div className="text-sm text-gray-600 mt-1">Open Positions</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">{stats.avgHiringTime}</div>
                <div className="text-sm text-gray-600 mt-1">Avg. Days to Hire</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">{stats.avgMatchQuality.toFixed(1)}%</div>
                <div className="text-sm text-gray-600 mt-1">Avg. Match Quality</div>
              </div>
            </div>
          </div>
          
          {/* Featured companies */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <BuildingOfficeIcon className="h-6 w-6 text-purple-600 mr-2" />
              Featured Companies
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredCompanies.map(company => (
                <div key={company.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                  <div className="bg-purple-100 p-4 flex items-center">
                    <div className="w-12 h-12 rounded-lg bg-purple-200 flex items-center justify-center text-3xl mr-4">
                      {company.logo}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{company.name}</h3>
                      <p className="text-sm text-gray-600">{company.industry}</p>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <p className="text-sm text-gray-600 mb-4">{company.description}</p>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center text-sm text-gray-500">
                        <BriefcaseIcon className="h-4 w-4 mr-1 text-purple-600" />
                        {company.openPositions} open positions
                      </div>
                      <button className="text-sm text-purple-600 hover:text-purple-800 font-medium">
                        View Company
                      </button>
                    </div>
                  </div>
                </div>
                    ))}
                  </div>
                </div>

          {/* Recent hires section */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <CheckCircleIcon className="h-6 w-6 text-purple-600 mr-2" />
              Recent Successful Matches
            </h2>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="divide-y divide-gray-200">
                {recentHires.map(hire => (
                  <div key={hire.id} className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium text-gray-900">{hire.position}</h3>
                        <p className="text-sm text-gray-600">{hire.company} • Hired {hire.date}</p>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm font-medium text-gray-900 mr-2">Match:</span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {hire.matchPercentage}%
                      </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Companies;
