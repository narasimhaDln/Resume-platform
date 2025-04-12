import React, { useState, useEffect } from 'react';
import { BriefcaseIcon, CheckCircleIcon, ChartBarIcon } from '@heroicons/react/24/outline';

const SkillBasedMatching = ({ userSkills = [] }) => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [matchScore, setMatchScore] = useState(0);

  // Sample job data (in a real app this would come from an API)
  const availableJobs = [
    {
      id: 1,
      title: "Frontend Developer",
      company: "TechInnovate",
      requiredSkills: ["JavaScript", "React", "TypeScript"],
      location: "Remote",
    },
    {
      id: 2,
      title: "Full Stack Engineer",
      company: "DataSolutions",
      requiredSkills: ["Node.js", "React", "SQL"],
      location: "Hybrid",
    },
    {
      id: 3,
      title: "UI/UX Designer",
      company: "DesignHut",
      requiredSkills: ["UI/UX Design", "JavaScript", "React"],
      location: "Remote",
    },
  ];

  // Calculate match score based on skills
  useEffect(() => {
    // Simulate API call delay
    setLoading(true);
    
    setTimeout(() => {
      const calculatedMatches = availableJobs.map(job => {
        // Extract skill names from userSkills array
        const userSkillNames = userSkills.map(skill => skill.name);
        
        // Calculate match percentage based on required skills
        const skillMatchCount = job.requiredSkills.filter(skill => 
          userSkillNames.includes(skill)
        ).length;
        
        const matchPercentage = Math.round((skillMatchCount / job.requiredSkills.length) * 100);
        
        return {
          ...job,
          matchPercentage,
          skillsMatched: {
            matched: skillMatchCount,
            total: job.requiredSkills.length
          }
        };
      });
      
      // Sort by match percentage
      calculatedMatches.sort((a, b) => b.matchPercentage - a.matchPercentage);
      
      setMatches(calculatedMatches);
      
      // Calculate overall match score
      const avgMatchScore = calculatedMatches.length > 0 
        ? Math.round(calculatedMatches.reduce((sum, job) => sum + job.matchPercentage, 0) / calculatedMatches.length)
        : 0;
        
      setMatchScore(avgMatchScore);
      setLoading(false);
    }, 800);
  }, [userSkills]);

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
      {/* Overall match score */}
      <div className="mb-4 p-3 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Your Job Match Score</p>
            <div className="flex items-center">
              <h3 className="text-2xl font-bold text-indigo-600">{matchScore}%</h3>
            </div>
          </div>
          <div className="relative h-14 w-14">
            <svg className="h-14 w-14" viewBox="0 0 36 36">
              <path
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#E0E7FF"
                strokeWidth="3"
                strokeDasharray="100, 100"
              />
              <path
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#6366F1"
                strokeWidth="3"
                strokeDasharray={`${matchScore}, 100`}
              />
            </svg>
          </div>
        </div>
      </div>
      
      {/* Top job matches */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-sm font-semibold text-gray-900">Top Matches</h3>
          {!loading && (
            <span className="text-xs text-gray-500">
              {matches.length} jobs match your skills
            </span>
          )}
        </div>
        
        {loading ? (
          <div className="space-y-3">
            {[1, 2].map(i => (
              <div key={i} className="animate-pulse bg-gray-50 rounded-lg p-3">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {matches.slice(0, 2).map((job) => (
              <div 
                key={job.id} 
                className={`rounded-lg border p-3 transition-all duration-200 hover:shadow-sm ${
                  job.matchPercentage > 80 
                    ? 'border-green-200 bg-green-50' 
                    : job.matchPercentage > 60 
                      ? 'border-indigo-200 bg-indigo-50' 
                      : 'border-gray-200 bg-gray-50'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-gray-900 text-sm">{job.title}</h4>
                    <p className="text-xs text-gray-600">{job.company} • {job.location}</p>
                  </div>
                  <div className="px-2 py-1 bg-white rounded-full border border-gray-200 text-xs font-medium text-indigo-600">
                    {job.matchPercentage}% match
                  </div>
                </div>
                <div className="mt-2">
                  <div className="flex flex-wrap gap-1 mt-1">
                    {job.requiredSkills.map(skill => (
                      <span 
                        key={skill} 
                        className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                          userSkills.some(s => s.name === skill)
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {userSkills.some(s => s.name === skill) && (
                          <CheckCircleIcon className="h-3 w-3 mr-1" />
                        )}
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
            <button className="w-full mt-2 text-xs text-indigo-600 hover:text-indigo-800 font-medium">
              View all job matches →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SkillBasedMatching; 