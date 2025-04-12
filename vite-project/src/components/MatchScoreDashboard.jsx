import React, { useState, useMemo } from 'react';
import { useRealtime } from '../context/RealtimeContext';
import { 
  ChartBarIcon, 
  BriefcaseIcon, 
  BuildingOfficeIcon,
  ChevronRightIcon,
  ArrowTrendingUpIcon
} from '@heroicons/react/24/outline';

function MatchScoreDashboard() {
  const { matchScores, companies, loading, currentUserProfile } = useRealtime();
  const [selectedMatch, setSelectedMatch] = useState(null);
  
  // Filter matches to only include the current user's and sort by score
  const userMatches = useMemo(() => {
    if (!matchScores) return [];
    
    return matchScores
      .sort((a, b) => b.overall_score - a.overall_score)
      .slice(0, 5); // Show top 5 matches
  }, [matchScores]);
  
  // Get company details for each match
  const matchesWithCompanies = useMemo(() => {
    return userMatches.map(match => {
      const company = companies.find(c => c.id === match.company_id) || { 
        name: 'Unknown Company',
        industry: 'Technology'
      };
      
      return {
        ...match,
        company
      };
    });
  }, [userMatches, companies]);
  
  if (loading) {
    return (
      <div className="bg-white shadow rounded-lg p-6 animate-pulse">
        <div className="flex items-center mb-4">
          <div className="h-8 w-8 bg-indigo-100 rounded-full"></div>
          <div className="h-6 w-40 bg-gray-200 rounded ml-3"></div>
        </div>
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
                <div className="ml-4">
                  <div className="h-4 w-24 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 w-16 bg-gray-200 rounded"></div>
                </div>
              </div>
              <div className="h-8 w-16 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  if (!matchesWithCompanies.length) {
    return (
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center mb-4">
          <ChartBarIcon className="h-6 w-6 text-indigo-600 mr-2" />
          <h3 className="text-lg font-medium text-gray-900">Match Score Dashboard</h3>
        </div>
        <div className="text-center py-6">
          <div className="mx-auto w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
            <BriefcaseIcon className="h-8 w-8 text-indigo-600" />
          </div>
          <p className="text-gray-600 mb-4">No matches found yet. Complete some challenges to start getting matched with companies.</p>
          <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none">
            View Challenges
            <ChevronRightIcon className="ml-2 h-4 w-4" />
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <ChartBarIcon className="h-6 w-6 text-indigo-600 mr-2" />
          <h3 className="text-lg font-medium text-gray-900">Match Score Dashboard</h3>
        </div>
        <span className="text-xs text-gray-500">
          Last updated: {new Date(matchesWithCompanies[0]?.matched_at || new Date()).toLocaleString()}
        </span>
      </div>
      
      {/* Top matching companies */}
      <div className="space-y-4 mb-6">
        {matchesWithCompanies.map((match) => (
          <div 
            key={match.id} 
            className={`flex justify-between items-center p-3 rounded-lg cursor-pointer transition-colors ${
              selectedMatch === match.id ? 'bg-indigo-50' : 'hover:bg-gray-50'
            }`}
            onClick={() => setSelectedMatch(selectedMatch === match.id ? null : match.id)}
          >
            <div className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl bg-${
                ['purple', 'blue', 'green', 'indigo'][match.company_id % 4]
              }-100`}>
                <BuildingOfficeIcon className="h-5 w-5 text-indigo-600" />
              </div>
              <div className="ml-4">
                <div className="font-medium text-gray-900">{match.company.name}</div>
                <div className="text-sm text-gray-500">{match.role || 'Multiple Positions'}</div>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-lg font-semibold text-indigo-600">
                {Math.round(match.overall_score * 100)}%
              </div>
              <div className="text-xs text-gray-500">match score</div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Detailed match view */}
      {selectedMatch && (() => {
        const match = matchesWithCompanies.find(m => m.id === selectedMatch);
        if (!match) return null;
        
        return (
          <div className="bg-indigo-50 p-4 rounded-lg">
            <h4 className="font-medium text-indigo-800 mb-3 flex items-center">
              <ArrowTrendingUpIcon className="h-4 w-4 mr-1" />
              Match Details: {match.company.name}
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
              <div>
                <div className="text-sm text-gray-600 mb-1">Skills Match</div>
                <div className="relative h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="absolute h-full bg-green-500 rounded-full" 
                    style={{ width: `${Math.round(match.skills_score * 100)}%` }}
                  ></div>
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-gray-500">Score</span>
                  <span className="text-xs font-medium">{Math.round(match.skills_score * 100)}%</span>
                </div>
              </div>
              
              <div>
                <div className="text-sm text-gray-600 mb-1">Culture Fit</div>
                <div className="relative h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="absolute h-full bg-blue-500 rounded-full" 
                    style={{ width: `${Math.round(match.culture_score * 100)}%` }}
                  ></div>
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-gray-500">Score</span>
                  <span className="text-xs font-medium">{Math.round(match.culture_score * 100)}%</span>
                </div>
              </div>
            </div>
            
            <div className="text-center mt-4">
              <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none">
                View Full Match Details
                <ChevronRightIcon className="ml-2 h-4 w-4" />
              </button>
            </div>
          </div>
        );
      })()}
      
      {/* Match info footer */}
      <div className="mt-4 flex items-center justify-between">
        <div className="text-xs text-gray-500">
          Matches are based on your skills profile and challenge results
        </div>
        <button className="text-xs text-indigo-600 hover:text-indigo-800 font-medium">
          Refresh Matches
        </button>
      </div>
    </div>
  );
}

export default MatchScoreDashboard; 