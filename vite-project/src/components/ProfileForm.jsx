import React, { useState, useEffect } from "react";
import { XMarkIcon, CheckIcon, UserCircleIcon } from "@heroicons/react/24/outline";

function ProfileForm({ initialData, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    bio: "",
    email: "",
    location: "",
    website: "",
    github: "",
    linkedin: "",
    education: [],
    experience: []
  });
  const [newEducation, setNewEducation] = useState({ institution: "", degree: "", field: "", from: "", to: "" });
  const [newExperience, setNewExperience] = useState({ company: "", position: "", description: "", from: "", to: "" });
  const [submitLoading, setSubmitLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        title: initialData.title || "",
        bio: initialData.bio || "",
        email: initialData.email || "",
        location: initialData.location || "",
        website: initialData.website || "",
        github: initialData.github || "",
        linkedin: initialData.linkedin || "",
        education: initialData.education || [],
        experience: initialData.experience || []
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEducationChange = (e) => {
    const { name, value } = e.target;
    setNewEducation(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleExperienceChange = (e) => {
    const { name, value } = e.target;
    setNewExperience(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addEducation = () => {
    // Validate required fields
    if (!newEducation.institution || !newEducation.degree) return;
    
    setFormData(prev => ({
      ...prev,
      education: [...prev.education, { ...newEducation, id: Date.now() }]
    }));
    
    // Reset form
    setNewEducation({ institution: "", degree: "", field: "", from: "", to: "" });
  };

  const addExperience = () => {
    // Validate required fields
    if (!newExperience.company || !newExperience.position) return;
    
    setFormData(prev => ({
      ...prev,
      experience: [...prev.experience, { ...newExperience, id: Date.now() }]
    }));
    
    // Reset form
    setNewExperience({ company: "", position: "", description: "", from: "", to: "" });
  };

  const removeEducation = (id) => {
    setFormData(prev => ({
      ...prev,
      education: prev.education.filter(item => item.id !== id)
    }));
  };

  const removeExperience = (id) => {
    setFormData(prev => ({
      ...prev,
      experience: prev.experience.filter(item => item.id !== id)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    
    // Simulate saving to backend
    setTimeout(() => {
      onSave(formData);
      setSubmitLoading(false);
    }, 1000);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">
        {initialData ? "Edit Your Profile" : "Create Your Profile"}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="space-y-4">
          <h3 className="text-md font-medium text-gray-700 border-b border-gray-200 pb-2">Basic Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                id="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 shadow-sm px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="John Doe"
              />
            </div>
            
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Professional Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                id="title"
                required
                value={formData.title}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 shadow-sm px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Full Stack Developer"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
              Professional Bio <span className="text-red-500">*</span>
            </label>
            <textarea
              name="bio"
              id="bio"
              required
              rows="4"
              value={formData.bio}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 shadow-sm px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Briefly describe your professional background, skills, and career goals..."
            ></textarea>
          </div>
        </div>
        
        {/* Contact Information */}
        <div className="space-y-4">
          <h3 className="text-md font-medium text-gray-700 border-b border-gray-200 pb-2">Contact Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 shadow-sm px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="johndoe@example.com"
              />
            </div>
            
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <input
                type="text"
                name="location"
                id="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 shadow-sm px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="City, Country"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
                Website
              </label>
              <input
                type="url"
                name="website"
                id="website"
                value={formData.website}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 shadow-sm px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="https://yourwebsite.com"
              />
            </div>
            
            <div>
              <label htmlFor="github" className="block text-sm font-medium text-gray-700 mb-1">
                GitHub
              </label>
              <input
                type="url"
                name="github"
                id="github"
                value={formData.github}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 shadow-sm px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="https://github.com/username"
              />
            </div>
            
            <div>
              <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700 mb-1">
                LinkedIn
              </label>
              <input
                type="url"
                name="linkedin"
                id="linkedin"
                value={formData.linkedin}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 shadow-sm px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="https://linkedin.com/in/username"
              />
            </div>
          </div>
        </div>
        
        {/* Education */}
        <div className="space-y-4">
          <h3 className="text-md font-medium text-gray-700 border-b border-gray-200 pb-2">Education</h3>
          
          {formData.education.map((edu) => (
            <div key={edu.id} className="p-4 border border-gray-200 rounded-md relative">
              <button 
                type="button"
                onClick={() => removeEducation(edu.id)}
                className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
              
              <div className="grid grid-cols-2 gap-4 mb-2">
                <div className="font-medium">{edu.institution}</div>
                <div className="text-gray-600 text-right">{edu.from} - {edu.to || "Present"}</div>
              </div>
              <div>{edu.degree} {edu.field && `in ${edu.field}`}</div>
            </div>
          ))}
          
          <div className="p-4 border border-gray-200 border-dashed rounded-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="institution" className="block text-sm font-medium text-gray-700 mb-1">
                  Institution
                </label>
                <input
                  type="text"
                  name="institution"
                  id="institution"
                  value={newEducation.institution}
                  onChange={handleEducationChange}
                  className="w-full rounded-md border border-gray-300 shadow-sm px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="University or College Name"
                />
              </div>
              
              <div>
                <label htmlFor="degree" className="block text-sm font-medium text-gray-700 mb-1">
                  Degree
                </label>
                <input
                  type="text"
                  name="degree"
                  id="degree"
                  value={newEducation.degree}
                  onChange={handleEducationChange}
                  className="w-full rounded-md border border-gray-300 shadow-sm px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="e.g. Bachelor's, Master's, PhD"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label htmlFor="field" className="block text-sm font-medium text-gray-700 mb-1">
                  Field of Study
                </label>
                <input
                  type="text"
                  name="field"
                  id="field"
                  value={newEducation.field}
                  onChange={handleEducationChange}
                  className="w-full rounded-md border border-gray-300 shadow-sm px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="e.g. Computer Science"
                />
              </div>
              
              <div>
                <label htmlFor="from" className="block text-sm font-medium text-gray-700 mb-1">
                  From (Year)
                </label>
                <input
                  type="text"
                  name="from"
                  id="from"
                  value={newEducation.from}
                  onChange={handleEducationChange}
                  className="w-full rounded-md border border-gray-300 shadow-sm px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="e.g. 2018"
                />
              </div>
              
              <div>
                <label htmlFor="to" className="block text-sm font-medium text-gray-700 mb-1">
                  To (Year or "Present")
                </label>
                <input
                  type="text"
                  name="to"
                  id="to"
                  value={newEducation.to}
                  onChange={handleEducationChange}
                  className="w-full rounded-md border border-gray-300 shadow-sm px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="e.g. 2022 or Present"
                />
              </div>
            </div>
            
            <button
              type="button"
              onClick={addEducation}
              className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-md hover:bg-indigo-200 transition-colors text-sm inline-flex items-center"
            >
              <CheckIcon className="h-4 w-4 mr-1" />
              Add Education
            </button>
          </div>
        </div>
        
        {/* Work Experience */}
        <div className="space-y-4">
          <h3 className="text-md font-medium text-gray-700 border-b border-gray-200 pb-2">Work Experience</h3>
          
          {formData.experience.map((exp) => (
            <div key={exp.id} className="p-4 border border-gray-200 rounded-md relative">
              <button 
                type="button"
                onClick={() => removeExperience(exp.id)}
                className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
              
              <div className="grid grid-cols-2 gap-4 mb-2">
                <div className="font-medium">{exp.position}</div>
                <div className="text-gray-600 text-right">{exp.from} - {exp.to || "Present"}</div>
              </div>
              <div className="text-gray-700 mb-2">{exp.company}</div>
              <div className="text-gray-600 text-sm">{exp.description}</div>
            </div>
          ))}
          
          <div className="p-4 border border-gray-200 border-dashed rounded-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                  Company
                </label>
                <input
                  type="text"
                  name="company"
                  id="company"
                  value={newExperience.company}
                  onChange={handleExperienceChange}
                  className="w-full rounded-md border border-gray-300 shadow-sm px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Company Name"
                />
              </div>
              
              <div>
                <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-1">
                  Position
                </label>
                <input
                  type="text"
                  name="position"
                  id="position"
                  value={newExperience.position}
                  onChange={handleExperienceChange}
                  className="w-full rounded-md border border-gray-300 shadow-sm px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="e.g. Software Engineer"
                />
              </div>
            </div>
            
            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                id="description"
                rows="3"
                value={newExperience.description}
                onChange={handleExperienceChange}
                className="w-full rounded-md border border-gray-300 shadow-sm px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Briefly describe your responsibilities and achievements..."
              ></textarea>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="expFrom" className="block text-sm font-medium text-gray-700 mb-1">
                  From (Year)
                </label>
                <input
                  type="text"
                  name="from"
                  id="expFrom"
                  value={newExperience.from}
                  onChange={handleExperienceChange}
                  className="w-full rounded-md border border-gray-300 shadow-sm px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="e.g. 2018"
                />
              </div>
              
              <div>
                <label htmlFor="expTo" className="block text-sm font-medium text-gray-700 mb-1">
                  To (Year or "Present")
                </label>
                <input
                  type="text"
                  name="to"
                  id="expTo"
                  value={newExperience.to}
                  onChange={handleExperienceChange}
                  className="w-full rounded-md border border-gray-300 shadow-sm px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="e.g. 2022 or Present"
                />
              </div>
            </div>
            
            <button
              type="button"
              onClick={addExperience}
              className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-md hover:bg-indigo-200 transition-colors text-sm inline-flex items-center"
            >
              <CheckIcon className="h-4 w-4 mr-1" />
              Add Experience
            </button>
          </div>
        </div>
        
        {/* Form Actions */}
        <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitLoading}
            className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-70 flex items-center"
          >
            {submitLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </>
            ) : (
              'Save Profile'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProfileForm; 