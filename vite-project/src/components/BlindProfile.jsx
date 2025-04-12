import React, { useState } from 'react';
import { useRealtime } from '../context/RealtimeContext';
import { 
  UserCircleIcon, 
  ShieldCheckIcon, 
  CodeBracketIcon,
  PuzzlePieceIcon,
  CheckCircleIcon,
  LockClosedIcon,
  ArrowTopRightOnSquareIcon
} from '@heroicons/react/24/outline';

function BlindProfile({ userId, companyView = false }) {
  const { skillsPortfolios, feedback, matchScores, companies } = useRealtime();
  const [showIdentity, setShowIdentity] = useState(false);
  
  // Find user's portfolio
  const userPortfolio = skillsPortfolios.find(
    portfolio => portfolio.user_id === userId
  );
  
  // Get user's feedback from challenges
  const userFeedback = feedback.filter(
    item => item.user_id === userId
  );
  
  // Get user's match scores with companies
  const userMatches = matchScores.filter(
    match => match.user_id === userId
  );
  
  // Calculate strengths and areas to improve
  const strengths = React.useMemo(() => {
    if (!userFeedback || !userFeedback.length) return [];
    
    // Collect strengths from all feedback
    const strengthsMap = {};
    userFeedback.forEach(item => {
      if (item.strengths && Array.isArray(item.strengths)) {
        item.strengths.forEach(strength => {
          strengthsMap[strength] = (strengthsMap[strength] || 0) + 1;
        });
      }
    });
    
    // Convert to array and sort by frequency
    return Object.entries(strengthsMap)
      .map(([skill, count]) => ({ skill, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 3) // Top 3 strengths
      .map(item => item.skill);
  }, [userFeedback]);
  
  const areasToImprove = React.useMemo(() => {
    if (!userFeedback || !userFeedback.length) return [];
    
    // Collect areas to improve from all feedback
    const areasMap = {};
    userFeedback.forEach(item => {
      if (item.areas_to_improve && Array.isArray(item.areas_to_improve)) {
        item.areas_to_improve.forEach(area => {
          areasMap[area] = (areasMap[area] || 0) + 1;
        });
      }
    });
    
    // Convert to array and sort by frequency
    return Object.entries(areasMap)
      .map(([skill, count]) => ({ skill, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 3) // Top 3 areas
      .map(item => item.skill);
  }, [userFeedback]);
  
  // Calculate average score from feedback
  const averageScore = React.useMemo(() => {
    if (!userFeedback || !userFeedback.length) return 0;
    
    const totalScore = userFeedback.reduce((sum, item) => sum + (item.score || 0), 0);
    return Math.round(totalScore / userFeedback.length);
  }, [userFeedback]);
  
  // Get best company match
  const bestMatch = React.useMemo(() => {
    if (!userMatches || !userMatches.length) return null;
    
    const match = userMatches.sort((a, b) => b.overall_score - a.overall_score)[0];
    const company = companies.find(c => c.id === match.company_id);
    
    return {
      ...match,
      companyName: company?.name || 'Unknown Company'
    };
  }, [userMatches, companies]);
  
  if (!userPortfolio) {
    return (
      <div className="bg-white shadow rounded-lg p-6 text-center">
        <UserCircleIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500">Profile not found or private.</p>
      </div>
    );
  }
  
  const fullName = "Anonymous Candidate";
  const candidateId = `C-${userId.substring(0, 8)}`;
  
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      {/* Banner */}
      <div className="h-24 bg-gradient-to-r from-indigo-500 to-purple-600 relative">
        <div className="absolute -bottom-10 left-6">
          <div className="h-20 w-20 rounded-full bg-white p-1 shadow">
            <div className="h-full w-full rounded-full bg-indigo-100 flex items-center justify-center">
              {showIdentity ? (
                <img 
                  src={`https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${Math.floor(Math.random() * 70) + 1}.jpg`}
                  alt="Profile avatar"
                  className="h-full w-full rounded-full object-cover"
                />
              ) : (
                <UserCircleIcon className="h-12 w-12 text-indigo-600" />
              )}
            </div>
          </div>
        </div>
        
        {/* Blind profile badge */}
        <div className="absolute top-3 right-3">
          <div className="bg-white/90 rounded-full px-3 py-1 text-xs font-medium text-indigo-700 flex items-center shadow-sm">
            <ShieldCheckIcon className="h-3.5 w-3.5 mr-1" />
            Anonymized Profile
          </div>
        </div>
      </div>
      
      {/* Profile info */}
      <div className="pt-12 px-6 pb-6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              {showIdentity ? fullName : candidateId}
            </h2>
            <p className="text-sm text-gray-500">
              {userPortfolio.skills?.length || 0} verified skills • {userPortfolio.challenges_completed || 0} challenges completed
            </p>
          </div>
          
          {companyView && (
            <button
              onClick={() => setShowIdentity(!showIdentity)}
              className={`inline-flex items-center px-3 py-1.5 border rounded-md text-sm font-medium ${
                showIdentity 
                  ? 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50' 
                  : 'border-indigo-600 text-white bg-indigo-600 hover:bg-indigo-700'
              } focus:outline-none`}
            >
              {showIdentity ? (
                <>
                  <LockClosedIcon className="h-4 w-4 mr-1" />
                  Hide Identity
                </>
              ) : (
                <>
                  <ArrowTopRightOnSquareIcon className="h-4 w-4 mr-1" />
                  Reveal Identity
                </>
              )}
            </button>
          )}
        </div>
        
        {/* Skills section */}
        <div className="mt-6">
          <h3 className="text-sm font-medium text-gray-900 flex items-center">
            <PuzzlePieceIcon className="h-4 w-4 mr-1 text-indigo-500" />
            Verified Skills
          </h3>
          <div className="mt-2 flex flex-wrap gap-2">
            {userPortfolio.skills?.map((skill, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
              >
                {skill}
                {strengths.includes(skill) && (
                  <CheckCircleIcon className="h-3.5 w-3.5 ml-1 text-green-600" />
                )}
              </span>
            ))}
          </div>
        </div>
        
        {/* Strengths and weaknesses */}
        {(strengths.length > 0 || areasToImprove.length > 0) && (
          <div className="mt-6 grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-2">Key Strengths</h3>
              <ul className="space-y-1">
                {strengths.map((strength, index) => (
                  <li key={index} className="text-sm text-gray-600 flex items-start">
                    <CheckCircleIcon className="h-4 w-4 text-green-500 mr-1 mt-0.5 flex-shrink-0" />
                    <span>{strength}</span>
                  </li>
                ))}
                {strengths.length === 0 && (
                  <li className="text-sm text-gray-500 italic">No data available</li>
                )}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-2">Areas for Growth</h3>
              <ul className="space-y-1">
                {areasToImprove.map((area, index) => (
                  <li key={index} className="text-sm text-gray-600 flex items-start">
                    <CodeBracketIcon className="h-4 w-4 text-indigo-500 mr-1 mt-0.5 flex-shrink-0" />
                    <span>{area}</span>
                  </li>
                ))}
                {areasToImprove.length === 0 && (
                  <li className="text-sm text-gray-500 italic">No data available</li>
                )}
              </ul>
            </div>
          </div>
        )}
        
        {/* Performance stats */}
        <div className="mt-6">
          <div className="grid grid-cols-3 gap-4 bg-gray-50 rounded-lg p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-indigo-600">{averageScore}</div>
              <div className="text-xs text-gray-500">Avg. Score</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-indigo-600">
                {userPortfolio.challenges_completed || 0}
              </div>
              <div className="text-xs text-gray-500">Challenges</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-indigo-600">
                {userMatches.length}
              </div>
              <div className="text-xs text-gray-500">Matches</div>
            </div>
          </div>
        </div>
        
        {/* Best match */}
        {bestMatch && companyView && (
          <div className="mt-6 bg-green-50 rounded-lg p-4">
            <h3 className="text-sm font-medium text-green-800 flex items-center mb-2">
              <ShieldCheckIcon className="h-4 w-4 mr-1" />
              Match Quality
            </h3>
            <div className="flex justify-between items-center">
              <div>
                <div className="text-sm font-medium text-gray-900">
                  {Math.round(bestMatch.overall_score * 100)}% match with your company
                </div>
                <div className="text-xs text-gray-600">
                  Skills: {Math.round(bestMatch.skills_score * 100)}% • Culture: {Math.round(bestMatch.culture_score * 100)}%
                </div>
              </div>
              <button className="inline-flex items-center px-3 py-1.5 border border-transparent rounded-md text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none">
                Contact
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default BlindProfile; 