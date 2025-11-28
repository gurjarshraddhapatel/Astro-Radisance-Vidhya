import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
// import logoImage from '../../assets/education-academy-certification-curriculum-icon.jpg'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCoursesDropdownOpen, setIsCoursesDropdownOpen] = useState(false)
  const [isMobileCoursesOpen, setIsMobileCoursesOpen] = useState(false)
  const dropdownRef = useRef(null)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  // Courses data
  const courses = [
    { id: 1, title: 'Vedic Astrology', icon: 'fas fa-star' },
    { id: 2, title: 'Vedic Numerology', icon: 'fas fa-calculator' },
    { id: 3, title: 'Vastu Shastra', icon: 'fas fa-home' },
    { id: 4, title: 'Palmistry', icon: 'fas fa-hand-sparkles' },
    { id: 5, title: 'Crystal Healing', icon: 'fas fa-gem' },
    { id: 6, title: 'Tarot Card Reading', icon: 'fas fa-cards' },
    { id: 7, title: 'Reiki Healing', icon: 'fas fa-hands-heart', comingSoon: true },
    { id: 8, title: 'Feng Shui', icon: 'fas fa-yin-yang', comingSoon: true },
    { id: 9, title: 'Meditation & Mindfulness', icon: 'fas fa-om', comingSoon: true }
  ]

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsCoursesDropdownOpen(false)
      }
    }

    if (isCoursesDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isCoursesDropdownOpen])

  return (
    <nav className="bg-[#540863] shadow-lg sticky top-0 z-50 border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 flex-shrink-0">
            <img 
              src=""
              alt="Trayaksha Vidhya Logo" 
              className="h-10 w-10 object-contain"
            />
            <div className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-primary-blue-400 to-primary-green-400 bg-clip-text text-transparent whitespace-nowrap">
              Trayaksha Vidhya
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <Link
              to="/"
              className="text-[#f9f1e9] hover:text-primary-blue-400 transition-colors duration-200 font-medium py-2"
            >
              Home
            </Link>
            
            {/* Courses Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsCoursesDropdownOpen(!isCoursesDropdownOpen)}
                className="text-[#f9f1e9] hover:text-primary-blue-400 transition-colors duration-200 font-medium py-2 flex items-center gap-2"
              >
                All Courses
                <i className={`fas fa-chevron-down text-xs transition-transform duration-200 ${isCoursesDropdownOpen ? 'rotate-180' : ''}`}></i>
              </button>
              
              {/* Dropdown Menu */}
              {isCoursesDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-lg shadow-2xl border border-gray-200 py-2 z-50 transform transition-all duration-200 ease-out">
                  <div className="max-h-96 overflow-y-auto">
                    {/* View All Courses Link */}
                    <Link
                      to="/all-courses"
                      onClick={() => setIsCoursesDropdownOpen(false)}
                      className="block px-4 py-3 text-[#92487A] font-semibold border-b border-gray-200 hover:bg-gray-50 transition-colors"
                    >
                      <i className="fas fa-th mr-2"></i>
                      View All Courses
                    </Link>
                    
                    {/* Individual Courses */}
                    {courses.map((course) => (
                      <Link
                        key={course.id}
                        to={course.comingSoon ? '#' : `/course/${course.id}`}
                        onClick={(e) => {
                          setIsCoursesDropdownOpen(false)
                          if (course.comingSoon) {
                            e.preventDefault()
                          }
                        }}
                        className={`block px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0 ${
                          course.comingSoon ? 'opacity-60 cursor-not-allowed' : ''
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <i className={`${course.icon} text-[#92487A] w-5`}></i>
                            <span className="text-gray-800 font-medium">{course.title}</span>
                          </div>
                          {course.comingSoon && (
                            <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded">
                              Soon
                            </span>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <Link
              to="/important-links"
              className="text-[#f9f1e9] hover:text-primary-blue-400 transition-colors duration-200 font-medium py-2"
            >
              Important Links
            </Link>
            <Link
              to="/payment"
              className="text-[#f9f1e9] hover:text-primary-blue-400 transition-colors duration-200 font-medium py-2"
            >
              Payment
            </Link>
            <Link
              to="/career"
              className="text-[#f9f1e9] hover:text-primary-blue-400 transition-colors duration-200 font-medium py-2"
            >
              Career
            </Link>
            <Link
              to="/affiliate"
              className="text-[#f9f1e9] hover:text-primary-blue-400 transition-colors duration-200 font-medium py-2"
            >
              Affiliate with us
            </Link>
            <a
              href="tel:+1234567890"
              className="bg-[#DA6422] text-white px-4 py-2 rounded-md font-medium hover:opacity-90 transition-opacity duration-200 flex items-center space-x-2"
            >
              <i className="fas fa-phone"></i>
              <span>Call us</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center justify-end flex-shrink-0 md:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 text-[#f9f1e9] hover:text-primary-blue-400 transition-colors duration-200"
              aria-label="Menu"
            >
              <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-700">
            <div className="flex flex-col space-y-3">
              <Link
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className="text-[#f9f1e9] hover:text-primary-blue-400 transition-colors duration-200 font-medium px-4 py-2 rounded-md hover:bg-gray-700"
              >
                Home
              </Link>
              
              {/* Mobile Courses Dropdown */}
              <div>
                <button
                  onClick={() => setIsMobileCoursesOpen(!isMobileCoursesOpen)}
                  className="w-full text-left text-[#f9f1e9] hover:text-primary-blue-400 transition-colors duration-200 font-medium px-4 py-2 rounded-md hover:bg-gray-700 flex items-center justify-between"
                >
                  <span>All Courses</span>
                  <i className={`fas fa-chevron-down transition-transform duration-200 ${isMobileCoursesOpen ? 'rotate-180' : ''}`}></i>
                </button>
                
                {isMobileCoursesOpen && (
                  <div className="mt-2 ml-4 space-y-2 border-l-2 border-gray-600 pl-4">
                    <Link
                      to="/all-courses"
                      onClick={() => {
                        setIsMenuOpen(false)
                        setIsMobileCoursesOpen(false)
                      }}
                      className="block text-[#f9f1e9] hover:text-primary-blue-400 transition-colors duration-200 font-medium py-2 rounded-md hover:bg-gray-700/50"
                    >
                      <i className="fas fa-th mr-2"></i>
                      View All Courses
                    </Link>
                    {courses.map((course) => (
                      <Link
                        key={course.id}
                        to={course.comingSoon ? '#' : `/course/${course.id}`}
                        onClick={(e) => {
                          setIsMenuOpen(false)
                          setIsMobileCoursesOpen(false)
                          if (course.comingSoon) {
                            e.preventDefault()
                          }
                        }}
                        className={`block text-[#f9f1e9] hover:text-primary-blue-400 transition-colors duration-200 py-2 rounded-md hover:bg-gray-700/50 ${
                          course.comingSoon ? 'opacity-60' : ''
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <i className={`${course.icon} text-sm w-4`}></i>
                            <span>{course.title}</span>
                          </div>
                          {course.comingSoon && (
                            <span className="text-xs bg-gray-600 text-white px-2 py-0.5 rounded">
                              Soon
                            </span>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              <Link
                to="/important-links"
                onClick={() => setIsMenuOpen(false)}
                className="text-[#f9f1e9] hover:text-primary-blue-400 transition-colors duration-200 font-medium px-4 py-2 rounded-md hover:bg-gray-700"
              >
                Important Links
              </Link>
              <Link
                to="/payment"
                onClick={() => setIsMenuOpen(false)}
                className="text-[#f9f1e9] hover:text-primary-blue-400 transition-colors duration-200 font-medium px-4 py-2 rounded-md hover:bg-gray-700"
              >
                Payment
              </Link>
              <Link
                to="/career"
                onClick={() => setIsMenuOpen(false)}
                className="text-[#f9f1e9] hover:text-primary-blue-400 transition-colors duration-200 font-medium px-4 py-2 rounded-md hover:bg-gray-700"
              >
                Career
              </Link>
              <Link
                to="/affiliate"
                onClick={() => setIsMenuOpen(false)}
                className="text-[#f9f1e9] hover:text-primary-blue-400 transition-colors duration-200 font-medium px-4 py-2 rounded-md hover:bg-gray-700"
              >
                Affiliate with us
              </Link>
              <a
                href="tel:+1234567890"
                onClick={() => setIsMenuOpen(false)}
                className="bg-gradient-to-r from-primary-blue-100 to-primary-green-600 text-white px-4 py-2 rounded-md font-medium hover:opacity-90 transition-opacity duration-200 flex items-center justify-center space-x-2 mt-2"
              >
                <i className="fas fa-phone"></i>
                <span>Call us</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar

