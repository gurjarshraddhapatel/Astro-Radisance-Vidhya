import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import WhatsappIcone from '../layout/WhatsappIcone'

const Affiliate = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    website: '',
    socialMedia: '',
    experience: '',
    message: ''
    
  })
  const [openFAQ, setOpenFAQ] = useState(null)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form submitted:', formData)
    alert('Thank you for your interest! We will contact you soon.')
    setFormData({
      name: '',
      email: '',
      phone: '',
      website: '',
      socialMedia: '',
      experience: '',
      message: ''
    })
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20 sm:py-24 lg:py-32 bg-gradient-to-br from-[#92487A] via-[#92487A] to-[#DA6422] overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block mb-6">
            <span className="text-sm font-semibold text-white uppercase tracking-wider bg-white/20 px-4 py-2 rounded-full">
              Join Our Program
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
            Become an <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-yellow-400">Affiliate Partner</span>
          </h1>
          <p className="text-xl sm:text-2xl text-white/90 max-w-3xl mx-auto mb-8 leading-relaxed">
            Earn generous commissions by promoting our world-class Vedic and Occult Science courses
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#benefits" className="bg-white text-[#92487A] px-8 py-4 rounded-lg font-semibold text-lg hover:opacity-90 transition-opacity duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform">
              Learn More
            </a>
            <a href="#register" className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/10 transition-all duration-200">
              Join Now
            </a>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-16 sm:py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Become an <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#92487A] to-[#DA6422]">Affiliate?</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Join thousands of successful affiliates earning passive income while helping others transform their lives
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Benefit 1 */}
            <div className="group relative bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-[#92487A]/30 hover:-translate-y-2">
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#92487A]/10 to-transparent rounded-bl-full"></div>
              <div className="relative">
                <div className="w-16 h-16 mb-6 rounded-xl bg-gradient-to-br from-[#92487A] to-[#DA6422] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <i className="fas fa-dollar-sign text-3xl text-white"></i>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-[#92487A] transition-colors duration-300">
                  High Commission Rates
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Earn up to 30% commission on every successful referral. The more you promote, the more you earn!
                </p>
              </div>
            </div>

            {/* Benefit 2 */}
            <div className="group relative bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-[#92487A]/30 hover:-translate-y-2">
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#DA6422]/10 to-transparent rounded-bl-full"></div>
              <div className="relative">
                <div className="w-16 h-16 mb-6 rounded-xl bg-gradient-to-br from-[#DA6422] to-[#92487A] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <i className="fas fa-clock text-3xl text-white"></i>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-[#92487A] transition-colors duration-300">
                  Lifetime Commissions
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Earn recurring commissions for the lifetime of each student you refer. Build a sustainable passive income stream.
                </p>
              </div>
            </div>

            {/* Benefit 3 */}
            <div className="group relative bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-[#92487A]/30 hover:-translate-y-2">
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#92487A]/10 to-transparent rounded-bl-full"></div>
              <div className="relative">
                <div className="w-16 h-16 mb-6 rounded-xl bg-gradient-to-br from-[#92487A] to-[#DA6422] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <i className="fas fa-chart-line text-3xl text-white"></i>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-[#92487A] transition-colors duration-300">
                  Real-Time Tracking
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Monitor your referrals, commissions, and earnings in real-time through our comprehensive affiliate dashboard.
                </p>
              </div>
            </div>

            {/* Benefit 4 */}
            <div className="group relative bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-[#92487A]/30 hover:-translate-y-2">
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#DA6422]/10 to-transparent rounded-bl-full"></div>
              <div className="relative">
                <div className="w-16 h-16 mb-6 rounded-xl bg-gradient-to-br from-[#DA6422] to-[#92487A] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <i className="fas fa-tools text-3xl text-white"></i>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-[#92487A] transition-colors duration-300">
                  Marketing Materials
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Get access to professionally designed banners, email templates, social media posts, and more to promote our courses.
                </p>
              </div>
            </div>

            {/* Benefit 5 */}
            <div className="group relative bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-[#92487A]/30 hover:-translate-y-2">
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#92487A]/10 to-transparent rounded-bl-full"></div>
              <div className="relative">
                <div className="w-16 h-16 mb-6 rounded-xl bg-gradient-to-br from-[#92487A] to-[#DA6422] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <i className="fas fa-headset text-3xl text-white"></i>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-[#92487A] transition-colors duration-300">
                  Dedicated Support
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Our affiliate support team is always ready to help you succeed with personalized guidance and assistance.
                </p>
              </div>
            </div>

            {/* Benefit 6 */}
            <div className="group relative bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-[#92487A]/30 hover:-translate-y-2">
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#DA6422]/10 to-transparent rounded-bl-full"></div>
              <div className="relative">
                <div className="w-16 h-16 mb-6 rounded-xl bg-gradient-to-br from-[#DA6422] to-[#92487A] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <i className="fas fa-money-bill-wave text-3xl text-white"></i>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-[#92487A] transition-colors duration-300">
                  Flexible Payouts
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Get paid via PayPal, bank transfer, or other convenient methods. Minimum payout threshold is just $50.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 sm:py-12 lg:py-16 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-64 h-64 bg-[#92487A] rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-[#DA6422] rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              How It <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#92487A] to-[#DA6422]">Works</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Getting started is simple and takes just a few minutes
            </p>
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {[
              {
                step: "01",
                icon: "fas fa-user-plus",
                title: "Sign Up",
                description: "Fill out our simple affiliate registration form and get approved within 24 hours",
                gradient: "from-[#92487A] to-[#DA6422]",
                bgGradient: "from-[#92487A]/5 to-[#DA6422]/5"
              },
              {
                step: "02",
                icon: "fas fa-link",
                title: "Get Your Link",
                description: "Receive your unique affiliate tracking link and marketing materials",
                gradient: "from-[#DA6422] to-[#92487A]",
                bgGradient: "from-[#DA6422]/5 to-[#92487A]/5"
              },
              {
                step: "03",
                icon: "fas fa-share-alt",
                title: "Share & Promote",
                description: "Share your link on your website, social media, email, or any platform you use",
                gradient: "from-[#92487A] to-[#DA6422]",
                bgGradient: "from-[#92487A]/5 to-[#DA6422]/5"
              },
              {
                step: "04",
                icon: "fas fa-money-bill-wave",
                title: "Earn Commissions",
                description: "Get paid automatically when someone enrolls through your affiliate link",
                gradient: "from-[#DA6422] to-[#92487A]",
                bgGradient: "from-[#DA6422]/5 to-[#92487A]/5"
              }
            ].map((item, index) => (
              <div key={index} className="group relative">
                <div className={`relative bg-gradient-to-br ${item.bgGradient} rounded-3xl p-8 h-full border-2 border-transparent hover:border-[#92487A]/30 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl`}>
                  {/* Step Number - Top Left */}
                  <div className="absolute top-4 left-4">
                    <span className={`text-4xl font-black bg-gradient-to-br ${item.gradient} bg-clip-text text-transparent opacity-20`}>
                      {item.step}
                    </span>
                  </div>
                  
                  {/* Icon Container */}
                  <div className="flex justify-center mb-6 mt-4">
                    <div className={`relative w-20 h-20 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                      <i className={`${item.icon} text-3xl`}></i>
                      <div className="absolute -inset-1 bg-gradient-to-br opacity-20 blur-xl rounded-2xl"></div>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="text-center relative z-10">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-[#92487A] transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-sm">
                      {item.description}
                    </p>
                  </div>
                  
                  {/* Decorative Corner */}
                  <div className={`absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl ${item.gradient} opacity-10 rounded-tl-full`}></div>
                  
                  {/* Connecting Arrow - Desktop Only */}
                  {index < 3 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 z-20">
                      <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${item.gradient} flex items-center justify-center text-white shadow-lg`}>
                        <i className="fas fa-arrow-right text-sm"></i>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="text-center mt-12">
            <a 
              href="#register" 
              className="inline-flex items-center gap-3 bg-gradient-to-r from-[#92487A] to-[#DA6422] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:opacity-90 transition-opacity duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform"
            >
              <span>Get Started Now</span>
              <i className="fas fa-arrow-right"></i>
            </a>
          </div>
        </div>
      </section>

      {/* Join the Academy of Vedic Vidya Affiliate Program Section */}
      <section className="py-16 sm:py-12 lg:py-16 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Side - Content */}
            <div>
              <div className="inline-block mb-4">
                <span className="text-sm font-semibold text-[#92487A] uppercase tracking-wider bg-[#92487A]/10 px-4 py-2 rounded-full">
                  Join Us Today
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Join the Academy of <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#92487A] to-[#DA6422]">Trayaksha Radiance Vidya</span> Affiliate Program
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Become part of a thriving community of affiliates who are earning passive income while helping others discover the transformative power of Vedic and Occult Sciences.
              </p>
              
              {/* Key Points */}
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-[#92487A] to-[#DA6422] flex items-center justify-center text-white">
                    <i className="fas fa-check text-sm"></i>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">No Upfront Costs</h3>
                    <p className="text-gray-600 text-sm">Join completely free with no hidden fees or monthly charges</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-[#DA6422] to-[#92487A] flex items-center justify-center text-white">
                    <i className="fas fa-check text-sm"></i>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Quick Approval</h3>
                    <p className="text-gray-600 text-sm">Get approved within 24 hours and start promoting immediately</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-[#92487A] to-[#DA6422] flex items-center justify-center text-white">
                    <i className="fas fa-check text-sm"></i>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Comprehensive Support</h3>
                    <p className="text-gray-600 text-sm">Access to marketing resources, training materials, and dedicated support team</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-[#DA6422] to-[#92487A] flex items-center justify-center text-white">
                    <i className="fas fa-check text-sm"></i>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Flexible Promotion</h3>
                    <p className="text-gray-600 text-sm">Promote through any channel - website, blog, social media, email, or YouTube</p>
                  </div>
                </div>
              </div>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="#register" 
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#92487A] to-[#DA6422] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:opacity-90 transition-opacity duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform"
                >
                  <span>Apply Now</span>
                  <i className="fas fa-arrow-right"></i>
                </a>
                <Link 
                  to="/all-courses" 
                  className="inline-flex items-center justify-center gap-2 bg-white border-2 border-[#92487A] text-[#92487A] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#92487A] hover:text-white transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform"
                >
                  <span>View Courses</span>
                  <i className="fas fa-external-link-alt"></i>
                </Link>
              </div>
            </div>
            
            {/* Right Side - Visual/Stats */}
            <div className="relative">
              <div className="bg-gradient-to-br from-[#92487A]/10 via-[#DA6422]/10 to-[#92487A]/10 rounded-3xl p-8 lg:p-12 border-2 border-[#92487A]/20">
                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="text-center bg-white rounded-2xl p-6 shadow-lg">
                    <div className="text-4xl font-bold bg-gradient-to-br from-[#92487A] to-[#DA6422] bg-clip-text text-transparent mb-2">
                      30%
                    </div>
                    <p className="text-sm text-gray-600 font-medium">Starting Commission</p>
                  </div>
                  
                  <div className="text-center bg-white rounded-2xl p-6 shadow-lg">
                    <div className="text-4xl font-bold bg-gradient-to-br from-[#DA6422] to-[#92487A] bg-clip-text text-transparent mb-2">
                      24hrs
                    </div>
                    <p className="text-sm text-gray-600 font-medium">Approval Time</p>
                  </div>
                  
                  <div className="text-center bg-white rounded-2xl p-6 shadow-lg">
                    <div className="text-4xl font-bold bg-gradient-to-br from-[#92487A] to-[#DA6422] bg-clip-text text-transparent mb-2">
                      $50
                    </div>
                    <p className="text-sm text-gray-600 font-medium">Min Payout</p>
                  </div>
                  
                  <div className="text-center bg-white rounded-2xl p-6 shadow-lg">
                    <div className="text-4xl font-bold bg-gradient-to-br from-[#DA6422] to-[#92487A] bg-clip-text text-transparent mb-2">
                      Free
                    </div>
                    <p className="text-sm text-gray-600 font-medium">To Join</p>
                  </div>
                </div>
                
                {/* Testimonial Card */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-[#92487A]">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#92487A] to-[#DA6422] flex items-center justify-center text-white font-bold">
                      SK
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">Sarah Kumar</h4>
                      <p className="text-sm text-gray-500">Top Affiliate Partner</p>
                    </div>
                  </div>
                  <p className="text-gray-700 italic">
                    "Joining this affiliate program was the best decision I made. The support is incredible and I'm earning a steady passive income while helping others learn Vedic sciences."
                  </p>
                  <div className="flex gap-1 mt-3">
                    {[...Array(5)].map((_, i) => (
                      <i key={i} className="fas fa-star text-yellow-400 text-sm"></i>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#92487A] rounded-full opacity-10 blur-2xl"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-[#DA6422] rounded-full opacity-10 blur-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Commission Structure Section */}
      <section className="py-16 sm:py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Commission <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#92487A] to-[#DA6422]">Structure</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Transparent and competitive commission rates
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Tier 1 */}
            <div className="bg-gradient-to-br from-[#92487A] to-[#DA6422] rounded-3xl p-8 text-white shadow-2xl transform hover:scale-105 transition-transform duration-300">
              <div className="text-center mb-6">
                <div className="text-5xl font-bold mb-2">30%</div>
                <h3 className="text-2xl font-bold mb-2">Starter</h3>
                <p className="text-white/80">0-10 Sales</p>
              </div>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <i className="fas fa-check-circle"></i>
                  <span>30% commission</span>
                </li>
                <li className="flex items-center gap-2">
                  <i className="fas fa-check-circle"></i>
                  <span>Marketing materials</span>
                </li>
                <li className="flex items-center gap-2">
                  <i className="fas fa-check-circle"></i>
                  <span>Email support</span>
                </li>
              </ul>
            </div>

            {/* Tier 2 */}
            <div className="bg-gradient-to-br from-[#DA6422] to-[#92487A] rounded-3xl p-8 text-white shadow-2xl transform hover:scale-105 transition-transform duration-300 relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-gray-900 px-4 py-1 rounded-full text-sm font-bold">
                POPULAR
              </div>
              <div className="text-center mb-6 mt-4">
                <div className="text-5xl font-bold mb-2">35%</div>
                <h3 className="text-2xl font-bold mb-2">Professional</h3>
                <p className="text-white/80">11-50 Sales</p>
              </div>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <i className="fas fa-check-circle"></i>
                  <span>35% commission</span>
                </li>
                <li className="flex items-center gap-2">
                  <i className="fas fa-check-circle"></i>
                  <span>Priority support</span>
                </li>
                <li className="flex items-center gap-2">
                  <i className="fas fa-check-circle"></i>
                  <span>Custom banners</span>
                </li>
                <li className="flex items-center gap-2">
                  <i className="fas fa-check-circle"></i>
                  <span>Monthly webinars</span>
                </li>
              </ul>
            </div>

            {/* Tier 3 */}
            <div className="bg-gradient-to-br from-[#92487A] to-[#DA6422] rounded-3xl p-8 text-white shadow-2xl transform hover:scale-105 transition-transform duration-300">
              <div className="text-center mb-6">
                <div className="text-5xl font-bold mb-2">40%</div>
                <h3 className="text-2xl font-bold mb-2">Elite</h3>
                <p className="text-white/80">50+ Sales</p>
              </div>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <i className="fas fa-check-circle"></i>
                  <span>40% commission</span>
                </li>
                <li className="flex items-center gap-2">
                  <i className="fas fa-check-circle"></i>
                  <span>Dedicated manager</span>
                </li>
                <li className="flex items-center gap-2">
                  <i className="fas fa-check-circle"></i>
                  <span>Exclusive deals</span>
                </li>
                <li className="flex items-center gap-2">
                  <i className="fas fa-check-circle"></i>
                  <span>Co-marketing opportunities</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Form Section */}
      <section id="register" className="py-16 sm:py-12 lg:py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Join Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#92487A] to-[#DA6422]">Affiliate Program</span>
            </h2>
            <p className="text-lg text-gray-600">
              Fill out the form below and start earning commissions today
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-gray-100">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#92487A] focus:outline-none transition-colors duration-300"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#92487A] focus:outline-none transition-colors duration-300"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#92487A] focus:outline-none transition-colors duration-300"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div>
                  <label htmlFor="website" className="block text-sm font-semibold text-gray-700 mb-2">
                    Website/Blog URL
                  </label>
                  <input
                    type="url"
                    id="website"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#92487A] focus:outline-none transition-colors duration-300"
                    placeholder="https://yourwebsite.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="socialMedia" className="block text-sm font-semibold text-gray-700 mb-2">
                  Social Media Profiles
                </label>
                <input
                  type="text"
                  id="socialMedia"
                  name="socialMedia"
                  value={formData.socialMedia}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#92487A] focus:outline-none transition-colors duration-300"
                  placeholder="Instagram, YouTube, Facebook handles"
                />
              </div>

              <div>
                <label htmlFor="experience" className="block text-sm font-semibold text-gray-700 mb-2">
                  Affiliate Marketing Experience
                </label>
                <select
                  id="experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#92487A] focus:outline-none transition-colors duration-300"
                >
                  <option value="">Select experience level</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                  <option value="expert">Expert</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                  Tell Us About Yourself
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#92487A] focus:outline-none transition-colors duration-300 resize-none"
                  placeholder="Why do you want to become an affiliate? How do you plan to promote our courses?"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#92487A] to-[#DA6422] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:opacity-90 transition-opacity duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform flex items-center justify-center space-x-2"
              >
                <span>Submit Application</span>
                <i className="fas fa-arrow-right"></i>
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 sm:py-12 lg:py-16 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#92487A] rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#DA6422] rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <span className="text-sm font-semibold text-[#92487A] uppercase tracking-wider bg-[#92487A]/10 px-4 py-2 rounded-full">
                Got Questions?
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#92487A] to-[#DA6422]">Questions</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Find answers to common questions about our affiliate program
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                question: "How do I get paid?",
                answer: "You can receive payments via PayPal, bank transfer, or other methods. We process payments monthly with a minimum payout threshold of $50. All payments are processed securely and you'll receive detailed payment reports in your affiliate dashboard.",
                icon: "fas fa-money-bill-wave"
              },
              {
                question: "How long does it take to get approved?",
                answer: "Most applications are reviewed and approved within 24-48 hours. You'll receive an email notification once your application is processed. In some cases, we may need additional information, which we'll request via email.",
                icon: "fas fa-clock"
              },
              {
                question: "Do I need a website to become an affiliate?",
                answer: "While having a website is helpful, it's not required. You can promote our courses through social media, email, YouTube, or any other platform you use. We support affiliates who promote through various channels including Instagram, Facebook, TikTok, blogs, and more.",
                icon: "fas fa-globe"
              },
              {
                question: "How are referrals tracked?",
                answer: "Each affiliate receives a unique tracking link. When someone clicks your link and enrolls in a course, the sale is automatically credited to your account. Our tracking system uses cookies to ensure accurate attribution, and you can monitor all your referrals in real-time through your affiliate dashboard.",
                icon: "fas fa-chart-line"
              },
              {
                question: "Can I promote multiple courses?",
                answer: "Yes! You can promote any or all of our courses. You'll earn commissions on every successful enrollment through your affiliate link. We recommend promoting courses that align with your audience's interests for better conversion rates.",
                icon: "fas fa-graduation-cap"
              },
              {
                question: "Is there a limit to how much I can earn?",
                answer: "No, there's no earning limit! The more you promote, the more you can earn. Top affiliates earn thousands of dollars monthly. Your earning potential is unlimited, and as you reach higher tiers, you'll enjoy even better commission rates.",
                icon: "fas fa-infinity"
              }
            ].map((faq, index) => (
              <div 
                key={index} 
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-gray-100 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left group"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                      openFAQ === index 
                        ? 'bg-gradient-to-br from-[#92487A] to-[#DA6422] text-white' 
                        : 'bg-gradient-to-br from-[#92487A]/10 to-[#DA6422]/10 text-[#92487A]'
                    }`}>
                      <i className={`${faq.icon} text-lg`}></i>
                    </div>
                    <h3 className={`text-lg sm:text-xl font-bold transition-colors duration-300 ${
                      openFAQ === index ? 'text-[#92487A]' : 'text-gray-900'
                    }`}>
                      {faq.question}
                    </h3>
                  </div>
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                    openFAQ === index 
                      ? 'bg-gradient-to-br from-[#92487A] to-[#DA6422] text-white rotate-180' 
                      : 'bg-gray-100 text-gray-600 group-hover:bg-gray-200'
                  }`}>
                    <i className="fas fa-chevron-down text-sm"></i>
                  </div>
                </button>
                
                <div className={`overflow-hidden transition-all duration-500 ${
                  openFAQ === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <div className="px-6 pb-6 pl-20">
                    <div className="pt-4 border-t border-gray-100">
                      <p className="text-gray-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Help CTA */}
          <div className="mt-12 text-center">
            <div className="bg-gradient-to-br from-[#92487A]/10 to-[#DA6422]/10 rounded-2xl p-8 border-2 border-[#92487A]/20">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Still have questions?
              </h3>
              <p className="text-gray-600 mb-6">
                Our support team is here to help you succeed. Reach out anytime!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="mailto:support@example.com" 
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#92487A] to-[#DA6422] text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform"
                >
                  <i className="fas fa-envelope"></i>
                  <span>Contact Support</span>
                </a>
                <a 
                  href="#register" 
                  className="inline-flex items-center justify-center gap-2 bg-white border-2 border-[#92487A] text-[#92487A] px-6 py-3 rounded-lg font-semibold hover:bg-[#92487A] hover:text-white transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform"
                >
                  <i className="fas fa-user-plus"></i>
                  <span>Join Now</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-12 lg:py-16 bg-gradient-to-br from-[#92487A] to-[#DA6422]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Start Earning?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join our affiliate program today and start earning commissions while helping others discover the power of Vedic and Occult Sciences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#register" className="bg-white text-[#92487A] px-8 py-4 rounded-lg font-semibold text-lg hover:opacity-90 transition-opacity duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform">
              Apply Now
            </a>
            <Link to="/all-courses" className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/10 transition-all duration-200">
              View Courses
            </Link>
          </div>
        </div>
      </section>

      <WhatsappIcone />
    </>
  )
}

export default Affiliate

