import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import astroImg from '../../assets/sadhu.png'
import whychooseus from '../../assets/whychooseus.jpeg'
import whychooseus1 from '../../assets/whychooseus1.jpeg'
import whychooseus2 from '../../assets/whychooseus2.jpeg'
import allcoursesImg from '../../assets/Allcourses.jpeg'
import formImg from '../../assets/form-girl.jpeg'
import WhatsappIcone from '../layout/WhatsappIcone'

const Home = () => {
  const canvasRef = useRef(null)
  const headerRef = useRef(null)
  const animationRef = useRef(null)
  const pointsRef = useRef([])
  const targetRef = useRef({ x: 0, y: 0 })
  const animateHeaderRef = useRef(true)
  const [shadowColors, setShadowColors] = useState({ color1: 146, color2: 218, color3: 156, color4: 255 })
  const [currentReview, setCurrentReview] = useState(0)
  const [cardsPerView, setCardsPerView] = useState(3)
  const featuredCarouselRef = useRef(null)

  // Update cards per view based on screen size
  useEffect(() => {
    const updateCardsPerView = () => {
      if (window.innerWidth >= 1024) {
        setCardsPerView(3)
      } else if (window.innerWidth >= 640) {
        setCardsPerView(2)
      } else {
        setCardsPerView(1)
      }
    }

    updateCardsPerView()
    window.addEventListener('resize', updateCardsPerView)
    return () => window.removeEventListener('resize', updateCardsPerView)
  }, [])

  useEffect(() => {
    let width = window.innerWidth
    let height = window.innerHeight
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const header = headerRef.current

    // Set initial target
    targetRef.current = { x: width / 2, y: height / 2 }

    // Set header height
    header.style.height = height + 'px'
    canvas.width = width
    canvas.height = height

    // Create points
    const points = []
    for (let x = 0; x < width; x = x + width / 20) {
      for (let y = 0; y < height; y = y + height / 20) {
        const px = x + (Math.random() * width) / 20
        const py = y + (Math.random() * height) / 20
        const p = { x: px, originX: px, y: py, originY: py }
        points.push(p)
      }
    }

    // Get distance helper (define before use)
    function getDistance(p1, p2) {
      return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2)
    }

    // For each point find the 5 closest points
    for (let i = 0; i < points.length; i++) {
      const closest = []
      const p1 = points[i]
      for (let j = 0; j < points.length; j++) {
        const p2 = points[j]
        if (p1 !== p2) {
          let placed = false
          for (let k = 0; k < 5; k++) {
            if (!placed) {
              if (closest[k] === undefined) {
                closest[k] = p2
                placed = true
              }
            }
          }
          for (let k = 0; k < 5; k++) {
            if (!placed) {
              if (getDistance(p1, p2) < getDistance(p1, closest[k])) {
                closest[k] = p2
                placed = true
              }
            }
          }
        }
      }
      p1.closest = closest
    }

    // Assign a circle to each point
    for (let i in points) {
      const c = new Circle(
        points[i],
        2 + Math.random() * 2,
        'rgba(255,255,255,0.3)'
      )
      points[i].circle = c
    }

    pointsRef.current = points

    // Circle class
    function Circle(pos, rad, color) {
      this.pos = pos || null
      this.radius = rad || null
      this.color = color || null
      this.active = 0

      this.draw = function () {
        if (!this.active) return
        ctx.beginPath()
        ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI, false)
        ctx.fillStyle = 'rgba(156,217,249,' + this.active + ')'
        ctx.fill()
      }
    }

    // Draw lines
    function drawLines(p) {
      if (!p.active) return
      for (let i in p.closest) {
        ctx.beginPath()
        ctx.moveTo(p.x, p.y)
        ctx.lineTo(p.closest[i].x, p.closest[i].y)
        ctx.strokeStyle = 'rgba(156,217,249,' + p.active + ')'
        ctx.stroke()
      }
    }

    // Shift point animation
    function shiftPoint(p) {
      const startX = p.x
      const startY = p.y
      const endX = p.originX - 50 + Math.random() * 100
      const endY = p.originY - 50 + Math.random() * 100
      const duration = 1000 + 1000 * Math.random()
      const startTime = Date.now()

      function animate() {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / duration, 1)
        
        // Easing function (ease in out)
        const ease = progress < 0.5
          ? 2 * progress * progress
          : -1 + (4 - 2 * progress) * progress

        p.x = startX + (endX - startX) * ease
        p.y = startY + (endY - startY) * ease

        if (progress < 1) {
          requestAnimationFrame(animate)
        } else {
          shiftPoint(p)
        }
      }
      requestAnimationFrame(animate)
    }

    // Animation loop
    function animate() {
      if (animateHeaderRef.current) {
        ctx.clearRect(0, 0, width, height)
        const target = targetRef.current

        for (let i in points) {
          const p = points[i]
          const distance = getDistance(target, p)

          // Detect points in range
          if (Math.abs(distance) < 4000) {
            p.active = 0.3
            p.circle.active = 0.6
          } else if (Math.abs(distance) < 20000) {
            p.active = 0.1
            p.circle.active = 0.3
          } else if (Math.abs(distance) < 40000) {
            p.active = 0.02
            p.circle.active = 0.1
          } else {
            p.active = 0
            p.circle.active = 0
          }

          drawLines(p)
          p.circle.draw()
        }
      }
      animationRef.current = requestAnimationFrame(animate)
    }

    // Start animations
    animate()
    for (let i in points) {
      shiftPoint(points[i])
    }

    // Event listeners
    function mouseMove(e) {
      let posx = 0
      let posy = 0
      if (e.pageX || e.pageY) {
        posx = e.pageX
        posy = e.pageY
      } else if (e.clientX || e.clientY) {
        posx =
          e.clientX +
          document.body.scrollLeft +
          document.documentElement.scrollLeft
        posy =
          e.clientY +
          document.body.scrollTop +
          document.documentElement.scrollTop
      }
      targetRef.current.x = posx
      targetRef.current.y = posy
    }

    function scrollCheck() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
      if (scrollTop > height) {
        animateHeaderRef.current = false
      } else {
        animateHeaderRef.current = true
      }
    }

    function resize() {
      width = window.innerWidth
      height = window.innerHeight
      header.style.height = height + 'px'
      canvas.width = width
      canvas.height = height
    }

    if (!('ontouchstart' in window)) {
      window.addEventListener('mousemove', mouseMove)
    }
    window.addEventListener('scroll', scrollCheck)
    window.addEventListener('resize', resize)

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      window.removeEventListener('mousemove', mouseMove)
      window.removeEventListener('scroll', scrollCheck)
      window.removeEventListener('resize', resize)
    }
  }, [])

  // Animate shadow colors
  useEffect(() => {
    let colorAnimationRef = null
    let time = 0

    const animateColors = () => {
      time += 0.01
      
      // Create smooth color transitions using sine waves
      const color1 = Math.floor(146 + 50 * Math.sin(time))
      const color2 = Math.floor(218 + 30 * Math.sin(time + Math.PI / 2))
      const color3 = Math.floor(156 + 50 * Math.sin(time + Math.PI))
      const color4 = Math.floor(255 + 30 * Math.sin(time + 3 * Math.PI / 2))
      
      setShadowColors({ color1, color2, color3, color4 })
      
      colorAnimationRef = requestAnimationFrame(animateColors)
    }

    animateColors()

    return () => {
      if (colorAnimationRef) {
        cancelAnimationFrame(colorAnimationRef)
      }
    }
  }, [])

  return (
    <>
      <div
        id="large-header"
        ref={headerRef}
        className="large-header  relative w-full bg-[#fff] overflow-hidden bg-cover bg-center z-10"
        style={{
          backgroundImage: "url('https://www.marcoguglie.it/Codepen/AnimatedHeaderBg/demo-1/img/demo-1-bg.jpg')"
        }}
      >
        <canvas ref={canvasRef} id="demo-canvas" className="absolute inset-0 z-0"></canvas>
        
        {/* Content Container - Left Side Content, Right Side Image */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-10 ">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full">
            {/* Left Side - Content */}
            <div className="text-center lg:text-left">
            
              <h1 className="text-[#f9f1e9] text-2xl sm:text-2xl md:text-2xl lg:text-2xl xl:text-5xl pb-4">India's No.1 Academy For Vedic & Occult Science Courses</h1>
              <p className='text-white text-base tracking-wider mb-6'>We offer In-demand Vedic and occult science courses for all with globally recognized certificate</p>
              
              {/* Button */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/all-courses" className="bg-[#92487A] border-2 border-white text-white px-6 py-3 rounded-lg font-semibold text-lg hover:opacity-90 transition-opacity duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform">
                  <span>Explore Courses</span>
                  <i className="fas fa-arrow-right text-white"></i>
                </Link>
                
              </div>
            </div>

            {/* Right Side - Image */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-full max-w-md lg:max-w-lg">
                <img
                  src={astroImg}
                  alt="Astro Radiance Vidhya"
                  className="w-full h-auto object-contain rounded-lg"
                  style={{
                    filter: `drop-shadow(0 0 20px rgba(${shadowColors.color1}, 72, 122, 0.8)) drop-shadow(0 0 30px rgba(${shadowColors.color2}, 100, 34, 0.6)) drop-shadow(0 0 40px rgba(${shadowColors.color3}, 217, 249, 0.5)) drop-shadow(0 0 50px rgba(${shadowColors.color4}, 100, 150, 0.4))`,
                    WebkitFilter: `drop-shadow(0 0 20px rgba(${shadowColors.color1}, 72, 122, 0.8)) drop-shadow(0 0 30px rgba(${shadowColors.color2}, 100, 34, 0.6)) drop-shadow(0 0 40px rgba(${shadowColors.color3}, 217, 249, 0.5)) drop-shadow(0 0 50px rgba(${shadowColors.color4}, 100, 150, 0.4))`,
                    transition: 'filter 0.1s ease-out'
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Courses Offered Section */}
      <section className="py-16 sm:py-20 lg:py-10 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-6 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#92487A]">
              Courses Offered
            </h2>
            <p className="text-base pt-3 text-lg max-w-2xl mx-auto">
              Explore our comprehensive range of Vedic and Occult Science courses
            </p>
          </div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Course Card 1 */}
            <div className="bg-[#92487A] backdrop-blur-sm rounded-lg p-6 border border-white/20 hover:border-primary-blue-400 transition-all duration-300 hover:transform hover:scale-105">
              <div className="mb-4">
                <i className="fas fa-star text-4xl text-primary-blue-400 mb-3"></i>
                <h3 className="text-xl font-semibold text-white mb-2">Vedic Astrology</h3>
                <p className="text-white/80 text-sm">
                  Master the ancient science of Vedic Astrology and learn to predict life events with precision.
                </p>
              </div>
              <Link
                to="/courses/vedic-astrology"
                className="text-primary-blue-400 hover:text-primary-green-400 font-medium text-sm flex items-center space-x-2"
              >
                <span className="text-white">Learn More</span>
                <i className="fas fa-arrow-right text-white"></i>
              </Link>
            </div>

            {/* Course Card 2 */}
            <div className="bg-[#92487A] backdrop-blur-sm rounded-lg p-6 border border-white/20 hover:border-primary-blue-400 transition-all duration-300 hover:transform hover:scale-105">
              <div className="mb-4">
                <i className="fas fa-calculator text-4xl text-primary-green-400 mb-3"></i>
                <h3 className="text-xl font-semibold text-white mb-2">Vedic Numerology</h3>
                <p className="text-white/80 text-sm">
                  Discover the power of numbers and their influence on your life through Vedic Numerology.
                </p>
              </div>
              <Link
                to="/courses/vedic-numerology"
                className="text-primary-blue-400 hover:text-primary-green-400 font-medium text-sm flex items-center space-x-2"
              >
                <span className="text-white">Learn More</span>
                <i className="fas fa-arrow-right text-white"></i>
              </Link>
            </div>

            {/* Course Card 3 */}
            <div className="bg-[#92487A] backdrop-blur-sm rounded-lg p-6 border border-white/20 hover:border-primary-blue-400 transition-all duration-300 hover:transform hover:scale-105">
              <div className="mb-4">
                <i className="fas fa-home text-4xl text-primary-blue-400 mb-3"></i>
                <h3 className="text-xl font-semibold text-white mb-2">Vastu Shastra</h3>
                <p className="text-white/80 text-sm">
                  Learn the art of Vastu Shastra to create harmonious living and working spaces.
                </p>
              </div>
              <Link
                to="/courses/vastu-shastra"
                className="text-primary-blue-400 hover:text-primary-green-400 font-medium text-sm flex items-center space-x-2"
              >
                <span className="text-white">Learn More</span>
                <i className="fas fa-arrow-right text-white"></i>
              </Link>
            </div>

            {/* Course Card 4 */}
            <div className="bg-[#92487A] backdrop-blur-sm rounded-lg p-6 border border-white/20 hover:border-primary-blue-400 transition-all duration-300 hover:transform hover:scale-105">
              <div className="mb-4">
                <i className="fas fa-hand-sparkles text-4xl text-primary-green-400 mb-3"></i>
                <h3 className="text-xl font-semibold text-white mb-2">Palmistry</h3>
                <p className="text-white/80 text-sm">
                  Read palms and understand personality traits, life events, and future predictions.
                </p>
              </div>
              <Link
                to="/courses/palmistry"
                className="text-primary-blue-400 hover:text-primary-green-400 font-medium text-sm flex items-center space-x-2"
              >
                <span className="text-white">Learn More</span>
                <i className="fas fa-arrow-right text-white"></i>
              </Link>
            </div>

            {/* Course Card 5 */}
            <div className="bg-[#92487A] backdrop-blur-sm rounded-lg p-6 border border-white/20 hover:border-primary-blue-400 transition-all duration-300 hover:transform hover:scale-105">
              <div className="mb-4">
                <i className="fas fa-gem text-4xl text-primary-blue-400 mb-3"></i>
                <h3 className="text-xl font-semibold text-white mb-2">Crystal Healing</h3>
                <p className="text-white/80 text-sm">
                  Harness the healing power of crystals and gemstones for physical and spiritual wellness.
                </p>
              </div>
              <Link
                to="/courses/crystal-healing"
                className="text-primary-blue-400 hover:text-primary-green-400 font-medium text-sm flex items-center space-x-2"
              >
                <span className="text-white">Learn More</span>
                <i className="fas fa-arrow-right text-white"></i>
              </Link>
            </div>

            {/* Course Card 6 */}
            <div className="bg-[#92487A] backdrop-blur-sm rounded-lg p-6 border border-white/20 hover:border-primary-blue-400 transition-all duration-300 hover:transform hover:scale-105">
              <div className="mb-4">
                <i className="fas fa-cards text-4xl text-primary-green-400 mb-3"></i>
                <h3 className="text-xl font-semibold text-white mb-2">Tarot Card Reading</h3>
                <p className="text-white/80 text-sm">
                  Master the art of Tarot card reading and provide insightful guidance to others.
                </p>
              </div>
              <Link
                to="/courses/tarot-reading"
                className="text-primary-blue-400 hover:text-primary-green-400 font-medium text-sm flex items-center space-x-2"
              >
                <span className="text-white">Learn More</span>
                <i className="fas fa-arrow-right text-white"></i>
              </Link>
            </div>
          </div>

          {/* View All Courses Button */}
          <div className="text-center mt-12">
            <Link
              to="/all-courses"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#DA6422] to-[#DA6422] text-white px-8 py-3 rounded-lg font-semibold text-lg hover:opacity-90 transition-opacity duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform"
            >
              <span>View All Courses</span>
              <i className="fas fa-arrow-right text-white"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 sm:py-20 lg:py-12 bg-gray-100 relative overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-4xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Why Choose Academy of <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#92487A] to-[#DA6422]">Astro Radiance Vidhya</span>?
            </h2>
            <p className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto">
              We are committed to providing the best learning experience in Vedic and Occult Sciences
            </p>
          </div>

          {/* Two Column Layout: Image Left, Features Right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Side - Image Collage (3 Images) */}
            <div className="flex justify-center lg:justify-start order-2 lg:order-1">
              <div className="relative w-full max-w-lg">
                {/* Image Collage Grid */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Large Image - Top Left (spans 2 columns) */}
                  <div className="col-span-2 relative rounded-2xl overflow-hidden shadow-2xl group h-64">
                    <img
                      src={whychooseus1}
                      alt="Education Academy"
                      className="w-full h-full object-cover rounded-2xl group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#92487A]/30 to-transparent"></div>
                  </div>
                  
                  {/* Small Image 1 - Bottom Left */}
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl group h-48">
                    <img
                      src={whychooseus}
                      alt="Astro Radiance"
                      className="w-full h-full object-cover rounded-2xl group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#DA6422]/30 to-transparent"></div>
                  </div>
                  
                  {/* Small Image 2 - Bottom Right */}
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl group h-48">
                    <img
                      src={whychooseus2}
                      alt="All Courses"
                      className="w-full h-full object-cover rounded-2xl group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#92487A]/30 to-transparent"></div>
                  </div>
                </div>
                
                {/* Decorative elements */}
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-[#DA6422] rounded-full opacity-20 blur-2xl"></div>
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-[#92487A] rounded-full opacity-20 blur-2xl"></div>
              </div>
            </div>

            {/* Right Side - Features List */}
            <div className="order-1 lg:order-2">
              <div className="space-y-8 md:space-y-10">
                {/* Feature 1 */}
                <div className="flex items-start gap-6 group">
                  <div className="flex-shrink-0 relative">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#92487A] to-[#DA6422] flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-500">
                      <i className="fas fa-certificate text-4xl text-white"></i>
                    </div>
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-[#DA6422] rounded-full opacity-75 animate-pulse"></div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-[#92487A] transition-colors duration-300">
                      Globally Recognized Certificates
                    </h3>
                    <p className="text-base text-gray-600 leading-relaxed">
                      Receive internationally recognized certificates upon course completion that enhance your professional credibility.
                    </p>
                  </div>
                </div>

                {/* Feature 2 */}
                <div className="flex items-start gap-6 group">
                  <div className="flex-shrink-0 relative">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#DA6422] to-[#92487A] flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-500">
                      <i className="fas fa-chalkboard-teacher text-4xl text-white"></i>
                    </div>
                    <div className="absolute -bottom-1 -left-1 w-6 h-6 bg-[#92487A] rounded-full opacity-75 animate-pulse"></div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-[#92487A] transition-colors duration-300">
                      Expert Instructors
                    </h3>
                    <p className="text-base text-gray-600 leading-relaxed">
                      Learn from experienced masters and practitioners with years of expertise in Vedic and Occult Sciences.
                    </p>
                  </div>
                </div>

                {/* Feature 3 */}
                <div className="flex items-start gap-6 group">
                  <div className="flex-shrink-0 relative">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#92487A] to-[#DA6422] flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-500">
                      <i className="fas fa-laptop text-4xl text-white"></i>
                    </div>
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-[#DA6422] rounded-full opacity-75 animate-pulse"></div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-[#92487A] transition-colors duration-300">
                      Flexible Learning
                    </h3>
                    <p className="text-base text-gray-600 leading-relaxed">
                      Study at your own pace with our flexible online courses designed to fit your busy schedule.
                    </p>
                  </div>
                </div>

                {/* Feature 4 */}
                <div className="flex items-start gap-6 group">
                  <div className="flex-shrink-0 relative">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#DA6422] to-[#92487A] flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-500">
                      <i className="fas fa-hands-helping text-4xl text-white"></i>
                    </div>
                    <div className="absolute -bottom-1 -left-1 w-6 h-6 bg-[#92487A] rounded-full opacity-75 animate-pulse"></div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-[#92487A] transition-colors duration-300">
                      Lifetime Support
                    </h3>
                    <p className="text-base text-gray-600 leading-relaxed">
                      Get lifetime access to course materials and ongoing support from our community of learners and experts.
                    </p>
                  </div>
                </div>

                {/* Feature 5 */}
                {/* <div className="flex items-start gap-6 group">
                  <div className="flex-shrink-0 relative">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#92487A] to-[#DA6422] flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-500">
                      <i className="fas fa-book-open text-4xl text-white"></i>
                    </div>
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-[#DA6422] rounded-full opacity-75 animate-pulse"></div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[#DA6422] transition-colors duration-300">
                      Comprehensive Curriculum
                    </h3>
                    <p className="text-base text-white/80 leading-relaxed">
                      Access well-structured courses covering both theoretical knowledge and practical applications.
                    </p>
                  </div>
                </div> */}

                {/* Feature 6 */}
                {/* <div className="flex items-start gap-6 group">
                  <div className="flex-shrink-0 relative">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#DA6422] to-[#92487A] flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-500">
                      <i className="fas fa-users text-4xl text-white"></i>
                    </div>
                    <div className="absolute -bottom-1 -left-1 w-6 h-6 bg-[#92487A] rounded-full opacity-75 animate-pulse"></div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[#DA6422] transition-colors duration-300">
                      Thriving Community
                    </h3>
                    <p className="text-base text-white/80 leading-relaxed">
                      Join a vibrant community of like-minded learners and practitioners passionate about Vedic sciences.
                    </p>
                  </div>
                </div> */}
              </div>
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
            {/* Feature 1 - Certification */}
            <div className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-[#92487A]/30 hover:-translate-y-2">
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#92487A]/10 to-transparent rounded-bl-full"></div>
              <div className="relative">
                <div className="w-16 h-16 mx-auto mb-6 rounded-xl bg-gradient-to-br from-[#92487A] to-[#DA6422] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <i className="fas fa-certificate text-3xl text-white"></i>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3 text-center group-hover:text-[#92487A] transition-colors duration-300">
                  Certification
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

      {/* Our Reviews Section */}
      <section className="py-16 sm:py-20 lg:py-12 bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#92487A] rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#DA6422] rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center  sm:mb-20">
            <div className="inline-block mb-4">
              <span className="text-sm font-semibold text-[#92487A] uppercase tracking-wider bg-[#92487A]/10 px-4 py-2 rounded-full">
                Testimonials
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              What Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#92487A] to-[#DA6422]">Students Say</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover how our courses have transformed lives and careers through authentic student experiences
            </p>
          </div>

          {/* Reviews Carousel - Modern Design */}
          <div className="relative pb-10">  . 
            {/* Carousel Container with Perspective */}
            <div className="relative h-[600px] sm:h-[500px] lg:h-[400px] overflow-visible">
              <div className="flex items-center justify-center h-full">
                {[
                  {
                    name: "Rajesh Patel",
                    course: "Vedic Astrology Student",
                    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
                    review: "The Vedic Astrology course exceeded my expectations. The instructors are knowledgeable and the live sessions are incredibly interactive. I've gained so much confidence in my practice!",
                    borderColor: "#92487A",
                    quoteColor: "#92487A",
                    gradient: "from-[#92487A] to-[#DA6422]"
                  },
                  {
                    name: "Sneha Kumar",
                    course: "Numerology Student",
                    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
                    review: "The 1-on-1 mentorship program is outstanding! My mentor helped me understand complex concepts and provided personalized guidance. The placement support team also helped me start my own practice.",
                    borderColor: "#DA6422",
                    quoteColor: "#DA6422",
                    gradient: "from-[#DA6422] to-[#92487A]"
                  },
                  {
                    name: "Amit Mehta",
                    course: "Palmistry Student",
                    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
                    review: "I completed the Palmistry course and received a globally recognized certificate. The live online classes were convenient and the instructors made learning enjoyable. Highly recommended!",
                    borderColor: "#92487A",
                    quoteColor: "#92487A",
                    gradient: "from-[#92487A] to-[#DA6422]"
                  },
                  {
                    name: "Priya Sharma",
                    course: "Vastu Shastra Student",
                    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
                    review: "The Vastu Shastra course was comprehensive and practical. I learned how to apply these principles in real life. The support team is always available to answer questions.",
                    borderColor: "#DA6422",
                    quoteColor: "#DA6422",
                    gradient: "from-[#DA6422] to-[#92487A]"
                  },
                  {
                    name: "Vikram Khanna",
                    course: "Crystal Healing Student",
                    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
                    review: "Excellent learning experience! The Crystal Healing course opened new doors for me. The certification is recognized internationally, and I've already started my practice successfully.",
                    borderColor: "#92487A",
                    quoteColor: "#92487A",
                    gradient: "from-[#92487A] to-[#DA6422]"
                  },
                  {
                    name: "Neha Singh",
                    course: "Tarot Reading Student",
                    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
                    review: "The Tarot Card Reading course is amazing! The live sessions are engaging, and the mentorship program helped me master the art. I'm now a certified practitioner. Thank you!",
                    borderColor: "#DA6422",
                    quoteColor: "#DA6422",
                    gradient: "from-[#DA6422] to-[#92487A]"
                  }
                ].map((review, index) => {
                  const isActive = currentReview === index
                  const distance = Math.abs(index - currentReview)
                  const isVisible = distance <= 1
                  
                  if (!isVisible) return null
                  
                  return (
                    <div
                      key={index}
                      className={`absolute transition-all duration-700 ease-out ${
                        isActive 
                          ? 'z-30 scale-100 opacity-100 translate-x-0' 
                          : index < currentReview
                          ? 'z-10 scale-75 opacity-40 -translate-x-32 sm:-translate-x-40'
                          : 'z-10 scale-75 opacity-40 translate-x-32 sm:translate-x-40'
                      }`}
                    >
                      <div className={`relative bg-white rounded-3xl p-8 sm:p-10 shadow-2xl overflow-hidden transition-all duration-700 ${
                        isActive 
                          ? 'w-[90vw] sm:w-[500px] lg:w-[600px] border-4' 
                          : 'w-[280px] sm:w-[350px] border-2'
                      }`}
                      style={{ 
                        borderColor: review.borderColor,
                        boxShadow: isActive 
                          ? `0 25px 50px -12px ${review.borderColor}40, 0 0 0 1px ${review.borderColor}20`
                          : `0 10px 25px -5px ${review.borderColor}20`
                      }}>
                        {/* Gradient Background */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${review.gradient} opacity-5`}></div>
                        
                        {/* Decorative Elements */}
                        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br opacity-10 rounded-bl-full" style={{ backgroundColor: review.borderColor }}></div>
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr opacity-5 rounded-tr-full" style={{ backgroundColor: review.borderColor }}></div>
                        
                        <div className="relative z-10">
                          {/* Quote Icon */}
                          <div className="mb-6">
                            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${review.gradient} flex items-center justify-center shadow-lg`}>
                              <i className="fas fa-quote-left text-2xl text-white"></i>
                            </div>
                          </div>
                          
                          {/* Stars */}
                          <div className="flex items-center gap-1 mb-6">
                            {[...Array(5)].map((_, i) => (
                              <i key={i} className="fas fa-star text-yellow-400 text-lg sm:text-xl"></i>
                            ))}
                          </div>
                          
                          {/* Review Text */}
                          <p className={`text-gray-700 mb-8 leading-relaxed relative z-10 ${
                            isActive ? 'text-base sm:text-lg' : 'text-sm'
                          }`}>
                            "{review.review}"
                          </p>
                          
                          {/* Author Info */}
                          <div className="flex items-center gap-4 pt-6 border-t-2" style={{ borderColor: `${review.borderColor}20` }}>
                            <div className="relative">
                              <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full p-1 bg-gradient-to-br ${review.gradient} shadow-lg`}>
                                <img 
                                  src={review.image}
                                  alt={review.name}
                                  className="w-full h-full rounded-full object-cover"
                                />
                              </div>
                              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-4 border-white shadow-md"></div>
                            </div>
                            <div className="flex-1">
                              <h4 className={`font-bold text-gray-900 ${isActive ? 'text-xl sm:text-2xl' : 'text-lg'}`}>
                                {review.name}
                              </h4>
                              <p className={`text-gray-500 font-medium ${isActive ? 'text-sm sm:text-base' : 'text-xs sm:text-sm'}`}>
                                {review.course}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Navigation Buttons - Modern Style */}
            <div className="flex items-center justify-center gap-4 mt-16">
              <button
                onClick={() => {
                  setCurrentReview((prev) => (prev > 0 ? prev - 1 : 5))
                }}
                className="group relative w-14 h-14 rounded-full bg-gradient-to-br from-[#92487A] to-[#DA6422] shadow-lg hover:shadow-xl flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
                aria-label="Previous review"
              >
                <i className="fas fa-chevron-left text-lg group-hover:translate-x-[-2px] transition-transform"></i>
                <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
              </button>
              
              {/* Review Indicators */}
              <div className="flex items-center gap-3">
                {[0, 1, 2, 3, 4, 5].map((dot) => (
                  <button
                    key={dot}
                    onClick={() => setCurrentReview(dot)}
                    className={`transition-all duration-300 rounded-full ${
                      currentReview === dot
                        ? 'w-10 h-3 bg-gradient-to-r from-[#92487A] to-[#DA6422] shadow-md'
                        : 'w-3 h-3 bg-gray-300 hover:bg-gray-400'
                    }`}
                    aria-label={`Go to review ${dot + 1}`}
                  />
                ))}
              </div>
              
              <button
                onClick={() => {
                  setCurrentReview((prev) => (prev < 5 ? prev + 1 : 0))
                }}
                className="group relative w-14 h-14 rounded-full bg-gradient-to-br from-[#92487A] to-[#DA6422] shadow-lg hover:shadow-xl flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
                aria-label="Next review"
              >
                <i className="fas fa-chevron-right text-lg group-hover:translate-x-[2px] transition-transform"></i>
                <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured On Section */}
      <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4" style={{ fontWeight: 600 }}>
              Featured <span style={{ color: '#92487A', fontWeight: 600 }}>On</span>
            </h2>
          </div>
      <section className="py-16 sm:py-20 lg:py-16  bg-gradient-to-br from-[#92487A] via-[#92487A] to-[#DA6422]  relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#92487A] rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#DA6422] rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         

          {/* Auto-Scrolling Carousel */}
          <div className="relative overflow-hidden">
            <div className="flex gap-6 md:gap-8 overflow-hidden">
              <div 
                className="flex gap-6 md:gap-8 animate-scroll"
                style={{
                  animation: 'scroll 30s linear infinite',
                  width: 'fit-content'
                }}
              >
                {/* Featured Media Outlets */}
                {[
                  {
                    name: "Women Entrepreneur India",
                    image: "https://www.academyofvedicvidya.com/wp-content/uploads/2025/01/Women-Entrepreneur-India-_-https___www_womenentrepreneurindia_com_editors-guest-column_dyn.png",
                    link: "https://www.womenentrepreneurindia.com/editors-guest-column/dyn"
                  },
                  {
                    name: "SugerMint",
                    image: "https://www.academyofvedicvidya.com/wp-content/uploads/2025/01/SugerMint-_-https___sugermint_com_diksha-katyal.png",
                    link: "https://sugermint.com/diksha-katyal"
                  },
                  {
                    name: "APN News",
                    image: "https://www.academyofvedicvidya.com/wp-content/uploads/2025/01/APN-News-_-https___www_apnnews_com_academy-of-vedic-vidya-introduces-unique-courses-in-ved.png",
                    link: "https://www.apnnews.com/academy-of-vedic-vidya-introduces-unique-courses-in-ved"
                  },
                  {
                    name: "Biz News Desk",
                    image: "https://www.academyofvedicvidya.com/wp-content/uploads/2025/01/Biz-News-Desk-_-https___biznewsdesk_com_education_academy-of-vedic-vidya-introduces-unique.png",
                    link: "https://biznewsdesk.com/education/academy-of-vedic-vidya-introduces-unique"
                  },
                  {
                    name: "India Education Diary",
                    image: "https://www.academyofvedicvidya.com/wp-content/uploads/2025/01/India-Education-Diary-_-https___indiaeducationdiary_in_academy-of-vedic-vidya-introduces-u.png",
                    link: "https://indiaeducationdiary.in/academy-of-vedic-vidya-introduces-u"
                  },
                  {
                    name: "Dainik Bhaskar UP",
                    image: "https://www.academyofvedicvidya.com/wp-content/uploads/2025/01/Dainik-Bhaskar-UP-httpsepaper_dainikbhaskarup_commedia2023-0864e423d103b17-noida_s11_jpg-.png",
                    link: "https://epaper.dainikbhaskarup.com/media/2023-08/64e423d103b17-noida_s11.jpg"
                  }
                ].map((item, index) => (
                  <a
                    key={index}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 w-[180px] sm:w-[200px] md:w-[220px] h-[120px] sm:h-[140px] md:h-[150px] flex items-center justify-center bg-white rounded-lg p-3 sm:p-4 hover:shadow-xl transition-all duration-300 border border-gray-100"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="max-w-full max-h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                      loading="lazy"
                    />
                  </a>
                ))}
                {/* Duplicate set for seamless infinite scroll */}
                {[
                  {
                    name: "Women Entrepreneur India",
                    image: "https://www.academyofvedicvidya.com/wp-content/uploads/2025/01/Women-Entrepreneur-India-_-https___www_womenentrepreneurindia_com_editors-guest-column_dyn.png",
                    link: "https://www.womenentrepreneurindia.com/editors-guest-column/dyn"
                  },
                  {
                    name: "SugerMint",
                    image: "https://www.academyofvedicvidya.com/wp-content/uploads/2025/01/SugerMint-_-https___sugermint_com_diksha-katyal.png",
                    link: "https://sugermint.com/diksha-katyal"
                  },
                  {
                    name: "APN News",
                    image: "https://www.academyofvedicvidya.com/wp-content/uploads/2025/01/APN-News-_-https___www_apnnews_com_academy-of-vedic-vidya-introduces-unique-courses-in-ved.png",
                    link: "https://www.apnnews.com/academy-of-vedic-vidya-introduces-unique-courses-in-ved"
                  },
                  {
                    name: "Biz News Desk",
                    image: "https://www.academyofvedicvidya.com/wp-content/uploads/2025/01/Biz-News-Desk-_-https___biznewsdesk_com_education_academy-of-vedic-vidya-introduces-unique.png",
                    link: "https://biznewsdesk.com/education/academy-of-vedic-vidya-introduces-unique"
                  },
                  {
                    name: "India Education Diary",
                    image: "https://www.academyofvedicvidya.com/wp-content/uploads/2025/01/India-Education-Diary-_-https___indiaeducationdiary_in_academy-of-vedic-vidya-introduces-u.png",
                    link: "https://indiaeducationdiary.in/academy-of-vedic-vidya-introduces-u"
                  },
                  {
                    name: "Dainik Bhaskar UP",
                    image: "https://www.academyofvedicvidya.com/wp-content/uploads/2025/01/Dainik-Bhaskar-UP-httpsepaper_dainikbhaskarup_commedia2023-0864e423d103b17-noida_s11_jpg-.png",
                    link: "https://epaper.dainikbhaskarup.com/media/2023-08/64e423d103b17-noida_s11.jpg"
                  }
                ].map((item, index) => (
                  <a
                    key={`duplicate-${index}`}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 w-[180px] sm:w-[200px] md:w-[220px] h-[120px] sm:h-[140px] md:h-[150px] flex items-center justify-center bg-white rounded-lg p-3 sm:p-4 hover:shadow-xl transition-all duration-300 border border-gray-100"
                    aria-hidden="true"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="max-w-full max-h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                      loading="lazy"
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CSS Animation for Auto-Scroll */}
        <style>{`
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          .animate-scroll {
            animation: scroll 30s linear infinite;
          }
          .animate-scroll:hover {
            animation-play-state: paused;
          }
        `}</style>
      </section>

      {/* Take Your Next Step Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Side - Heading and Image */}
            <div className="flex flex-col justify-center lg:justify-start order-2 lg:order-1 h-full">
            
              
              {/* Image */}
              <div className="relative w-full max-w-lg mx-auto lg:mx-0">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl h-full min-h-[600px] lg:min-h-[700px]">
                  <img
                    src={formImg}
                    alt="Vedic Science"
                    className="w-full h-full object-cover rounded-2xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#92487A]/20 to-transparent"></div>
                </div>
                {/* Decorative elements */}
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-[#DA6422] rounded-full opacity-20 blur-2xl"></div>
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-[#92487A] rounded-full opacity-20 blur-2xl"></div>
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="order-1 lg:order-2">
                {/* Main Heading */}
                <h2 className="text-3xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-3 text-center lg:text-left">
                Take Your Next Step Towards <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#92487A] to-[#DA6422]">Vedic Science</span>
              </h2>
              <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
                <p className="text-gray-600 mb-4">
                  Fill out the form below and our team will get back to you soon.
                </p>
                
                <form className="space-y-3">
                  {/* First Name and Last Name - Side by Side */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* First Name Field */}
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700 mb-2">
                        First Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        required
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#92487A] focus:outline-none transition-colors duration-300"
                        placeholder="Enter first name"
                      />
                    </div>

                    {/* Last Name Field */}
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700 mb-2">
                        Last Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        required
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#92487A] focus:outline-none transition-colors duration-300"
                        placeholder="Enter last name"
                      />
                    </div>
                  </div>

                  {/* Email and Phone - Side by Side */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Email Field */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#92487A] focus:outline-none transition-colors duration-300"
                        placeholder="Enter your email"
                      />
                    </div>

                    {/* Phone Field */}
                    <div>
                      <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#92487A] focus:outline-none transition-colors duration-300"
                        placeholder="Enter phone number"
                      />
                    </div>
                  </div>

                  {/* Course Interest Field */}
                  <div>
                    <label htmlFor="course" className="block text-sm font-semibold text-gray-700 mb-2">
                      Course of Interest
                    </label>
                    <select
                      id="course"
                      name="course"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#92487A] focus:outline-none transition-colors duration-300"
                    >
                      <option value="">Select a course</option>
                      <option value="vedic-astrology">Vedic Astrology</option>
                      <option value="vedic-numerology">Vedic Numerology</option>
                      <option value="vastu-shastra">Vastu Shastra</option>
                      <option value="palmistry">Palmistry</option>
                      <option value="crystal-healing">Crystal Healing</option>
                      <option value="tarot-reading">Tarot Card Reading</option>
                      <option value="reiki-healing">Reiki Healing</option>
                      <option value="feng-shui">Feng Shui</option>
                      <option value="meditation">Meditation & Mindfulness</option>
                    </select>
                  </div>

                  {/* Message Field */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows="4"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#92487A] focus:outline-none transition-colors duration-300 resize-none"
                      placeholder="Tell us about your interest in Vedic Science..."
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#92487A] to-[#DA6422] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:opacity-90 transition-opacity duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform flex items-center justify-center space-x-2"
                  >
                    <span>Submit</span>
                    <i className="fas fa-arrow-right text-white"></i>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp Icon - Fixed at bottom left */}
      <WhatsappIcone />
    </>
  )
}

export default Home
