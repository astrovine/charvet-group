import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const testimonials = [
  {
    quote: "The Imperial Crown has become our signature offering. Guests consistently ask about it.",
    author: "Michael Chen",
    role: "Beverage Director",
    company: "The Ritz Collection"
  },
  {
    quote: "Quality and presentation that matches our five-star standards. Simply exceptional.",
    author: "Sarah Martinez",
    role: "Executive Chef",
    company: "Lumière Restaurant"
  },
  {
    quote: "Our members expect the best. SellWell delivers premium beverages that exceed expectations.",
    author: "James Patterson",
    role: "General Manager",
    company: "Royal Oak Country Club"
  }
]

export default function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      {/* Ambient background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-gold-100/30 to-amber-100/30 rounded-full blur-3xl"></div>

      <div className="relative max-w-5xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-gold-100/50 backdrop-blur-sm text-gold-700 text-xs font-semibold tracking-wider uppercase mb-6">
            What Our Partners Say
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-charvet-900 tracking-tight">
            Trusted Excellence
          </h2>
        </div>

        <div className="relative">
          {/* Glassmorphic card */}
          <div className="bg-white/60 backdrop-blur-xl border border-white/40 rounded-3xl p-12 md:p-16 shadow-2xl min-h-[320px] flex items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="w-full"
              >
                <svg className="w-12 h-12 text-gold-400 mb-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>

                <p className="text-xl md:text-2xl text-gray-800 font-light leading-relaxed mb-8">
                  "{testimonials[currentIndex].quote}"
                </p>

                <div>
                  <p className="text-lg font-semibold text-charvet-900">
                    {testimonials[currentIndex].author}
                  </p>
                  <p className="text-sm text-gray-600">
                    {testimonials[currentIndex].role}, {testimonials[currentIndex].company}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={handlePrev}
              className="w-12 h-12 rounded-full bg-white/80 backdrop-blur-sm border border-white/40 shadow-lg hover:bg-gold-400 hover:border-gold-400 transition-all flex items-center justify-center group"
            >
              <svg className="w-5 h-5 text-charvet-900 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? 'w-8 bg-gold-500'
                      : 'w-2 bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="w-12 h-12 rounded-full bg-white/80 backdrop-blur-sm border border-white/40 shadow-lg hover:bg-gold-400 hover:border-gold-400 transition-all flex items-center justify-center group"
            >
              <svg className="w-5 h-5 text-charvet-900 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

