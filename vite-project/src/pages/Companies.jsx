import React, { useState, useEffect } from "react";
import {
  BuildingOfficeIcon,
  MagnifyingGlassIcon,
  BriefcaseIcon,
  ArrowRightIcon,
  ChartBarIcon,
  UsersIcon,
  GlobeAltIcon,
  AdjustmentsHorizontalIcon,
} from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";

function Companies() {
  const [companies, setCompanies] = useState([
    {
      id: 1,
      name: "TechCorp",
      description:
        "Leading technology company specializing in software development and cloud solutions. We build innovative products that transform businesses.",
      industry: "Technology",
      openPositions: 5,
      location: "San Francisco, CA",
      size: "1000-5000",
      founded: 2010,
      rating: 4.8,
      culture: ["Innovation", "Collaboration", "Growth"],
      benefits: [
        "Remote Work",
        "Health Insurance",
        "Professional Development",
        "Stock Options",
      ],
      logo: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      id: 2,
      name: "DesignHub",
      description:
        "Creative agency focused on UI/UX design and digital experiences. We create beautiful, functional interfaces for web and mobile applications.",
      industry: "Design",
      openPositions: 3,
      location: "New York, NY",
      size: "50-200",
      founded: 2015,
      rating: 4.5,
      culture: ["Creativity", "Flexibility", "Work-Life Balance"],
      benefits: [
        "Flexible Hours",
        "Health Insurance",
        "Creative Workspace",
        "Learning Budget",
      ],
      logo: "https://randomuser.me/api/portraits/women/2.jpg",
    },
    {
      id: 3,
      name: "DataSystems",
      description:
        "Data analytics and business intelligence solutions provider. We help organizations harness the power of data to make better decisions.",
      industry: "Data",
      openPositions: 4,
      location: "Boston, MA",
      size: "500-1000",
      founded: 2012,
      rating: 4.6,
      culture: ["Data-Driven", "Innovation", "Learning"],
      benefits: [
        "Hybrid Work",
        "Comprehensive Benefits",
        "Training Programs",
        "Generous PTO",
      ],
      logo: "https://randomuser.me/api/portraits/men/3.jpg",
    },
    {
      id: 4,
      name: "CloudNine",
      description:
        "Cloud infrastructure and DevOps services company. We enable businesses to build, deploy, and scale applications with confidence.",
      industry: "Technology",
      openPositions: 7,
      location: "Seattle, WA",
      size: "200-500",
      founded: 2013,
      rating: 4.7,
      culture: ["Teamwork", "Technical Excellence", "Customer Focus"],
      benefits: [
        "Remote Work",
        "Stock Options",
        "Wellness Programs",
        "Competitive Salary",
      ],
      logo: "https://randomuser.me/api/portraits/women/4.jpg",
    },
    {
      id: 5,
      name: "GreenTech",
      description:
        "Sustainable technology solutions provider focusing on renewable energy and environmental impact. Building a greener future through innovation.",
      industry: "CleanTech",
      openPositions: 6,
      location: "Austin, TX",
      size: "100-500",
      founded: 2016,
      rating: 4.9,
      culture: ["Sustainability", "Impact", "Innovation"],
      benefits: [
        "Hybrid Work",
        "Unlimited PTO",
        "Volunteer Time",
        "Green Commuter Benefits",
      ],
      logo: "https://randomuser.me/api/portraits/men/5.jpg",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Filter companies based on search term and selected industry
  const filteredCompanies = companies.filter(
    (company) =>
      (company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.location.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedIndustry === "all" || company.industry === selectedIndustry)
  );

  // Sort filtered companies based on sortBy selection
  const sortedCompanies = [...filteredCompanies].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.name.localeCompare(b.name);
      case "rating":
        return b.rating - a.rating;
      case "positions":
        return b.openPositions - a.openPositions;
      case "founded":
        return b.founded - a.founded;
      default:
        return 0;
    }
  });

  // Get unique industries for filtering
  const industries = [
    "all",
    ...new Set(companies.map((company) => company.industry)),
  ];

  // Handle view opportunities click
  const viewOpportunities = (companyId) => {
    console.log(`Viewing opportunities for company ${companyId}`);
  };

  // Render star rating
  const renderRating = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <StarIcon key={`full-${i}`} className="h-4 w-4 text-yellow-400" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative">
          <StarIcon className="h-4 w-4 text-gray-300" />
          <div className="absolute inset-0 overflow-hidden w-1/2">
            <StarIcon className="h-4 w-4 text-yellow-400" />
          </div>
        </div>
      );
    }

    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <StarIcon key={`empty-${i}`} className="h-4 w-4 text-gray-300" />
      );
    }

    return (
      <div className="flex items-center">
        {stars}
        <span className="ml-1 text-sm text-gray-600">{rating.toFixed(1)}</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header with search and filters */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div className="lg:max-w-lg">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Featured Companies
              </span>
            </h1>
            <p className="text-gray-600">
              Discover companies that match your skills and values
            </p>
          </div>
          <div className="mt-4 md:mt-0 w-full md:w-auto flex items-center">
            <div className="relative w-full md:w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search companies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <button
              onClick={() => setIsFilterVisible(!isFilterVisible)}
              className="ml-2 p-2 text-gray-500 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-md"
            >
              <AdjustmentsHorizontalIcon className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Filters and sorting */}
        <div
          className={`mb-8 transition-all duration-300 ease-in-out overflow-hidden ${
            isFilterVisible ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  Industry
                </h3>
                <div className="flex flex-wrap gap-2">
                  {industries.map((industry) => (
                    <button
                      key={industry}
                      onClick={() => setSelectedIndustry(industry)}
                      className={`px-4 py-2 rounded-md text-sm font-medium capitalize transition-colors duration-200 ${
                        selectedIndustry === industry
                          ? "bg-indigo-600 text-white"
                          : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      {industry === "all" ? "All Industries" : industry}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  Sort By
                </h3>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSortBy("name")}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                      sortBy === "name"
                        ? "bg-indigo-600 text-white"
                        : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    Name
                  </button>
                  <button
                    onClick={() => setSortBy("rating")}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                      sortBy === "rating"
                        ? "bg-indigo-600 text-white"
                        : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    Highest Rated
                  </button>
                  <button
                    onClick={() => setSortBy("positions")}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                      sortBy === "positions"
                        ? "bg-indigo-600 text-white"
                        : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    Most Openings
                  </button>
                  <button
                    onClick={() => setSortBy("founded")}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                      sortBy === "founded"
                        ? "bg-indigo-600 text-white"
                        : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    Newest
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Company count */}
        <div className="mb-6">
          <p className="text-sm text-gray-600">
            Showing{" "}
            <span className="font-medium">{sortedCompanies.length}</span>{" "}
            companies
          </p>
        </div>

        {/* Company cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {sortedCompanies.map((company, index) => (
            <div
              key={company.id}
              className={`bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 overflow-hidden ${
                mounted
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="border-t-4 border-indigo-600"></div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-5">
                  <div className="flex items-center">
                    <div className="h-14 w-14 rounded-full bg-indigo-100 flex items-center justify-center overflow-hidden">
                      <img
                        src={company.logo}
                        alt={company.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="ml-4">
                      <h2 className="text-xl font-semibold text-gray-900">
                        {company.name}
                      </h2>
                      <div className="flex items-center mt-1">
                        {renderRating(company.rating)}
                      </div>
                    </div>
                  </div>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    <BriefcaseIcon className="h-4 w-4 mr-1" />
                    {company.openPositions}{" "}
                    {company.openPositions === 1 ? "Job" : "Jobs"}
                  </span>
                </div>

                <p className="text-gray-600 mb-5 line-clamp-2">
                  {company.description}
                </p>

                <div className="grid grid-cols-2 gap-4 mb-5 text-sm">
                  <div className="flex items-start">
                    <GlobeAltIcon className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                    <div>
                      <div className="font-medium text-gray-900">Location</div>
                      <div className="text-gray-600">{company.location}</div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <UsersIcon className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                    <div>
                      <div className="font-medium text-gray-900">
                        Company Size
                      </div>
                      <div className="text-gray-600">
                        {company.size} employees
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <ChartBarIcon className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                    <div>
                      <div className="font-medium text-gray-900">Industry</div>
                      <div className="text-gray-600">{company.industry}</div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <BuildingOfficeIcon className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                    <div>
                      <div className="font-medium text-gray-900">Founded</div>
                      <div className="text-gray-600">{company.founded}</div>
                    </div>
                  </div>
                </div>

                <div className="mb-5">
                  <h3 className="text-sm font-medium text-gray-900 mb-3">
                    Company Culture
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {company.culture.map((item, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-900 mb-3">
                    Key Benefits
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {company.benefits.slice(0, 3).map((benefit, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700"
                      >
                        {benefit}
                      </span>
                    ))}
                    {company.benefits.length > 3 && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                        +{company.benefits.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => viewOpportunities(company.id)}
                  className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 transform hover:scale-[1.02]"
                >
                  View Opportunities
                  <ArrowRightIcon className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state for no results */}
        {sortedCompanies.length === 0 && (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 mb-4">
              <BuildingOfficeIcon className="h-8 w-8 text-indigo-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No companies found
            </h3>
            <p className="text-gray-600 max-w-md mx-auto">
              Try adjusting your search or filter criteria to find companies
              that match your interests.
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedIndustry("all");
              }}
              className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Companies;
