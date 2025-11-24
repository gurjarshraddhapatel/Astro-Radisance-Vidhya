import React, { useState } from 'react'
import { Link } from 'react-router-dom'
// import logoImage from '../../assets/education-academy-certification-curriculum-icon.jpg'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <nav className="bg-[#92487A] shadow-lg sticky top-0 z-50 border-b border-gray-700">
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
            <Link
              to="/all-courses" 
              className="text-[#f9f1e9] hover:text-primary-blue-400 transition-colors duration-200 font-medium py-2"
            >
              All Courses 
            </Link>
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
              <Link
                to="/courses"
                onClick={() => setIsMenuOpen(false)}
                className="text-[#f9f1e9] hover:text-primary-blue-400 transition-colors duration-200 font-medium px-4 py-2 rounded-md hover:bg-gray-700"
              >
                Courses
              </Link>
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

