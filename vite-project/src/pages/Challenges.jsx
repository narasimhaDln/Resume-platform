import React, { useState, useEffect } from "react";
import {
  ClockIcon,
  CalendarIcon,
  TrophyIcon,
  ArrowRightIcon,
  AdjustmentsHorizontalIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  BoltIcon,
  UserGroupIcon,
  CheckBadgeIcon,
  FireIcon
} from "@heroicons/react/24/outline";
import { format } from "date-fns";
import { useRealtime } from "../context/RealtimeContext";
import { toast } from "react-hot-toast";

function Challenges() {
  // Use real-time data from context
  const { challenges: realtimeChallenges, loading, updateChallenge, isSupabaseConfigured } = useRealtime();
  
  // Add state to track initial render 
  const [initialRender, setInitialRender] = useState(true);
  
  // Use state for local challenges data initially populated with mock data
  const [challenges, setChallenges] = useState([
    {
      id: 1,
      title: "Frontend Development Challenge",
      description:
        "Build a responsive web application using React and Tailwind CSS. This challenge tests your ability to create a modern, responsive interface with clean code.",
      difficulty: "Medium",
      duration: "2 hours",
      created_at: new Date().toISOString(),
      type: "Frontend",
      company: "TechCorp",
      skills: ["React", "Tailwind CSS", "JavaScript"],
      participants: 42,
    },
    {
      id: 2,
      title: "Algorithm Challenge",
      description:
        "Solve complex algorithmic problems using JavaScript. You'll be tasked with optimizing solutions for efficiency and elegance.",
      difficulty: "Hard",
      duration: "3 hours",
      created_at: new Date().toISOString(),
      type: "Algorithms",
      company: "AlgoTech",
      skills: ["DSA", "JavaScript", "Problem Solving"],
      participants: 28,
    },
    {
      id: 3,
      title: "UI/UX Design Challenge",
      description:
        "Create a modern and user-friendly interface design. Demonstrate your creativity while maintaining usability principles.",
      difficulty: "Easy",
      duration: "1 hour",
      created_at: new Date().toISOString(),
      type: "Design",
      company: "DesignMasters",
      skills: ["Figma", "UI/UX", "Design Principles"],
      participants: 36,
    },
    {
      id: 4,
      title: "Backend API Challenge",
      description:
        "Design and implement a RESTful API with proper authentication and error handling. Focus on clean architecture and performance.",
      difficulty: "Medium",
      duration: "2.5 hours",
      created_at: new Date().toISOString(),
      type: "Backend",
      company: "ServerLogic",
      skills: ["Node.js", "Express", "MongoDB"],
      participants: 31,
    },
    {
      id: 5,
      title: "Full-Stack Application Challenge",
      description:
        "Build a complete application with frontend, backend, and database components. Show your end-to-end development capabilities.",
      difficulty: "Hard",
      duration: "4 hours",
      created_at: new Date().toISOString(),
      type: "Full-Stack",
      company: "OmniDev",
      skills: ["React", "Node.js", "Database Design"],
      participants: 24,
    },
    {
      id: 6,
      title: "Mobile App Development Challenge",
      description:
        "Create a cross-platform mobile application using React Native. Focus on performance optimization and native-like user experience.",
      difficulty: "Medium",
      duration: "3 hours",
      created_at: new Date(Date.now() - 2 * 86400000).toISOString(),
      type: "Mobile",
      company: "MobiTech",
      skills: ["React Native", "JavaScript", "Mobile UI"],
      participants: 19,
      status: "in_progress",
      last_update: new Date(Date.now() - 15 * 60000).toISOString(),
    },
    {
      id: 7,
      title: "Data Science & Visualization Challenge",
      description:
        "Analyze a dataset and create insightful visualizations. Apply statistical methods to extract meaningful patterns and communicate them effectively.",
      difficulty: "Hard",
      duration: "3.5 hours",
      created_at: new Date(Date.now() - 1 * 86400000).toISOString(),
      type: "Data Science",
      company: "DataMinds",
      skills: ["Python", "Pandas", "Data Visualization", "Statistics"],
      participants: 33,
    },
    {
      id: 8,
      title: "DevOps Deployment Pipeline Challenge",
      description:
        "Set up a CI/CD pipeline for a web application. Implement automated testing, deployment and monitoring for a scalable infrastructure.",
      difficulty: "Hard",
      duration: "4 hours",
      created_at: new Date(Date.now() - 3 * 86400000).toISOString(),
      type: "DevOps",
      company: "CloudSys",
      skills: ["Docker", "Kubernetes", "CI/CD", "AWS"],
      participants: 17,
    },
    {
      id: 9,
      title: "Cybersecurity Vulnerability Assessment",
      description:
        "Identify and address security vulnerabilities in a web application. Perform penetration testing and recommend security improvements.",
      difficulty: "Hard",
      duration: "3 hours",
      created_at: new Date(Date.now() - 5 * 86400000).toISOString(),
      type: "Security",
      company: "SecureNet",
      skills: ["Penetration Testing", "OWASP", "Security Best Practices"],
      participants: 22,
    },
    {
      id: 10,
      title: "Accessibility Improvement Challenge",
      description:
        "Enhance an existing web application for accessibility. Implement WCAG guidelines and ensure the application is usable by people with disabilities.",
      difficulty: "Medium",
      duration: "2 hours",
      created_at: new Date(Date.now() - 4 * 86400000).toISOString(),
      type: "Accessibility",
      company: "InclusiveTech",
      skills: ["WCAG", "ARIA", "HTML", "Semantic Markup"],
      participants: 26,
    },
    {
      id: 11,
      title: "Machine Learning Model Development",
      description:
        "Build and train a machine learning model to solve a real-world problem. Focus on model accuracy, feature engineering, and performance optimization.",
      difficulty: "Hard",
      duration: "5 hours",
      created_at: new Date(Date.now() - 7 * 86400000).toISOString(),
      type: "Machine Learning",
      company: "AILabs",
      skills: ["Python", "Scikit-learn", "TensorFlow", "ML Algorithms"],
      participants: 30,
      last_update: new Date(Date.now() - 30 * 60000).toISOString(),
    },
    {
      id: 12,
      title: "Blockchain Smart Contract Challenge",
      description:
        "Develop a smart contract for a decentralized application. Implement secure, efficient code that executes reliably on a blockchain network.",
      difficulty: "Hard",
      duration: "4 hours",
      created_at: new Date(Date.now() - 10 * 86400000).toISOString(),
      type: "Blockchain",
      company: "ChainTech",
      skills: ["Solidity", "Ethereum", "Smart Contracts", "Web3.js"],
      participants: 15,
    },
  ]);

  const [filter, setFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activeChallenge, setActiveChallenge] = useState(null);
  const [showLiveUpdates, setShowLiveUpdates] = useState(true);
  const [forceUpdate, setForceUpdate] = useState(0);
  
  // Real-time participation stats (simulate values for demo)
  const [participationStats, setParticipationStats] = useState({
    activeChallenges: 0,
    totalParticipants: 0,
    completionRate: 0
  });

  // Make sure this runs first, before any other effects - keep initialRender true
  useEffect(() => {
    console.log("INITIAL SETUP - ensuring all challenges are displayed");
    
    // Set everything to show all challenges
    setMounted(true);
    setFilter("all");
    setTypeFilter("all");
    setSearchQuery("");
    
    // Keep initialRender true - this will show all challenges without filtering
    setInitialRender(true);
    
    console.log(`Initial display of all ${challenges.length} challenges (no filters)`);
    setForceUpdate(prev => prev + 1);
  }, []); // Empty dependency array means this only runs once on mount

  // Handle search and filter changes - turn off initialRender only when user searches or filters
  useEffect(() => {
    // Only apply filters if the user has actively searched or filtered
    if (searchQuery !== "" || filter !== "all" || typeFilter !== "all") {
      console.log("User applied filters - switching to filtered mode");
      setInitialRender(false);
    } else {
      // If search and filters are cleared, go back to showing all challenges
      setInitialRender(true);
    }
  }, [searchQuery, filter, typeFilter]);

  // Update local challenges when real-time data changes
  useEffect(() => {
    if (realtimeChallenges && realtimeChallenges.length > 0) {
      console.log(`Setting ${realtimeChallenges.length} challenges from realtime data`);
      setChallenges(realtimeChallenges);
      // Force display of all challenges without filtering
      setInitialRender(true);
      // Force re-render after state update
      setTimeout(() => {
        setForceUpdate(prev => prev + 1);
        // After a bit longer, apply filters if needed
        setTimeout(() => setInitialRender(false), 500);
      }, 100);
      
      // Update participation stats
      const activeCount = realtimeChallenges.filter(c => c.status === 'in_progress').length;
      setParticipationStats({
        activeChallenges: activeCount,
        totalParticipants: Math.floor(Math.random() * 50) + activeCount * 5,
        completionRate: Math.floor(Math.random() * 30) + 65 // Between 65-95%
      });
    } else {
      // If no real-time challenges are available but we have mock challenges, 
      // ensure they're all displayed
      console.log(`Using ${challenges.length} mock challenges`);
      
      // Force showing all challenges initially
      setInitialRender(true);
      
      // If no real-time challenges are available, set initial participation stats
      const activeCount = challenges.filter(c => c.status === 'in_progress').length || 1;
      setParticipationStats({
        activeChallenges: activeCount,
        totalParticipants: challenges.reduce((sum, c) => sum + (c.participants || 0), 0),
        completionRate: 75 // Default completion rate
      });
    }
  }, [realtimeChallenges]);

  // Animation effect when component mounts - ensure all challenges are visible immediately
  useEffect(() => {
    // Set mounted state to true to trigger animations
    setMounted(true);
    console.log(`Total challenges available: ${challenges.length}`);
    
    // Force display of all challenges when component first renders
    // This ensures they are visible immediately without relying on other effects
    setFilter("all");
    setTypeFilter("all");
    setSearchQuery("");
    
    // Initialize stats if needed on first render
    if (participationStats.totalParticipants === 0) {
      const activeCount = challenges.filter(c => c.status === 'in_progress').length || 1;
      setParticipationStats({
        activeChallenges: activeCount,
        totalParticipants: challenges.reduce((sum, c) => sum + (c.participants || 0), 0),
        completionRate: 75
      });
    }
    
    // Simulate real-time updates for demo purposes - but only set up once
    if (!isSupabaseConfigured) {
      // Use a ref to track last update time to prevent too many notifications
      const lastUpdateTime = { current: Date.now() };
      
      const updateInterval = setInterval(() => {
        if (showLiveUpdates) {
          // Only show notification if enough time has passed (at least 30 seconds)
          const now = Date.now();
          if (now - lastUpdateTime.current > 30000) {
            lastUpdateTime.current = now;
            
            // Find a random challenge to update
            const randomIndex = Math.floor(Math.random() * challenges.length);
            const randomChallenge = challenges[randomIndex];
            
            if (randomChallenge) {
              // Don't modify state directly, just show toast - this prevents looping
              toast.success(`New participant joined "${randomChallenge.title}"!`, {
                duration: 3000,
                icon: '👤'
              });
            }
          }
        }
      }, 45000); // Much longer interval (45 seconds)
      
      return () => clearInterval(updateInterval);
    }
  }, [isSupabaseConfigured, showLiveUpdates]); // Keep dependencies minimal
  
  // Separate effect to update participant stats periodically without toasts
  useEffect(() => {
    if (!isSupabaseConfigured && showLiveUpdates) {
      const statsInterval = setInterval(() => {
        // Just update the total participants count without toast notifications
        setParticipationStats(prev => ({
          ...prev,
          totalParticipants: prev.totalParticipants + 1
        }));
      }, 120000); // Very infrequent updates (every 2 minutes)
      
      return () => clearInterval(statsInterval);
    }
  }, [isSupabaseConfigured, showLiveUpdates]);

  // Filter challenges based on multiple criteria - ensure all challenges show up initially
  const filteredChallenges = initialRender 
    ? challenges // On initial render, skip filtering and just return all challenges
    : challenges
        .filter((challenge) => {
          const difficultyMatch =
            filter === "all" || 
            (challenge.difficulty && challenge.difficulty.toLowerCase() === filter);
          
          const typeMatch =
            typeFilter === "all" || 
            (challenge.type && challenge.type.toLowerCase() === typeFilter);
          
          const searchMatch =
            searchQuery === "" ||
            (challenge.title && challenge.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (challenge.description && challenge.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (challenge.company && challenge.company.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (challenge.skills && challenge.skills.some((skill) =>
              skill.toLowerCase().includes(searchQuery.toLowerCase())
            ));
          
          return difficultyMatch && typeMatch && searchMatch;
        })
        // Sort challenges by date (most recent first)
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  // Log filtered count for debugging
  console.log(`Filtered ${filteredChallenges.length} challenges out of ${challenges.length} total`);

  const startChallenge = async (challengeId) => {
    try {
      setActiveChallenge(challengeId);
      // Show loading toast
      toast.loading('Starting challenge...', { id: 'start-challenge' });
      
      // Update challenge status in database
      const { data, error } = await updateChallenge(challengeId, {
        status: 'in_progress',
        started_at: new Date().toISOString()
      });
      
      if (error) throw error;
      
      // Success toast with real-time update
      toast.success('Challenge started!', { id: 'start-challenge' });
      
      // In a real app, redirect to the challenge page
    console.log(`Starting challenge ${challengeId}`);
      
      // Reset active challenge after delay
      setTimeout(() => setActiveChallenge(null), 1000);
    } catch (error) {
      toast.error('Failed to start challenge', { id: 'start-challenge' });
      console.error('Error starting challenge:', error);
      setActiveChallenge(null);
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case "easy":
        return "bg-green-100 text-green-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "hard":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getDifficultyBgColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case "easy":
        return "bg-green-600";
      case "medium":
        return "bg-yellow-600";
      case "hard":
        return "bg-red-600";
      default:
        return "bg-gray-600";
    }
  };

  // Extract unique challenge types for the filter
  const challengeTypes = [
    "all",
    ...new Set(challenges.map((challenge) => challenge.type?.toLowerCase() || '')),
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-indigo-50/50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Real-time Stats Section */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className={`bg-white rounded-lg shadow-sm border border-indigo-100 p-4 transform transition-all duration-500 ${mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}>
            <div className="flex items-center">
              <div className="rounded-full bg-indigo-100 p-3 mr-4">
                <FireIcon className="h-6 w-6 text-indigo-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Active Challenges</p>
                <h4 className="text-xl font-bold text-gray-900">{participationStats.activeChallenges}</h4>
              </div>
            </div>
          </div>
          
          <div className={`bg-white rounded-lg shadow-sm border border-indigo-100 p-4 transform transition-all duration-500 delay-100 ${mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}>
            <div className="flex items-center">
              <div className="rounded-full bg-purple-100 p-3 mr-4">
                <UserGroupIcon className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Participants</p>
                <h4 className="text-xl font-bold text-gray-900">{participationStats.totalParticipants}</h4>
              </div>
            </div>
          </div>
          
          <div className={`bg-white rounded-lg shadow-sm border border-indigo-100 p-4 transform transition-all duration-500 delay-200 ${mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}>
            <div className="flex items-center">
              <div className="rounded-full bg-green-100 p-3 mr-4">
                <CheckBadgeIcon className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Completion Rate</p>
                <h4 className="text-xl font-bold text-gray-900">{participationStats.completionRate}%</h4>
              </div>
            </div>
          </div>
        </div>

        {/* Header section with search */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div className="lg:max-w-lg">
            <div className="flex items-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Skill Challenges
              </span>
            </h1>
              {loading && (
                <span className="ml-3 inline-flex h-5 w-5 animate-pulse-slow rounded-full bg-indigo-400"></span>
              )}
              {!loading && showLiveUpdates && (
                <div className="ml-3 flex items-center text-xs text-green-700 bg-green-100 px-2 py-1 rounded-full">
                  <span className="relative flex h-2 w-2 mr-1">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  Live Updates
                </div>
              )}
              <button 
                className="ml-2 text-xs text-gray-500 hover:text-indigo-600"
                onClick={() => setShowLiveUpdates(!showLiveUpdates)}
              >
                {showLiveUpdates ? "Pause" : "Resume"}
              </button>
            </div>
            <p className="text-gray-600">
              Put your abilities to the test with real-world problems
            </p>
          </div>

          <div className="w-full md:w-auto flex items-center">
            <div className="relative flex-grow md:w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Search challenges..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  // Only enable filtering if there's actual search text
                  if (e.target.value.trim() !== '') {
                    setInitialRender(false);
                  } else if (filter === 'all' && typeFilter === 'all') {
                    // If search is cleared and no other filters are active, show all challenges
                    setInitialRender(true);
                  }
                }}
              />
            </div>
            <button
              onClick={() => setIsFiltersVisible(!isFiltersVisible)}
              className={`ml-2 p-2 text-gray-500 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-md transition-colors ${isFiltersVisible ? 'bg-indigo-50 text-indigo-600' : ''}`}
            >
              <AdjustmentsHorizontalIcon className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Filters section */}
        <div
          className={`mb-8 transition-all duration-300 ease-in-out overflow-hidden ${
            isFiltersVisible ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center mb-4">
              <FunnelIcon className="h-5 w-5 text-indigo-600 mr-2" />
              <h3 className="font-medium text-gray-900">Filter Challenges</h3>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  Difficulty
                </h4>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setFilter("all")}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                      filter === "all"
                        ? "bg-indigo-600 text-white"
                        : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    All Levels
                  </button>
                  <button
                    onClick={() => {
                      setFilter("easy");
                      // Make sure filtering is applied
                      setInitialRender(false);
                    }}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                      filter === "easy"
                        ? "bg-green-600 text-white"
                        : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    Easy
                  </button>
                  <button
                    onClick={() => {
                      setFilter("medium");
                      // Make sure filtering is applied
                      setInitialRender(false);
                    }}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                      filter === "medium"
                        ? "bg-yellow-600 text-white"
                        : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    Medium
                  </button>
                  <button
                    onClick={() => {
                      setFilter("hard");
                      // Make sure filtering is applied
                      setInitialRender(false);
                    }}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                      filter === "hard"
                        ? "bg-red-600 text-white"
                        : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    Hard
                  </button>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Type</h4>
                <div className="flex flex-wrap gap-2">
                  {challengeTypes.map((type) => (
                    <button
                      key={type}
                      onClick={() => {
                        setTypeFilter(type);
                        // Don't apply filtering if "all" is selected
                        if (type !== "all") {
                          setInitialRender(false);
                        } else if (filter === "all" && searchQuery === "") {
                          // Only reset to show all if other filters are also reset
                          setInitialRender(true);
                        }
                      }}
                      className={`px-4 py-2 rounded-md text-sm font-medium capitalize transition-colors duration-200 ${
                        typeFilter === type
                          ? "bg-indigo-600 text-white"
                          : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      {type === "all" ? "All Types" : type}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Challenge count */}
        <div className="mb-6 flex justify-between items-center">
          <p className="text-sm text-gray-600">
            Showing{" "}
            <span className="font-medium">{filteredChallenges.length}</span>{" "}
            {!initialRender && filteredChallenges.length !== challenges.length && (
              <>
                out of {" "}
                <span className="font-medium">{challenges.length}</span>{" "}
              </>
            )}
            challenges
            {!initialRender && (
              <span className="text-indigo-600 font-medium"> (filtered)</span>
            )}
          </p>
          
          {/* Action buttons */}
          <div className="flex gap-2">
            <button 
              onClick={() => {
                console.log("Resetting all filters");
                setFilter("all");
                setTypeFilter("all");
                setSearchQuery("");
                setInitialRender(true);
                setForceUpdate(prev => prev + 1);
              }}
              className="text-xs bg-indigo-100 hover:bg-indigo-200 text-indigo-700 px-2 py-1 rounded flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Show All
            </button>
            <button
              onClick={() => {
                // Sort by newest challenges
                const sorted = [...filteredChallenges].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                setChallenges(sorted);
                setForceUpdate(prev => prev + 1);
              }}
              className="text-xs bg-purple-100 hover:bg-purple-200 text-purple-700 px-2 py-1 rounded flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
              </svg>
              Sort by Newest
            </button>
          </div>
        </div>

        {/* Challenge cards with better debug output */}
        <div className="mt-6 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {loading ? (
            // Skeleton loaders when loading
            Array.from({ length: 3 }).map((_, index) => (
              <div 
                key={index} 
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden animate-pulse"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="h-2 bg-indigo-500 rounded-t-lg"></div>
                <div className="p-6">
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2 w-5/6"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <div className="h-6 bg-gray-200 rounded w-16"></div>
                    <div className="h-6 bg-gray-200 rounded w-20"></div>
                    <div className="h-6 bg-gray-200 rounded w-16"></div>
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <div className="h-8 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-10 bg-indigo-100 rounded w-1/3"></div>
                  </div>
                </div>
              </div>
            ))
          ) : filteredChallenges.length > 0 ? (
            <>
              {/* Add visual feedback about filtering */}
              {!initialRender && (
                <div className="col-span-full mb-4 text-center">
                  <div className="bg-indigo-50 text-indigo-600 text-sm py-2 px-3 rounded-md inline-flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
                    </svg>
                    Showing filtered results ({filteredChallenges.length} of {challenges.length} challenges)
                  </div>
                </div>
              )}
              
              {/* Map filtered challenges to cards */}
          {filteredChallenges.map((challenge, index) => (
            <div
              key={challenge.id}
                  className={`bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 transform opacity-100 translate-y-0 hover:-translate-y-1 ${challenge.status === 'in_progress' ? 'ring-2 ring-indigo-500' : ''}`}
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  <div className="h-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-t-lg"></div>
              <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h2 className="text-xl font-semibold text-gray-900 line-clamp-2">
                    {challenge.title}
                  </h2>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(
                      challenge.difficulty
                    )}`}
                  >
                    {challenge.difficulty}
                  </span>
                </div>
                    
                    {challenge.last_update && (
                      <div className="mb-2 text-xs text-gray-500 flex items-center">
                        <span className="relative flex h-2 w-2 mr-1">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        Updated {format(new Date(challenge.last_update), "h:mm a")}
                      </div>
                    )}
                    
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {challenge.description}
                </p>

                <div className="mb-4">
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Skills Tested
                  </span>
                  <div className="mt-2 flex flex-wrap gap-2">
                        {challenge.skills?.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-1 bg-indigo-50 text-indigo-700 text-xs rounded-md font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                    <div className="flex flex-wrap items-center space-x-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <ClockIcon className="h-4 w-4 mr-1" />
                        <span>{challenge.duration || "2 hours"}</span>
                  </div>
                  <div className="flex items-center">
                    <CalendarIcon className="h-4 w-4 mr-1" />
                    <span>
                      {format(new Date(challenge.created_at), "MMM d, yyyy")}
                    </span>
                  </div>
                      
                      {challenge.participants && (
                        <div className="flex items-center mt-2 w-full">
                          <UserGroupIcon className="h-4 w-4 mr-1 text-indigo-600" />
                          <span className="text-indigo-600 font-medium">
                            {challenge.participants} participants
                          </span>
                        </div>
                      )}
                      
                  <div className="flex items-center mt-2 w-full">
                    <span className="text-xs font-medium text-gray-500">
                      By {challenge.company}
                    </span>
                  </div>
                </div>

                    {/* Action buttons */}
                    <div className="flex gap-2">
                <button
                  onClick={() => startChallenge(challenge.id)}
                        disabled={activeChallenge === challenge.id}
                        className={`flex-1 flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white transition-all duration-200 ${
                          activeChallenge === challenge.id
                            ? "bg-indigo-400 cursor-wait"
                            : "bg-indigo-600 hover:bg-indigo-700 transform hover:scale-[1.02]"
                        } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                      >
                        {activeChallenge === challenge.id ? (
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                        ) : (
                          <>
                  Start Challenge
                  <ArrowRightIcon className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </button>
                      
                      {/* New bookmark button */}
                      <button
                        onClick={() => {
                          toast.success(`Bookmarked "${challenge.title}"!`, {
                            icon: '🔖',
                            duration: 2000
                          });
                        }}
                        className="p-2 rounded-md border border-gray-300 hover:bg-gray-50 text-gray-500"
                        title="Bookmark this challenge"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                        </svg>
                </button>
                    </div>
              </div>
            </div>
          ))}
            </>
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="mx-auto h-24 w-24 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
        </div>
              <h3 className="mt-2 text-lg font-medium text-gray-900">No challenges found</h3>
              <p className="mt-1 text-gray-500">Try adjusting your search or filter criteria.</p>
              <div className="mt-6">
            <button
              onClick={() => {
                setFilter("all");
                setTypeFilter("all");
                setSearchQuery("");
                    setInitialRender(true);
                    setTimeout(() => setInitialRender(false), 100);
              }}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                  Reset and show all
            </button>
              </div>
          </div>
        )}
        </div>
      </div>
    </div>
  );
}

export default Challenges;
