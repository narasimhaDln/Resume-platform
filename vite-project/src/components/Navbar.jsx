import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { supabase } from "../utils/supabaseClient";
import { Transition } from "@headlessui/react";
import {
  UserCircleIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

function Navbar() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const profileRef = useRef(null);

  // Handle scrolling effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target) && isProfileOpen) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isProfileOpen]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  // Check if a link is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md" : "bg-white/80 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center group">
              <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent group-hover:from-purple-600 group-hover:to-indigo-600 transition-all duration-300">
                Anti-Resume
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/findjobs"
              className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200 
                ${isActive("/findjobs") ? "text-indigo-600" : "text-gray-600 hover:text-indigo-600"}`}
            >
              Find Jobs
              {isActive("/findjobs") && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600"></span>
              )}
            </Link>

            <Link
              to="/postjob"
              className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition-colors duration-200"
            >
              Post Job
            </Link>

            <Link
              to="/challenges"
              className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200 
                ${isActive("/challenges") ? "text-indigo-600" : "text-gray-600 hover:text-indigo-600"}`}
            >
              Challenges
              {isActive("/challenges") && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 transform transition-transform"></span>
              )}
            </Link>

            <Link
              to="/companies"
              className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200 
                ${isActive("/companies") ? "text-indigo-600" : "text-gray-600 hover:text-indigo-600"}`}
            >
              Companies
              {isActive("/companies") && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 transform transition-transform"></span>
              )}
            </Link>

            <div className="relative" ref={profileRef}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsProfileOpen(!isProfileOpen);
                }}
                className="flex items-center text-gray-600 hover:text-indigo-600 transition-colors duration-200 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <UserCircleIcon className="h-8 w-8" />
              </button>

              <Transition
                show={isProfileOpen}
                enter="transition ease-out duration-200"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-150"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-1 ring-1 ring-black ring-opacity-5 border border-gray-100">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors duration-200"
                  >
                    Your Profile
                  </Link>
                  <div className="border-t border-gray-100 my-1"></div>
                  <button
                    onClick={handleSignOut}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors duration-200"
                  >
                    Sign Out
                  </button>
                </div>
              </Transition>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 p-2 rounded-md"
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <Transition
          show={isMobileMenuOpen}
          enter="transition ease-out duration-200"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-150"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link
                to="/findjobs"
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive("/findjobs")
                    ? "bg-indigo-50 text-indigo-600"
                    : "text-gray-600 hover:text-indigo-600 hover:bg-indigo-50"
                } transition-colors duration-200`}
              >
                Find Jobs
              </Link>
              <Link
                to="/postjob"
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive("/postjob")
                    ? "bg-indigo-50 text-indigo-600"
                    : "text-indigo-600 hover:bg-indigo-700 hover:text-white"
                } transition-colors duration-200 ${isActive("/postjob") ? "" : "bg-indigo-50"}`}
              >
                Post Job
              </Link>
              <Link
                to="/challenges"
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive("/challenges")
                    ? "bg-indigo-50 text-indigo-600"
                    : "text-gray-600 hover:text-indigo-600 hover:bg-indigo-50"
                } transition-colors duration-200`}
              >
                Challenges
              </Link>
              <Link
                to="/companies"
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive("/companies")
                    ? "bg-indigo-50 text-indigo-600"
                    : "text-gray-600 hover:text-indigo-600 hover:bg-indigo-50"
                } transition-colors duration-200`}
              >
                Companies
              </Link>
              <Link
                to="/profile"
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive("/profile")
                    ? "bg-indigo-50 text-indigo-600"
                    : "text-gray-600 hover:text-indigo-600 hover:bg-indigo-50"
                } transition-colors duration-200`}
              >
                Your Profile
              </Link>
              <div className="border-t border-gray-100 my-1"></div>
              <button
                onClick={handleSignOut}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 transition-colors duration-200"
              >
                Sign Out
              </button>
            </div>
          </div>
        </Transition>
      </div>
    </nav>
  );
}

export default Navbar;
