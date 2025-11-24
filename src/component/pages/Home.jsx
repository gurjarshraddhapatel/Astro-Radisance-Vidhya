import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import astroImg from '../../assets/sadhu.png'

const Home = () => {
  const canvasRef = useRef(null)
  const headerRef = useRef(null)
  const animationRef = useRef(null)
  const pointsRef = useRef([])
  const targetRef = useRef({ x: 0, y: 0 })
  const animateHeaderRef = useRef(true)

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

  return (
    <>
      <div
        id="large-header"
        ref={headerRef}
        className="large-header  relative w-full bg-[#180326] overflow-hidden bg-cover bg-center z-10"
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
                <Link to="/courses" className="bg-[#92487A] border-2 border-white text-white px-6 py-3 rounded-lg font-semibold text-lg hover:opacity-90 transition-opacity duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform">
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
                  className="w-full h-auto object-contain rounded-lg shadow-2xl"
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
              to="/courses"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#DA6422] to-[#DA6422] text-white px-8 py-3 rounded-lg font-semibold text-lg hover:opacity-90 transition-opacity duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform"
            >
              <span>View All Courses</span>
              <i className="fas fa-arrow-right"></i>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home
