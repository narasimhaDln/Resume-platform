/**
 * AI Matching Algorithm for Anti-Resume Platform
 * Implements skill-based matching, culture fit, and bias-free candidate evaluation
 */

/**
 * Calculate match score between a candidate's skills and a job role
 * @param {Array} candidateSkills - Array of candidate's skills and proficiency levels
 * @param {Array} jobSkills - Array of skills required for the job
 * @returns {Object} Match score details
 */
export function calculateSkillsMatch(candidateSkills, jobSkills) {
  if (!candidateSkills || !jobSkills || !candidateSkills.length || !jobSkills.length) {
    return { score: 0, matchedSkills: [], missingSkills: [...jobSkills] };
  }

  // Extract skill names for easier matching
  const candidateSkillNames = candidateSkills.map(skill => 
    typeof skill === 'string' ? skill.toLowerCase() : skill.name.toLowerCase()
  );
  
  const jobSkillNames = jobSkills.map(skill => 
    typeof skill === 'string' ? skill.toLowerCase() : skill.name.toLowerCase()
  );

  // Find matched skills
  const matchedSkills = jobSkillNames.filter(skill => 
    candidateSkillNames.includes(skill)
  );

  // Find missing skills
  const missingSkills = jobSkillNames.filter(skill => 
    !candidateSkillNames.includes(skill)
  );

  // Calculate raw score as percentage of matched skills
  const rawScore = matchedSkills.length / jobSkillNames.length;

  // Apply weighting to prioritize critical skills if they're marked
  const weightedScore = jobSkills.some(skill => skill.critical) 
    ? calculateWeightedScore(candidateSkills, jobSkills)
    : rawScore;

  return {
    score: weightedScore,
    matchedSkills,
    missingSkills
  };
}

/**
 * Calculate weighted score that prioritizes critical skills
 * @param {Array} candidateSkills - Candidate skills
 * @param {Array} jobSkills - Job skills with importance weights
 * @returns {number} Weighted match score (0-1)
 */
function calculateWeightedScore(candidateSkills, jobSkills) {
  // Extract skill names
  const candidateSkillNames = candidateSkills.map(skill => 
    typeof skill === 'string' ? skill.toLowerCase() : skill.name.toLowerCase()
  );
  
  // Calculate weighted score
  let totalWeight = 0;
  let matchedWeight = 0;
  
  jobSkills.forEach(skill => {
    const skillName = typeof skill === 'string' ? skill : skill.name;
    const weight = (typeof skill === 'object' && skill.weight) ? skill.weight : 1;
    const critical = (typeof skill === 'object' && skill.critical) || false;
    
    // Critical skills have double weight
    const effectiveWeight = critical ? weight * 2 : weight;
    totalWeight += effectiveWeight;
    
    // Check if candidate has this skill
    if (candidateSkillNames.includes(skillName.toLowerCase())) {
      matchedWeight += effectiveWeight;
    }
  });
  
  return totalWeight > 0 ? matchedWeight / totalWeight : 0;
}

/**
 * Calculate culture fit score 
 * @param {Object} candidateValues - Candidate work values and preferences
 * @param {Object} companyValues - Company culture and values
 * @returns {number} Culture fit score (0-1)
 */
export function calculateCultureFit(candidateValues, companyValues) {
  if (!candidateValues || !companyValues) {
    return 0;
  }
  
  // Key dimensions to compare
  const dimensions = [
    'workStyle', // remote, hybrid, in-office
    'pace', // fast-paced vs steady
    'structure', // structured vs flexible
    'teamSize', // small, medium, large teams
    'feedback', // frequent vs infrequent feedback
    'workLifeBalance', // work-life balance importance
    'learningOpportunities', // importance of learning
    'values' // core values alignment
  ];
  
  // Calculate matches across dimensions
  let totalScore = 0;
  let applicableDimensions = 0;
  
  dimensions.forEach(dim => {
    if (candidateValues[dim] !== undefined && companyValues[dim] !== undefined) {
      applicableDimensions++;
      
      // For simple string matches (exact matches = 1, no match = 0)
      if (typeof candidateValues[dim] === 'string' && typeof companyValues[dim] === 'string') {
        totalScore += candidateValues[dim].toLowerCase() === companyValues[dim].toLowerCase() ? 1 : 0;
      } 
      // For numeric ranges (0-100), calculate proximity
      else if (typeof candidateValues[dim] === 'number' && typeof companyValues[dim] === 'number') {
        const proximity = 1 - Math.abs(candidateValues[dim] - companyValues[dim]) / 100;
        totalScore += Math.max(0, proximity);
      }
      // For arrays (e.g., values), calculate overlap
      else if (Array.isArray(candidateValues[dim]) && Array.isArray(companyValues[dim])) {
        const candidateSet = new Set(candidateValues[dim].map(v => v.toLowerCase()));
        const companySet = new Set(companyValues[dim].map(v => v.toLowerCase()));
        const intersection = [...candidateSet].filter(v => companySet.has(v));
        const unionSize = candidateSet.size + companySet.size - intersection.length;
        
        totalScore += unionSize > 0 ? intersection.length / unionSize : 0;
      }
    }
  });
  
  return applicableDimensions > 0 ? totalScore / applicableDimensions : 0;
}

/**
 * Calculate overall match score combining skills match and culture fit
 * @param {Object} skillsMatch - Skills match score and details
 * @param {number} cultureScore - Culture fit score (0-1)
 * @param {Object} weights - Optional custom weights for skills vs culture
 * @returns {Object} Overall match details
 */
export function calculateOverallMatch(skillsMatch, cultureScore, weights = { skills: 0.7, culture: 0.3 }) {
  const skillsWeight = weights.skills || 0.7;
  const cultureWeight = weights.culture || 0.3;
  
  // Ensure weights sum to 1
  const totalWeight = skillsWeight + cultureWeight;
  const normalizedSkillsWeight = skillsWeight / totalWeight;
  const normalizedCultureWeight = cultureWeight / totalWeight;
  
  // Calculate overall score
  const overallScore = (skillsMatch.score * normalizedSkillsWeight) + 
                      (cultureScore * normalizedCultureWeight);
  
  return {
    overallScore,
    skillsScore: skillsMatch.score,
    cultureScore,
    matchedSkills: skillsMatch.matchedSkills,
    missingSkills: skillsMatch.missingSkills,
    // Convert to percentages for display
    percentages: {
      overall: Math.round(overallScore * 100),
      skills: Math.round(skillsMatch.score * 100),
      culture: Math.round(cultureScore * 100)
    }
  };
}

/**
 * Generate match recommendations between a candidate and all available jobs
 * @param {Object} candidateProfile - Full candidate profile with skills and values
 * @param {Array} availableJobs - List of available jobs with required skills
 * @returns {Array} Sorted list of job matches with scores
 */
export function generateMatchRecommendations(candidateProfile, availableJobs) {
  if (!candidateProfile || !availableJobs || !availableJobs.length) {
    return [];
  }
  
  const matches = availableJobs.map(job => {
    // Calculate skills match
    const skillsMatch = calculateSkillsMatch(
      candidateProfile.skills || [],
      job.requiredSkills || []
    );
    
    // Calculate culture fit if available
    const cultureScore = calculateCultureFit(
      candidateProfile.values || {},
      job.company?.values || {}
    );
    
    // Calculate overall match
    const matchDetails = calculateOverallMatch(skillsMatch, cultureScore);
    
    return {
      jobId: job.id,
      companyId: job.companyId,
      jobTitle: job.title,
      companyName: job.company?.name,
      match: matchDetails,
      created_at: new Date().toISOString()
    };
  });
  
  // Sort matches by overall score, descending
  return matches.sort((a, b) => b.match.overallScore - a.match.overallScore);
}

/**
 * Check if match is above threshold for automatic recommendation
 * @param {Object} match - Match details with scores
 * @param {number} threshold - Minimum score threshold (0-1)
 * @returns {boolean} True if match should be recommended
 */
export function isRecommendedMatch(match, threshold = 0.65) {
  return match && match.overallScore >= threshold;
}

export default {
  calculateSkillsMatch,
  calculateCultureFit,
  calculateOverallMatch,
  generateMatchRecommendations,
  isRecommendedMatch
}; 