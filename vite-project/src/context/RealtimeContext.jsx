import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, subscribeToChanges, handleSupabaseError, isSupabaseConfigured as supabaseIsConfigured } from '../utils/supabaseClient';
import { toast } from 'react-hot-toast';

// Mock data for when Supabase is not configured
const MOCK_CHALLENGES = [
  {
    id: 1,
    title: "Frontend Development Challenge",
    description: "Build a responsive web application using React and Tailwind CSS",
    difficulty: "Medium",
    company: "TechCorp",
    skills: ["React", "Tailwind CSS", "JavaScript"],
    created_at: new Date().toISOString(),
    status: "open"
  },
  {
    id: 2,
    title: "Backend API Challenge",
    description: "Create a RESTful API using Node.js and Express",
    difficulty: "Hard",
    company: "ServerTech",
    skills: ["Node.js", "Express", "API Design"],
    created_at: new Date(Date.now() - 86400000).toISOString(),
    status: "open"
  }
];

const MOCK_COMPANIES = [
  { id: 1, name: "TechCorp", industry: "Technology", created_at: new Date().toISOString() },
  { id: 2, name: "ServerTech", industry: "Cloud Services", created_at: new Date().toISOString() }
];

// Empty array for notifications - we won't use mock notifications as requested
const MOCK_NOTIFICATIONS = [];

// Mock candidate portfolios and skills data
const MOCK_SKILLS_PORTFOLIOS = [
  {
    id: 1,
    user_id: 'mock-user',
    skills: ['JavaScript', 'React', 'Node.js', 'TypeScript', 'GraphQL'],
    challenges_completed: 7,
    endorsements: 4,
    visibility: 'public',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

// Mock match scores for demonstration
const MOCK_MATCH_SCORES = [
  {
    id: 1,
    user_id: 'mock-user',
    company_id: 1,
    role: 'Frontend Developer',
    skills_score: 0.85,
    culture_score: 0.72,
    overall_score: 0.79,
    matched_at: new Date().toISOString()
  },
  {
    id: 2,
    user_id: 'mock-user',
    company_id: 2,
    role: 'Backend Developer',
    skills_score: 0.68,
    culture_score: 0.80,
    overall_score: 0.74,
    matched_at: new Date().toISOString()
  }
];

// Mock feedback data
const MOCK_FEEDBACK = [
  {
    id: 1,
    user_id: 'mock-user',
    challenge_id: 1,
    score: 87,
    strengths: ['UI Design', 'Component Architecture'],
    areas_to_improve: ['Performance Optimization'],
    created_at: new Date().toISOString()
  }
];

// Create context
const RealtimeContext = createContext();

// Provider component
export function RealtimeProvider({ children }) {
  const [challenges, setChallenges] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [userStatus, setUserStatus] = useState({});
  const [isSupabaseConfigured, setIsSupabaseConfigured] = useState(supabaseIsConfigured);
  
  // New state for enhanced features
  const [skillsPortfolios, setSkillsPortfolios] = useState([]);
  const [matchScores, setMatchScores] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [currentUserProfile, setCurrentUserProfile] = useState(null);

  // Load initial data and setup subscriptions
  useEffect(() => {
    async function loadInitialData() {
      try {
        setLoading(true);

        // Check if Supabase is properly configured
        if (!isSupabaseConfigured) {
          console.warn('Supabase is not properly configured. Using mock data instead.');
          // Set mock data
          setChallenges(MOCK_CHALLENGES);
          setCompanies(MOCK_COMPANIES);
          setNotifications([]); // Empty array instead of MOCK_NOTIFICATIONS
          
          // Set mock data for new features
          setSkillsPortfolios(MOCK_SKILLS_PORTFOLIOS);
          setMatchScores(MOCK_MATCH_SCORES);
          setFeedback(MOCK_FEEDBACK);
          setLeaderboard(generateMockLeaderboard());
          setCurrentUserProfile(MOCK_SKILLS_PORTFOLIOS[0]);
          
          setLoading(false);
          toast.success('Using mock data');
          return;
        }
        
        // Fetch challenges
        const { data: challengesData, error: challengesError } = await supabase
          .from('challenges')
          .select('*')
          .order('created_at', { ascending: false });
          
        if (challengesError) throw handleSupabaseError(challengesError);
        setChallenges(challengesData || []);
        
        // Fetch companies
        const { data: companiesData, error: companiesError } = await supabase
          .from('companies')
          .select('*')
          .order('name', { ascending: true });
          
        if (companiesError) throw handleSupabaseError(companiesError);
        setCompanies(companiesData || []);
        
        // Fetch notifications
        const { data: notificationsData, error: notificationsError } = await supabase
          .from('notifications')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(10);
          
        if (notificationsError) throw handleSupabaseError(notificationsError);
        setNotifications(notificationsData || []);
        
        // Fetch skills portfolios
        const { data: portfoliosData, error: portfoliosError } = await supabase
          .from('skills_portfolios')
          .select('*')
          .order('updated_at', { ascending: false });
          
        if (portfoliosError) throw handleSupabaseError(portfoliosError);
        setSkillsPortfolios(portfoliosData || []);
        
        // Fetch match scores
        const { data: matchesData, error: matchesError } = await supabase
          .from('match_scores')
          .select('*')
          .order('matched_at', { ascending: false });
          
        if (matchesError) throw handleSupabaseError(matchesError);
        setMatchScores(matchesData || []);
        
        // Fetch feedback
        const { data: feedbackData, error: feedbackError } = await supabase
          .from('feedback')
          .select('*')
          .order('created_at', { ascending: false });
          
        if (feedbackError) throw handleSupabaseError(feedbackError);
        setFeedback(feedbackData || []);
        
        // Fetch current user profile
        const userId = await getCurrentUserId();
        const { data: userProfile, error: userProfileError } = await supabase
          .from('skills_portfolios')
          .select('*')
          .eq('user_id', userId)
          .single();
          
        if (!userProfileError) {
          setCurrentUserProfile(userProfile);
        }
        
        // Fetch leaderboard
        const { data: leaderboardData, error: leaderboardError } = await supabase
          .from('leaderboard')
          .select('*')
          .order('score', { ascending: false })
          .limit(10);
          
        if (!leaderboardError) {
          setLeaderboard(leaderboardData || []);
        } else {
          setLeaderboard(generateMockLeaderboard());
        }
        
        toast.success('Connected to real-time data');
      } catch (error) {
        console.error('Error loading initial data:', error);
       
        // Fall back to mock data on error
        setChallenges(MOCK_CHALLENGES);
        setCompanies(MOCK_COMPANIES);
        setNotifications([]); // Empty array instead of MOCK_NOTIFICATIONS
        
        // Set mock data for new features
        setSkillsPortfolios(MOCK_SKILLS_PORTFOLIOS);
        setMatchScores(MOCK_MATCH_SCORES);
        setFeedback(MOCK_FEEDBACK);
        setLeaderboard(generateMockLeaderboard());
        setCurrentUserProfile(MOCK_SKILLS_PORTFOLIOS[0]);
        
        setIsSupabaseConfigured(false);
      } finally {
        setLoading(false);
      }
    }
    
    // Generate mock leaderboard data
    function generateMockLeaderboard() {
      return Array.from({ length: 10 }, (_, i) => ({
        id: i + 1,
        username: `developer${i + 1}`,
        avatar: `https://randomuser.me/api/portraits/${i % 2 ? 'men' : 'women'}/${i + 1}.jpg`,
        score: Math.floor(Math.random() * 5000) + 5000,
        challenges_completed: Math.floor(Math.random() * 30) + 10,
        rank: i + 1
      }));
    }
    
    loadInitialData();
    
    // Only set up subscriptions if Supabase is properly configured
    if (isSupabaseConfigured) {
      // Set up real-time subscriptions
      const challengesSubscription = subscribeToChanges('challenges', (payload) => {
        if (payload.eventType === 'INSERT') {
          setChallenges(prev => [payload.new, ...prev]);
        } else if (payload.eventType === 'UPDATE') {
          setChallenges(prev => 
            prev.map(item => item.id === payload.new.id ? payload.new : item)
          );
        } else if (payload.eventType === 'DELETE') {
          setChallenges(prev => 
            prev.filter(item => item.id !== payload.old.id)
          );
        }
      });
      
      const companiesSubscription = subscribeToChanges('companies', (payload) => {
        if (payload.eventType === 'INSERT') {
          setCompanies(prev => [...prev, payload.new].sort((a, b) => a.name.localeCompare(b.name)));
        } else if (payload.eventType === 'UPDATE') {
          setCompanies(prev => 
            prev.map(item => item.id === payload.new.id ? payload.new : item)
              .sort((a, b) => a.name.localeCompare(b.name))
          );
        } else if (payload.eventType === 'DELETE') {
          setCompanies(prev => 
            prev.filter(item => item.id !== payload.old.id)
          );
        }
      });
      
      const notificationsSubscription = subscribeToChanges('notifications', (payload) => {
        if (payload.eventType === 'INSERT') {
          setNotifications(prev => [payload.new, ...prev.slice(0, 9)]);
          toast(`${payload.new.title}`, {
            description: payload.new.message,
            icon: '🔔',
          });
        }
      });
      
      // New subscriptions for enhanced features
      const portfoliosSubscription = subscribeToChanges('skills_portfolios', (payload) => {
        if (payload.eventType === 'INSERT' || payload.eventType === 'UPDATE') {
          setSkillsPortfolios(prev => {
            const exists = prev.some(item => item.id === payload.new.id);
            if (exists) {
              return prev.map(item => item.id === payload.new.id ? payload.new : item);
            } else {
              return [payload.new, ...prev];
            }
          });
          
          // Update current user profile if it's theirs
          getCurrentUserId().then(userId => {
            if (payload.new.user_id === userId) {
              setCurrentUserProfile(payload.new);
            }
          });
        }
      });
      
      const matchesSubscription = subscribeToChanges('match_scores', (payload) => {
        if (payload.eventType === 'INSERT') {
          setMatchScores(prev => [payload.new, ...prev]);
          
          // Show a notification for new matches
          getCurrentUserId().then(userId => {
            if (payload.new.user_id === userId) {
              const matchedCompany = companies.find(c => c.id === payload.new.company_id);
              if (matchedCompany) {
                toast('New Match!', {
                  description: `You matched with ${matchedCompany.name} (${Math.round(payload.new.overall_score * 100)}% match)`,
                  icon: '✨',
                });
              }
            }
          });
        } else if (payload.eventType === 'UPDATE') {
          setMatchScores(prev => prev.map(item => item.id === payload.new.id ? payload.new : item));
        }
      });
      
      const feedbackSubscription = subscribeToChanges('feedback', (payload) => {
        if (payload.eventType === 'INSERT') {
          setFeedback(prev => [payload.new, ...prev]);
          
          // Show a notification for new feedback
          getCurrentUserId().then(userId => {
            if (payload.new.user_id === userId) {
              const relatedChallenge = challenges.find(c => c.id === payload.new.challenge_id);
              toast('New Feedback', {
                description: `You received feedback for "${relatedChallenge?.title || 'a challenge'}"`,
                icon: '📝',
              });
            }
          });
        }
      });
      
      const leaderboardSubscription = subscribeToChanges('leaderboard', (payload) => {
        if (payload.eventType === 'UPDATE') {
          setLeaderboard(prev => 
            prev.map(item => item.id === payload.new.id ? payload.new : item)
              .sort((a, b) => b.score - a.score)
          );
        }
      });
      
      // Add a simulated user for demo purposes
      setUserStatus({
        'demo-user': { user_id: 'demo-user', online_at: new Date().toISOString() }
      });
      
      // Cleanup subscriptions
      return () => {
        challengesSubscription?.unsubscribe();
        companiesSubscription?.unsubscribe();
        notificationsSubscription?.unsubscribe();
        portfoliosSubscription?.unsubscribe();
        matchesSubscription?.unsubscribe();
        feedbackSubscription?.unsubscribe();
        leaderboardSubscription?.unsubscribe();
      };
    } else {
      // For mock data, simulate a user being online
      setUserStatus({
        'mock-user': { user_id: 'mock-user', online_at: new Date().toISOString() }
      });
      
      // Simulate real-time updates for mock data
      const mockUpdatesInterval = setInterval(() => {
        // Randomly update match scores
        if (Math.random() > 0.7) {
          const updatedScores = [...matchScores];
          const randomIndex = Math.floor(Math.random() * updatedScores.length);
          if (updatedScores[randomIndex]) {
            updatedScores[randomIndex] = {
              ...updatedScores[randomIndex],
              skills_score: Math.min(1, updatedScores[randomIndex].skills_score + (Math.random() * 0.1 - 0.05)),
              overall_score: Math.min(1, updatedScores[randomIndex].overall_score + (Math.random() * 0.1 - 0.05)),
              matched_at: new Date().toISOString()
            };
            setMatchScores(updatedScores);
            
            // Show a notification
            toast('Match Score Updated', {
              description: `Your match with ${companies.find(c => c.id === updatedScores[randomIndex].company_id)?.name || 'a company'} has been updated`,
              icon: '📊',
            });
          }
        }
      }, 45000); // Every 45 seconds
      
      return () => clearInterval(mockUpdatesInterval);
    }
  }, [isSupabaseConfigured, challenges, companies]);
  
  // Helper to get current user ID
  async function getCurrentUserId() {
    try {
      if (!isSupabaseConfigured) {
        return 'mock-user';
      }
      
      const { data } = await supabase.auth.getUser();
      return data?.user?.id || 'anonymous-user';
    } catch (error) {
      console.error('Error getting current user:', error);
      return 'error-user';
    }
  }
  
  // Update a challenge with real-time notifications
  const updateChallenge = async (id, updates) => {
    try {
      // If Supabase is not configured, simulate an update
      if (!isSupabaseConfigured) {
        // Simulate a delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Update local state
        setChallenges(prev => 
          prev.map(item => item.id === id ? { ...item, ...updates } : item)
        );
        
        return { data: { id, ...updates }, error: null };
      }
      
      // Otherwise use Supabase
      const { data, error } = await supabase
        .from('challenges')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
        
      if (error) throw handleSupabaseError(error);
      
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  };
  
  // Create or update a skills portfolio
  const updateSkillsPortfolio = async (updates) => {
    try {
      const userId = await getCurrentUserId();
      
      // If Supabase is not configured, simulate an update
      if (!isSupabaseConfigured) {
        // Simulate a delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Create a mock update
        const updatedPortfolio = {
          ...MOCK_SKILLS_PORTFOLIOS[0],
          ...updates,
          user_id: userId,
          updated_at: new Date().toISOString()
        };
        
        // Update local state
        setCurrentUserProfile(updatedPortfolio);
        setSkillsPortfolios(prev => 
          prev.map(item => item.user_id === userId ? updatedPortfolio : item)
        );
        
        toast.success('Profile updated');
        return { data: updatedPortfolio, error: null };
      }
      
      // First check if profile exists
      const { data: existingProfile } = await supabase
        .from('skills_portfolios')
        .select('*')
        .eq('user_id', userId)
        .single();
      
      let result;
      
      if (existingProfile) {
        // Update existing profile
        result = await supabase
          .from('skills_portfolios')
          .update({
            ...updates,
            updated_at: new Date().toISOString()
          })
          .eq('id', existingProfile.id)
          .select()
          .single();
      } else {
        // Create new profile
        result = await supabase
          .from('skills_portfolios')
          .insert({
            user_id: userId,
            ...updates,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          })
          .select()
          .single();
      }
      
      if (result.error) throw handleSupabaseError(result.error);
      
      // Update local state
      setCurrentUserProfile(result.data);
      
      toast.success('Profile updated');
      return { data: result.data, error: null };
    } catch (error) {
      toast.error('Failed to update profile');
      return { data: null, error };
    }
  };
  
  // Submit challenge results and generate match scores
  const submitChallengeResults = async (challengeId, results) => {
    try {
      const userId = await getCurrentUserId();
      
      // If Supabase is not configured, simulate submission
      if (!isSupabaseConfigured) {
        // Simulate a delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Create mock feedback
        const newFeedback = {
          id: Math.max(0, ...feedback.map(f => f.id)) + 1,
          user_id: userId,
          challenge_id: challengeId,
          score: results.score || Math.floor(Math.random() * 30) + 70,
          strengths: results.strengths || ['Code Quality', 'Problem Solving'],
          areas_to_improve: results.areas_to_improve || ['Optimization'],
          created_at: new Date().toISOString()
        };
        
        // Update local state
        setFeedback(prev => [newFeedback, ...prev]);
        
        // Generate new matches based on results
        const challengeCompleted = challenges.find(c => c.id === challengeId);
        if (challengeCompleted) {
          const newMatches = companies
            .filter(company => Math.random() > 0.5) // Randomly match with some companies
            .map((company, index) => {
              const skillScore = Math.random() * 0.3 + 0.7; // 0.7-1.0
              const cultureScore = Math.random() * 0.3 + 0.6; // 0.6-0.9
              return {
                id: Math.max(0, ...matchScores.map(m => m.id)) + index + 1,
                user_id: userId,
                company_id: company.id,
                role: `${challengeCompleted.skills[0]} Developer`,
                skills_score: skillScore,
                culture_score: cultureScore,
                overall_score: (skillScore * 0.7) + (cultureScore * 0.3),
                matched_at: new Date().toISOString()
              };
            });
          
          if (newMatches.length > 0) {
            setMatchScores(prev => [...newMatches, ...prev]);
            
            // Show notification for new matches
            toast.success(`You matched with ${newMatches.length} companies!`);
          }
        }
        
        // Update user profile
        const updatedProfile = {
          ...currentUserProfile,
          challenges_completed: (currentUserProfile?.challenges_completed || 0) + 1,
          updated_at: new Date().toISOString()
        };
        setCurrentUserProfile(updatedProfile);
        
        toast.success('Challenge completed!');
        return { success: true, feedback: newFeedback };
      }
      
      // TODO: Implement Supabase version
      
      return { success: true };
    } catch (error) {
      toast.error('Failed to submit results');
      return { success: false, error };
    }
  };
  
  // Context value
  const value = {
    challenges,
    companies,
    loading,
    notifications,
    userStatus,
    updateChallenge,
    isSupabaseConfigured,
    // New features
    skillsPortfolios,
    matchScores,
    feedback,
    leaderboard,
    currentUserProfile,
    updateSkillsPortfolio,
    submitChallengeResults,
    // Expose supabase client for custom queries
    supabase,
  };
  
  return (
    <RealtimeContext.Provider value={value}>
      {children}
    </RealtimeContext.Provider>
  );
}

// Hook to use the context
export function useRealtime() {
  const context = useContext(RealtimeContext);
  if (context === undefined) {
    throw new Error('useRealtime must be used within a RealtimeProvider');
  }
  return context;
} 