import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import CountUp from 'react-countup'

export default function Heritage() {
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
    <section className="py-24 bg-gradient-to-b from-charvet-50 to-white relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold-200/30 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <div className="space-y-6">
              <p className="text-gold-600 text-xs tracking-[0.4em] uppercase font-semibold">
                Our Story
              </p>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-charvet-900 leading-[1.1] tracking-tight">
                Four Decades of Distinction
              </h2>
            </div>

            <div className="space-y-6 text-lg text-gray-700 leading-relaxed font-light">
              <p>
                Since 1985,  SellWell has been at the forefront of premium beverage craftsmanship.
                What began as a family passion has evolved into a legacy of excellence.
              </p>
              <p>
                We source only the finest ingredients, combining traditional techniques with modern
                innovation to create beverages that don't just quench thirst—they tell a story.
              </p>
              <p className="text-charvet-900 font-medium text-xl">
                Every bottle carries our promise: uncompromising quality, timeless elegance,
                and a taste that transcends the ordinary.
              </p>
            </div>

            {/* Animated Statistics */}
            <div ref={ref} className="grid grid-cols-3 gap-6 pt-12">
              <div className="text-center group">
                <div className="relative inline-block">
                  <div className="text-5xl font-display font-bold bg-gradient-to-br from-gold-600 to-amber-600 bg-clip-text text-transparent mb-2">
                    {startCounting ? (
                      <CountUp start={0} end={40} duration={2.5} suffix="+" />
                    ) : (
                      '0+'
                    )}
                  </div>
                  <div className="absolute inset-0 blur-xl opacity-30 group-hover:opacity-50 transition-opacity bg-gradient-to-br from-gold-400 to-amber-500"></div>
                </div>
                <div className="text-sm text-gray-600 font-medium">Years Excellence</div>
              </div>
              <div className="text-center group">
                <div className="relative inline-block">
                  <div className="text-5xl font-display font-bold bg-gradient-to-br from-gold-600 to-amber-600 bg-clip-text text-transparent mb-2">
                    {startCounting ? (
                      <CountUp start={0} end={5} duration={2.5} />
                    ) : (
                      '0'
                    )}
                  </div>
                  <div className="absolute inset-0 blur-xl opacity-30 group-hover:opacity-50 transition-opacity bg-gradient-to-br from-gold-400 to-amber-500"></div>
                </div>
                <div className="text-sm text-gray-600 font-medium">Signature Blends</div>
              </div>
              <div className="text-center group">
                <div className="relative inline-block">
                  <div className="text-5xl font-display font-bold bg-gradient-to-br from-gold-600 to-amber-600 bg-clip-text text-transparent mb-2">
                    {startCounting ? (
                      <CountUp start={0} end={100} duration={2.5} suffix="%" />
                    ) : (
                      '0%'
                    )}
                  </div>
                  <div className="absolute inset-0 blur-xl opacity-30 group-hover:opacity-50 transition-opacity bg-gradient-to-br from-gold-400 to-amber-500"></div>
                </div>
                <div className="text-sm text-gray-600 font-medium">Natural</div>
              </div>
            </div>
          </div>

          <div className="relative h-[650px] rounded-3xl overflow-hidden shadow-2xl group">
            <div className="absolute inset-0 bg-gradient-to-br from-charvet-800 to-charvet-600">
              <img
                src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800"
                alt="Heritage"
                className="w-full h-full object-cover mix-blend-overlay opacity-40 group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            {/* Overlay gradient for depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-charvet-900/60 to-transparent"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
