import React, { useState, useEffect } from 'react';
import { useRealtime } from '../context/RealtimeContext';
import { 
  PuzzlePieceIcon, 
  PencilIcon, 
  PlusIcon, 
  CheckCircleIcon,
  CheckIcon,
  XMarkIcon,
  EyeIcon,
  EyeSlashIcon
} from '@heroicons/react/24/outline';

function SkillsPortfolio({ editable = true }) {
  const { currentUserProfile, updateSkillsPortfolio, loading, feedback } = useRealtime();
  const [isEditing, setIsEditing] = useState(false);
  const [newSkill, setNewSkill] = useState('');
  const [editedSkills, setEditedSkills] = useState([]);
  const [visibility, setVisibility] = useState('public');
  
  // Initialize edited skills from profile
  useEffect(() => {
    if (currentUserProfile?.skills) {
      setEditedSkills(currentUserProfile.skills);
      setVisibility(currentUserProfile.visibility || 'public');
    }
  }, [currentUserProfile]);
  
  // Handle adding a new skill
  const handleAddSkill = () => {
    if (!newSkill.trim()) return;
    
    // Add new skill to list
    setEditedSkills([...editedSkills, newSkill.trim()]);
    setNewSkill('');
  };
  
  // Handle removing a skill
  const handleRemoveSkill = (skillToRemove) => {
    setEditedSkills(editedSkills.filter(skill => skill !== skillToRemove));
  };
  
  // Handle saving changes
  const handleSave = async () => {
    // Update skills in database/context
    await updateSkillsPortfolio({
      skills: editedSkills,
      visibility: visibility
    });
    
    setIsEditing(false);
  };
  
  // Get endorsed skills (skills that have positive feedback)
  const endorsedSkills = React.useMemo(() => {
    if (!feedback || !feedback.length) return [];
    
    // Get skills mentioned in positive feedback
    const endorsed = new Set();
    feedback.forEach(item => {
      if (item.strengths && Array.isArray(item.strengths)) {
        item.strengths.forEach(strength => endorsed.add(strength));
      }
    });
    
    return Array.from(endorsed);
  }, [feedback]);
  
  // Check if a skill is endorsed
  const isEndorsed = (skill) => {
    return endorsedSkills.some(
      endorsed => endorsed.toLowerCase() === skill.toLowerCase()
    );
  };
  
  if (loading) {
    return (
      <div className="bg-white shadow rounded-lg p-6 animate-pulse">
        <div className="flex items-center mb-4">
          <div className="h-8 w-8 bg-indigo-100 rounded-full"></div>
          <div className="h-6 w-40 bg-gray-200 rounded ml-3"></div>
        </div>
        <div className="space-y-2 mt-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-8 bg-gray-200 rounded w-full"></div>
          ))}
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <PuzzlePieceIcon className="h-6 w-6 text-indigo-600 mr-2" />
          <h3 className="text-lg font-medium text-gray-900">Skills Portfolio</h3>
        </div>
        {editable && (
          <div>
            {isEditing ? (
              <div className="flex space-x-2">
                <button 
                  onClick={handleSave}
                  className="inline-flex items-center px-3 py-1.5 border border-transparent rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
                >
                  <CheckIcon className="h-4 w-4 mr-1" />
                  Save
                </button>
                <button 
                  onClick={() => {
                    setIsEditing(false);
                    // Reset to original skills
                    if (currentUserProfile?.skills) {
                      setEditedSkills(currentUserProfile.skills);
                    }
                  }}
                  className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
                >
                  <XMarkIcon className="h-4 w-4 mr-1" />
                  Cancel
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setIsEditing(true)}
                className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
              >
                <PencilIcon className="h-4 w-4 mr-1" />
                Edit Skills
              </button>
            )}
          </div>
        )}
      </div>
      
      {/* Skills list */}
      <div className="mb-6">
        {isEditing ? (
          <>
            <div className="flex items-center mb-4">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddSkill()}
                placeholder="Add a skill..."
                className="flex-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <button
                onClick={handleAddSkill}
                disabled={!newSkill.trim()}
                className="ml-2 inline-flex items-center px-3 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                <PlusIcon className="h-4 w-4" />
              </button>
            </div>
            
            {/* Editable skills list */}
            <div className="space-y-2">
              {editedSkills.length > 0 ? (
                editedSkills.map((skill, index) => (
                  <div 
                    key={index} 
                    className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-md"
                  >
                    <div>
                      <span className="text-gray-900">{skill}</span>
                      {isEndorsed(skill) && (
                        <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                          <CheckCircleIcon className="h-3 w-3 mr-1" />
                          Endorsed
                        </span>
                      )}
                    </div>
                    <button 
                      onClick={() => handleRemoveSkill(skill)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <XMarkIcon className="h-5 w-5" />
                    </button>
                  </div>
                ))
              ) : (
                <div className="text-center py-4 text-gray-500">
                  No skills added yet. Add your first skill above.
                </div>
              )}
            </div>
            
            {/* Visibility toggle */}
            <div className="mt-4 flex items-center">
              <span className="text-sm text-gray-600 mr-2">Portfolio visibility:</span>
              <div className="relative inline-block w-10 mr-2 align-middle select-none">
                <input
                  type="checkbox"
                  name="visibility"
                  id="visibility"
                  checked={visibility === 'public'}
                  onChange={() => setVisibility(visibility === 'public' ? 'private' : 'public')}
                  className="sr-only"
                />
                <label
                  htmlFor="visibility"
                  className={`block overflow-hidden h-6 rounded-full cursor-pointer transition-colors ${
                    visibility === 'public' ? 'bg-indigo-600' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`block h-6 w-6 rounded-full bg-white shadow transform transition-transform ${
                      visibility === 'public' ? 'translate-x-4' : 'translate-x-0'
                    }`}
                  ></span>
                </label>
              </div>
              <span className="text-sm text-gray-700">
                {visibility === 'public' ? (
                  <div className="flex items-center">
                    <EyeIcon className="h-4 w-4 mr-1" />
                    Public
                  </div>
                ) : (
                  <div className="flex items-center">
                    <EyeSlashIcon className="h-4 w-4 mr-1" />
                    Private
                  </div>
                )}
              </span>
            </div>
          </>
        ) : (
          <div className="space-y-2">
            {currentUserProfile?.skills && currentUserProfile.skills.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {currentUserProfile.skills.map((skill, index) => (
                  <div 
                    key={index} 
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800"
                  >
                    {skill}
                    {isEndorsed(skill) && (
                      <CheckCircleIcon className="h-4 w-4 ml-1 text-green-600" />
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <PuzzlePieceIcon className="h-12 w-12 mx-auto text-gray-300 mb-3" />
                <p>No skills in portfolio yet.</p>
                {editable && (
                  <button 
                    onClick={() => setIsEditing(true)}
                    className="mt-2 text-indigo-600 hover:text-indigo-500 font-medium"
                  >
                    Add Skills
                  </button>
                )}
              </div>
            )}
            
            {/* Display visibility status */}
            {currentUserProfile?.skills && currentUserProfile.skills.length > 0 && (
              <div className="mt-4 text-xs text-gray-500 flex items-center">
                {currentUserProfile.visibility === 'private' ? (
                  <>
                    <EyeSlashIcon className="h-3 w-3 mr-1" />
                    Private portfolio - only visible to you
                  </>
                ) : (
                  <>
                    <EyeIcon className="h-3 w-3 mr-1" />
                    Public portfolio - visible to potential employers
                  </>
                )}
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Stats summary */}
      {!isEditing && currentUserProfile && (
        <div className="grid grid-cols-3 gap-4 border-t border-gray-200 pt-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-indigo-600">
              {currentUserProfile.skills?.length || 0}
            </div>
            <div className="text-xs text-gray-500">Total Skills</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-indigo-600">
              {endorsedSkills.length}
            </div>
            <div className="text-xs text-gray-500">Endorsed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-indigo-600">
              {currentUserProfile.challenges_completed || 0}
            </div>
            <div className="text-xs text-gray-500">Challenges</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SkillsPortfolio; 