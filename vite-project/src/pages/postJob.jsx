import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function PostJob() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [job, setJob] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    type: "Full-time",
    category: "",
    experience: "",
    skills: [],
    description: "",
    requirements: "",
  });

  const [skillInput, setSkillInput] = useState("");
  const [errors, setErrors] = useState({});

  const jobTypes = ["Full-time", "Part-time", "Contract", "Internship", "Remote"];
  
  const jobCategories = [
    "Software Development",
    "Web Development",
    "Mobile Development",
    "UI/UX Design",
    "Data Science",
    "Machine Learning",
    "DevOps",
    "Cloud Computing",
    "Cybersecurity",
    "Product Management",
    "Project Management",
    "Quality Assurance",
    "Other"
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJob({ ...job, [name]: value });
    
    // Clear error when user types
    if (errors[name]) {
      setErrors({...errors, [name]: ""});
    }
  };

  const addSkill = () => {
    if (skillInput.trim() && !job.skills.includes(skillInput.trim())) {
      setJob({ ...job, skills: [...job.skills, skillInput.trim()] });
      setSkillInput("");
    }
  };

  const removeSkill = (skillToRemove) => {
    setJob({
      ...job,
      skills: job.skills.filter((skill) => skill !== skillToRemove),
    });
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!job.title.trim()) newErrors.title = "Job title is required";
    if (!job.company.trim()) newErrors.company = "Company name is required";
    if (!job.location.trim()) newErrors.location = "Location is required";
    if (!job.description.trim()) newErrors.description = "Job description is required";
    if (job.skills.length === 0) newErrors.skills = "At least one skill is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setIsSubmitting(true);

    try {
      await axios.post(
        "https://anti-resume-99d35-default-rtdb.asia-southeast1.firebasedatabase.app/jobs.json",
        {
          ...job,
          postedAt: new Date().toISOString()
        }
      );
      setIsSubmitting(false);
      navigate("/findjobs", { state: { message: "Job posted successfully!" } });
    } catch (error) {
      console.error("Error posting job:", error);
      setIsSubmitting(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
      setErrors({...errors, general: "Failed to post job. Please try again."});
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="px-6 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Post a Job</h1>
        <p className="text-gray-600 mb-8">Fill out the form below to post a new job listing</p>

        {errors.general && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
            <p>{errors.general}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information Section */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Basic Information</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="block text-gray-700 font-medium mb-2" htmlFor="title">
                  Job Title*
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  placeholder="e.g. Senior Frontend Developer"
                  value={job.title}
                  onChange={handleChange}
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                    errors.title ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2" htmlFor="company">
                  Company Name*
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  placeholder="e.g. Acme Inc."
                  value={job.company}
                  onChange={handleChange}
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                    errors.company ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.company && <p className="text-red-500 text-sm mt-1">{errors.company}</p>}
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2" htmlFor="location">
                  Location*
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  placeholder="e.g. New York, NY or Remote"
                  value={job.location}
                  onChange={handleChange}
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                    errors.location ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2" htmlFor="salary">
                  Salary Range
                </label>
                <input
                  type="text"
                  id="salary"
                  name="salary"
                  placeholder="e.g. $80,000 - $100,000"
                  value={job.salary}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>
          </div>

          {/* Job Details Section */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Job Details</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="block text-gray-700 font-medium mb-2" htmlFor="type">
                  Job Type*
                </label>
                <select
                  id="type"
                  name="type"
                  value={job.type}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  {jobTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2" htmlFor="category">
                  Job Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={job.category}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">Select a category</option>
                  {jobCategories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2" htmlFor="experience">
                  Experience Level
                </label>
                <select
                  id="experience"
                  name="experience"
                  value={job.experience}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">Select experience level</option>
                  <option value="Entry Level">Entry Level</option>
                  <option value="Mid Level">Mid Level</option>
                  <option value="Senior Level">Senior Level</option>
                  <option value="Executive">Executive</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Required Skills*</label>
                <div className="flex">
                  <input
                    type="text"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    placeholder="e.g. JavaScript"
                    className="flex-grow p-3 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addSkill();
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={addSkill}
                    className="bg-indigo-600 text-white px-4 rounded-r-lg hover:bg-indigo-700"
                  >
                    Add
                  </button>
                </div>
                {errors.skills && (
                  <p className="text-red-500 text-sm mt-1">{errors.skills}</p>
                )}
                
                <div className="flex flex-wrap gap-2 mt-3">
                  {job.skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm"
                    >
                      {skill}
                      <button
                        type="button"
                        className="ml-1.5 text-indigo-600 hover:text-indigo-800"
                        onClick={() => removeSkill(skill)}
                      >
                        &times;
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Job Description</h2>
            
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="description">
                Job Description*
              </label>
              <textarea
                id="description"
                name="description"
                placeholder="Provide a detailed description of the job..."
                value={job.description}
                onChange={handleChange}
                rows={6}
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                  errors.description ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">{errors.description}</p>
              )}
            </div>
            
            <div>
              <label className="block text-gray-700 font-medium mb-2" htmlFor="requirements">
                Requirements
              </label>
              <textarea
                id="requirements"
                name="requirements"
                placeholder="List job requirements, qualifications, and nice-to-haves..."
                value={job.requirements}
                onChange={handleChange}
                rows={4}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate("/findjobs")}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                isSubmitting ? "opacity-75 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? "Posting..." : "Post Job"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PostJob;

