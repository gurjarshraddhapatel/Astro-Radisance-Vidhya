import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-[#180326] border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center space-x-3 mb-4">
              <div className="text-2xl font-bold bg-gradient-to-r from-primary-blue-400 to-primary-green-400 bg-clip-text text-transparent">
                Astro Radiance Vidhya
              </div>
            </Link>
            <p className="text-white/70 text-sm mb-4 leading-relaxed">
              India's No.1 Academy For Vedic & Occult Science Courses. Learn from expert instructors and get globally recognized certificates.
            </p>
            {/* Social Media Links */}
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-primary-blue-400 transition-colors duration-200"
                aria-label="Facebook"
              >
                <i className="fab fa-facebook-f text-xl"></i>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-primary-blue-400 transition-colors duration-200"
                aria-label="Twitter"
              >
                <i className="fab fa-twitter text-xl"></i>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-primary-blue-400 transition-colors duration-200"
                aria-label="Instagram"
              >
                <i className="fab fa-instagram text-xl"></i>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-primary-blue-400 transition-colors duration-200"
                aria-label="YouTube"
              >
                <i className="fab fa-youtube text-xl"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="text-white/70 hover:text-primary-blue-400 transition-colors duration-200 text-sm"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/courses"
                  className="text-white/70 hover:text-primary-blue-400 transition-colors duration-200 text-sm"
                >
                  Courses
                </Link>
              </li>
              <li>
                <Link
                  to="/important-links"
                  className="text-white/70 hover:text-primary-blue-400 transition-colors duration-200 text-sm"
                >
                  Important Links
                </Link>
              </li>
              <li>
                <Link
                  to="/payment"
                  className="text-white/70 hover:text-primary-blue-400 transition-colors duration-200 text-sm"
                >
                  Payment
                </Link>
              </li>
              <li>
                <Link
                  to="/career"
                  className="text-white/70 hover:text-primary-blue-400 transition-colors duration-200 text-sm"
                >
                  Career
                </Link>
              </li>
            </ul>
          </div>

          {/* Courses */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Popular Courses</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/courses/vedic-astrology"
                  className="text-white/70 hover:text-primary-blue-400 transition-colors duration-200 text-sm"
                >
                  Vedic Astrology
                </Link>
              </li>
              <li>
                <Link
                  to="/courses/vedic-numerology"
                  className="text-white/70 hover:text-primary-blue-400 transition-colors duration-200 text-sm"
                >
                  Vedic Numerology
                </Link>
              </li>
              <li>
                <Link
                  to="/courses/vastu-shastra"
                  className="text-white/70 hover:text-primary-blue-400 transition-colors duration-200 text-sm"
                >
                  Vastu Shastra
                </Link>
              </li>
              <li>
                <Link
                  to="/courses/palmistry"
                  className="text-white/70 hover:text-primary-blue-400 transition-colors duration-200 text-sm"
                >
                  Palmistry
                </Link>
              </li>
              <li>
                <Link
                  to="/courses/crystal-healing"
                  className="text-white/70 hover:text-primary-blue-400 transition-colors duration-200 text-sm"
                >
                  Crystal Healing
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <i className="fas fa-phone text-primary-blue-400 mt-1"></i>
                <a
                  href="tel:+1234567890"
                  className="text-white/70 hover:text-primary-blue-400 transition-colors duration-200 text-sm"
                >
                  +91 1234567890
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <i className="fas fa-envelope text-primary-blue-400 mt-1"></i>
                <a
                  href="mailto:info@astroradiancevidhya.com"
                  className="text-white/70 hover:text-primary-blue-400 transition-colors duration-200 text-sm"
                >
                  info@astroradiancevidhya.com
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <i className="fas fa-map-marker-alt text-primary-blue-400 mt-1"></i>
                <span className="text-white/70 text-sm">
                  India
                </span>
              </li>
              <li className="pt-2">
                <a
                  href="tel:+1234567890"
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-blue-600 to-primary-green-600 text-white px-4 py-2 rounded-lg font-medium text-sm hover:opacity-90 transition-opacity duration-200"
                >
                  <i className="fas fa-phone"></i>
                  <span>Call Now</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-white/60 text-sm text-center sm:text-left">
              © {new Date().getFullYear()} Astro Radiance Vidhya. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link
                to="/privacy-policy"
                className="text-white/60 hover:text-primary-blue-400 transition-colors duration-200"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms-conditions"
                className="text-white/60 hover:text-primary-blue-400 transition-colors duration-200"
              >
                Terms & Conditions
              </Link>
              <Link
                to="/affiliate"
                className="text-white/60 hover:text-primary-blue-400 transition-colors duration-200"
              >
                Affiliate Program
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
