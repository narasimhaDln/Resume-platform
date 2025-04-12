import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  PlayIcon,
  PauseIcon,
  UserCircleIcon,
  BriefcaseIcon,
  DocumentTextIcon,
  CheckCircleIcon,
  ShieldCheckIcon,
  LightBulbIcon,
  UserGroupIcon,
  ChartBarIcon
} from "@heroicons/react/24/outline";

function Demo() {
  const [currentStep, setCurrentStep] = useState(1);
  const [playing, setPlaying] = useState(true);
  const [mounted, setMounted] = useState(false);
  const demoIntervalRef = useRef(null);
  const maxSteps = 5;

  useEffect(() => {
    setMounted(true);
    
    // Auto-play demo steps
    if (playing) {
      demoIntervalRef.current = setInterval(() => {
        setCurrentStep(prevStep => {
          if (prevStep >= maxSteps) {
            return 1; // Loop back to the beginning
          }
          return prevStep + 1;
        });
      }, 5000);
    } 
    
    return () => {
      if (demoIntervalRef.current) {
        clearInterval(demoIntervalRef.current);
      }
    };
  }, [playing]);

  const handlePrevStep = () => {
    setCurrentStep(prevStep => (prevStep === 1 ? maxSteps : prevStep - 1));
  };

  const handleNextStep = () => {
    setCurrentStep(prevStep => (prevStep === maxSteps ? 1 : prevStep + 1));
  };

  const togglePlayPause = () => {
    if (playing) {
      clearInterval(demoIntervalRef.current);
    } else {
      demoIntervalRef.current = setInterval(() => {
        setCurrentStep(prevStep => {
          if (prevStep >= maxSteps) {
            return 1;
          }
          return prevStep + 1;
        });
      }, 5000);
    }
    setPlaying(!playing);
  };

  const demoSteps = [
    {
      title: "Submit a Coding Challenge",
      description: "Candidates demonstrate their coding skills by completing real-world challenges directly on our platform.",
      image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      icon: <DocumentTextIcon className="h-8 w-8 text-indigo-600" />,
      color: "from-indigo-500 to-blue-600"
    },
    {
      title: "AI-Powered Skill Analysis",
      description: "Our AI evaluates code quality, efficiency, and problem-solving approaches to create a comprehensive skill profile.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      icon: <ChartBarIcon className="h-8 w-8 text-purple-600" />,
      color: "from-purple-500 to-indigo-600"
    },
    {
      title: "Blind Matching System",
      description: "Candidates are matched with companies based purely on skills, eliminating bias from the initial screening process.",
      image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80",
      icon: <ShieldCheckIcon className="h-8 w-8 text-green-600" />,
      color: "from-green-500 to-teal-600"
    },
    {
      title: "Company Interview Requests",
      description: "Companies view anonymized skill profiles and send interview requests to candidates with matching abilities.",
      image: "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      icon: <BriefcaseIcon className="h-8 w-8 text-blue-600" />,
      color: "from-blue-500 to-cyan-600"
    },
    {
      title: "Connect and Hire",
      description: "After mutual interest is established, personal details are revealed and the direct hiring process begins.",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      icon: <CheckCircleIcon className="h-8 w-8 text-emerald-600" />,
      color: "from-emerald-500 to-green-600"
    }
  ];

  const currentDemoStep = demoSteps[currentStep - 1];

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className={`transition-all duration-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          {/* Back link */}
          <Link to="/" className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium">
            <ArrowLeftIcon className="h-4 w-4 mr-1" />
            Back to Home
          </Link>
          
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-6 mb-4">
            How Our Platform Works
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mb-12">
            See how our skill-based platform transforms the tech hiring process
            by focusing on demonstrated abilities rather than traditional resumes.
          </p>
          
          {/* Demo player */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-16">
            {/* Demo header */}
            <div className="relative">
              <div className={`bg-gradient-to-r ${currentDemoStep.color} h-64 md:h-96 flex items-center justify-center p-8`}>
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute -top-20 -right-20 w-80 h-80 bg-white rounded-full"></div>
                  <div className="absolute bottom-20 left-20 w-40 h-40 bg-white rounded-full"></div>
                </div>
                
                <div className="relative z-10 text-center max-w-lg">
                  <div className="bg-white/20 backdrop-blur-sm p-4 rounded-xl inline-block mb-6">
                    {currentDemoStep.icon}
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                    {currentDemoStep.title}
                  </h2>
                  <p className="text-white/90 text-lg">
                    {currentDemoStep.description}
                  </p>
                </div>
              </div>
              
              {/* Controls */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex bg-white/30 backdrop-blur-sm rounded-full px-2 py-1">
                <button 
                  onClick={handlePrevStep}
                  className="p-2 text-white hover:text-white/80 transition-colors"
                >
                  <ArrowLeftIcon className="h-5 w-5" />
                </button>
                <button 
                  onClick={togglePlayPause}
                  className="p-2 text-white hover:text-white/80 transition-colors"
                >
                  {playing ? <PauseIcon className="h-5 w-5" /> : <PlayIcon className="h-5 w-5" />}
                </button>
                <button 
                  onClick={handleNextStep}
                  className="p-2 text-white hover:text-white/80 transition-colors"
                >
                  <ArrowRightIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            {/* Step indicators */}
            <div className="px-8 py-4 flex justify-center items-center border-t border-gray-100">
              <div className="flex space-x-2">
                {demoSteps.map((_, index) => (
                  <button 
                    key={index}
                    onClick={() => setCurrentStep(index + 1)}
                    className={`h-2 w-2 rounded-full transition-all duration-300 ${
                      currentStep === index + 1 
                        ? 'w-8 bg-indigo-600' 
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                    aria-label={`Go to step ${index + 1}`}
                  ></button>
                ))}
              </div>
            </div>
          </div>
          
          {/* Key features */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Key Platform Features
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="h-12 w-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <LightBulbIcon className="h-6 w-6 text-indigo-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Skill-Based Matching</h3>
                <p className="text-gray-600">
                  Our platform uses demonstrated coding abilities as the primary criteria for matching candidates with jobs.
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <UserGroupIcon className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Blind Hiring</h3>
                <p className="text-gray-600">
                  Eliminate unconscious bias by focusing on skills first, revealing personal details only after mutual interest.
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <ChartBarIcon className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Data-Driven Insights</h3>
                <p className="text-gray-600">
                  Get detailed analytics on your performance, industry trends, and personalized improvement recommendations.
                </p>
              </div>
            </div>
          </div>
          
          {/* Call to action */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-center shadow-lg">
            <h2 className="text-2xl font-bold text-white mb-4">Ready to Transform Your Hiring Experience?</h2>
            <p className="text-indigo-100 max-w-2xl mx-auto mb-8">
              Join thousands of developers and companies who are revolutionizing the way tech hiring works.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/profile/create"
                className="px-6 py-3 bg-white text-indigo-600 font-medium rounded-lg hover:bg-indigo-50 transition-colors transform hover:-translate-y-1 hover:shadow-lg duration-200"
              >
                Create Developer Profile
              </Link>
              <Link
                to="/companies/register"
                className="px-6 py-3 bg-indigo-500/30 text-white font-medium rounded-lg border border-white/20 hover:bg-indigo-500/50 transition-colors transform hover:-translate-y-1 hover:shadow-lg duration-200"
              >
                Register as Company
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Demo; 