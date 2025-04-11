import React, { useState, useEffect } from "react";
import {
  UserCircleIcon,
  TrophyIcon,
  StarIcon,
  AcademicCapIcon,
  BriefcaseIcon,
  ChartBarIcon,
  PencilIcon,
  CogIcon,
  ArrowRightIcon,
  PaperClipIcon,
} from "@heroicons/react/24/outline";
import { StarIcon as StarSolidIcon } from "@heroicons/react/24/solid";

function Profile() {
  const [activeTab, setActiveTab] = useState("overview");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const skills = [
    { name: "JavaScript", level: "Advanced", icon: "💻", proficiency: 90 },
    { name: "React", level: "Intermediate", icon: "⚛️", proficiency: 75 },
    { name: "Node.js", level: "Intermediate", icon: "🖥️", proficiency: 70 },
    { name: "SQL", level: "Basic", icon: "🗄️", proficiency: 50 },
    { name: "TypeScript", level: "Intermediate", icon: "📘", proficiency: 65 },
    { name: "UI/UX Design", level: "Basic", icon: "🎨", proficiency: 45 },
  ];

  const completedChallenges = [
    {
      id: 1,
      title: "Frontend Development Challenge",
      score: 95,
      date: "2024-02-10",
      type: "Frontend",
      company: "TechCorp",
    },
    {
      id: 2,
      title: "Algorithm Challenge",
      score: 88,
      date: "2024-02-08",
      type: "Algorithms",
      company: "AlgoTech",
    },
    {
      id: 3,
      title: "React Components Challenge",
      score: 92,
      date: "2024-01-25",
      type: "Frontend",
      company: "DesignHub",
    },
  ];

  const jobApplications = [
    {
      id: 1,
      position: "Senior Frontend Developer",
      company: "TechCorp",
      status: "Interview",
      appliedDate: "2024-02-05",
    },
    {
      id: 2,
      position: "Full Stack Developer",
      company: "CloudNine",
      status: "Applied",
      appliedDate: "2024-02-12",
    },
  ];

  const achievements = [
    {
      id: 1,
      title: "Algorithm Master",
      description:
        "Completed 10 algorithm challenges with a score of 85% or higher",
      icon: "🏆",
      date: "2024-02-01",
    },
    {
      id: 2,
      title: "React Specialist",
      description: "Achieved top 10% in React frontend challenges",
      icon: "⚛️",
      date: "2024-01-15",
    },
  ];

  const getScoreColor = (score) => {
    if (score >= 90) return "text-green-600";
    if (score >= 80) return "text-yellow-600";
    return "text-red-600";
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Interview":
        return "bg-green-100 text-green-800";
      case "Applied":
        return "bg-blue-100 text-blue-800";
      case "Rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div
          className={`bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-500 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {/* Profile Header */}
          <div className="relative bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-12">
            {/* Abstract background shapes */}
            <div className="absolute inset-0 overflow-hidden opacity-20">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-white rounded-full"></div>
              <div className="absolute bottom-10 left-10 w-20 h-20 bg-white rounded-full"></div>
              <div className="absolute top-20 left-1/3 w-16 h-16 bg-white rounded-full"></div>
            </div>

            <div className="flex flex-col md:flex-row md:items-center relative z-10">
              <div className="h-28 w-28 md:h-32 md:w-32 rounded-full bg-white p-1 ring-4 ring-white/30 shadow-lg">
                <div className="h-full w-full rounded-full bg-gradient-to-br from-indigo-100 to-indigo-50 flex items-center justify-center overflow-hidden">
                  <UserCircleIcon className="h-full w-full text-indigo-600" />
                </div>
                <button className="absolute bottom-0 right-0 bg-white rounded-full p-1.5 shadow-md hover:bg-gray-100 transition-colors">
                  <PencilIcon className="h-4 w-4 text-gray-600" />
                </button>
              </div>

              <div className="md:ml-8 mt-6 md:mt-0">
                <div className="flex flex-col md:flex-row md:items-center gap-y-2 md:gap-x-4">
                  <h1 className="text-3xl font-bold text-white">John Doe</h1>
                  <div className="flex items-center">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-900/30 text-white">
                      Full Stack Developer
                    </span>
                  </div>
                </div>

                <p className="text-indigo-100 mt-2 max-w-xl">
                  Passionate developer with 3+ years of experience building web
                  applications. Specializing in frontend technologies and UI/UX
                  design.
                </p>

                <div className="flex items-center space-x-6 mt-4">
                  <div className="flex items-center">
                    <div className="flex">
                      {[...Array(5)].map((_, i) =>
                        i < 4 ? (
                          <StarSolidIcon
                            key={i}
                            className="h-5 w-5 text-yellow-400"
                          />
                        ) : (
                          <StarIcon
                            key={i}
                            className="h-5 w-5 text-yellow-400"
                          />
                        )
                      )}
                    </div>
                    <span className="ml-1.5 text-white">4.8/5.0</span>
                  </div>

                  <div className="flex items-center">
                    <TrophyIcon className="h-5 w-5 text-yellow-400" />
                    <span className="ml-1.5 text-white">Top 10%</span>
                  </div>

                  <div className="flex items-center">
                    <BriefcaseIcon className="h-5 w-5 text-green-400" />
                    <span className="ml-1.5 text-white">8 Challenges</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 md:mt-0 md:ml-auto flex">
                <button className="px-4 py-2 bg-white text-indigo-600 rounded-md hover:bg-indigo-50 transition-colors font-medium flex items-center">
                  <PencilIcon className="h-5 w-5 mr-1.5" />
                  Edit Profile
                </button>
                <button className="ml-3 p-2 bg-indigo-500/30 text-white rounded-md hover:bg-indigo-500/40 transition-colors">
                  <CogIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px px-6">
              <button
                onClick={() => setActiveTab("overview")}
                className={`py-4 px-6 font-medium text-sm border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === "overview"
                    ? "border-indigo-600 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab("skills")}
                className={`py-4 px-6 font-medium text-sm border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === "skills"
                    ? "border-indigo-600 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Skills
              </button>
              <button
                onClick={() => setActiveTab("challenges")}
                className={`py-4 px-6 font-medium text-sm border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === "challenges"
                    ? "border-indigo-600 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Challenges
              </button>
              <button
                onClick={() => setActiveTab("applications")}
                className={`py-4 px-6 font-medium text-sm border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === "applications"
                    ? "border-indigo-600 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Applications
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  {/* Skills Summary */}
                  <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center">
                        <AcademicCapIcon className="h-6 w-6 text-indigo-600 mr-2" />
                        <h2 className="text-xl font-bold text-gray-900">
                          Top Skills
                        </h2>
                      </div>
                      <button
                        className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
                        onClick={() => setActiveTab("skills")}
                      >
                        View All
                      </button>
                    </div>

                    <div className="space-y-4">
                      {skills.slice(0, 3).map((skill, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center">
                              <span className="text-lg mr-2">{skill.icon}</span>
                              <span className="font-medium text-gray-900">
                                {skill.name}
                              </span>
                            </div>
                            <span className="text-sm text-gray-600">
                              {skill.level}
                            </span>
                          </div>
                          <div className="relative h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="absolute h-full bg-indigo-600 rounded-full"
                              style={{ width: `${skill.proficiency}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recent Challenges */}
                  <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center">
                        <TrophyIcon className="h-6 w-6 text-indigo-600 mr-2" />
                        <h2 className="text-xl font-bold text-gray-900">
                          Recent Challenges
                        </h2>
                      </div>
                      <button
                        className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
                        onClick={() => setActiveTab("challenges")}
                      >
                        View All
                      </button>
                    </div>

                    <div className="space-y-4">
                      {completedChallenges.slice(0, 2).map((challenge) => (
                        <div
                          key={challenge.id}
                          className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200"
                        >
                          <div className="mb-3 sm:mb-0">
                            <div className="flex items-center">
                              <span className="text-lg mr-2">
                                {challenge.type === "Frontend"
                                  ? "💻"
                                  : challenge.type === "Algorithms"
                                  ? "🧮"
                                  : "📱"}
                              </span>
                              <h3 className="font-medium text-gray-900">
                                {challenge.title}
                              </h3>
                            </div>
                            <div className="flex items-center mt-1">
                              <span className="text-sm text-gray-500">
                                {challenge.date}
                              </span>
                              <span className="mx-2 text-gray-300">•</span>
                              <span className="text-sm text-indigo-600">
                                {challenge.company}
                              </span>
                            </div>
                          </div>
                          <div
                            className={`text-lg font-semibold ${getScoreColor(
                              challenge.score
                            )}`}
                          >
                            {challenge.score}%
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Stats Card */}
                  <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">
                      Stats
                    </h2>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-indigo-50 p-4 rounded-lg">
                        <div className="text-2xl font-bold text-indigo-600">
                          8
                        </div>
                        <div className="text-sm text-gray-600">Challenges</div>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">
                          91%
                        </div>
                        <div className="text-sm text-gray-600">Avg. Score</div>
                      </div>
                      <div className="bg-purple-50 p-4 rounded-lg">
                        <div className="text-2xl font-bold text-purple-600">
                          2
                        </div>
                        <div className="text-sm text-gray-600">
                          Applications
                        </div>
                      </div>
                      <div className="bg-yellow-50 p-4 rounded-lg">
                        <div className="text-2xl font-bold text-yellow-600">
                          3
                        </div>
                        <div className="text-sm text-gray-600">
                          Achievements
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Achievements */}
                  <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">
                      Achievements
                    </h2>

                    <div className="space-y-4">
                      {achievements.map((achievement) => (
                        <div
                          key={achievement.id}
                          className="flex items-start p-3 bg-gray-50 rounded-lg"
                        >
                          <div className="flex-shrink-0 w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center text-2xl">
                            {achievement.icon}
                          </div>
                          <div className="ml-3">
                            <h3 className="font-medium text-gray-900">
                              {achievement.title}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {achievement.description}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              {achievement.date}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Skills Tab */}
            {activeTab === "skills" && (
              <div>
                <div className="flex items-center mb-6">
                  <AcademicCapIcon className="h-6 w-6 text-indigo-600 mr-2" />
                  <h2 className="text-2xl font-bold text-gray-900">
                    Skills Assessment
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Skill Proficiency
                    </h3>
                    <div className="space-y-6">
                      {skills.map((skill, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center">
                              <span className="text-2xl mr-3">
                                {skill.icon}
                              </span>
                              <span className="font-medium text-gray-900">
                                {skill.name}
                              </span>
                            </div>
                            <span className="px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-700">
                              {skill.level}
                            </span>
                          </div>
                          <div className="relative h-2.5 w-full bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="absolute h-full bg-indigo-600 rounded-full"
                              style={{
                                width: `${skill.proficiency}%`,
                                transition: "width 1s ease-in-out",
                              }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Skills Overview
                    </h3>
                    <div className="bg-gray-50 p-6 rounded-xl">
                      <div className="mb-6">
                        <h4 className="text-sm font-medium uppercase text-gray-500 tracking-wider mb-2">
                          Skill Breakdown
                        </h4>
                        <div className="relative pt-1">
                          <div className="flex h-4 overflow-hidden text-xs bg-gray-200 rounded-lg">
                            <div
                              className="flex flex-col justify-center w-3/6 bg-indigo-600 text-white text-center"
                              title="Frontend"
                            >
                              <span className="text-xs font-medium">
                                Frontend (50%)
                              </span>
                            </div>
                            <div
                              className="flex flex-col justify-center w-2/6 bg-purple-600 text-white text-center"
                              title="Backend"
                            >
                              <span className="text-xs font-medium truncate">
                                Backend (33%)
                              </span>
                            </div>
                            <div
                              className="flex flex-col justify-center w-1/6 bg-blue-600 text-white text-center"
                              title="Other"
                            >
                              <span className="text-xs font-medium truncate">
                                Other (17%)
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium uppercase text-gray-500 tracking-wider mb-2">
                          Recommended Skill Paths
                        </h4>
                        <div className="space-y-3">
                          <div className="p-3 bg-white rounded-lg border border-gray-200 flex justify-between items-center hover:shadow-sm transition-shadow">
                            <div>
                              <h5 className="font-medium text-gray-900">
                                TypeScript Advanced
                              </h5>
                              <p className="text-sm text-gray-600">
                                Level up your TypeScript skills
                              </p>
                            </div>
                            <ArrowRightIcon className="h-5 w-5 text-indigo-600" />
                          </div>
                          <div className="p-3 bg-white rounded-lg border border-gray-200 flex justify-between items-center hover:shadow-sm transition-shadow">
                            <div>
                              <h5 className="font-medium text-gray-900">
                                Backend Architecture
                              </h5>
                              <p className="text-sm text-gray-600">
                                Strengthen your backend knowledge
                              </p>
                            </div>
                            <ArrowRightIcon className="h-5 w-5 text-indigo-600" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Challenges Tab */}
            {activeTab === "challenges" && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <TrophyIcon className="h-6 w-6 text-indigo-600 mr-2" />
                    <h2 className="text-2xl font-bold text-gray-900">
                      Challenge History
                    </h2>
                  </div>
                  <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors font-medium flex items-center">
                    Find Challenges
                    <ArrowRightIcon className="ml-1.5 h-4 w-4" />
                  </button>
                </div>

                <div className="bg-gradient-to-r from-indigo-50 to-indigo-100 rounded-xl p-4 flex items-center mb-8">
                  <div className="p-3 bg-white rounded-lg mr-4">
                    <ChartBarIcon className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">
                      Performance Summary
                    </h3>
                    <p className="text-sm text-gray-600">
                      Your average score is{" "}
                      <span className="font-semibold text-indigo-600">
                        91.7%
                      </span>
                      , which is higher than 85% of users
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  {completedChallenges.map((challenge) => (
                    <div
                      key={challenge.id}
                      className="flex flex-col md:flex-row md:items-center justify-between p-5 bg-white rounded-xl border border-gray-200 hover:shadow-md transition-all duration-200 transform hover:-translate-y-1"
                    >
                      <div className="mb-4 md:mb-0">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center mr-3 text-lg">
                            {challenge.type === "Frontend"
                              ? "💻"
                              : challenge.type === "Algorithms"
                              ? "🧮"
                              : "📱"}
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900">
                              {challenge.title}
                            </h3>
                            <div className="flex items-center mt-1">
                              <span className="text-sm text-gray-500">
                                Completed on {challenge.date}
                              </span>
                              <span className="mx-2 text-gray-300">•</span>
                              <span className="text-sm text-indigo-600">
                                {challenge.type}
                              </span>
                              <span className="mx-2 text-gray-300">•</span>
                              <span className="text-sm text-gray-600">
                                By {challenge.company}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div
                          className={`text-lg font-semibold ${getScoreColor(
                            challenge.score
                          )}`}
                        >
                          Score: {challenge.score}%
                        </div>
                        <button className="p-2 text-gray-400 hover:text-indigo-600 transition-colors rounded-full hover:bg-gray-100">
                          <PaperClipIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Applications Tab */}
            {activeTab === "applications" && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <BriefcaseIcon className="h-6 w-6 text-indigo-600 mr-2" />
                    <h2 className="text-2xl font-bold text-gray-900">
                      Job Applications
                    </h2>
                  </div>
                  <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors font-medium flex items-center">
                    Browse Jobs
                    <ArrowRightIcon className="ml-1.5 h-4 w-4" />
                  </button>
                </div>

                {jobApplications.length > 0 ? (
                  <div className="space-y-6">
                    {jobApplications.map((job) => (
                      <div
                        key={job.id}
                        className="flex flex-col md:flex-row md:items-center justify-between p-5 bg-white rounded-xl border border-gray-200 hover:shadow-md transition-all duration-200 transform hover:-translate-y-1"
                      >
                        <div className="mb-4 md:mb-0">
                          <h3 className="font-medium text-gray-900">
                            {job.position}
                          </h3>
                          <div className="flex items-center mt-1">
                            <span className="text-sm text-indigo-600">
                              {job.company}
                            </span>
                            <span className="mx-2 text-gray-300">•</span>
                            <span className="text-sm text-gray-500">
                              Applied on {job.appliedDate}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                              job.status
                            )}`}
                          >
                            {job.status}
                          </span>
                          <button className="ml-4 px-3 py-1 border border-gray-300 rounded text-sm text-gray-600 hover:bg-gray-50 transition-colors">
                            View Details
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-gray-50 rounded-xl">
                    <BriefcaseIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      No applications yet
                    </h3>
                    <p className="text-gray-600 max-w-md mx-auto mb-6">
                      You haven't applied to any jobs yet. Browse available
                      positions and start applying!
                    </p>
                    <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
                      Find Jobs
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
