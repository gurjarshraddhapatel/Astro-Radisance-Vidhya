import React, { useEffect, useRef, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import WhatsappIcone from '../layout/WhatsappIcone'

const CourseInnerpage = () => {
  const { courseId } = useParams()
  const canvasRef = useRef(null)
  const particlesArrayRef = useRef([])
  const animationFrameRef = useRef(null)
  const headerRef = useRef(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    alert('Thank you! We will send you the course details soon.')
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: ''
    })
  }

  // Course data - matching Allcourses.jsx
  const courses = [
    {
      id: 1,
      title: 'Vedic Astrology',
      description: 'Master the ancient science of Vedic Astrology and learn to predict life events with precision. Understand planetary positions, birth charts, and their impact on human life.',
      icon: 'fas fa-star',
      iconColor: 'text-primary-blue-400',
      features: ['Birth Chart Analysis', 'Planetary Positions', 'Dasha Systems', 'Remedial Measures'],
      duration: '12 Weeks',
      level: 'Beginner to Advanced',
      language: 'Hindi & English',
      price: '₹15,999',
      originalPrice: '₹25,999',
      curriculum: [
        { module: 'Introduction to Vedic Astrology', lessons: 5, duration: '2 hours' },
        { module: 'Planetary Positions & Houses', lessons: 8, duration: '4 hours' },
        { module: 'Birth Chart Analysis', lessons: 10, duration: '6 hours' },
        { module: 'Dasha Systems', lessons: 7, duration: '4 hours' },
        { module: 'Remedial Measures', lessons: 6, duration: '3 hours' },
        { module: 'Practical Applications', lessons: 9, duration: '5 hours' }
      ]
    },
    {
      id: 2,
      title: 'Vedic Numerology',
      description: 'Discover the power of numbers and their influence on your life through Vedic Numerology. Learn to calculate and interpret life path numbers, destiny numbers, and more.',
      icon: 'fas fa-calculator',
      iconColor: 'text-primary-green-400',
      features: ['Life Path Numbers', 'Destiny Numbers', 'Name Numerology', 'Compatibility Analysis'],
      duration: '10 Weeks',
      level: 'Beginner to Intermediate',
      language: 'Hindi & English',
      price: '₹12,999',
      originalPrice: '₹20,999',
      curriculum: [
        { module: 'Introduction to Numerology', lessons: 4, duration: '2 hours' },
        { module: 'Life Path Numbers', lessons: 6, duration: '3 hours' },
        { module: 'Destiny Numbers', lessons: 5, duration: '3 hours' },
        { module: 'Name Numerology', lessons: 7, duration: '4 hours' },
        { module: 'Compatibility Analysis', lessons: 6, duration: '3 hours' }
      ]
    },
    {
      id: 3,
      title: 'Vastu Shastra',
      description: 'Learn the art of Vastu Shastra to create harmonious living and working spaces. Understand the principles of directional energy and how to optimize your environment.',
      icon: 'fas fa-home',
      iconColor: 'text-primary-blue-400',
      features: ['Directional Energy', 'Space Planning', 'Remedial Solutions', 'Commercial Vastu'],
      duration: '8 Weeks',
      level: 'Beginner to Advanced',
      language: 'Hindi & English',
      price: '₹14,999',
      originalPrice: '₹22,999',
      curriculum: [
        { module: 'Vastu Fundamentals', lessons: 5, duration: '3 hours' },
        { module: 'Directional Energy', lessons: 6, duration: '4 hours' },
        { module: 'Space Planning', lessons: 7, duration: '4 hours' },
        { module: 'Remedial Solutions', lessons: 5, duration: '3 hours' },
        { module: 'Commercial Vastu', lessons: 6, duration: '4 hours' }
      ]
    },
    {
      id: 4,
      title: 'Palmistry',
      description: 'Read palms and understand personality traits, life events, and future predictions. Master the art of palm reading with comprehensive training on hand analysis.',
      icon: 'fas fa-hand-sparkles',
      iconColor: 'text-primary-green-400',
      features: ['Hand Shape Analysis', 'Line Reading', 'Mount Interpretation', 'Life Predictions'],
      duration: '10 Weeks',
      level: 'Beginner to Advanced',
      language: 'Hindi & English',
      price: '₹13,999',
      originalPrice: '₹21,999',
      curriculum: [
        { module: 'Introduction to Palmistry', lessons: 4, duration: '2 hours' },
        { module: 'Hand Shape Analysis', lessons: 5, duration: '3 hours' },
        { module: 'Line Reading', lessons: 8, duration: '5 hours' },
        { module: 'Mount Interpretation', lessons: 6, duration: '4 hours' },
        { module: 'Life Predictions', lessons: 7, duration: '4 hours' }
      ]
    },
    {
      id: 5,
      title: 'Crystal Healing',
      description: 'Harness the healing power of crystals and gemstones for physical and spiritual wellness. Learn to use crystals for energy healing and chakra balancing.',
      icon: 'fas fa-gem',
      iconColor: 'text-primary-blue-400',
      features: ['Crystal Properties', 'Chakra Healing', 'Crystal Grids', 'Healing Techniques'],
      duration: '8 Weeks',
      level: 'Beginner to Intermediate',
      language: 'Hindi & English',
      price: '₹11,999',
      originalPrice: '₹19,999',
      curriculum: [
        { module: 'Crystal Fundamentals', lessons: 4, duration: '2 hours' },
        { module: 'Crystal Properties', lessons: 6, duration: '3 hours' },
        { module: 'Chakra Healing', lessons: 7, duration: '4 hours' },
        { module: 'Crystal Grids', lessons: 5, duration: '3 hours' },
        { module: 'Healing Techniques', lessons: 6, duration: '4 hours' }
      ]
    },
    {
      id: 6,
      title: 'Tarot Card Reading',
      description: 'Master the art of Tarot card reading and provide insightful guidance to others. Learn card meanings, spreads, and interpretation techniques.',
      icon: 'fas fa-cards',
      iconColor: 'text-primary-green-400',
      features: ['Card Meanings', 'Reading Spreads', 'Intuition Development', 'Professional Practice'],
      duration: '10 Weeks',
      level: 'Beginner to Advanced',
      language: 'Hindi & English',
      price: '₹12,999',
      originalPrice: '₹20,999',
      curriculum: [
        { module: 'Tarot Basics', lessons: 5, duration: '3 hours' },
        { module: 'Card Meanings', lessons: 8, duration: '5 hours' },
        { module: 'Reading Spreads', lessons: 6, duration: '4 hours' },
        { module: 'Intuition Development', lessons: 5, duration: '3 hours' },
        { module: 'Professional Practice', lessons: 6, duration: '4 hours' }
      ]
    }
  ]

  const course = courses.find(c => c.id === parseInt(courseId))

  // Particle animation for hero section
  useEffect(() => {
    const canvas = canvasRef.current
    const header = headerRef.current
    if (!canvas || !header) return

    let width = window.innerWidth
    let height = window.innerHeight

    const ctx = canvas.getContext('2d')
    header.style.height = height + 'px'
    canvas.width = width
    canvas.height = height

    const numParticles = 100

    class Particle {
      constructor(x, y, size, speedX, speedY) {
        this.x = x
        this.y = y
        this.size = size
        this.speedX = speedX
        this.speedY = speedY
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1
      }

      draw() {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)'
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const particles = []
    for (let i = 0; i < numParticles; i++) {
      let size = Math.random() * 3 + 1
      let x = Math.random() * canvas.width
      let y = Math.random() * canvas.height
      let speedX = (Math.random() - 0.5) * 1.5
      let speedY = (Math.random() - 0.5) * 1.5
      particles.push(new Particle(x, y, size, speedX, speedY))
    }
    particlesArrayRef.current = particles

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (let particle of particlesArrayRef.current) {
        particle.update()
        particle.draw()
      }
      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      width = window.innerWidth
      height = window.innerHeight
      header.style.height = height + 'px'
      canvas.width = width
      canvas.height = height
    }

    window.addEventListener('resize', handleResize)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Course Not Found</h1>
          <Link to="/all-courses" className="text-[#92487A] hover:underline">
            Back to All Courses
          </Link>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Hero Section with Particle Animation */}
      <div
        ref={headerRef}
        className="relative w-full bg-gradient-to-br from-[#92487A] via-[#92487A] to-[#DA6422] overflow-hidden"
      >
        <canvas ref={canvasRef} className="absolute inset-0 z-0"></canvas>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Content */}
            <div className="text-center lg:text-left">
              <div className="inline-block mb-6">
                <div className={`w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4 mx-auto lg:mx-0`}>
                  <i className={`${course.icon} text-4xl text-white`}></i>
                </div>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
                {course.title}
              </h1>
              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                {course.description}
              </p>
              
              {/* Course Info */}
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start mb-8">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                  <i className="fas fa-clock text-white mr-2"></i>
                  <span className="text-white font-medium">{course.duration}</span>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                  <i className="fas fa-signal text-white mr-2"></i>
                  <span className="text-white font-medium">{course.level}</span>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                  <i className="fas fa-language text-white mr-2"></i>
                  <span className="text-white font-medium">{course.language}</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button className="bg-white text-[#92487A] px-8 py-4 rounded-lg font-semibold text-lg hover:opacity-90 transition-opacity duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform">
                  Enroll Now
                </button>
                <Link
                  to="/all-courses"
                  className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/10 transition-all duration-200 text-center"
                >
                  View All Courses
                </Link>
              </div>
            </div>

            {/* Right Side - Pricing Card */}
            <div className="flex justify-center lg:justify-end">
              <div className="bg-white rounded-3xl p-8 shadow-2xl max-w-md w-full">
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold text-[#92487A] mb-2">{course.price}</div>
                  <div className="text-lg text-gray-500 line-through">{course.originalPrice}</div>
                  <div className="text-sm text-green-600 font-semibold mt-2">Save ₹{(parseInt(course.originalPrice.replace('₹', '').replace(',', '')) - parseInt(course.price.replace('₹', '').replace(',', ''))).toLocaleString('en-IN')}</div>
                </div>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3">
                    <i className="fas fa-check-circle text-[#92487A]"></i>
                    <span className="text-gray-700">Lifetime Access</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <i className="fas fa-check-circle text-[#92487A]"></i>
                    <span className="text-gray-700">Certificate of Completion</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <i className="fas fa-check-circle text-[#92487A]"></i>
                    <span className="text-gray-700">1-on-1 Mentorship</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <i className="fas fa-check-circle text-[#92487A]"></i>
                    <span className="text-gray-700">100% Live Online Classes</span>
                  </div>
                </div>

                <button className="w-full bg-gradient-to-r from-[#92487A] to-[#DA6422] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:opacity-90 transition-opacity duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform">
                  Enroll Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* What You'll Learn Section */}
      <section className="py-16 sm:py-20 lg:py-16 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 right-10 w-72 h-72 bg-[#92487A] rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-[#DA6422] rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <span className="text-sm font-semibold text-[#92487A] uppercase tracking-wider bg-[#92487A]/10 px-4 py-2 rounded-full">
                Course Outcomes
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              What You'll <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#92487A] to-[#DA6422]">Learn</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Master essential skills and knowledge through our comprehensive curriculum
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {course.features.map((feature, index) => {
              const icons = [
                'fas fa-star',
                'fas fa-chart-line',
                'fas fa-book-open',
                'fas fa-lightbulb'
              ]
              const gradients = [
                'from-[#92487A] to-[#DA6422]',
                'from-[#DA6422] to-[#92487A]',
                'from-[#92487A] to-[#DA6422]',
                'from-[#DA6422] to-[#92487A]'
              ]
              
              return (
                <div 
                  key={index} 
                  className="group relative bg-white rounded-2xl p-6 lg:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border-2 border-transparent hover:border-[#92487A]/30 overflow-hidden"
                >
                  {/* Animated Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${gradients[index % gradients.length]} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                  
                  {/* Decorative Corner */}
                  <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${gradients[index % gradients.length]} opacity-10 rounded-bl-full`}></div>
                  
                  <div className="relative z-10 flex items-start gap-5">
                    {/* Icon Container */}
                    <div className={`flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br ${gradients[index % gradients.length]} flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                      <i className={`${icons[index % icons.length] || 'fas fa-check'} text-white text-xl`}></i>
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 text-lg lg:text-xl mb-2 group-hover:text-[#92487A] transition-colors duration-300">
                        {feature}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <i className="fas fa-check-circle text-[#92487A]"></i>
                        <span>Included in course</span>
                      </div>
                    </div>
                    
                    {/* Arrow Icon */}
                    <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <i className="fas fa-arrow-right text-[#92487A] text-lg"></i>
                    </div>
                  </div>
                  
                  {/* Progress Bar Effect */}
                  <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-[#92487A] to-[#DA6422] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                </div>
              )
            })}
          </div>

          {/* Additional Info */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-3 bg-white rounded-full px-6 py-3 shadow-lg border border-gray-100">
              <i className="fas fa-gift text-[#92487A] text-xl"></i>
              <span className="text-gray-700 font-medium">
                <span className="text-[#92487A] font-bold">Bonus:</span> All features included at no extra cost
              </span>
            </div>
          </div>
        </div>
      </section>

      

      {/* Admission Procedure Section */}
      <section className="py-16 sm:py-20 lg:py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Admission <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#92487A] to-[#DA6422]">Procedure</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Simple and straightforward enrollment process to get you started quickly
            </p>
          </div>

          {/* Procedure Steps */}
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Step 1 */}
              <div className="relative">
                <div className="text-center">
                  <div className="relative inline-block mb-6">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#92487A] to-[#DA6422] flex items-center justify-center text-white text-2xl font-bold shadow-xl mx-auto">
                      1
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                      <i className="fas fa-check text-white text-xs"></i>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Fill Application Form</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Complete our simple online application form with your basic details and course preference
                  </p>
                </div>
                {/* Connecting Arrow - Desktop Only */}
                <div className="hidden lg:block absolute top-10 right-0 w-full h-0.5">
                  <div className="absolute top-0 right-0 w-12 h-0.5 bg-gradient-to-r from-[#92487A] to-[#DA6422]"></div>
                  <div className="absolute top-0 right-12 w-8 h-8 flex items-center justify-center">
                    <i className="fas fa-arrow-right text-[#92487A] text-xl"></i>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative">
                <div className="text-center">
                  <div className="relative inline-block mb-6">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#DA6422] to-[#92487A] flex items-center justify-center text-white text-2xl font-bold shadow-xl mx-auto">
                      2
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Submit Documents</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Upload required documents (ID proof, photo) and submit your application for review
                  </p>
                </div>
                {/* Connecting Arrow - Desktop Only */}
                <div className="hidden lg:block absolute top-10 right-0 w-full h-0.5">
                  <div className="absolute top-0 right-0 w-12 h-0.5 bg-gradient-to-r from-[#DA6422] to-[#92487A]"></div>
                  <div className="absolute top-0 right-12 w-8 h-8 flex items-center justify-center">
                    <i className="fas fa-arrow-right text-[#DA6422] text-xl"></i>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative">
                <div className="text-center">
                  <div className="relative inline-block mb-6">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#92487A] to-[#DA6422] flex items-center justify-center text-white text-2xl font-bold shadow-xl mx-auto">
                      3
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Payment & Confirmation</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Complete the payment process through our secure payment gateway and receive confirmation
                  </p>
                </div>
                {/* Connecting Arrow - Desktop Only */}
                <div className="hidden lg:block absolute top-10 right-0 w-full h-0.5">
                  <div className="absolute top-0 right-0 w-12 h-0.5 bg-gradient-to-r from-[#92487A] to-[#DA6422]"></div>
                  <div className="absolute top-0 right-12 w-8 h-8 flex items-center justify-center">
                    <i className="fas fa-arrow-right text-[#92487A] text-xl"></i>
                  </div>
                </div>
              </div>

              {/* Step 4 */}
              <div className="relative">
                <div className="text-center">
                  <div className="relative inline-block mb-6">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#DA6422] to-[#92487A] flex items-center justify-center text-white text-2xl font-bold shadow-xl mx-auto">
                      4
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Start Learning</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Receive course access, schedule, and login credentials to begin your learning journey
                  </p>
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="mt-12 bg-gradient-to-br from-[#92487A]/10 to-[#DA6422]/10 rounded-2xl p-8 border-2 border-[#92487A]/20">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-gradient-to-br from-[#92487A] to-[#DA6422] flex items-center justify-center text-white">
                    <i className="fas fa-clock text-xl"></i>
                  </div>
                  <h4 className="font-bold text-gray-900 mb-1">Quick Processing</h4>
                  <p className="text-sm text-gray-600">Admission processed within 24-48 hours</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-gradient-to-br from-[#DA6422] to-[#92487A] flex items-center justify-center text-white">
                    <i className="fas fa-shield-alt text-xl"></i>
                  </div>
                  <h4 className="font-bold text-gray-900 mb-1">Secure Payment</h4>
                  <p className="text-sm text-gray-600">100% secure and encrypted payment gateway</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-gradient-to-br from-[#92487A] to-[#DA6422] flex items-center justify-center text-white">
                    <i className="fas fa-headset text-xl"></i>
                  </div>
                  <h4 className="font-bold text-gray-900 mb-1">24/7 Support</h4>
                  <p className="text-sm text-gray-600">Get help anytime during the admission process</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose This Course Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Choose This <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#92487A] to-[#DA6422]">Course</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-gradient-to-br from-gray-50 to-white rounded-2xl">
              <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-[#92487A] to-[#DA6422] flex items-center justify-center">
                <i className="fas fa-certificate text-3xl text-white"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Globally Recognized Certificate</h3>
              <p className="text-gray-600">Receive an internationally recognized certificate upon completion</p>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-gray-50 to-white rounded-2xl">
              <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-[#DA6422] to-[#92487A] flex items-center justify-center">
                <i className="fas fa-user-graduate text-3xl text-white"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Expert Instructors</h3>
              <p className="text-gray-600">Learn from experienced masters with years of practical experience</p>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-gray-50 to-white rounded-2xl">
              <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-[#92487A] to-[#DA6422] flex items-center justify-center">
                <i className="fas fa-headset text-3xl text-white"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Lifetime Support</h3>
              <p className="text-gray-600">Get lifetime access to course materials and ongoing support</p>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Features Section */}
      <section className="py-16 sm:py-20 lg:py-12 bg-gradient-to-br from-white via-gray-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-96 h-96 bg-[#92487A] rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#DA6422] rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#92487A] to-[#DA6422]">Our Academy</span>?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experience excellence in Vedic and Occult Science education with our comprehensive learning platform
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {/* Feature 1 - Professional Certification */}
            <div className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-[#92487A]/30 hover:-translate-y-2">
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#92487A]/10 to-transparent rounded-bl-full"></div>
              <div className="relative">
                <div className="w-16 h-16 mx-auto mb-6 rounded-xl bg-gradient-to-br from-[#92487A] to-[#DA6422] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <i className="fas fa-certificate text-3xl text-white"></i>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3 text-center group-hover:text-[#92487A] transition-colors duration-300">
                  Professional Certification
                </h3>
                <p className="text-gray-600 text-center text-sm leading-relaxed">
                  Earn globally recognized certificates upon successful completion of your courses
                </p>
              </div>
            </div>

            {/* Feature 2 - 100% Live Online Classes */}
            <div className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-[#92487A]/30 hover:-translate-y-2">
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#DA6422]/10 to-transparent rounded-bl-full"></div>
              <div className="relative">
                <div className="w-16 h-16 mx-auto mb-6 rounded-xl bg-gradient-to-br from-[#DA6422] to-[#92487A] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <i className="fas fa-video text-3xl text-white"></i>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3 text-center group-hover:text-[#92487A] transition-colors duration-300">
                  100% Live Online Classes
                </h3>
                <p className="text-gray-600 text-center text-sm leading-relaxed">
                  Attend interactive live sessions with expert instructors from anywhere in the world
                </p>
              </div>
            </div>

            {/* Feature 3 - 100% Placement Support */}
            <div className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-[#92487A]/30 hover:-translate-y-2">
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#92487A]/10 to-transparent rounded-bl-full"></div>
              <div className="relative">
                <div className="w-16 h-16 mx-auto mb-6 rounded-xl bg-gradient-to-br from-[#92487A] to-[#DA6422] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <i className="fas fa-briefcase text-3xl text-white"></i>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3 text-center group-hover:text-[#92487A] transition-colors duration-300">
                  100% Placement Support
                </h3>
                <p className="text-gray-600 text-center text-sm leading-relaxed">
                  Get comprehensive career guidance and placement assistance to kickstart your professional journey
                </p>
              </div>
            </div>

            {/* Feature 4 - 1 On 1 Mentorship */}
            <div className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-[#92487A]/30 hover:-translate-y-2">
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#DA6422]/10 to-transparent rounded-bl-full"></div>
              <div className="relative">
                <div className="w-16 h-16 mx-auto mb-6 rounded-xl bg-gradient-to-br from-[#DA6422] to-[#92487A] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <i className="fas fa-user-graduate text-3xl text-white"></i>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3 text-center group-hover:text-[#92487A] transition-colors duration-300">
                  1 On 1 Mentorship
                </h3>
                <p className="text-gray-600 text-center text-sm leading-relaxed">
                  Receive personalized guidance and mentorship from industry experts tailored to your learning needs
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Most Trusted Vedic Astrology Course Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Side - Content */}
            <div>
              <div className="inline-block mb-4">
                <span className="text-sm font-semibold text-[#92487A] uppercase tracking-wider bg-[#92487A]/10 px-4 py-2 rounded-full">
                  Most Trusted
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Vedic Astrology <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#92487A] to-[#DA6422]">Course</span>
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Join India's most trusted Vedic Astrology course and learn from expert instructors with years of experience. Get comprehensive training, practical knowledge, and globally recognized certification.
              </p>
              
              {/* Key Highlights */}
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-[#92487A] to-[#DA6422] flex items-center justify-center text-white">
                    <i className="fas fa-check text-sm"></i>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Expert-Led Training</h3>
                    <p className="text-gray-600 text-sm">Learn from certified Vedic Astrology masters with decades of experience</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-[#DA6422] to-[#92487A] flex items-center justify-center text-white">
                    <i className="fas fa-check text-sm"></i>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Practical Learning</h3>
                    <p className="text-gray-600 text-sm">Hands-on practice with real birth charts and case studies</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-[#92487A] to-[#DA6422] flex items-center justify-center text-white">
                    <i className="fas fa-check text-sm"></i>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Career Support</h3>
                    <p className="text-gray-600 text-sm">Get placement assistance and guidance to start your practice</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Side - Form */}
            <div>
              <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-gray-100">
                <div className="text-center mb-6">
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                    Get the Course <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#92487A] to-[#DA6422]">Details</span>
                  </h3>
                  <p className="text-gray-600">
                    Fill out the form below and we'll send you complete course information
                  </p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-4">
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
                    <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                      Message (Optional)
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="3"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#92487A] focus:outline-none transition-colors duration-300 resize-none"
                      placeholder="Any questions or specific information you need?"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#92487A] to-[#DA6422] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:opacity-90 transition-opacity duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform flex items-center justify-center space-x-2"
                  >
                    <span>Get Course Details</span>
                    <i className="fas fa-arrow-right"></i>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-[#92487A] to-[#DA6422]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of students who have transformed their lives through this course
          </p>
          <button className="bg-white text-[#92487A] px-8 py-4 rounded-lg font-semibold text-lg hover:opacity-90 transition-opacity duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform">
            Enroll Now
          </button>
        </div>
      </section>

      <WhatsappIcone />
    </>
  )
}

export default CourseInnerpage