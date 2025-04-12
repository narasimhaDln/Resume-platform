import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import {
  UserCircleIcon,
  TrophyIcon,
  StarIcon,
  AcademicCapIcon,
  BriefcaseIcon,
  ChartBarIcon,
  PencilIcon,
  CogIcon,
  ArrowRightIcon,
  PaperClipIcon,
} from "@heroicons/react/24/outline";
import { StarIcon as StarSolidIcon } from "@heroicons/react/24/solid";
import SkillBasedMatching from "../components/SkillBasedMatching";
import ProfileForm from "../components/ProfileForm";

function Profile() {
  const { action } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [mounted, setMounted] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [profileSaved, setProfileSaved] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    title: "",
    bio: "",
    rating: 0,
    percentile: "",
    challengesCompleted: 0,
    email: "",
    location: "",
    website: "",
    github: "",
    linkedin: "",
    education: [],
    experience: []
  });
  const [skills, setSkills] = useState([]);
  const [completedChallenges, setCompletedChallenges] = useState([]);
  const [jobApplications, setJobApplications] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalChallenges: 0,
    avgScore: 0,
    totalApplications: 0,
    totalAchievements: 0
  });

  useEffect(() => {
    setMounted(true);
    
    // Check if we're in create mode (coming from the "Create Profile" link)
    if (action === "create" || location.pathname.includes("/create")) {
      setIsCreating(true);
      setLoading(false);
    } else {
      // Regular profile - check if data exists in localStorage
      const savedProfileData = localStorage.getItem('profileData');
      
      if (savedProfileData) {
        // Profile already exists - load it
        setProfileSaved(true);
        
        // Simulate data loading with a small delay for real-time feel
        const loadTimer = setTimeout(() => {
          loadUserData(JSON.parse(savedProfileData));
        }, 800);
        
        return () => clearTimeout(loadTimer);
      } else {
        // No profile exists yet, switch to creation mode
        setIsCreating(true);
        setLoading(false);
      }
    }
  }, [action, location]);

  // Load data with real-time calculations (front-end only)
  const loadUserData = (savedData) => {
    setLoading(true);
    
    if (savedData) {
      // Use saved profile data
      setUserData({
        name: savedData.name || "John Doe",
        title: savedData.title || "Full Stack Developer",
        bio: savedData.bio || "Passionate developer with 3+ years of experience building web applications. Specializing in frontend technologies and UI/UX design.",
        rating: 4.8,
        percentile: "Top 10%",
        challengesCompleted: 8,
        email: savedData.email || "john.doe@example.com",
        location: savedData.location || "San Francisco, CA",
        website: savedData.website || "",
        github: savedData.github || "",
        linkedin: savedData.linkedin || "",
        education: savedData.education || [],
        experience: savedData.experience || []
      });
    } else {
      // Generate a demo profile if no data
      setUserData({
        name: "John Doe",
        title: "Full Stack Developer",
        bio: "Passionate developer with 3+ years of experience building web applications. Specializing in frontend technologies and UI/UX design.",
        rating: 4.8,
        percentile: "Top 10%",
        challengesCompleted: 8,
        email: "john.doe@example.com",
        location: "San Francisco, CA",
        website: "",
        github: "",
        linkedin: "",
        education: [],
        experience: []
      });
    }
    
    // Skills with dynamic proficiency that could be updated in real-time
    const userSkills = [
      { name: "JavaScript", level: "Advanced", icon: "💻", proficiency: 90 },
      { name: "React", level: "Intermediate", icon: "⚛️", proficiency: 75 },
      { name: "Node.js", level: "Intermediate", icon: "🖥️", proficiency: 70 },
      { name: "SQL", level: "Basic", icon: "🗄️", proficiency: 50 },
      { name: "TypeScript", level: "Intermediate", icon: "📘", proficiency: 65 },
      { name: "UI/UX Design", level: "Basic", icon: "🎨", proficiency: 45 },
    ];
    setSkills(userSkills);
    
    // Challenges with real-time dates
    const challenges = [
      {
        id: 1,
        title: "Frontend Development Challenge",
        score: 95,
        date: new Date().toISOString().split('T')[0],
        type: "Frontend",
        company: "TechCorp",
      },
      {
        id: 2,
        title: "Algorithm Challenge",
        score: 88,
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        type: "Algorithms",
        company: "AlgoTech",
      },
      {
        id: 3,
        title: "React Components Challenge",
        score: 92,
        date: new Date(Date.now() - 16 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        type: "Frontend",
        company: "DesignHub",
      },
    ];
    setCompletedChallenges(challenges);
    
    // Job applications with real-time dates
    const applications = [
      {
        id: 1,
        position: "Senior Frontend Developer",
        company: "TechCorp",
        status: "Interview",
        appliedDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      },
      {
        id: 2,
        position: "Full Stack Developer",
        company: "CloudNine",
        status: "Applied",
        appliedDate: new Date().toISOString().split('T')[0],
      },
    ];
    setJobApplications(applications);
    
    // Achievements with real-time dates
    const userAchievements = [
      {
        id: 1,
        title: "Algorithm Master",
        description: "Completed 10 algorithm challenges with a score of 85% or higher",
        icon: "🏆",
        date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      },
      {
        id: 2,
        title: "React Specialist",
        description: "Achieved top 10% in React frontend challenges",
        icon: "⚛️",
        date: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      },
    ];
    setAchievements(userAchievements);
    
    // Calculate real-time stats
    const avgScore = challenges.reduce((sum, challenge) => sum + challenge.score, 0) / challenges.length;
    setStats({
      totalChallenges: challenges.length,
      avgScore: Math.round(avgScore),
      totalApplications: applications.length,
      totalAchievements: userAchievements.length
    });
    
    setLoading(false);
  };
  
  // Handle saving profile data
  const handleSaveProfile = (profileData) => {
    // Save profile data to localStorage
    localStorage.setItem('profileData', JSON.stringify(profileData));
    
    // Update state
    setUserData(prevData => ({
      ...prevData,
      ...profileData
    }));
    
    // Show success notification (could be implemented)
    setProfileSaved(true);
    setIsCreating(false);
    setIsEditing(false);
    
    // Redirect to profile view
    navigate('/profile');
  };
  
  // Handle editing profile
  const handleEditProfile = () => {
    setIsEditing(true);
  };
  
  // Function to add a new skill (simulating real-time updates)
  const addNewSkill = (newSkill) => {
    setSkills(prevSkills => [...prevSkills, newSkill]);
  };
  
  // Function to update skill proficiency (simulating real-time updates)
  const updateSkillProficiency = (skillName, newProficiency) => {
    setSkills(prevSkills => 
      prevSkills.map(skill => 
        skill.name === skillName 
          ? {...skill, proficiency: newProficiency} 
          : skill
      )
    );
  };

  const getScoreColor = (score) => {
    if (score >= 90) return "text-green-600";
    if (score >= 80) return "text-yellow-600";
    return "text-red-600";
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Interview":
        return "bg-green-100 text-green-800";
      case "Applied":
        return "bg-blue-100 text-blue-800";
      case "Rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Show profile form if we're creating or editing
  if (isCreating || isEditing) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className={`transition-all duration-500 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}>
            <div className="bg-white rounded-2xl shadow-md overflow-hidden">
              <div className="px-6 py-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-8">
                  {isCreating ? "Create Your Profile" : "Edit Your Profile"}
                </h1>
                
                <ProfileForm 
                  initialData={isEditing ? userData : null}
                  onSave={handleSaveProfile}
                  onCancel={() => {
                    if (profileSaved) {
                      // If profile exists, go back to view mode
                      setIsEditing(false);
                    } else {
                      // If no profile exists yet, stay in create mode
                      // This could redirect elsewhere if needed
                      navigate('/');
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div
          className={`bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-500 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {/* Profile Header */}
          <div className="relative bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-12">
            {/* Abstract background shapes */}
            <div className="absolute inset-0 overflow-hidden opacity-20">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-white rounded-full"></div>
              <div className="absolute bottom-10 left-10 w-20 h-20 bg-white rounded-full"></div>
              <div className="absolute top-20 left-1/3 w-16 h-16 bg-white rounded-full"></div>
            </div>

            <div className="flex flex-col md:flex-row md:items-center relative z-10">
              <div className="h-28 w-28 md:h-32 md:w-32 rounded-full bg-white p-1 ring-4 ring-white/30 shadow-lg">
                <div className="h-full w-full rounded-full bg-gradient-to-br from-indigo-100 to-indigo-50 flex items-center justify-center overflow-hidden">
                  <UserCircleIcon className="h-full w-full text-indigo-600" />
                </div>
                <button className="absolute bottom-0 right-0 bg-white rounded-full p-1.5 shadow-md hover:bg-gray-100 transition-colors">
                  <PencilIcon className="h-4 w-4 text-gray-600" />
                </button>
              </div>

              <div className="md:ml-8 mt-6 md:mt-0">
                <div className="flex flex-col md:flex-row md:items-center gap-y-2 md:gap-x-4">
                  <h1 className="text-3xl font-bold text-white">
                    {loading ? "Loading..." : userData.name}
                  </h1>
                  <div className="flex items-center">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-900/30 text-white">
                      {loading ? "Loading..." : userData.title}
                    </span>
                  </div>
                </div>

                <p className="text-indigo-100 mt-2 max-w-xl">
                  {loading ? "Loading bio..." : userData.bio}
                </p>

                <div className="flex items-center space-x-6 mt-4">
                  <div className="flex items-center">
                    <div className="flex">
                      {[...Array(5)].map((_, i) =>
                        i < Math.floor(userData.rating) ? (
                          <StarSolidIcon
                            key={i}
                            className="h-5 w-5 text-yellow-400"
                          />
                        ) : (
                          <StarIcon
                            key={i}
                            className="h-5 w-5 text-yellow-400"
                          />
                        )
                      )}
                    </div>
                    <span className="ml-1.5 text-white">
                      {loading ? "..." : `${userData.rating}/5.0`}
                    </span>
                  </div>

                  <div className="flex items-center">
                    <TrophyIcon className="h-5 w-5 text-yellow-400 mr-1.5" />
                    <span className="text-white">
                      {loading ? "..." : userData.percentile}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 md:mt-0 md:ml-auto flex">
                <button 
                  onClick={handleEditProfile}
                  className="px-4 py-2 bg-white text-indigo-600 rounded-md hover:bg-indigo-50 transition-colors font-medium flex items-center"
                >
                  <PencilIcon className="h-5 w-5 mr-1.5" />
                  Edit Profile
                </button>
                <button className="ml-3 p-2 bg-indigo-500/30 text-white rounded-md hover:bg-indigo-500/40 transition-colors">
                  <CogIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px px-6">
              <button
                onClick={() => setActiveTab("overview")}
                className={`py-4 px-6 font-medium text-sm border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === "overview"
                    ? "border-indigo-600 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab("skills")}
                className={`py-4 px-6 font-medium text-sm border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === "skills"
                    ? "border-indigo-600 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Skills
              </button>
              <button
                onClick={() => setActiveTab("challenges")}
                className={`py-4 px-6 font-medium text-sm border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === "challenges"
                    ? "border-indigo-600 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Challenges
              </button>
              <button
                onClick={() => setActiveTab("applications")}
                className={`py-4 px-6 font-medium text-sm border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === "applications"
                    ? "border-indigo-600 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Applications
              </button>
              <button
                onClick={() => setActiveTab("achievements")}
                className={`py-4 px-6 font-medium text-sm border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === "achievements"
                    ? "border-indigo-600 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Achievements
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {loading ? (
                  // Loading state
                  <>
                    <div className="lg:col-span-2 space-y-6">
                      <div className="animate-pulse bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                        <div className="h-6 bg-gray-200 rounded w-1/4 mb-6"></div>
                        <div className="space-y-4">
                          {[1, 2, 3].map((i) => (
                            <div key={i} className="space-y-2">
                              <div className="flex justify-between items-center">
                                <div className="h-5 bg-gray-200 rounded w-1/3"></div>
                                <div className="h-4 bg-gray-200 rounded w-1/6"></div>
                              </div>
                              <div className="h-2 bg-gray-200 rounded w-full"></div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="animate-pulse bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                        <div className="h-6 bg-gray-200 rounded w-1/3 mb-6"></div>
                        <div className="space-y-4">
                          {[1, 2].map((i) => (
                            <div key={i} className="h-24 bg-gray-100 rounded-xl w-full"></div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="space-y-6">
                      <div className="animate-pulse bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                        <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
                        <div className="grid grid-cols-2 gap-4">
                          {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="h-16 bg-gray-100 rounded-lg"></div>
                          ))}
                        </div>
                      </div>
                      <div className="animate-pulse bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                        <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
                        <div className="space-y-4">
                          {[1, 2].map((i) => (
                            <div key={i} className="h-16 bg-gray-100 rounded-lg"></div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  // Actual content
                  <>
                    <div className="lg:col-span-2 space-y-6">
                      {/* Skills Summary */}
                      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                          <div className="flex items-center">
                            <AcademicCapIcon className="h-6 w-6 text-indigo-600 mr-2" />
                            <h2 className="text-xl font-bold text-gray-900">
                              Top Skills
                            </h2>
                          </div>
                          <button
                            className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
                            onClick={() => setActiveTab("skills")}
                          >
                            View All
                          </button>
                        </div>

                        <div className="space-y-4">
                          {skills.slice(0, 3).map((skill, index) => (
                            <div key={index} className="space-y-2">
                              <div className="flex justify-between items-center">
                                <div className="flex items-center">
                                  <span className="text-lg mr-2">{skill.icon}</span>
                                  <span className="font-medium text-gray-900">
                                    {skill.name}
                                  </span>
                                </div>
                                <span className="text-sm text-gray-600">
                                  {skill.level}
                                </span>
                              </div>
                              <div className="relative h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                                <div
                                  className="absolute h-full bg-indigo-600 rounded-full"
                                  style={{ width: `${skill.proficiency}%` }}
                                ></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Recent Challenges */}
                      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                          <div className="flex items-center">
                            <TrophyIcon className="h-6 w-6 text-indigo-600 mr-2" />
                            <h2 className="text-xl font-bold text-gray-900">
                              Recent Challenges
                            </h2>
                          </div>
                          <button
                            className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
                            onClick={() => setActiveTab("challenges")}
                          >
                            View All
                          </button>
                        </div>

                        <div className="space-y-4">
                          {completedChallenges.slice(0, 2).map((challenge) => (
                            <div
                              key={challenge.id}
                              className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200"
                            >
                              <div className="mb-3 sm:mb-0">
                                <div className="flex items-center">
                                  <span className="text-lg mr-2">
                                    {challenge.type === "Frontend"
                                      ? "💻"
                                      : challenge.type === "Algorithms"
                                      ? "🧮"
                                      : challenge.type === "Backend"
                                      ? "🖧"
                                      : "📱"}
                                  </span>
                                  <h3 className="font-medium text-gray-900">
                                    {challenge.title}
                                  </h3>
                                </div>
                                <div className="flex items-center mt-1">
                                  <span className="text-sm text-gray-500">
                                    {challenge.date}
                                  </span>
                                  <span className="mx-2 text-gray-300">•</span>
                                  <span className="text-sm text-indigo-600">
                                    {challenge.company}
                                  </span>
                                </div>
                              </div>
                              <div
                                className={`text-lg font-semibold ${getScoreColor(
                                  challenge.score
                                )}`}
                              >
                                {challenge.score}%
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      {/* Stats Card */}
                      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">
                          Stats
                        </h2>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-indigo-50 p-4 rounded-lg">
                            <div className="text-2xl font-bold text-indigo-600">
                              {stats.totalChallenges}
                            </div>
                            <div className="text-sm text-gray-600">Challenges</div>
                          </div>
                          <div className="bg-green-50 p-4 rounded-lg">
                            <div className="text-2xl font-bold text-green-600">
                              {stats.avgScore}%
                            </div>
                            <div className="text-sm text-gray-600">Avg. Score</div>
                          </div>
                          <div className="bg-purple-50 p-4 rounded-lg">
                            <div className="text-2xl font-bold text-purple-600">
                              {stats.totalApplications}
                            </div>
                            <div className="text-sm text-gray-600">
                              Applications
                            </div>
                          </div>
                          <div className="bg-yellow-50 p-4 rounded-lg">
                            <div className="text-2xl font-bold text-yellow-600">
                              {stats.totalAchievements}
                            </div>
                            <div className="text-sm text-gray-600">
                              Achievements
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Achievements */}
                      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">
                          Achievements
                        </h2>

                        <div className="space-y-4">
                          {achievements.map((achievement) => (
                            <div
                              key={achievement.id}
                              className="flex items-start p-3 bg-gray-50 rounded-lg"
                            >
                              <div className="flex-shrink-0 w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center text-2xl">
                                {achievement.icon}
                              </div>
                              <div className="ml-3">
                                <h3 className="font-medium text-gray-900">
                                  {achievement.title}
                                </h3>
                                <p className="text-sm text-gray-600">
                                  {achievement.description}
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                  {achievement.date}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Skills Tab */}
            {activeTab === "skills" && (
              <div>
                <div className="flex items-center mb-6">
                  <AcademicCapIcon className="h-6 w-6 text-indigo-600 mr-2" />
                  <h2 className="text-2xl font-bold text-gray-900">
                    Skills Assessment
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Skill Proficiency
                    </h3>
                    <div className="space-y-6">
                      {skills.map((skill, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center">
                              <span className="text-2xl mr-3">
                                {skill.icon}
                              </span>
                              <span className="font-medium text-gray-900">
                                {skill.name}
                              </span>
                            </div>
                            <span className="px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-700">
                              {skill.level}
                            </span>
                          </div>
                          <div className="relative h-2.5 w-full bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="absolute h-full bg-indigo-600 rounded-full"
                              style={{
                                width: `${skill.proficiency}%`,
                                transition: "width 1s ease-in-out",
                              }}
                            ></div>
                          </div>
                          <button 
                            onClick={() => updateSkillProficiency(skill.name, Math.min(100, skill.proficiency + 5))}
                            className="text-xs text-indigo-600 hover:text-indigo-800 mt-1"
                          >
                            Update proficiency
                          </button>
                        </div>
                      ))}
                      
                      <button 
                        onClick={() => addNewSkill({
                          name: "GraphQL", 
                          level: "Basic", 
                          icon: "🔄", 
                          proficiency: 35
                        })}
                        className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors text-sm"
                      >
                        Add New Skill
                      </button>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Skills Overview
                    </h3>
                    <div className="bg-gray-50 p-6 rounded-xl">
                      <div className="mb-6">
                        <h4 className="text-sm font-medium uppercase text-gray-500 tracking-wider mb-2">
                          Skill Breakdown
                        </h4>
                        <div className="relative pt-1">
                          <div className="flex h-4 overflow-hidden text-xs bg-gray-200 rounded-lg">
                            <div
                              className="flex flex-col justify-center w-3/6 bg-indigo-600 text-white text-center"
                              title="Frontend"
                            >
                              <span className="text-xs font-medium">
                                Frontend (50%)
                              </span>
                            </div>
                            <div
                              className="flex flex-col justify-center w-2/6 bg-purple-600 text-white text-center"
                              title="Backend"
                            >
                              <span className="text-xs font-medium truncate">
                                Backend (33%)
                              </span>
                            </div>
                            <div
                              className="flex flex-col justify-center w-1/6 bg-blue-600 text-white text-center"
                              title="Other"
                            >
                              <span className="text-xs font-medium truncate">
                                Other (17%)
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Real-time skill matching component */}
                      <div className="mt-8">
                        <h4 className="text-sm font-medium uppercase text-gray-500 tracking-wider mb-4">
                          Job Skill Matching
                        </h4>
                        <SkillBasedMatching userSkills={skills} />
                      </div>

                      <div className="mt-8">
                        <h4 className="text-sm font-medium uppercase text-gray-500 tracking-wider mb-2">
                          Recommended Skill Paths
                        </h4>
                        <div className="space-y-3">
                          <div className="p-3 bg-white rounded-lg border border-gray-200 flex justify-between items-center hover:shadow-sm transition-shadow">
                            <div>
                              <h5 className="font-medium text-gray-900">
                                TypeScript Advanced
                              </h5>
                              <p className="text-sm text-gray-600">
                                Level up your TypeScript skills
                              </p>
                            </div>
                            <ArrowRightIcon className="h-5 w-5 text-indigo-600" />
                          </div>
                          <div className="p-3 bg-white rounded-lg border border-gray-200 flex justify-between items-center hover:shadow-sm transition-shadow">
                            <div>
                              <h5 className="font-medium text-gray-900">
                                Backend Architecture
                              </h5>
                              <p className="text-sm text-gray-600">
                                Strengthen your backend knowledge
                              </p>
                            </div>
                            <ArrowRightIcon className="h-5 w-5 text-indigo-600" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Challenges Tab */}
            {activeTab === "challenges" && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <TrophyIcon className="h-6 w-6 text-indigo-600 mr-2" />
                    <h2 className="text-2xl font-bold text-gray-900">
                      Challenge History
                    </h2>
                  </div>
                  <button 
                    onClick={() => {
                      const newChallenge = {
                        id: completedChallenges.length + 1,
                        title: "New API Challenge",
                        score: Math.floor(Math.random() * 15) + 85, // Random score between 85-100
                        date: new Date().toISOString().split('T')[0],
                        type: "Backend",
                        company: "APITech"
                      };
                      setCompletedChallenges(prev => [newChallenge, ...prev]);
                      
                      // Update stats
                      const newAvgScore = [...completedChallenges, newChallenge].reduce((sum, challenge) => 
                        sum + challenge.score, 0) / (completedChallenges.length + 1);
                      
                      setStats(prev => ({
                        ...prev,
                        totalChallenges: prev.totalChallenges + 1,
                        avgScore: Math.round(newAvgScore)
                      }));
                    }}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors font-medium flex items-center"
                  >
                    Add Challenge
                    <ArrowRightIcon className="ml-1.5 h-4 w-4" />
                  </button>
                </div>

                <div className="bg-gradient-to-r from-indigo-50 to-indigo-100 rounded-xl p-4 flex items-center mb-8">
                  <div className="p-3 bg-white rounded-lg mr-4">
                    <ChartBarIcon className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">
                      Performance Summary
                    </h3>
                    <p className="text-sm text-gray-600">
                      Your average score is{" "}
                      <span className="font-semibold text-indigo-600">
                        {loading ? "loading..." : `${stats.avgScore}%`}
                      </span>
                      , which is higher than 85% of users
                    </p>
                  </div>
                </div>

                {loading ? (
                  <div className="text-center py-20">
                    <div className="animate-pulse text-indigo-600">Loading challenges...</div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {completedChallenges.map((challenge) => (
                      <div
                        key={challenge.id}
                        className="flex flex-col md:flex-row md:items-center justify-between p-5 bg-white rounded-xl border border-gray-200 hover:shadow-md transition-all duration-200 transform hover:-translate-y-1"
                      >
                        <div className="mb-4 md:mb-0">
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center mr-3 text-lg">
                              {challenge.type === "Frontend"
                                ? "💻"
                                : challenge.type === "Algorithms"
                                ? "🧮"
                                : challenge.type === "Backend"
                                ? "🖧"
                                : "📱"}
                            </div>
                            <div>
                              <h3 className="font-medium text-gray-900">
                                {challenge.title}
                              </h3>
                              <div className="flex items-center mt-1">
                                <span className="text-sm text-gray-500">
                                  Completed on {challenge.date}
                                </span>
                                <span className="mx-2 text-gray-300">•</span>
                                <span className="text-sm text-indigo-600">
                                  {challenge.type}
                                </span>
                                <span className="mx-2 text-gray-300">•</span>
                                <span className="text-sm text-gray-600">
                                  By {challenge.company}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-6">
                          <div
                            className={`text-lg font-semibold ${getScoreColor(
                              challenge.score
                            )}`}
                          >
                            Score: {challenge.score}%
                          </div>
                          <button className="p-2 text-gray-400 hover:text-indigo-600 transition-colors rounded-full hover:bg-gray-100">
                            <PaperClipIcon className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Applications Tab */}
            {activeTab === "applications" && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <BriefcaseIcon className="h-6 w-6 text-indigo-600 mr-2" />
                    <h2 className="text-2xl font-bold text-gray-900">
                      Job Applications
                    </h2>
                  </div>
                  <button 
                    onClick={() => {
                      const newApplication = {
                        id: jobApplications.length + 1,
                        position: "DevOps Engineer",
                        company: "TechInnovate",
                        status: "Applied",
                        appliedDate: new Date().toISOString().split('T')[0]
                      };
                      setJobApplications(prev => [newApplication, ...prev]);
                      
                      // Update stats
                      setStats(prev => ({
                        ...prev,
                        totalApplications: prev.totalApplications + 1
                      }));
                    }}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors font-medium flex items-center"
                  >
                    Add Application
                    <ArrowRightIcon className="ml-1.5 h-4 w-4" />
                  </button>
                </div>

                {loading ? (
                  <div className="text-center py-20">
                    <div className="animate-pulse text-indigo-600">Loading applications...</div>
                  </div>
                ) : jobApplications.length > 0 ? (
                  <div className="space-y-6">
                    {jobApplications.map((job) => (
                      <div
                        key={job.id}
                        className="flex flex-col md:flex-row md:items-center justify-between p-5 bg-white rounded-xl border border-gray-200 hover:shadow-md transition-all duration-200 transform hover:-translate-y-1"
                      >
                        <div className="mb-4 md:mb-0">
                          <h3 className="font-medium text-gray-900">
                            {job.position}
                          </h3>
                          <div className="flex items-center mt-1">
                            <span className="text-sm text-indigo-600">
                              {job.company}
                            </span>
                            <span className="mx-2 text-gray-300">•</span>
                            <span className="text-sm text-gray-500">
                              Applied on {job.appliedDate}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <select 
                            className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(job.status)} border-0 focus:ring-2 focus:ring-indigo-500 cursor-pointer`}
                            value={job.status}
                            onChange={(e) => {
                              const newStatus = e.target.value;
                              setJobApplications(prev => 
                                prev.map(item => 
                                  item.id === job.id 
                                    ? {...item, status: newStatus} 
                                    : item
                                )
                              );
                            }}
                          >
                            <option value="Applied">Applied</option>
                            <option value="Interview">Interview</option>
                            <option value="Offered">Offered</option>
                            <option value="Rejected">Rejected</option>
                          </select>
                          <button className="ml-4 px-3 py-1 border border-gray-300 rounded text-sm text-gray-600 hover:bg-gray-50 transition-colors">
                            View Details
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-gray-50 rounded-xl">
                    <BriefcaseIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      No applications yet
                    </h3>
                    <p className="text-gray-600 max-w-md mx-auto mb-6">
                      You haven't applied to any jobs yet. Browse available
                      positions and start applying!
                    </p>
                    <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
                      Find Jobs
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
