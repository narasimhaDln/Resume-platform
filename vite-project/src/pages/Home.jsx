import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  CheckCircleIcon,
  ArrowRightIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";

function Home() {
  // Animation on scroll effect
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fadeIn");
          }
        });
      },
      { threshold: 0.1 }
    );

    const hiddenElements = document.querySelectorAll(".animate-hidden");
    hiddenElements.forEach((el) => observer.observe(el));

    return () => {
      hiddenElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-indigo-50">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center relative">
          {/* Background decoration */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-200 rounded-full opacity-20 blur-3xl"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-200 rounded-full opacity-20 blur-3xl"></div>
          </div>

          <div className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 mb-6 animate-bounce">
            <SparklesIcon className="h-5 w-5 mr-2" />
            <span className="text-sm font-medium">
              A New Way to Showcase Your Skills
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Anti-Resume
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-12">
            Where your skills speak louder than traditional resumes. Show what
            you can do, not just what you've done.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/challenges"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-all duration-200 transform hover:-translate-y-1 hover:shadow-lg"
            >
              Start Challenges
              <ArrowRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/companies"
              className="inline-flex items-center justify-center px-6 py-3 border border-indigo-200 text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 transition-all duration-200 transform hover:-translate-y-1 hover:shadow-md hover:border-indigo-300"
            >
              Browse Companies
              <ArrowRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16 animate-hidden">
          <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
          <div className="w-20 h-1 bg-indigo-500 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-hidden">
            <div className="flex items-center mb-6">
              <div className="p-3 bg-indigo-100 rounded-xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-indigo-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 ml-4">
                For Candidates
              </h2>
            </div>

            <ul className="space-y-4">
              <li className="flex items-start group">
                <CheckCircleIcon className="h-6 w-6 text-green-500 mt-1 mr-4 group-hover:text-green-600 transition-colors duration-200" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors duration-200">
                    Complete Skill-Based Challenges
                  </h3>
                  <p className="text-gray-600">
                    Showcase your abilities through real-world tasks and
                    projects
                  </p>
                </div>
              </li>
              <li className="flex items-start group">
                <CheckCircleIcon className="h-6 w-6 text-green-500 mt-1 mr-4 group-hover:text-green-600 transition-colors duration-200" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors duration-200">
                    Get Matched Based on Abilities
                  </h3>
                  <p className="text-gray-600">
                    Connect with companies that value your actual skills
                  </p>
                </div>
              </li>
              <li className="flex items-start group">
                <CheckCircleIcon className="h-6 w-6 text-green-500 mt-1 mr-4 group-hover:text-green-600 transition-colors duration-200" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors duration-200">
                    Access Transparent Salary Data
                  </h3>
                  <p className="text-gray-600">
                    Make informed decisions with clear compensation information
                  </p>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-hidden">
            <div className="flex items-center mb-6">
              <div className="p-3 bg-indigo-100 rounded-xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-indigo-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 ml-4">
                For Companies
              </h2>
            </div>

            <ul className="space-y-4">
              <li className="flex items-start group">
                <CheckCircleIcon className="h-6 w-6 text-green-500 mt-1 mr-4 group-hover:text-green-600 transition-colors duration-200" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors duration-200">
                    Post Real Work Samples
                  </h3>
                  <p className="text-gray-600">
                    Create challenges that reflect actual job requirements
                  </p>
                </div>
              </li>
              <li className="flex items-start group">
                <CheckCircleIcon className="h-6 w-6 text-green-500 mt-1 mr-4 group-hover:text-green-600 transition-colors duration-200" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors duration-200">
                    Find Candidates Based on Skills
                  </h3>
                  <p className="text-gray-600">
                    Identify talent through demonstrated abilities
                  </p>
                </div>
              </li>
              <li className="flex items-start group">
                <CheckCircleIcon className="h-6 w-6 text-green-500 mt-1 mr-4 group-hover:text-green-600 transition-colors duration-200" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors duration-200">
                    Eliminate Hiring Bias
                  </h3>
                  <p className="text-gray-600">
                    Focus on what matters most - actual capabilities
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-hidden">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="text-4xl font-bold text-indigo-600 mb-2">
              10,000+
            </div>
            <div className="text-gray-600">Skilled Candidates</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="text-4xl font-bold text-indigo-600 mb-2">500+</div>
            <div className="text-gray-600">Leading Companies</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="text-4xl font-bold text-indigo-600 mb-2">95%</div>
            <div className="text-gray-600">Hiring Success Rate</div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-hidden">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 md:p-12 text-center relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-white opacity-10">
              <svg
                className="absolute right-0 top-0 h-full"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                <polygon
                  points="0,0 100,0 100,100"
                  fill="rgba(255,255,255,0.1)"
                ></polygon>
              </svg>
            </div>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 relative z-10">
            Ready to Transform Your Hiring Journey?
          </h2>
          <p className="text-xl text-indigo-100 mb-8 relative z-10">
            Join thousands of candidates and companies who have already
            discovered a better way.
          </p>
          <Link
            to="/signup"
            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 transition-all duration-200 transform hover:-translate-y-1 hover:shadow-lg relative z-10"
          >
            Get Started Now
            <ArrowRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Add custom animation styles */}
      <style jsx>{`
        .animate-hidden {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }

        .animate-fadeIn {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
}

export default Home;
