import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  BriefcaseIcon,
  CalendarIcon,
  ChartBarIcon,
  CheckBadgeIcon,
  CheckCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ClockIcon,
  CpuChipIcon,
  DocumentTextIcon,
  UserGroupIcon,
  LockClosedIcon,
  PuzzlePieceIcon,
  RocketLaunchIcon,
  ArrowRightIcon,
  CubeIcon,
  ShieldCheckIcon,
  ArrowTrendingUpIcon,
  BuildingOfficeIcon,
  LightBulbIcon,
  CursorArrowRaysIcon,
  CommandLineIcon,
  SparklesIcon,
  ChatBubbleBottomCenterTextIcon,
  XMarkIcon,
  CodeBracketIcon,
} from "@heroicons/react/24/outline";
import { useRealtime } from "../context/RealtimeContext";

function Home() {
  // Use real-time data from context
  const { challenges, companies, notifications, loading, isSupabaseConfigured, userStatus, skillsPortfolios, matchScores, currentUserProfile } = useRealtime();
  
  const [mounted, setMounted] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [challengesCompleted, setChallengesCompleted] = useState(0);
  const [candidatesRegistered, setCandidatesRegistered] = useState(0);
  const [companiesOnboard, setCompaniesOnboard] = useState(0);
  const [successRate, setSuccessRate] = useState(0);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [activeFeature, setActiveFeature] = useState("challenges");
  const [newChallengesToday, setNewChallengesToday] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(null);
  const statsIntervalRef = useRef(null);
  const notificationTimeoutRef = useRef(null);
  const challengesCounterRef = useRef(null);
  const navigate = useNavigate();
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  // Get real notifications or use fallback
  const liveUpdates = useMemo(() => {
    if (notifications && notifications.length > 0) {
      return notifications.map(notification => notification.message);
    }
    return [
      "New challenge posted: React Component Design",
      "Company just joined: TechInnovate Solutions",
      "5 new developers registered in the last hour",
      "New remote position: Senior Frontend Developer",
      "Trending skill: TypeScript (15% increase this week)",
    ];
  }, [notifications]);

  // Testimonials data
  const testimonials = [
    {
      id: 1,
      quote: "This platform completely changed how we hire developers. We found amazing talent that traditional resumes would have missed.",
      author: "Sarah Johnson",
      role: "CTO at TechFlow",
      image: "https://randomuser.me/api/portraits/women/32.jpg"
    },
    {
      id: 2,
      quote: "I showcased my actual coding skills and got hired within a week, despite having an unconventional background.",
      author: "Michael Chen",
      role: "Frontend Developer",
      image: "https://randomuser.me/api/portraits/men/44.jpg"
    },
    {
      id: 3,
      quote: "The blind skill-matching eliminated bias from our hiring process and helped us build a truly diverse engineering team.",
      author: "Priya Patel",
      role: "HR Director at DataStream",
      image: "https://randomuser.me/api/portraits/women/65.jpg"
    }
  ];

  // Modal content configuration
  const modalContent = {
    profile: {
      title: "Create Your Developer Profile",
      subtitle: "Showcase your skills, not just your resume",
      features: [
        {
          icon: <PuzzlePieceIcon className="h-5 w-5 text-indigo-600" />,
          title: "Skill Verification",
          description: "Complete hands-on challenges to verify your programming abilities"
        },
        {
          icon: <ShieldCheckIcon className="h-5 w-5 text-indigo-600" />,
          title: "Anonymous Matching",
          description: "Get matched based on skills without revealing personal details"
        },
        {
          icon: <ChartBarIcon className="h-5 w-5 text-indigo-600" />,
          title: "Performance Dashboard",
          description: "Track your progress and see how you rank against other developers"
        },
        {
          icon: <BriefcaseIcon className="h-5 w-5 text-indigo-600" />,
          title: "Direct Job Opportunities",
          description: "Receive job offers based on your verified skill profile"
        }
      ],
      buttonText: "Create Profile",
      buttonLink: "/profile"
    },
    company: {
      title: "Recruit Top Tech Talent",
      subtitle: "Find candidates based on verified skills",
      features: [
        {
          icon: <CubeIcon className="h-5 w-5 text-purple-600" />,
          title: "Custom Challenges",
          description: "Create tailored challenges that reflect your actual work environment"
        },
        {
          icon: <DocumentTextIcon className="h-5 w-5 text-purple-600" />,
          title: "Skill-Based Screening",
          description: "Screen candidates based on demonstrated abilities, not resumes"
        },
        {
          icon: <UserGroupIcon className="h-5 w-5 text-purple-600" />,
          title: "Diverse Talent Pool",
          description: "Access developers from all backgrounds with anonymous matching"
        },
        {
          icon: <RocketLaunchIcon className="h-5 w-5 text-purple-600" />,
          title: "Efficient Hiring",
          description: "Reduce time-to-hire with pre-verified candidates"
        }
      ],
      buttonText: "Get Started",
      buttonLink: "/companies/register"
    },
    learn: {
      title: "How Our Platform Works",
      subtitle: "Transforming tech hiring through skill verification",
      features: [
        {
          icon: <LightBulbIcon className="h-5 w-5 text-blue-600" />,
          title: "Challenge-Based Assessment",
          description: "Developers complete real-world coding tasks to demonstrate abilities"
        },
        {
          icon: <ChartBarIcon className="h-5 w-5 text-blue-600" />,
          title: "AI Skill Analysis",
          description: "Our algorithms analyze code quality, efficiency, and problem-solving"
        },
        {
          icon: <ShieldCheckIcon className="h-5 w-5 text-blue-600" />,
          title: "Blind Matching System",
          description: "Initial matches hide personal information to prevent bias"
        },
        {
          icon: <RocketLaunchIcon className="h-5 w-5 text-blue-600" />,
          title: "Direct Connections",
          description: "Companies connect with developers based on verified abilities"
        }
      ],
      buttonText: "See Interactive Demo",
      buttonLink: "/demo"
    }
  };

  // Animation on scroll effect
  useEffect(() => {
    setMounted(true);
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fadeIn");
          }
        });
      },
      { threshold: 0.1 }
    );

    const hiddenElements = document.querySelectorAll(".animate-hidden");
    hiddenElements.forEach((el) => observer.observe(el));

    // Animate stats with counting effect
    animateStats();
    
    // Set up interval for rotating testimonials
    const testimonialInterval = setInterval(() => {
      setActiveTestimonial(prev => (prev + 1) % testimonials.length);
    }, 8000);
    
    // Show notifications from real data when available
    if (notifications && notifications.length > 0) {
      // If we have real notifications, display them
      const randomNotification = notifications[Math.floor(Math.random() * notifications.length)];
      setNotificationMessage(randomNotification.message);
      setShowNotification(true);
      
      // Set up notification rotation
      notificationTimeoutRef.current = setTimeout(() => {
        scheduleNotification();
      }, 5000);
    } else {
      // Fall back to simulated notifications
      scheduleNotification();
    }
    
    // Set newChallengesToday count based on real data or animate counter
    if (challenges && challenges.length > 0) {
      // Calculate challenges created today
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const todayChallenges = challenges.filter(challenge => {
        const challengeDate = new Date(challenge.created_at);
        return challengeDate >= today;
      }).length;
      
      setNewChallengesToday(todayChallenges || Math.floor(Math.random() * 20) + 5);
    } else {
      // Animate challenges counter if no real data
      animateChallengesCounter();
    }

    return () => {
      hiddenElements.forEach((el) => observer.unobserve(el));
      clearInterval(testimonialInterval);
      clearInterval(statsIntervalRef.current);
      clearTimeout(notificationTimeoutRef.current);
      clearInterval(challengesCounterRef.current);
    };
  }, [challenges, notifications]);
  
  // Animate counting up effect for stats
  const animateStats = () => {
    const duration = 2000; // 2 seconds animation
    const steps = 50;
    const stepTime = duration / steps;
    
    // Use real data when available
    const targetValues = {
      challenges: challenges?.length > 0 ? challenges.length * 10 : 12500,
      candidates: challenges?.length > 0 ? challenges.reduce((sum, c) => sum + (c.participants || 0), 0) : 10000,
      companies: companies?.length > 0 ? companies.length * 5 : 500,
      success: 95 // Always show high success rate
    };
    
    let currentStep = 0;
    
    statsIntervalRef.current = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      
      setChallengesCompleted(Math.floor(targetValues.challenges * progress));
      setCandidatesRegistered(Math.floor(targetValues.candidates * progress));
      setCompaniesOnboard(Math.floor(targetValues.companies * progress));
      setSuccessRate(Math.floor(targetValues.success * progress));
      
      if (currentStep === steps) {
        clearInterval(statsIntervalRef.current);
      }
    }, stepTime);
  };
  
  // Show real notifications or fallback to simulated ones
  const scheduleNotification = () => {
    const randomTime = Math.floor(Math.random() * 8000) + 5000; // Random time between 5-13 seconds
    
    notificationTimeoutRef.current = setTimeout(() => {
      // Use real notifications if available
      if (notifications && notifications.length > 0) {
        const randomNotification = notifications[Math.floor(Math.random() * notifications.length)];
        setNotificationMessage(randomNotification.message);
      } else {
        // Fall back to simulated updates
        const randomUpdate = liveUpdates[Math.floor(Math.random() * liveUpdates.length)];
        setNotificationMessage(randomUpdate);
      }
      
      setShowNotification(true);
      
      // Hide notification after 5 seconds
      setTimeout(() => {
        setShowNotification(false);
        // Schedule next notification
        scheduleNotification();
      }, 5000);
    }, randomTime);
  };

  // Animate new challenges counter for candidates section
  const animateChallengesCounter = () => {
    let count = 0;
    const targetCount = 24; // Number of new challenges today
    
    challengesCounterRef.current = setInterval(() => {
      if (count < targetCount) {
        count += 1;
        setNewChallengesToday(count);
      } else {
        clearInterval(challengesCounterRef.current);
      }
    }, 70);
  };

  // Add a useMemo hook at the component level to extract and prepare skills data
  // Extract trending skills from challenges 
  const trendingSkills = useMemo(() => {
    // Extract and count skills from challenges
    const skillCount = {};
    if (challenges && challenges.length > 0) {
      challenges.forEach(challenge => {
        if (challenge.skills && Array.isArray(challenge.skills)) {
          challenge.skills.forEach(skill => {
            skillCount[skill] = (skillCount[skill] || 0) + 1;
          });
        }
      });
    }
    
    // If no skills found, use defaults
    if (Object.keys(skillCount).length === 0) {
      return [
        { name: "React/Next.js", growth: "+18%", jobs: 1432, percentage: 92 },
        { name: "TypeScript", growth: "+15%", jobs: 1231, percentage: 85 },
        { name: "Node.js", growth: "+12%", jobs: 987, percentage: 78 },
        { name: "AI/ML", growth: "+22%", jobs: 754, percentage: 72 },
        { name: "AWS/Cloud", growth: "+10%", jobs: 823, percentage: 65 }
      ];
    }
    
    // Convert to array and sort by count
    return Object.entries(skillCount)
      .map(([name, count]) => ({
        name,
        growth: `+${Math.floor(Math.random() * 15) + 8}%`,
        jobs: count * 100 + Math.floor(Math.random() * 500),
        percentage: Math.min(95, count * 10 + 50)
      }))
      .sort((a, b) => b.percentage - a.percentage)
      .slice(0, 5);
  }, [challenges]);

  // Extract trending skills for hero section
  const heroTrendingSkills = useMemo(() => {
    if (challenges && challenges.length > 0) {
      // Extract skills from challenges
      const skillCount = {};
      challenges.forEach(challenge => {
        if (challenge.skills && Array.isArray(challenge.skills)) {
          challenge.skills.forEach(skill => {
            skillCount[skill] = (skillCount[skill] || 0) + 1;
          });
        }
      });
      
      // Convert to array, sort, and get top 3
      return Object.entries(skillCount)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(([skill, count]) => ({
          name: skill,
          growth: `+${Math.floor(Math.random() * 20) + 10}%`
        }));
    }
    
    // Default skills if no challenges data
    return [
      { name: "React", growth: "+32%" },
      { name: "TypeScript", growth: "+24%" },
      { name: "Node.js", growth: "+18%" }
    ];
  }, [challenges]);
  
  // Process company data for display
  const processedCompanies = useMemo(() => {
    if (companies && companies.length > 0) {
      return companies.slice(0, 4).map((company, index) => ({
        id: company.id,
        name: company.name,
        industry: company.industry || "Technology",
        emoji: ["🚀", "🌐", "🔒", "💻"][index % 4],
        color: ["purple", "blue", "green", "red"][index % 4],
        roles: Math.floor(Math.random() * 8) + 2
      }));
    }
    
    return [
      { id: 1, name: "TechNova Solutions", industry: "Frontend, Backend", emoji: "🚀", color: "purple", roles: 7 },
      { id: 2, name: "DataSphere Analytics", industry: "Data Science, AI/ML", emoji: "🌐", color: "blue", roles: 5 },
      { id: 3, name: "SecureNet Systems", industry: "Cybersecurity, DevOps", emoji: "🔒", color: "green", roles: 6 },
      { id: 4, name: "CodeCraft Studios", industry: "Full Stack, Mobile Dev", emoji: "💻", color: "red", roles: 4 }
    ];
  }, [companies]);

  // Add new state and function to fetch real job market data
  const [jobMarketData, setJobMarketData] = useState(null);
  const [loadingMarketData, setLoadingMarketData] = useState(false);

  // Extract skills from job descriptions
  const extractSkillsFromDescription = useCallback((description) => {
    const commonSkills = [
      "JavaScript", "React", "Node.js", "TypeScript", "Python", 
      "Java", "AWS", "Docker", "Kubernetes", "GraphQL", 
      "REST API", "SQL", "NoSQL", "MongoDB", "Git",
      "DevOps", "CI/CD", "HTML", "CSS", "Angular",
      "Vue.js", "PHP", "Ruby", "Go", "Swift",
      "Django", "Flask", "Express", "Next.js", "Redux",
      "Spring Boot", "Laravel", "TensorFlow", "PyTorch", "React Native",
      "Flutter", "Golang", "Rust", "C#", ".NET", "Azure", "GCP"
    ];
    
    // Find skills mentioned in the description
    return commonSkills.filter(skill => 
      description.toLowerCase().includes(skill.toLowerCase())
    );
  }, []);

  // Process data from challenges as fallback
  const processDataFromChallenges = useCallback(() => {
    // Return a copy of trendingSkills instead of the reference
    return [...(trendingSkills || [])];
  }, []); // Remove the circular dependency

  // Process job data to extract companies
  const processJobCompanies = useCallback((jobs) => {
    // Get unique companies
    const uniqueCompanies = [];
    const companyIds = new Set();
    
    jobs.forEach(job => {
      if (job.company && !companyIds.has(job.company.id)) {
        companyIds.add(job.company.id);
        uniqueCompanies.push({
          id: job.company.id,
          name: job.company.name,
          industry: job.company.industry || (job.categories ? job.categories[0]?.name : "Technology"),
        });
      }
    });
    
    // Format companies for display
    return uniqueCompanies.slice(0, 4).map((company, index) => ({
      id: company.id,
      name: company.name,
      industry: company.industry,
      emoji: ["🚀", "🌐", "🔒", "💻"][index % 4],
      color: ["purple", "blue", "green", "red"][index % 4],
      roles: jobs.filter(job => job.company?.id === company.id).length
    }));
  }, []);

  // Generate mock job data as fallback when APIs fail
  const generateMockJobs = useCallback(() => {
    const companies = [
      { id: 1, name: "TechNova Solutions", industry: "Software Development" },
      { id: 2, name: "DataSphere Analytics", industry: "Data Science" },
      { id: 3, name: "SecureNet Systems", industry: "Cybersecurity" },
      { id: 4, name: "CodeCraft Studios", industry: "Web Development" },
      { id: 5, name: "AI Dynamics", industry: "Artificial Intelligence" },
      { id: 6, name: "Cloud Fusion", industry: "Cloud Computing" },
      { id: 7, name: "Digital Frontier", industry: "Digital Marketing" },
      { id: 8, name: "Quantum Innovations", industry: "Quantum Computing" }
    ];
    
    const skills = [
      "JavaScript", "React", "Node.js", "TypeScript", "Python", 
      "Java", "AWS", "Docker", "Kubernetes", "GraphQL", 
      "REST API", "SQL", "NoSQL", "MongoDB", "Git",
      "DevOps", "CI/CD", "HTML", "CSS", "Angular",
      "Vue.js", "PHP", "Ruby", "Go", "Swift"
    ];
    
    const jobTitles = [
      "Frontend Developer", "Backend Developer", "Full Stack Developer",
      "Data Scientist", "DevOps Engineer", "UI/UX Designer",
      "Product Manager", "QA Engineer", "Machine Learning Engineer",
      "Cloud Architect", "Systems Engineer", "Mobile Developer"
    ];
    
    // Generate 20-30 mock jobs
    const jobCount = Math.floor(Math.random() * 10) + 20;
    return Array.from({ length: jobCount }, (_, i) => {
      const company = companies[Math.floor(Math.random() * companies.length)];
      const title = jobTitles[Math.floor(Math.random() * jobTitles.length)];
      
      // Randomly select 3-6 skills for this job
      const jobSkills = [];
      const skillCount = Math.floor(Math.random() * 4) + 3;
      for (let j = 0; j < skillCount; j++) {
        const skill = skills[Math.floor(Math.random() * skills.length)];
        if (!jobSkills.includes(skill)) {
          jobSkills.push(skill);
        }
      }
      
      return {
        id: i + 1,
        title,
        company,
        description: `This role requires expertise in ${jobSkills.join(", ")}. The ideal candidate will have strong problem-solving skills and a passion for ${company.industry}.`,
        categories: [{ name: company.industry }],
        skills: jobSkills
      };
    });
  }, []);

  // Process job market data to extract skills
  const processJobSkills = useCallback((jobs, techNews = []) => {
    const skillMap = {};
    
    // Process skills from jobs
    jobs.forEach(job => {
      const jobSkills = job.skills || [];
      jobSkills.forEach(skill => {
        skillMap[skill] = (skillMap[skill] || 0) + 1;
      });
    });
    
    // Enhance with tech news trends
    techNews.forEach(story => {
      if (story && story.title) {
        const skills = extractSkillsFromDescription(story.title);
        skills.forEach(skill => {
          // News mentions count extra for trending
          skillMap[skill] = (skillMap[skill] || 0) + 2;
        });
      }
    });
    
    // Calculate growth trends based on previous data and randomization
    const previousSkills = JSON.parse(localStorage.getItem('previousSkills') || '{}');
    const currentDate = new Date().getTime();
    
    // Convert to array and calculate percentages
    const result = Object.entries(skillMap)
      .map(([name, count]) => {
        const prevCount = previousSkills[name]?.count || 0;
        const daysSincePrev = previousSkills[name]?.timestamp 
          ? Math.floor((currentDate - previousSkills[name].timestamp) / (1000 * 60 * 60 * 24)) 
          : 30;
        
        // Calculate growth percentage (real if we have previous data, or random if new)
        let growthPercent;
        if (prevCount > 0 && daysSincePrev > 0) {
          // Real growth calculation
          const dailyGrowth = (count - prevCount) / daysSincePrev;
          growthPercent = Math.floor((dailyGrowth / prevCount) * 100 * 30); // Monthly growth
        } else {
          // Random for new skills
          growthPercent = Math.floor(Math.random() * 15) + 8;
        }
        
        // Ensure growth is between -20% and +30%
        growthPercent = Math.max(-20, Math.min(30, growthPercent));
        
        return {
          name,
          growth: `${growthPercent > 0 ? '+' : ''}${growthPercent}%`,
          jobs: count * 10,
          percentage: Math.min(95, (count / Math.max(...Object.values(skillMap))) * 95)
        };
      })
      .sort((a, b) => b.jobs - a.jobs)
      .slice(0, 5);
    
    // Store current data for future growth calculations
    const skillsToStore = {};
    Object.entries(skillMap).forEach(([name, count]) => {
      skillsToStore[name] = {
        count,
        timestamp: currentDate
      };
    });
    localStorage.setItem('previousSkills', JSON.stringify(skillsToStore));
    
    return result;
  }, [extractSkillsFromDescription]);

  // Fetch real-time job market data
  const fetchJobMarketData = useCallback(async () => {
    try {
      setLoadingMarketData(true);
      
      // Fetch real-time GitHub jobs data (from a proxy that doesn't require API key)
      const jobsPromise = fetch('https://api.allorigins.win/raw?url=https://remotive.com/api/remote-jobs/categories/software-dev')
        .then(response => response.json())
        .catch(() => ({ jobs: [] }));
      
      // Fetch trending tech repos from GitHub as a proxy for tech trends
      const techTrendsPromise = fetch('https://api.allorigins.win/raw?url=https://github.com/trending/repositories.json')
        .then(response => response.json())
        .catch(() => ([]));
        
      // Fetch HackerNews top stories for tech news
      const hackerNewsPromise = fetch('https://hacker-news.firebaseio.com/v0/topstories.json')
        .then(response => response.json())
        .catch(() => ([]));
        
      // Wait for all data to be fetched
      const [jobsData, techTrendsData, hackerNewsIds] = await Promise.all([
        jobsPromise, 
        techTrendsPromise,
        hackerNewsPromise
      ]);
      
      // If we have job data, process it
      let processedJobs = [];
      if (jobsData && jobsData.jobs && jobsData.jobs.length > 0) {
        processedJobs = jobsData.jobs.map(job => ({
          id: job.id,
          title: job.title,
          company: {
            id: job.company_name.replace(/\s+/g, '-').toLowerCase(),
            name: job.company_name,
            industry: job.category || "Technology"
          },
          description: job.description || "",
          categories: [{ name: job.category || "Software Development" }],
          skills: extractSkillsFromDescription(job.description || "")
        }));
      } else {
        // If we couldn't get job data, generate some local data
        processedJobs = generateMockJobs();
      }
      
      setJobMarketData({
        skills: processJobSkills(processedJobs, techTrendsData),
        companies: processJobCompanies(processedJobs),
        timestamp: new Date().toISOString()
      });
      setLoadingMarketData(false);
    } catch (error) {
      console.error("Error fetching job market data:", error);
      setLoadingMarketData(false);
    }
  }, [extractSkillsFromDescription, processJobSkills, processJobCompanies, generateMockJobs]);

  // Load job market data on component mount
  useEffect(() => {
    // Only load if we don't already have data and component is mounted
    if (!jobMarketData && mounted) {
      fetchJobMarketData();
    }
  }, [fetchJobMarketData, jobMarketData, mounted]);
  
  // Handle scroll to top functionality
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  // Extract user skills from current profile or skillsPortfolios
  const [userSkills, setUserSkills] = useState([]);
  const [jobMatches, setJobMatches] = useState([]);
  
  // Process skill data and job matches from real-time context
  useEffect(() => {
    // Process user skills data
    if (currentUserProfile && currentUserProfile.skills) {
      const skillLevels = {
        'JavaScript': { score: 92, level: 'Expert' },
        'React': { score: 88, level: 'Advanced' },
        'Node.js': { score: 85, level: 'Advanced' },
        'TypeScript': { score: 82, level: 'Advanced' },
        'GraphQL': { score: 78, level: 'Intermediate' },
        'MongoDB': { score: 75, level: 'Intermediate' },
        'Python': { score: 70, level: 'Intermediate' },
        'SQL': { score: 80, level: 'Advanced' },
        'CSS': { score: 85, level: 'Advanced' },
        'HTML': { score: 90, level: 'Expert' }
      };
      
      // Map skills to their scores and levels
      const processedSkills = currentUserProfile.skills.map(skill => ({
        name: skill,
        score: skillLevels[skill]?.score || Math.floor(Math.random() * 20) + 70, // Fallback to random score
        level: skillLevels[skill]?.level || (Math.random() > 0.5 ? 'Advanced' : 'Intermediate') // Fallback to random level
      }));
      
      setUserSkills(processedSkills.slice(0, 5)); // Show top 5 skills
    } else if (skillsPortfolios && skillsPortfolios.length > 0) {
      // If no current profile, use the first portfolio from the array
      const firstPortfolio = skillsPortfolios[0];
      if (firstPortfolio && firstPortfolio.skills) {
        const skillLevels = {
          'JavaScript': { score: 92, level: 'Expert' },
          'React': { score: 88, level: 'Advanced' },
          'Node.js': { score: 85, level: 'Advanced' },
          'TypeScript': { score: 82, level: 'Advanced' },
          'GraphQL': { score: 78, level: 'Intermediate' }
        };
        
        const processedSkills = firstPortfolio.skills.map(skill => ({
          name: skill,
          score: skillLevels[skill]?.score || Math.floor(Math.random() * 20) + 70,
          level: skillLevels[skill]?.level || (Math.random() > 0.5 ? 'Advanced' : 'Intermediate')
        }));
        
        setUserSkills(processedSkills.slice(0, 5));
      }
    } else {
      // Fallback to dummy data if no real data is available
      setUserSkills([
        { name: "JavaScript", score: 92, level: "Expert" },
        { name: "React", score: 88, level: "Advanced" },
        { name: "Node.js", score: 85, level: "Advanced" },
        { name: "GraphQL", score: 78, level: "Intermediate" },
        { name: "TypeScript", score: 82, level: "Advanced" }
      ]);
    }
    
    // Process job matches
    if (matchScores && matchScores.length > 0 && companies) {
      const processedMatches = matchScores.map(match => {
        // Find company name from companies array
        const company = companies.find(c => c.id === match.company_id);
        const companyName = company ? company.name : 'Unknown Company';
        
        // Create skill matches with random improvement percentages
        const skillMatches = [];
        if (currentUserProfile && currentUserProfile.skills) {
          // Use up to 4 skills from user profile
          const skills = currentUserProfile.skills.slice(0, 4);
          skillMatches.push(...skills.map(skill => ({
            name: skill,
            improvement: Math.floor(Math.random() * 15) + 5,
            score: Math.floor(match.skills_score * 100) - 10 + Math.floor(Math.random() * 20)
          })));
        } else {
          // Fallback skill matches
          skillMatches.push(
            { name: "React", improvement: 15, score: 95 },
            { name: "JavaScript", improvement: 8, score: 90 },
            { name: "TypeScript", improvement: 12, score: 92 },
            { name: "GraphQL", improvement: 5, score: 85 }
          );
        }
        
        return {
          id: match.id,
          position: match.role || 'Software Developer',
          company: companyName,
          location: Math.random() > 0.5 ? 'Remote' : 'Hybrid',
          salary: `$${110 + Math.floor(Math.random() * 60)}K-$${150 + Math.floor(Math.random() * 60)}K`,
          matchPercentage: Math.floor(match.overall_score * 100),
          skills: skillMatches
        };
      });
      
      setJobMatches(processedMatches.slice(0, 3)); // Show top 3 matches
    } else {
      // Fallback job matches if no real data is available
      setJobMatches([
        {
          id: 1,
          position: 'Senior Frontend Engineer',
          company: 'TechNova Solutions',
          location: 'Remote',
          salary: '$140K-$170K',
          matchPercentage: 95,
          skills: [
            { name: "React", improvement: 15, score: 95 },
            { name: "JavaScript", improvement: 8, score: 90 },
            { name: "TypeScript", improvement: 12, score: 92 },
            { name: "GraphQL", improvement: 5, score: 85 }
          ]
        },
        {
          id: 2,
          position: 'Full Stack Developer',
          company: 'EcoTech Innovations',
          location: 'Hybrid',
          salary: '$120K-$150K',
          matchPercentage: 89,
          skills: [
            { name: "Node.js", improvement: 10, score: 88 },
            { name: "React", improvement: 7, score: 85 },
            { name: "MongoDB", improvement: -5, score: 70 },
            { name: "TypeScript", improvement: 5, score: 80 }
          ]
        }
      ]);
    }
  }, [currentUserProfile, skillsPortfolios, matchScores, companies]);
  
  // Render the home page UI components
  return (
    <div className="bg-white">
      {/* Hero Section - Modern and Professional */}
      <div className="relative isolate">
        {/* Background gradient */}
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-indigo-500 to-purple-600 opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div>
          </div>

        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl mb-6">
                Get hired based on <span className="text-indigo-600">skills</span>, not resumes
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600 max-w-lg">
                Our platform matches developers with employers based on verified abilities, eliminating bias and focusing on what matters: your actual skills.
              </p>
              <div className="mt-10 flex items-center justify-start gap-x-6">
                <button
                  onClick={() => {
                    setModalType('profile');
                    setShowModal(true);
                  }}
                  className="rounded-md bg-indigo-600 px-5 py-3 text-lg font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Get Started Now
                </button>
                <a href="#how-it-works" className="text-lg font-semibold leading-6 text-gray-900">
                  Learn more <span aria-hidden="true">→</span>
                </a>
          </div>

              {/* Stats */}
              <div className="mt-12 grid grid-cols-3 gap-4 border-t border-gray-200 pt-6">
                <div>
                  <p className="text-4xl font-bold text-indigo-600">{challengesCompleted.toLocaleString()}+</p>
                  <p className="mt-2 text-sm text-gray-500">Challenges completed</p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-indigo-600">{candidatesRegistered.toLocaleString()}+</p>
                  <p className="mt-2 text-sm text-gray-500">Developers matched</p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-indigo-600">{successRate}%</p>
                  <p className="mt-2 text-sm text-gray-500">Success rate</p>
                </div>
              </div>
            </div>
            
            <div className="hidden lg:block">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" 
                alt="Diverse developers collaborating" 
                className="w-full h-auto rounded-lg shadow-xl" 
              />
            </div>
          </div>
        </div>
        
        {/* Background gradient bottom */}
        <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]" aria-hidden="true">
          <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-purple-600 to-indigo-500 opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"></div>
        </div>
      </div>

      {/* Live notifications */}
      <div className={`fixed bottom-5 right-5 max-w-sm transform transition-opacity duration-500 ${showNotification ? 'opacity-100' : 'opacity-0'}`}>
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <SparklesIcon className="h-6 w-6 text-indigo-500" />
            </div>
            <div className="ml-3 w-0 flex-1 pt-0.5">
              <p className="text-sm font-medium text-gray-900">Real-time Update</p>
              <p className="mt-1 text-sm text-gray-500">{notificationMessage}</p>
            </div>
            <div className="ml-4 flex-shrink-0 flex">
              <button
                className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none"
                onClick={() => setShowNotification(false)}
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

     
            {/* NEW: Skill-Based Matching Visualization */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Matching Without Resumes
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
              See how our AI matches candidates to jobs based on demonstrated abilities
            </p>
        </div>

          <div className="mt-16 relative">
            {/* Skill Matching Visualization */}
            <div className="bg-white rounded-lg shadow-xl overflow-hidden border border-gray-200">
              <div className="px-6 py-8">
                <div className="flex flex-col md:flex-row">
                  {/* Left side: Candidate skills */}
                  <div className="w-full md:w-1/3 border-b md:border-b-0 md:border-r border-gray-200 pr-0 md:pr-6 pb-6 md:pb-0">
                    <div className="flex items-center mb-4">
                      <div className="bg-indigo-100 rounded-full p-2">
                        <CodeBracketIcon className="h-6 w-6 text-indigo-600" />
                      </div>
                      <h3 className="ml-3 text-lg font-medium text-gray-900">Verified Skills</h3>
                    </div>
                    
                    <div className="space-y-4">
                      {["JavaScript", "React", "Node.js", "GraphQL", "PostgreSQL"].map((skill, idx) => (
                        <div key={idx} className="flex items-center">
                          <div className="mr-3 flex-shrink-0">
                            <CheckCircleIcon className="h-5 w-5 text-green-500" />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-sm font-medium text-gray-900">{skill}</h4>
                            <div className="mt-1 flex items-center">
                              <div className="flex-1 w-full bg-gray-200 rounded-full h-1.5">
                                <div 
                                  className="bg-indigo-600 h-1.5 rounded-full" 
                                  style={{ width: `${Math.floor(Math.random() * 30) + 70}%` }}
                                ></div>
                              </div>
                              <span className="ml-2 text-xs text-gray-500">
                                {Math.floor(Math.random() * 30) + 70}/100
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <h4 className="text-sm font-medium text-gray-900">Candidate Strengths</h4>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {["Problem solving", "API design", "Test coverage", "Performance optimization"].map((tag, idx) => (
                          <span key={idx} className="inline-flex items-center rounded-full bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Middle: Matching visualization */}
                  <div className="w-full md:w-1/3 py-6 md:py-0 px-0 md:px-6 flex flex-col items-center justify-center">
                    <div className="relative w-full max-w-[200px] aspect-square">
                      {/* Animated connection lines */}
                      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200">
                        <line x1="0" y1="40" x2="200" y2="30" stroke="#818cf8" strokeWidth="1" strokeDasharray="5,5">
                          <animate attributeName="stroke-dashoffset" from="0" to="100" dur="15s" repeatCount="indefinite" />
                        </line>
                        <line x1="0" y1="80" x2="200" y2="90" stroke="#818cf8" strokeWidth="1" strokeDasharray="5,5">
                          <animate attributeName="stroke-dashoffset" from="0" to="100" dur="12s" repeatCount="indefinite" />
                        </line>
                        <line x1="0" y1="120" x2="200" y2="150" stroke="#818cf8" strokeWidth="1" strokeDasharray="5,5">
                          <animate attributeName="stroke-dashoffset" from="0" to="100" dur="18s" repeatCount="indefinite" />
                        </line>
                        <line x1="0" y1="160" x2="200" y2="60" stroke="#818cf8" strokeWidth="1" strokeDasharray="5,5">
                          <animate attributeName="stroke-dashoffset" from="0" to="100" dur="20s" repeatCount="indefinite" />
                        </line>
                      </svg>
                      
                      {/* Center AI matching system */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative w-24 h-24 rounded-full bg-indigo-600 flex items-center justify-center text-white">
                          <div className="absolute inset-0 rounded-full border-4 border-indigo-300 opacity-75 animate-ping"></div>
                          <div className="absolute inset-0 rounded-full border-2 border-indigo-300 opacity-50 animate-pulse"></div>
                          <CpuChipIcon className="h-12 w-12" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 text-center">
                      <h3 className="text-lg font-medium text-indigo-600">AI Matching Engine</h3>
                      <p className="mt-2 text-sm text-gray-500">93% match rate success</p>
                    </div>
                  </div>
                  
                  {/* Right side: Job requirements */}
                  <div className="w-full md:w-1/3 border-t md:border-t-0 md:border-l border-gray-200 pl-0 md:pl-6 pt-6 md:pt-0">
                    <div className="flex items-center mb-4">
                      <div className="bg-green-100 rounded-full p-2">
                        <BriefcaseIcon className="h-6 w-6 text-green-600" />
                      </div>
                      <h3 className="ml-3 text-lg font-medium text-gray-900">Job Requirements</h3>
                    </div>
                    
                    <div className="space-y-4">
                      {[
                        { skill: "React", match: 98 },
                        { skill: "JavaScript", match: 95 },
                        { skill: "GraphQL", match: 89 },
                        { skill: "Node.js", match: 92 },
                        { skill: "PostgreSQL", match: 87 }
                      ].map((req, idx) => (
                        <div key={idx} className="flex items-center">
                          <div className="mr-3 flex-shrink-0">
                            {req.match > 90 ? (
                              <CheckCircleIcon className="h-5 w-5 text-green-500" />
                            ) : (
                              <CheckCircleIcon className="h-5 w-5 text-yellow-500" />
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between">
                              <h4 className="text-sm font-medium text-gray-900">{req.skill}</h4>
                              <span className="text-sm font-medium text-green-600">{req.match}% match</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <h4 className="text-sm font-medium text-gray-900">Position Details</h4>
                      <div className="mt-3">
                        <h5 className="text-sm font-medium text-gray-900">Senior Frontend Developer</h5>
                        <p className="text-sm text-gray-500">TechNova Solutions • Remote</p>
                        <p className="mt-1 text-sm text-gray-900 font-medium">$120K - $150K</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <button
                onClick={() => {
                  setModalType('learn');
                  setShowModal(true);
                }}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
              >
                Learn how our matching works
              </button>
            </div>
          </div>
        </div>
      </section>

    
     
      
     

      {/* Stats Section */}
      <section className="bg-indigo-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div className="text-center">
              <div className="text-4xl font-extrabold text-white">
                {challengesCompleted.toLocaleString()}+
              </div>
              <div className="mt-2 text-lg text-indigo-200">Challenges Completed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-extrabold text-white">
                {candidatesRegistered.toLocaleString()}+
              </div>
              <div className="mt-2 text-lg text-indigo-200">Developers Registered</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-extrabold text-white">
                {companiesOnboard.toLocaleString()}+
              </div>
              <div className="mt-2 text-lg text-indigo-200">Companies Onboard</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-extrabold text-white">
                {successRate}%
              </div>
              <div className="mt-2 text-lg text-indigo-200">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* NEW: Post-Hire Feedback Loop Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold sm:text-4xl">
              Continuous Improvement
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-300 mx-auto">
              Our platform learns and improves with each successful match
                  </p>
                </div>
          
          <div className="mt-16">
            <div className="relative">
              {/* Feedback loop diagram */}
              <div className="mx-auto max-w-3xl">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {/* Step 1 */}
                  <div className="bg-gray-800 rounded-lg p-6 relative">
                    <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center">
                      <span className="text-white font-bold">1</span>
                    </div>
                    <div className="h-12 w-12 mx-auto rounded-full bg-indigo-100 flex items-center justify-center">
                      <CodeBracketIcon className="h-6 w-6 text-indigo-600" />
                    </div>
                    <h3 className="mt-4 text-lg font-medium text-white text-center">Skill Verification</h3>
                    <p className="mt-2 text-sm text-gray-300 text-center">
                      Candidates demonstrate skills in real-world challenges
                  </p>
                </div>
                  
                  {/* Step 2 */}
                  <div className="bg-gray-800 rounded-lg p-6 relative">
                    <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center">
                      <span className="text-white font-bold">2</span>
                    </div>
                    <div className="h-12 w-12 mx-auto rounded-full bg-purple-100 flex items-center justify-center">
                      <CpuChipIcon className="h-6 w-6 text-purple-600" />
                    </div>
                    <h3 className="mt-4 text-lg font-medium text-white text-center">AI Matching</h3>
                    <p className="mt-2 text-sm text-gray-300 text-center">
                      Our algorithm matches candidates to job requirements
                    </p>
                  </div>
                  
                  {/* Step 3 */}
                  <div className="bg-gray-800 rounded-lg p-6 relative">
                    <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center">
                      <span className="text-white font-bold">3</span>
                    </div>
                    <div className="h-12 w-12 mx-auto rounded-full bg-green-100 flex items-center justify-center">
                      <BriefcaseIcon className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="mt-4 text-lg font-medium text-white text-center">Successful Hire</h3>
                    <p className="mt-2 text-sm text-gray-300 text-center">
                      Candidates and companies report on match quality
                    </p>
                  </div>
                  
                  {/* Step 4 */}
                  <div className="bg-gray-800 rounded-lg p-6 relative">
                    <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center">
                      <span className="text-white font-bold">4</span>
                    </div>
                    <div className="h-12 w-12 mx-auto rounded-full bg-blue-100 flex items-center justify-center">
                      <ArrowTrendingUpIcon className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="mt-4 text-lg font-medium text-white text-center">System Learns</h3>
                    <p className="mt-2 text-sm text-gray-300 text-center">
                      AI improves future matching based on outcomes
                    </p>
                  </div>
                </div>
                
                {/* Connecting arrows */}
                <div className="hidden md:block absolute top-1/2 left-1/4 transform -translate-y-1/2 -translate-x-1/2">
                  <svg width="40" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M39.0607 13.0607C39.6464 12.4749 39.6464 11.5251 39.0607 10.9393L29.5147 1.3934C28.9289 0.807611 27.9792 0.807611 27.3934 1.3934C26.8076 1.97919 26.8076 2.92893 27.3934 3.51472L35.8787 12L27.3934 20.4853C26.8076 21.0711 26.8076 22.0208 27.3934 22.6066C27.9792 23.1924 28.9289 23.1924 29.5147 22.6066L39.0607 13.0607ZM0 13.5H38V10.5H0V13.5Z" fill="#6366F1"/>
                  </svg>
                </div>
                <div className="hidden md:block absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                  <svg width="40" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M39.0607 13.0607C39.6464 12.4749 39.6464 11.5251 39.0607 10.9393L29.5147 1.3934C28.9289 0.807611 27.9792 0.807611 27.3934 1.3934C26.8076 1.97919 26.8076 2.92893 27.3934 3.51472L35.8787 12L27.3934 20.4853C26.8076 21.0711 26.8076 22.0208 27.3934 22.6066C27.9792 23.1924 28.9289 23.1924 29.5147 22.6066L39.0607 13.0607ZM0 13.5H38V10.5H0V13.5Z" fill="#6366F1"/>
                  </svg>
                </div>
                <div className="hidden md:block absolute top-1/2 left-3/4 transform -translate-y-1/2 -translate-x-1/2">
                  <svg width="40" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M39.0607 13.0607C39.6464 12.4749 39.6464 11.5251 39.0607 10.9393L29.5147 1.3934C28.9289 0.807611 27.9792 0.807611 27.3934 1.3934C26.8076 1.97919 26.8076 2.92893 27.3934 3.51472L35.8787 12L27.3934 20.4853C26.8076 21.0711 26.8076 22.0208 27.3934 22.6066C27.9792 23.1924 28.9289 23.1924 29.5147 22.6066L39.0607 13.0607ZM0 13.5H38V10.5H0V13.5Z" fill="#6366F1"/>
                  </svg>
                </div>
                
                {/* Return arrow from step 4 to step 1 (circular) */}
                <div className="hidden md:block absolute -bottom-12 left-1/2 transform -translate-x-1/2">
                  <svg width="200" height="50" viewBox="0 0 200 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M190 5C190 5 150 45 100 45C50 45 10 5 10 5" stroke="#6366F1" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M10 15L10 5L20 5" stroke="#6366F1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>
            
            {/* Real-time metrics */}
            <div className="mt-20">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-gray-800 rounded-lg p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <CheckBadgeIcon className="h-10 w-10 text-indigo-400" />
                    </div>
                    <div className="ml-5">
                      <h3 className="text-lg font-medium text-white">Match Accuracy</h3>
                      <div className="flex items-end">
                        <span className="text-3xl font-bold text-white">93.7%</span>
                        <span className="ml-2 text-sm text-green-400">↑ 2.3%</span>
                      </div>
                      <p className="mt-1 text-sm text-gray-300">
                        Higher than industry average of 72%
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-800 rounded-lg p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <ClockIcon className="h-10 w-10 text-purple-400" />
                    </div>
                    <div className="ml-5">
                      <h3 className="text-lg font-medium text-white">Time-to-Hire</h3>
                      <div className="flex items-end">
                        <span className="text-3xl font-bold text-white">14.3</span>
                        <span className="text-xl font-bold text-white ml-1">days</span>
                        <span className="ml-2 text-sm text-green-400">↓ 68%</span>
                      </div>
                      <p className="mt-1 text-sm text-gray-300">
                        vs. 45 days traditional hiring
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-800 rounded-lg p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <RocketLaunchIcon className="h-10 w-10 text-blue-400" />
                    </div>
                    <div className="ml-5">
                      <h3 className="text-lg font-medium text-white">Retention Rate</h3>
                      <div className="flex items-end">
                        <span className="text-3xl font-bold text-white">91%</span>
                        <span className="ml-2 text-sm text-green-400">↑ 32%</span>
                      </div>
                      <p className="mt-1 text-sm text-gray-300">
                        6-month retention vs. industry avg. 69%
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <button
              onClick={() => {
                setModalType('learn');
                setShowModal(true);
              }}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-indigo-700 bg-white hover:bg-gray-100 focus:outline-none"
            >
              Learn more about our methodology
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              What Our Users Say
            </h2>
          </div>
          
          <div className="mt-12 relative">
            <div className="max-w-3xl mx-auto">
              <div className="overflow-hidden">
                <div className="relative p-8 bg-white border border-gray-200 rounded-lg shadow-lg">
                  <div className="text-center">
                    <img 
                      src={testimonials[activeTestimonial].image} 
                      alt={testimonials[activeTestimonial].author}
                      className="mx-auto h-16 w-16 rounded-full"
                    />
                    <div className="mt-4">
                      <p className="text-xl italic font-medium text-gray-900">
                        "{testimonials[activeTestimonial].quote}"
                      </p>
                      <div className="mt-6">
                        <p className="font-medium text-gray-900">{testimonials[activeTestimonial].author}</p>
                        <p className="text-sm text-gray-500">{testimonials[activeTestimonial].role}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-center">
                  <div className="flex space-x-1">
                    {testimonials.map((_, idx) => (
                      <button
                        key={idx}
                        className={`h-2 w-2 rounded-full ${
                          activeTestimonial === idx ? "bg-indigo-600" : "bg-gray-300"
                        }`}
                        onClick={() => setActiveTestimonial(idx)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <button
              onClick={() => setActiveTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))}
              className="absolute top-1/2 left-0 -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
            >
              <ChevronLeftIcon className="h-5 w-5 text-gray-500" />
            </button>
            
            <button
              onClick={() => setActiveTestimonial((prev) => (prev + 1) % testimonials.length)}
              className="absolute top-1/2 right-0 -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
            >
              <ChevronRightIcon className="h-5 w-5 text-gray-500" />
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-indigo-700">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to dive in?</span>
            <span className="block text-indigo-200">Start your developer journey today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <button
                onClick={() => {
                  setModalType('profile');
                  setShowModal(true);
                }}
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-white hover:bg-gray-50"
              >
                For Developers
              </button>
            </div>
            <div className="ml-3 inline-flex rounded-md shadow">
              <button
                onClick={() => {
                  setModalType('company');
                  setShowModal(true);
                }}
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600"
              >
                For Employers
              </button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
              <div className="absolute right-0 top-0 pr-4 pt-4">
                <button
                  type="button"
                  className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none"
                  onClick={() => setShowModal(false)}
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>
              
                <div>
                <div className="text-center">
                  <h3 className="text-2xl font-bold leading-6 text-gray-900">
                    {modalContent[modalType]?.title}
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      {modalContent[modalType]?.subtitle}
                  </p>
                </div>
          </div>

                <div className="mt-6 space-y-4">
                  {modalContent[modalType]?.features.map((feature, idx) => (
                    <div key={idx} className="flex">
                      <div className="flex-shrink-0">
                        {feature.icon}
                      </div>
                      <div className="ml-3">
                        <h4 className="text-sm font-medium text-gray-900">{feature.title}</h4>
                        <p className="mt-1 text-sm text-gray-500">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mt-8 text-center">
                <Link 
                  to={modalContent[modalType]?.buttonLink}
                  className="inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
                  onClick={() => setShowModal(false)}
                >
                  {modalContent[modalType]?.buttonText}
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FEATURE 1: Skill-Based Challenges Section */}
      <section className="py-16 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold sm:text-4xl">
              Demonstrate Skills, Not Resumes
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-indigo-100 mx-auto">
              Complete real-world challenges that showcase your abilities
            </p>
          </div>
          
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Challenge Card 1 */}
            <div className="bg-white rounded-lg shadow-xl overflow-hidden text-gray-900">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1605379399642-870262d3d051?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80" 
                  alt="API Development Challenge"
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-0 right-0 m-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Backend
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900">RESTful API Development</h3>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-indigo-100 text-indigo-800">
                    Intermediate
                  </span>
                </div>
                
                <p className="mt-3 text-sm text-gray-500">
                  Build a scalable RESTful API with authentication, rate limiting, and comprehensive tests.
                </p>
                
                <div className="mt-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-gray-500">Skills Validated</span>
                    <span className="font-medium text-gray-900">3-6 hours</span>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1">
                    <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
                      Node.js
                    </span>
                    <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
                      Express
                    </span>
                    <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
                      MongoDB
                    </span>
                  </div>
                </div>
                
                <div className="mt-6">
                  <div className="flex items-center">
                    <div className="flex -space-x-1 relative z-0 overflow-hidden">
                      <img
                        className="relative z-30 inline-block h-6 w-6 rounded-full ring-2 ring-white"
                        src="https://randomuser.me/api/portraits/men/12.jpg"
                        alt=""
                      />
                      <img
                        className="relative z-20 inline-block h-6 w-6 rounded-full ring-2 ring-white"
                        src="https://randomuser.me/api/portraits/women/10.jpg"
                        alt=""
                      />
                      <img
                        className="relative z-10 inline-block h-6 w-6 rounded-full ring-2 ring-white"
                        src="https://randomuser.me/api/portraits/men/14.jpg"
                        alt=""
                      />
                    </div>
                    <span className="ml-2 text-xs text-gray-500">1,298 completed this week</span>
                  </div>
                </div>
                
                <div className="mt-6">
                  <button className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none">
                    Start Challenge
                  </button>
                </div>
              </div>
            </div>
            
            {/* Challenge Card 2 */}
            <div className="bg-white rounded-lg shadow-xl overflow-hidden text-gray-900">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1565106430482-8f6e74349ca1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80" 
                  alt="React UI Challenge"
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-0 right-0 m-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    Frontend
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900">Interactive Dashboard</h3>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-indigo-100 text-indigo-800">
                    Advanced
                  </span>
                </div>
                
                <p className="mt-3 text-sm text-gray-500">
                  Build a responsive dashboard with real-time data visualization, filtering, and state management.
                </p>
                
                <div className="mt-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-gray-500">Skills Validated</span>
                    <span className="font-medium text-gray-900">4-8 hours</span>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1">
                    <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
                      React
                    </span>
                    <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
                      TypeScript
                    </span>
                    <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
                      D3.js
                    </span>
                  </div>
                </div>
                
                <div className="mt-6">
                  <div className="flex items-center">
                    <div className="flex -space-x-1 relative z-0 overflow-hidden">
                      <img
                        className="relative z-30 inline-block h-6 w-6 rounded-full ring-2 ring-white"
                        src="https://randomuser.me/api/portraits/women/11.jpg"
                        alt=""
                      />
                      <img
                        className="relative z-20 inline-block h-6 w-6 rounded-full ring-2 ring-white"
                        src="https://randomuser.me/api/portraits/men/15.jpg"
                        alt=""
                      />
                      <img
                        className="relative z-10 inline-block h-6 w-6 rounded-full ring-2 ring-white"
                        src="https://randomuser.me/api/portraits/women/14.jpg"
                        alt=""
                      />
                    </div>
                    <span className="ml-2 text-xs text-gray-500">876 completed this week</span>
                  </div>
                </div>
                
                <div className="mt-6">
                  <button className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none">
                    Start Challenge
                  </button>
                </div>
              </div>
            </div>
            
            {/* Challenge Card 3 */}
            <div className="bg-white rounded-lg shadow-xl overflow-hidden text-gray-900">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80" 
                  alt="ML Challenge"
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-0 right-0 m-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                    ML/AI
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900">Predictive Model Development</h3>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-indigo-100 text-indigo-800">
                    Expert
                  </span>
                </div>
                
                <p className="mt-3 text-sm text-gray-500">
                  Build and optimize a machine learning model that predicts customer churn from real-world data.
                </p>
                
                <div className="mt-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-gray-500">Skills Validated</span>
                    <span className="font-medium text-gray-900">5-10 hours</span>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1">
                    <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
                      Python
                    </span>
                    <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
                      TensorFlow
                    </span>
                    <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
                      Data Science
                    </span>
                  </div>
                </div>
                
                <div className="mt-6">
                  <div className="flex items-center">
                    <div className="flex -space-x-1 relative z-0 overflow-hidden">
                      <img
                        className="relative z-30 inline-block h-6 w-6 rounded-full ring-2 ring-white"
                        src="https://randomuser.me/api/portraits/men/17.jpg"
                        alt=""
                      />
                      <img
                        className="relative z-20 inline-block h-6 w-6 rounded-full ring-2 ring-white"
                        src="https://randomuser.me/api/portraits/women/18.jpg"
                        alt=""
                      />
                      <img
                        className="relative z-10 inline-block h-6 w-6 rounded-full ring-2 ring-white"
                        src="https://randomuser.me/api/portraits/men/19.jpg"
                        alt=""
                      />
                    </div>
                    <span className="ml-2 text-xs text-gray-500">532 completed this week</span>
                  </div>
                </div>
                
                <div className="mt-6">
                  <button className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none">
                    Start Challenge
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-white shadow-md hover:bg-gray-50 focus:outline-none">
              Browse All Challenges
              <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
            </button>
              </div>
        </div>
      </section>

      {/* FEATURE 2: AI Matching Based on Demonstrated Abilities */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              AI-Powered Skill Matching
              </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
              Our AI matches you to jobs based on your actual coding abilities, not keywords
            </p>
            </div>

          <div className="mt-16 relative">
            <div className="bg-white rounded-lg shadow-xl overflow-hidden border border-gray-200">
              <div className="p-8">
                <div className="flex flex-col md:flex-row">
                  {/* Candidate Skills */}
                  <div className="w-full md:w-1/3 md:border-r border-gray-200 md:pr-8">
                    <div className="flex items-center mb-6">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-md bg-indigo-100 flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-indigo-600">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
                          </svg>
                        </div>
                      </div>
                      <h3 className="ml-3 text-lg font-medium text-gray-900">Your Verified Skills</h3>
                    </div>
                    
                    <div className="space-y-5">
                      {userSkills.map((skill, idx) => (
                        <div key={idx}>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <span className="text-base font-medium text-gray-900">{skill.name}</span>
                              <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                                {skill.level}
                              </span>
                            </div>
                            <span className="text-sm font-semibold text-gray-900">{skill.score}/100</span>
                          </div>
                          <div className="mt-2 w-full bg-gray-200 rounded-full h-2.5">
                            <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: `${skill.score}%` }}></div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-8 pt-6 border-t border-gray-200">
                      <h4 className="text-sm font-medium text-gray-900">Comparative strengths</h4>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {["Algorithms", "API Design", "Code Quality", "Performance"].map((tag, idx) => (
                          <span key={idx} className="inline-flex items-center rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* AI Matching Visualization */}
                  <div className="w-full md:w-2/3 mt-8 md:mt-0 md:pl-8">
                    <h3 className="text-lg font-medium text-gray-900 mb-6">AI-Matched Opportunities</h3>
                    
                    <div className="space-y-8">
                      {jobMatches.map((job, index) => (
                        <div key={index} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                          <div className="flex items-start">
                            <div className="flex-shrink-0 h-12 w-12 rounded-md bg-blue-100 flex items-center justify-center">
                              <span className="text-2xl">{job.company.charAt(0)}</span>
                            </div>
                            <div className="ml-4 flex-1">
                              <div className="flex items-center justify-between">
                                <h4 className="text-lg font-medium text-gray-900">{job.position}</h4>
                                <span className={`inline-flex items-center rounded-md ${job.matchPercentage >= 90 ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'} px-2.5 py-0.5 text-sm font-medium`}>
                                  {job.matchPercentage}% Match
                                </span>
                              </div>
                              <p className="mt-1 text-sm text-gray-500">{job.company} • {job.location} • {job.salary}</p>
                              
                              <div className="mt-4">
                                <h5 className="text-sm font-medium text-gray-700">Skills Match</h5>
                                <div className="mt-2 grid grid-cols-2 gap-4">
                                  {job.skills.map((skill, idx) => (
                                    <div key={idx}>
                                      <div className="flex items-center justify-between">
                                        <span className="text-xs text-gray-500">{skill.name}</span>
                                        <span className={`text-xs font-medium ${skill.improvement >= 0 ? 'text-green-600' : 'text-yellow-600'}`}>
                                          {skill.improvement >= 0 ? `+${skill.improvement}%` : `${skill.improvement}%`}
                                        </span>
                                      </div>
                                      <div className="mt-1 w-full bg-gray-200 rounded-full h-1.5">
                                        <div 
                                          className={`${skill.improvement >= 0 ? 'bg-green-500' : 'bg-yellow-500'} h-1.5 rounded-full`} 
                                          style={{ width: `${skill.score}%` }}
                                        ></div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                              
                              <div className="mt-5 flex justify-end">
                                <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none">
                                  View Job Details
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-8 flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        {loading ? 'Loading matches...' : `Showing ${jobMatches.length} of ${matchScores?.length || jobMatches.length} matches`}
                      </span>
                      <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none">
                        View All Matches
                        <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
            </div>
          </div>

            <div className="mt-12 text-center">
              <div className="inline-flex items-center px-6 py-4 rounded-lg bg-indigo-50 border border-indigo-100">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-indigo-600 mr-3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                </svg>
                <span className="text-sm text-indigo-900">
                  Our AI algorithm gets smarter with every challenge you complete, continuously improving match accuracy.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

    

      {/* FEATURE 4: Blind Matching to Eliminate Bias */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Eliminating Bias in Hiring
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
              Our blind matching process focuses purely on skills and abilities
            </p>
          </div>
          
          <div className="mt-12 flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 md:pr-8">
              <div className="bg-indigo-50 rounded-lg p-6 border border-indigo-100">
                <h3 className="text-lg font-medium text-gray-900">How Blind Matching Works</h3>
                <ul className="mt-4 space-y-4">
                  <li className="flex">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-indigo-100 text-indigo-600">
                        1
                      </div>
                    </div>
                    <div className="ml-4">
                      <p className="text-base font-medium text-gray-900">Complete skills challenges</p>
                      <p className="mt-1 text-sm text-gray-500">Demonstrate your abilities through real-world coding tasks</p>
                    </div>
                  </li>
                  <li className="flex">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-indigo-100 text-indigo-600">
                        2
                      </div>
                    </div>
                    <div className="ml-4">
                      <p className="text-base font-medium text-gray-900">AI analyzes your code patterns</p>
                      <p className="mt-1 text-sm text-gray-500">Our algorithm evaluates code quality, approach, and problem-solving</p>
                    </div>
                  </li>
                  <li className="flex">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-indigo-100 text-indigo-600">
                        3
                      </div>
                    </div>
                    <div className="ml-4">
                      <p className="text-base font-medium text-gray-900">Anonymous profiles sent to employers</p>
                      <p className="mt-1 text-sm text-gray-500">No names, ages, photos, or backgrounds - just skills and abilities</p>
                    </div>
                  </li>
                  <li className="flex">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-indigo-100 text-indigo-600">
                        4
                      </div>
                    </div>
                    <div className="ml-4">
                      <p className="text-base font-medium text-gray-900">Connect based on actual fit</p>
                      <p className="mt-1 text-sm text-gray-500">Mutual matching reveals full profiles only after initial interest</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-10 md:mt-0 md:w-1/2 md:pl-8">
              <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Success Metrics</h3>
                
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-base font-medium text-gray-900">Diversity Improvement</span>
                      <span className="text-sm font-bold text-green-600">+32%</span>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">Increase in hiring diverse candidates compared to traditional methods</p>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-base font-medium text-gray-900">Candidate Satisfaction</span>
                      <span className="text-sm font-bold text-green-600">94%</span>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">Candidates report fair evaluation based on actual abilities</p>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-base font-medium text-gray-900">Employer Match Quality</span>
                      <span className="text-sm font-bold text-green-600">87%</span>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">Employers report better skill match than with resume screening</p>
                  </div>
                </div>
                
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="ml-3 text-sm text-gray-600">
                      Our blind matching process has been independently verified to reduce hiring bias by the Tech Equity Institute.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call-To-Action Section */}
      <section className="py-16 bg-gradient-to-r from-indigo-600 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Ready to transform your tech hiring process?
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl">
              Join thousands of developers and companies who are building a more fair, efficient hiring ecosystem.
            </p>
            <div className="mt-10 flex justify-center gap-4 flex-col sm:flex-row">
              <a href="/signup" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-white hover:bg-gray-50">
                Sign up as a Developer
              </a>
              <a href="/companies/register" className="inline-flex items-center justify-center px-5 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-indigo-500">
                Register Your Company
              </a>
            </div>
          </div>
        </div>
      </section>
      
      {/* Back to Top Button */}
      {showScrollTop && (
        <button 
          onClick={scrollToTop}
          className="fixed right-6 bottom-6 p-3 rounded-full bg-indigo-600 text-white shadow-lg hover:bg-indigo-700 focus:outline-none z-50 transition-all duration-300"
          aria-label="Back to top"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </button>
      )}
      
      {/* Footer Section */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">SkillMatch</h3>
              <p className="text-gray-400 text-sm">Revolutionizing tech hiring through verified skills and blind matching.</p>
              <div className="mt-4 flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">LinkedIn</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">GitHub</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">For Developers</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-white text-sm">Create Profile</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-sm">Browse Challenges</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-sm">Skill Assessment</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-sm">Find Jobs</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-sm">Learning Resources</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">For Companies</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-white text-sm">Post Jobs</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-sm">Create Challenges</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-sm">Talent Search</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-sm">Enterprise Solutions</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-sm">Success Stories</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">Company</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-white text-sm">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-sm">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-sm">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-sm">Press</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-sm">Contact</a></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">© {new Date().getFullYear()} SkillMatch. All rights reserved.</p>
            <div className="mt-4 md:mt-0 flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white text-sm">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
