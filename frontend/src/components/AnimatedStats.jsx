import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import CountUp from 'react-countup'

const stats = [
  { value: 40, suffix: '+', label: 'Years Excellence', prefix: '' },
  { value: 5, suffix: '', label: 'Signature Blends', prefix: '' },
  { value: 100, suffix: '%', label: 'Natural', prefix: '' },
  { value: 50, suffix: '+', label: 'Partners', prefix: '' }
]

export default function AnimatedStats() {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true
  })
  const [startCounting, setStartCounting] = useState(false)

  useEffect(() => {
    if (inView) {
      setStartCounting(true)
    }
  }, [inView])

  return (
    <section ref={ref} className="py-20 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      {/* Subtle ambient glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-gold-100/20 via-transparent to-amber-100/20 blur-3xl"></div>
      
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative inline-block">
                <div className="text-5xl md:text-6xl font-display font-bold bg-gradient-to-br from-charvet-900 via-gold-700 to-amber-600 bg-clip-text text-transparent mb-3">
                  {startCounting ? (
                    <CountUp
                      start={0}
                      end={stat.value}
                      duration={2.5}
                      suffix={stat.suffix}
                      prefix={stat.prefix}
                    />
                  ) : (
                    `${stat.prefix}0${stat.suffix}`
                  )}
                </div>
                {/* Glow effect */}
                <div className="absolute inset-0 blur-2xl opacity-20 group-hover:opacity-40 transition-opacity bg-gradient-to-br from-gold-400 to-amber-500"></div>
              </div>
              <div className="text-sm md:text-base text-gray-600 font-medium tracking-wide">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

