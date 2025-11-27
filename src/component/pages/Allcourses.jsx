import React from 'react'
import { Link } from 'react-router-dom'
import WhatsappIcone from '../layout/WhatsappIcone'
import allcoursesImg from '../../assets/Allcourses.jpeg'

const Allcourses = () => {
  const courses = [
    {
      id: 1,
      title: 'Vedic Astrology',
      description: 'Master the ancient science of Vedic Astrology and learn to predict life events with precision. Understand planetary positions, birth charts, and their impact on human life.',
      icon: 'fas fa-star',
      iconColor: 'text-primary-blue-400',
      link: '/courses/vedic-astrology',
      features: [
        'Birth Chart Analysis',
        'Planetary Positions',
        'Dasha Systems',
        'Remedial Measures'
      ]
    },
    {
      id: 2,
      title: 'Vedic Numerology',
      description: 'Discover the power of numbers and their influence on your life through Vedic Numerology. Learn to calculate and interpret life path numbers, destiny numbers, and more.',
      icon: 'fas fa-calculator',
      iconColor: 'text-primary-green-400',
      link: '/courses/vedic-numerology',
      features: [
        'Life Path Numbers',
        'Destiny Numbers',
        'Name Numerology',
        'Compatibility Analysis'
      ]
    },
    {
      id: 3,
      title: 'Vastu Shastra',
      description: 'Learn the art of Vastu Shastra to create harmonious living and working spaces. Understand the principles of directional energy and how to optimize your environment.',
      icon: 'fas fa-home',
      iconColor: 'text-primary-blue-400',
      link: '/courses/vastu-shastra',
      features: [
        'Directional Energy',
        'Space Planning',
        'Remedial Solutions',
        'Commercial Vastu'
      ]
    },
    {
      id: 4,
      title: 'Palmistry',
      description: 'Read palms and understand personality traits, life events, and future predictions. Master the art of palm reading with comprehensive training on hand analysis.',
      icon: 'fas fa-hand-sparkles',
      iconColor: 'text-primary-green-400',
      link: '/courses/palmistry',
      features: [
        'Hand Shape Analysis',
        'Line Reading',
        'Mount Interpretation',
        'Life Predictions'
      ]
    },
    {
      id: 5,
      title: 'Crystal Healing',
      description: 'Harness the healing power of crystals and gemstones for physical and spiritual wellness. Learn to use crystals for energy healing and chakra balancing.',
      icon: 'fas fa-gem',
      iconColor: 'text-primary-blue-400',
      link: '/courses/crystal-healing',
      features: [
        'Crystal Properties',
        'Chakra Healing',
        'Crystal Grids',
        'Healing Techniques'
      ]
    },
    {
      id: 6,
      title: 'Tarot Card Reading',
      description: 'Master the art of Tarot card reading and provide insightful guidance to others. Learn card meanings, spreads, and interpretation techniques.',
      icon: 'fas fa-cards',
      iconColor: 'text-primary-green-400',
      link: '/courses/tarot-reading',
      features: [
        'Card Meanings',
        'Reading Spreads',
        'Intuition Development',
        'Professional Practice'
      ]
    },
    {
      id: 7,
      title: 'Reiki Healing',
      description: 'Learn the ancient Japanese healing technique of Reiki to channel universal life energy for physical, emotional, and spiritual healing.',
      icon: 'fas fa-hands-heart',
      iconColor: 'text-primary-blue-400',
      link: '#',
      comingSoon: true,
      features: [
        'Energy Channeling',
        'Chakra Balancing',
        'Distance Healing',
        'Self-Healing Techniques'
      ]
    },
    {
      id: 8,
      title: 'Feng Shui',
      description: 'Master the Chinese art of Feng Shui to harmonize your living and working spaces with the natural flow of energy for prosperity and well-being.',
      icon: 'fas fa-yin-yang',
      iconColor: 'text-primary-green-400',
      link: '#',
      comingSoon: true,
      features: [
        'Energy Flow Principles',
        'Space Arrangement',
        'Color and Element Balance',
        'Commercial Applications'
      ]
    },
    {
      id: 9,
      title: 'Meditation & Mindfulness',
      description: 'Discover the transformative power of meditation and mindfulness practices for mental clarity, stress reduction, and spiritual growth.',
      icon: 'fas fa-om',
      iconColor: 'text-primary-blue-400',
      link: '#',
      comingSoon: true,
      features: [
        'Meditation Techniques',
        'Mindfulness Practices',
        'Stress Management',
        'Spiritual Development'
      ]
    }
  ]

  return (
    <>
      {/* Hero Section */}
      <div 
        className="relative py-16 sm:py-24 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${allcoursesImg})`,
          backgroundSize: '100% 100%',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/40"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
              All Courses
            </h1>
            <p className="text-lg sm:text-xl text-white/90 max-w-3xl mx-auto drop-shadow-md">
              Explore our comprehensive range of Vedic and Occult Science courses. 
              Each course is designed to provide you with in-depth knowledge and practical skills.
            </p>
          </div>
        </div>
      </div>

      {/* Courses Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {courses.map((course) => (
              <Link
                key={course.id}
                to={course.comingSoon ? '#' : `/course/${course.id}`}
                className={`block bg-white rounded-2xl p-8 border-2 border-gray-100 hover:border-[#92487A] transition-all duration-300 hover:transform hover:scale-105 hover:shadow-2xl group relative overflow-hidden ${course.comingSoon ? 'opacity-90 cursor-default' : 'cursor-pointer'}`}
                onClick={(e) => {
                  if (course.comingSoon) {
                    e.preventDefault()
                  }
                }}
              >
                {/* Coming Soon Badge */}
                {course.comingSoon && (
                  <div className="absolute top-4 right-4 z-20">
                    <span className="bg-gradient-to-r from-[#DA6422] to-[#92487A] text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-lg">
                      Coming Soon
                    </span>
                  </div>
                )}

                {/* Decorative gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#92487A]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                
                <div className="relative z-10">
                  {/* Icon Container */}
                  <div className={`mb-6 flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-[#92487A]/10 to-[#92487A]/5 group-hover:from-[#92487A]/20 group-hover:to-[#92487A]/10 transition-all duration-300 ${course.comingSoon ? 'opacity-75' : ''}`}>
                    <i className={`${course.icon} ${course.iconColor} text-4xl group-hover:scale-110 transition-transform duration-300`}></i>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-[#92487A] transition-colors duration-300">
                    {course.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 text-sm mb-6 leading-relaxed min-h-[60px]">
                    {course.description}
                  </p>

                  {/* Features */}
                  <div className="mb-6 pb-6 border-b border-gray-200">
                    <h4 className="text-gray-800 font-semibold mb-3 text-sm">What You'll Learn:</h4>
                    <ul className="space-y-2">
                      {course.features.map((feature, index) => (
                        <li key={index} className="text-gray-600 text-xs flex items-start">
                          <i className="fas fa-check-circle text-[#92487A] mr-2 mt-0.5 text-xs flex-shrink-0"></i>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Learn More / Coming Soon Button */}
                  {course.comingSoon ? (
                    <div className="inline-flex items-center justify-center w-full space-x-2 bg-gray-400 text-white px-6 py-3 rounded-lg font-semibold text-sm cursor-not-allowed pointer-events-none">
                      <span>Coming Soon</span>
                      <i className="fas fa-clock"></i>
                    </div>
                  ) : (
                    <div className="inline-flex items-center justify-center w-full space-x-2 bg-gradient-to-r from-[#92487A] to-[#DA6422] text-white px-6 py-3 rounded-lg font-semibold text-sm group-hover:shadow-lg transform group-hover:scale-105 transition-all duration-300">
                      <span>Learn More</span>
                      <i className="fas fa-arrow-right transition-transform duration-300 group-hover:translate-x-1"></i>
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#92487A] mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-lg text-gray-700 mb-8">
            Join thousands of students who have transformed their lives through our courses. 
            Get globally recognized certificates and start your career in Vedic and Occult Sciences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="bg-[#92487A] border-2 border-white text-white px-8 py-3 rounded-lg font-semibold text-lg hover:opacity-90 transition-opacity duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform"
            >
              <i className="fas fa-home"></i>
              <span>Back to Home</span>
            </Link>
            <a
              href="tel:+1234567890"
              className="bg-[#DA6422] border-2 border-white text-white px-8 py-3 rounded-lg font-semibold text-lg hover:opacity-90 transition-opacity duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform"
            >
              <i className="fas fa-phone"></i>
              <span>Contact Us</span>
            </a>
          </div>
        </div>
      </section>

      {/* WhatsApp Icon - Fixed at bottom left */}
      <WhatsappIcone />
    </>
  )
}

export default Allcourses

