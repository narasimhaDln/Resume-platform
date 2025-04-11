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

const MOCK_NOTIFICATIONS = [
  { 
    id: 1, 
    title: "Welcome!", 
    message: "Welcome to the platform. This is using mock data since Supabase is not configured.", 
    created_at: new Date().toISOString(),
    read: false
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
          setNotifications(MOCK_NOTIFICATIONS);
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
        
        toast.success('Connected to real-time data');
      } catch (error) {
        console.error('Error loading initial data:', error);
        toast.error('Failed to load data. Using mock data instead.');
        // Fall back to mock data on error
        setChallenges(MOCK_CHALLENGES);
        setCompanies(MOCK_COMPANIES);
        setNotifications(MOCK_NOTIFICATIONS);
        setIsSupabaseConfigured(false);
      } finally {
        setLoading(false);
      }
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
      
      // Add a simulated user for demo purposes
      setUserStatus({
        'demo-user': { user_id: 'demo-user', online_at: new Date().toISOString() }
      });
      
      // Cleanup subscriptions
      return () => {
        challengesSubscription?.unsubscribe();
        companiesSubscription?.unsubscribe();
        notificationsSubscription?.unsubscribe();
      };
    } else {
      // For mock data, simulate a user being online
      setUserStatus({
        'mock-user': { user_id: 'mock-user', online_at: new Date().toISOString() }
      });
    }
  }, [isSupabaseConfigured]);
  
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
  
  // Context value
  const value = {
    challenges,
    companies,
    loading,
    notifications,
    userStatus,
    updateChallenge,
    isSupabaseConfigured,
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