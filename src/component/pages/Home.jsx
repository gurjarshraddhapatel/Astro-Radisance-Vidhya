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
                  <i className="fas fa-arrow-right"></i>
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
                <span>Learn More</span>
                <i className="fas fa-arrow-right"></i>
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
                <span>Learn More</span>
                <i className="fas fa-arrow-right"></i>
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
                <span>Learn More</span>
                <i className="fas fa-arrow-right"></i>
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
                <span>Learn More</span>
                <i className="fas fa-arrow-right"></i>
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
                <span>Learn More</span>
                <i className="fas fa-arrow-right"></i>
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
                <span>Learn More</span>
                <i className="fas fa-arrow-right"></i>
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
              <i className="fas fa-arrow-right"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 sm:py-20 lg:py-10 bg-gray-100 relative overflow-hidden">
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
              <div className="space-y-10 md:space-y-12">
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

      {/* Take Your Next Step Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Side - Heading and Image */}
            <div className="flex flex-col justify-center lg:justify-start order-2 lg:order-1 h-full">
              {/* Main Heading */}
              <h2 className="text-3xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-6 text-center lg:text-left">
                Take Your Next Step Towards <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#92487A] to-[#DA6422]">Vedic Science</span>
              </h2>
              
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
              <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
                <p className="text-gray-600 mb-6">
                  Fill out the form below and our team will get back to you soon.
                </p>
                
                <form className="space-y-5">
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
                    <i className="fas fa-arrow-right"></i>
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
