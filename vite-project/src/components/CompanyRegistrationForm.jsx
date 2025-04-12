import React, { useState, useEffect } from "react";
import { XMarkIcon, CheckIcon, BuildingOfficeIcon, ChartBarIcon } from "@heroicons/react/24/outline";

function CompanyRegistrationForm({ onSave, onCancel }) {
  const [formData, setFormData] = useState({
    name: "",
    industry: "",
    size: "",
    location: "",
    email: "",
    website: "",
    description: ""
  });
  const [submitLoading, setSubmitLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [mounted, setMounted] = useState(false);
  const [jobPositions, setJobPositions] = useState([]);
  const [newPosition, setNewPosition] = useState({ title: "", department: "", level: "", remote: false });
  const [stats, setStats] = useState({
    averageTimeToHire: "10 days",
    candidateQuality: "85%",
    openPositions: 0,
    potentialMatches: 0
  });

  useEffect(() => {
    setMounted(true);
    
    // Simulate real-time stat updates
    const updateStatsInterval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        potentialMatches: Math.floor(Math.random() * 10) + 10,
        openPositions: jobPositions.length
      }));
    }, 3000);
    
    return () => clearInterval(updateStatsInterval);
  }, [jobPositions.length]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePositionChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewPosition(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const addJobPosition = () => {
    // Validate required fields
    if (!newPosition.title || !newPosition.department) return;
    
    const position = {
      ...newPosition,
      id: Date.now(),
      createdAt: new Date().toISOString()
    };
    
    setJobPositions(prev => [...prev, position]);
    
    // Reset form
    setNewPosition({ title: "", department: "", level: "", remote: false });
    
    // Update stats immediately
    setStats(prev => ({
      ...prev,
      openPositions: jobPositions.length + 1,
      potentialMatches: Math.floor(Math.random() * 10) + 20
    }));
  };

  const removePosition = (id) => {
    setJobPositions(prev => prev.filter(item => item.id !== id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    
    // Combine formData with positions
    const completeData = {
      ...formData,
      jobPositions,
      stats
    };
    
    // Simulate saving to backend
    setTimeout(() => {
      localStorage.setItem('companyData', JSON.stringify(completeData));
      onSave(completeData);
      setSubmitLoading(false);
    }, 1500);
  };

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">
        Join as a Company
      </h2>
      
      {/* Progress indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex flex-col items-center">
              <div 
                className={`w-10 h-10 flex items-center justify-center rounded-full ${
                  step < currentStep 
                    ? 'bg-purple-600 text-white' 
                    : step === currentStep 
                    ? 'bg-purple-100 text-purple-600 border-2 border-purple-600' 
                    : 'bg-gray-100 text-gray-400'
                }`}
              >
                {step < currentStep ? <CheckIcon className="h-5 w-5" /> : step}
              </div>
              <span className="text-xs mt-2 text-gray-500">
                {step === 1 ? 'Company Info' : step === 2 ? 'Job Positions' : 'Review'}
              </span>
            </div>
          ))}
        </div>
        <div className="relative mt-3">
          <div className="absolute left-0 top-1/2 h-1 bg-gray-200 w-full -translate-y-1/2"></div>
          <div 
            className="absolute left-0 top-1/2 h-1 bg-purple-600 -translate-y-1/2 transition-all duration-300"
            style={{ width: `${(currentStep - 1) * 50}%` }}  
          ></div>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Step 1: Company Information */}
        {currentStep === 1 && (
          <div className={`space-y-6 transition-all duration-500 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Company Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                id="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 shadow-sm px-3 py-2 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                placeholder="Your Company, Inc."
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-1">
                  Industry <span className="text-red-500">*</span>
                </label>
                <select
                  name="industry"
                  id="industry"
                  required
                  value={formData.industry}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 shadow-sm px-3 py-2 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                >
                  <option value="">Select Industry</option>
                  <option value="Technology">Technology</option>
                  <option value="Finance">Finance</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Education">Education</option>
                  <option value="Retail">Retail</option>
                  <option value="Manufacturing">Manufacturing</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="size" className="block text-sm font-medium text-gray-700 mb-1">
                  Company Size <span className="text-red-500">*</span>
                </label>
                <select
                  name="size"
                  id="size"
                  required
                  value={formData.size}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 shadow-sm px-3 py-2 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                >
                  <option value="">Select Size</option>
                  <option value="1-10">1-10 employees</option>
                  <option value="11-50">11-50 employees</option>
                  <option value="51-200">51-200 employees</option>
                  <option value="201-500">201-500 employees</option>
                  <option value="501-1000">501-1000 employees</option>
                  <option value="1000+">1000+ employees</option>
                </select>
              </div>
            </div>
            
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                Headquarters Location
              </label>
              <input
                type="text"
                name="location"
                id="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 shadow-sm px-3 py-2 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                placeholder="City, Country"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Business Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 shadow-sm px-3 py-2 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                  placeholder="contact@company.com"
                />
              </div>
              
              <div>
                <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
                  Company Website
                </label>
                <input
                  type="url"
                  name="website"
                  id="website"
                  value={formData.website}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 shadow-sm px-3 py-2 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                  placeholder="https://yourcompany.com"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Company Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                id="description"
                required
                rows="4"
                value={formData.description}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 shadow-sm px-3 py-2 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                placeholder="Tell potential candidates about your company culture, mission, and values..."
              ></textarea>
            </div>
          </div>
        )}
        
        {/* Step 2: Job Positions */}
        {currentStep === 2 && (
          <div className={`space-y-6 transition-all duration-500 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">
                Open Positions
              </h3>
              <span className="text-sm text-purple-600">
                Add the positions you're currently hiring for
              </span>
            </div>
            
            <div className="bg-purple-50 rounded-lg p-4 mb-6">
              <div className="flex items-center">
                <ChartBarIcon className="h-5 w-5 text-purple-600 mr-2" />
                <h4 className="text-sm font-medium text-purple-700">Real-time Hiring Statistics</h4>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-3">
                <div>
                  <div className="text-2xl font-bold text-purple-700">{stats.averageTimeToHire}</div>
                  <div className="text-xs text-gray-600">Average time to hire</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-700">{stats.candidateQuality}</div>
                  <div className="text-xs text-gray-600">Candidate quality</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-700">{stats.openPositions}</div>
                  <div className="text-xs text-gray-600">Open positions</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-700">{stats.potentialMatches}</div>
                  <div className="text-xs text-gray-600">Potential matches</div>
                </div>
              </div>
            </div>
            
            {/* Listed positions */}
            <div className="space-y-4">
              {jobPositions.map((position) => (
                <div key={position.id} className="p-4 border border-gray-200 rounded-md relative">
                  <button 
                    type="button"
                    onClick={() => removePosition(position.id)}
                    className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
                  >
                    <XMarkIcon className="h-5 w-5" />
                  </button>
                  
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-gray-900">{position.title}</h4>
                      <p className="text-sm text-gray-600">{position.department} • {position.level}</p>
                    </div>
                    {position.remote && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Remote
                      </span>
                    )}
                  </div>
                </div>
              ))}
              
              {jobPositions.length === 0 && (
                <div className="text-center py-10 border border-dashed border-gray-300 rounded-lg">
                  <BuildingOfficeIcon className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">No positions added yet. Start by adding your open positions.</p>
                </div>
              )}
            </div>
            
            {/* Add position form */}
            <div className="p-4 border border-gray-200 border-dashed rounded-md">
              <h4 className="font-medium text-gray-900 mb-4">Add a Position</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                    Job Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    value={newPosition.title}
                    onChange={handlePositionChange}
                    className="w-full rounded-md border border-gray-300 shadow-sm px-3 py-2 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                    placeholder="e.g. Frontend Developer"
                  />
                </div>
                
                <div>
                  <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">
                    Department
                  </label>
                  <input
                    type="text"
                    name="department"
                    id="department"
                    value={newPosition.department}
                    onChange={handlePositionChange}
                    className="w-full rounded-md border border-gray-300 shadow-sm px-3 py-2 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                    placeholder="e.g. Engineering"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="level" className="block text-sm font-medium text-gray-700 mb-1">
                    Experience Level
                  </label>
                  <select
                    name="level"
                    id="level"
                    value={newPosition.level}
                    onChange={handlePositionChange}
                    className="w-full rounded-md border border-gray-300 shadow-sm px-3 py-2 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                  >
                    <option value="">Select Level</option>
                    <option value="Entry Level">Entry Level</option>
                    <option value="Mid Level">Mid Level</option>
                    <option value="Senior">Senior</option>
                    <option value="Lead">Lead</option>
                    <option value="Manager">Manager</option>
                  </select>
                </div>
                
                <div className="flex items-center h-full pt-6">
                  <input
                    type="checkbox"
                    name="remote"
                    id="remote"
                    checked={newPosition.remote}
                    onChange={handlePositionChange}
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remote" className="ml-2 block text-sm text-gray-700">
                    Remote Position
                  </label>
                </div>
              </div>
              
              <button
                type="button"
                onClick={addJobPosition}
                disabled={!newPosition.title || !newPosition.department}
                className="px-4 py-2 bg-purple-100 text-purple-700 rounded-md hover:bg-purple-200 transition-colors text-sm inline-flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <CheckIcon className="h-4 w-4 mr-1" />
                Add Position
              </button>
            </div>
          </div>
        )}
        
        {/* Step 3: Review */}
        {currentStep === 3 && (
          <div className={`space-y-6 transition-all duration-500 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">
                Review Your Company Registration
              </h3>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6 space-y-4">
              <div>
                <h4 className="text-sm font-medium uppercase text-gray-500 tracking-wider mb-2">
                  Company Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Name</p>
                    <p className="font-medium">{formData.name || "Not provided"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Industry</p>
                    <p className="font-medium">{formData.industry || "Not provided"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Size</p>
                    <p className="font-medium">{formData.size || "Not provided"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-medium">{formData.location || "Not provided"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{formData.email || "Not provided"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Website</p>
                    <p className="font-medium">{formData.website || "Not provided"}</p>
                  </div>
                </div>
                
                <div className="mt-4">
                  <p className="text-sm text-gray-500">Description</p>
                  <p className="text-sm mt-1">{formData.description || "Not provided"}</p>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-4">
                <h4 className="text-sm font-medium uppercase text-gray-500 tracking-wider mb-2">
                  Open Positions ({jobPositions.length})
                </h4>
                
                {jobPositions.length > 0 ? (
                  <div className="space-y-2">
                    {jobPositions.map((position) => (
                      <div key={position.id} className="bg-white p-3 rounded border border-gray-200">
                        <p className="font-medium text-gray-900">{position.title}</p>
                        <div className="flex justify-between items-center mt-1">
                          <p className="text-sm text-gray-600">{position.department} • {position.level}</p>
                          {position.remote && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Remote
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">No positions added</p>
                )}
              </div>
              
              <div className="border-t border-gray-200 pt-4">
                <h4 className="text-sm font-medium uppercase text-gray-500 tracking-wider mb-2">
                  Hiring Statistics
                </h4>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-purple-50 p-3 rounded-lg text-center">
                    <div className="text-xl font-bold text-purple-700">{stats.averageTimeToHire}</div>
                    <div className="text-xs text-gray-600">Avg. hire time</div>
                  </div>
                  <div className="bg-purple-50 p-3 rounded-lg text-center">
                    <div className="text-xl font-bold text-purple-700">{stats.candidateQuality}</div>
                    <div className="text-xs text-gray-600">Hire quality</div>
                  </div>
                  <div className="bg-purple-50 p-3 rounded-lg text-center">
                    <div className="text-xl font-bold text-purple-700">{stats.openPositions}</div>
                    <div className="text-xs text-gray-600">Open positions</div>
                  </div>
                  <div className="bg-purple-50 p-3 rounded-lg text-center">
                    <div className="text-xl font-bold text-purple-700">{stats.potentialMatches}</div>
                    <div className="text-xs text-gray-600">Potential matches</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Form Actions */}
        <div className="flex justify-between space-x-4 pt-4 border-t border-gray-200">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={prevStep}
              className="px-6 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              Back
            </button>
          ) : (
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              Cancel
            </button>
          )}
          
          {currentStep < 3 ? (
            <button
              type="button"
              onClick={nextStep}
              className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              disabled={submitLoading}
              className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-70 flex items-center"
            >
              {submitLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Registering...
                </>
              ) : (
                'Complete Registration'
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default CompanyRegistrationForm; 