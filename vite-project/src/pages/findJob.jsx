import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { 
  BriefcaseIcon, 
  MapPinIcon, 
  BuildingOfficeIcon, 
  ClockIcon, 
  MagnifyingGlassIcon,
  AdjustmentsHorizontalIcon,
  XMarkIcon,
  ArrowRightIcon
} from "@heroicons/react/24/outline";

const FindJob = () => {
  const location = useLocation();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [appliedJobs, setAppliedJobs] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedJob, setSelectedJob] = useState(null);
  const [notification, setNotification] = useState(location.state?.message || "");
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    jobType: "",
    experience: "",
    category: ""
  });
  const [showFilters, setShowFilters] = useState(false);
  
  const jobsPerPage = 9; // 3 rows of 3 jobs

  const jobTypes = ["Full-time", "Part-time", "Contract", "Internship", "Remote"];
  
  const experienceLevels = ["Entry Level", "Mid Level", "Senior Level", "Executive"];
  
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

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://anti-resume-99d35-default-rtdb.asia-southeast1.firebasedatabase.app/jobs.json"
        );
        const jobArray = response.data
          ? Object.entries(response.data).map(([id, job]) => ({ id, ...job }))
          : [];
        setJobs(jobArray.reverse()); // latest first
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
    
    // Clear notification after 5 seconds
    if (notification) {
      const timer = setTimeout(() => {
        setNotification("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const handleApply = (jobId) => {
    setAppliedJobs((prev) => ({
      ...prev,
      [jobId]: true,
    }));
    
    // Show notification
    setNotification("Application submitted successfully!");
  };
  
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };
  
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
    setCurrentPage(1); // Reset to first page when filtering
  };

  const clearFilters = () => {
    setFilters({
      jobType: "",
      experience: "",
      category: ""
    });
    setSearchTerm("");
    setCurrentPage(1);
  };
  
  const formatDate = (dateString) => {
    if (!dateString) return "Recently";
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  // Filter and search logic
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = searchTerm === "" || 
      (job.title && job.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (job.company && job.company.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (job.description && job.description.toLowerCase().includes(searchTerm.toLowerCase()));
      
    const matchesType = filters.jobType === "" || 
      (job.type && job.type === filters.jobType);
      
    const matchesExperience = filters.experience === "" || 
      (job.experience && job.experience === filters.experience);
      
    const matchesCategory = filters.category === "" || 
      (job.category && job.category === filters.category);
    
    return matchesSearch && matchesType && matchesExperience && matchesCategory;
  });

  // Pagination logic
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  // Skeleton loader for job cards
  const SkeletonJobCard = () => (
    <div className="bg-white shadow-md p-6 rounded-lg animate-pulse">
      <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
      <div className="h-4 bg-gray-200 rounded w-2/3 mb-3"></div>
      <div className="h-4 bg-gray-200 rounded w-full mb-3"></div>
      <div className="h-4 bg-gray-200 rounded w-full mb-3"></div>
      <div className="h-10 bg-gray-200 rounded w-1/3 mt-4"></div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Notification */}
      {notification && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-md shadow-lg z-50 animate-fadeIn">
          <p>{notification}</p>
        </div>
      )}
      
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Find Your Dream Job</h1>
          <p className="text-gray-600 mt-1">Browse {filteredJobs.length} jobs in tech</p>
        </div>
        
        <div className="mt-4 md:mt-0 w-full md:w-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Search jobs by title, company or skills..."
              value={searchTerm}
              onChange={handleSearch}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full md:w-80 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>
      
      <div className="mb-6 flex flex-col md:flex-row justify-between items-start">
        <button 
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center text-indigo-600 font-medium mb-4 md:mb-0"
        >
          <AdjustmentsHorizontalIcon className="h-5 w-5 mr-1" />
          {showFilters ? "Hide Filters" : "Show Filters"}
        </button>
        
        {filteredJobs.length > 0 && (
          <div className="text-sm text-gray-600">
            Showing {indexOfFirstJob + 1}-{Math.min(indexOfLastJob, filteredJobs.length)} of {filteredJobs.length} jobs
          </div>
        )}
      </div>
      
      {/* Filters Section */}
      {showFilters && (
        <div className="bg-gray-50 p-4 rounded-lg mb-6 transition-all duration-200 ease-in-out">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Filters</h2>
            <button 
              onClick={clearFilters}
              className="text-sm text-indigo-600 hover:text-indigo-800"
            >
              Clear All
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Job Type</label>
              <select
                name="jobType"
                value={filters.jobType}
                onChange={handleFilterChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">All Types</option>
                {jobTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Experience Level</label>
              <select
                name="experience"
                value={filters.experience}
                onChange={handleFilterChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">All Levels</option>
                {experienceLevels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                name="category"
                value={filters.category}
                onChange={handleFilterChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">All Categories</option>
                {jobCategories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}

      {/* No Results Message */}
      {!loading && filteredJobs.length === 0 && (
        <div className="text-center py-16 bg-gray-50 rounded-lg">
          <h3 className="text-xl font-medium text-gray-800 mb-2">No jobs found</h3>
          <p className="text-gray-600 mb-4">Try adjusting your search or filters to find what you're looking for</p>
          <button 
            onClick={clearFilters} 
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Clear All Filters
          </button>
        </div>
      )}

      {/* Job List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          // Show skeleton loaders when loading
          Array(6).fill().map((_, index) => (
            <SkeletonJobCard key={index} />
          ))
        ) : (
          // Show actual job cards
          currentJobs.map((job) => (
            <div
              key={job.id}
              className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-200"
            >
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-1">{job.title}</h2>
                  {job.type && (
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      job.type === 'Full-time' ? 'bg-green-100 text-green-800' :
                      job.type === 'Remote' ? 'bg-blue-100 text-blue-800' :
                      job.type === 'Contract' ? 'bg-purple-100 text-purple-800' :
                      job.type === 'Internship' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {job.type}
                    </span>
                  )}
                </div>
                
                <div className="flex items-center mb-2">
                  <BuildingOfficeIcon className="h-4 w-4 text-gray-500 mr-1" />
                  <span className="text-gray-700 text-sm">{job.company}</span>
                </div>
                
                <div className="flex items-center mb-2">
                  <MapPinIcon className="h-4 w-4 text-gray-500 mr-1" />
                  <span className="text-gray-700 text-sm">{job.location}</span>
                </div>
                
                {job.salary && (
                  <div className="flex items-center mb-2">
                    <span className="text-gray-700 text-sm">{job.salary}</span>
                  </div>
                )}
                
                <div className="flex items-center mb-4">
                  <ClockIcon className="h-4 w-4 text-gray-500 mr-1" />
                  <span className="text-gray-500 text-xs">{formatDate(job.postedAt)}</span>
                </div>
                
                <div className="mt-2 mb-4">
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {job.description}
                  </p>
                </div>
                
                {job.skills && job.skills.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-3 mb-4">
                    {job.skills.slice(0, 3).map((skill, index) => (
                      <span key={index} className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
                        {skill}
                      </span>
                    ))}
                    {job.skills.length > 3 && (
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                        +{job.skills.length - 3}
                      </span>
                    )}
                  </div>
                )}
                
                <div className="flex mt-4 space-x-2">
                  <button
                    onClick={() => setSelectedJob(job)}
                    className="flex-1 px-3 py-2 text-sm border border-indigo-600 text-indigo-600 rounded hover:bg-indigo-50 transition-colors"
                  >
                    View Details
                  </button>
                  
                  <button
                    onClick={() => handleApply(job.id)}
                    className={`flex-1 px-3 py-2 text-sm rounded transition-colors flex items-center justify-center ${
                      appliedJobs[job.id]
                        ? "bg-green-500 text-white cursor-default"
                        : "bg-indigo-600 text-white hover:bg-indigo-700"
                    }`}
                    disabled={appliedJobs[job.id]}
                  >
                    {appliedJobs[job.id] ? "Applied" : "Apply Now"}
                    {!appliedJobs[job.id] && <ArrowRightIcon className="h-3 w-3 ml-1" />}
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Job Details Modal */}
      {selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-90vh overflow-y-auto">
            <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-800">{selectedJob.title}</h2>
              <button 
                onClick={() => setSelectedJob(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="mb-6">
                <div className="flex items-center mb-2">
                  <BuildingOfficeIcon className="h-5 w-5 text-gray-500 mr-2" />
                  <span className="text-gray-800 font-medium">{selectedJob.company}</span>
                </div>
                
                <div className="flex items-center mb-2">
                  <MapPinIcon className="h-5 w-5 text-gray-500 mr-2" />
                  <span className="text-gray-800">{selectedJob.location}</span>
                </div>
                
                {selectedJob.salary && (
                  <div className="flex items-center mb-2">
                    <span className="text-gray-800 font-medium ml-7">{selectedJob.salary}</span>
                  </div>
                )}
                
                <div className="flex items-center">
                  <BriefcaseIcon className="h-5 w-5 text-gray-500 mr-2" />
                  <span className="text-gray-800">{selectedJob.type || "Not specified"}</span>
                </div>
                
                {selectedJob.experience && (
                  <div className="flex items-center mt-2">
                    <span className="text-gray-800 ml-7">{selectedJob.experience}</span>
                  </div>
                )}
                
                <div className="flex items-center mt-2">
                  <ClockIcon className="h-5 w-5 text-gray-500 mr-2" />
                  <span className="text-gray-600">Posted {formatDate(selectedJob.postedAt)}</span>
                </div>
              </div>
              
              <div className="my-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Job Description</h3>
                <p className="text-gray-700 whitespace-pre-line">{selectedJob.description}</p>
              </div>
              
              {selectedJob.requirements && (
                <div className="my-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Requirements</h3>
                  <p className="text-gray-700 whitespace-pre-line">{selectedJob.requirements}</p>
                </div>
              )}
              
              {selectedJob.skills && selectedJob.skills.length > 0 && (
                <div className="my-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Required Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedJob.skills.map((skill, index) => (
                      <span 
                        key={index} 
                        className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="mt-8 flex justify-end">
                <button
                  onClick={() => {
                    handleApply(selectedJob.id);
                    setSelectedJob(null);
                  }}
                  className={`px-6 py-3 rounded transition-colors ${
                    appliedJobs[selectedJob.id]
                      ? "bg-green-500 text-white cursor-default"
                      : "bg-indigo-600 text-white hover:bg-indigo-700"
                  }`}
                  disabled={appliedJobs[selectedJob.id]}
                >
                  {appliedJobs[selectedJob.id] ? "Already Applied" : "Apply for this position"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Pagination Controls */}
      {!loading && filteredJobs.length > 0 && (
        <div className="flex justify-center items-center mt-10 mb-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 border border-gray-300 rounded-l-md bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          
          <div className="flex">
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(page => {
                if (totalPages <= 7) return true;
                if (page === 1 || page === totalPages) return true;
                if (page >= currentPage - 1 && page <= currentPage + 1) return true;
                if (page === 2 && currentPage <= 3) return true;
                if (page === totalPages - 1 && currentPage >= totalPages - 2) return true;
                return false;
              })
              .map((page, i, filteredPages) => (
                <React.Fragment key={page}>
                  {i > 0 && filteredPages[i-1] !== page - 1 && (
                    <span className="px-4 py-2 border-t border-b border-gray-300 bg-white text-gray-400">...</span>
                  )}
                  <button
                    onClick={() => setCurrentPage(page)}
                    className={`px-4 py-2 border-t border-b border-gray-300 ${
                      currentPage === page
                        ? "bg-indigo-50 text-indigo-600 font-medium border-indigo-500"
                        : "bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {page}
                  </button>
                </React.Fragment>
              ))
            }
          </div>
          
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages || totalPages === 0}
            className="px-4 py-2 border border-gray-300 rounded-r-md bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default FindJob;
