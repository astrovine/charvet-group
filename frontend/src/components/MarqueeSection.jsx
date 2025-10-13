import { motion } from 'framer-motion'

const partners = [
  'Premium Hotels',
  'Fine Dining',
  'Luxury Resorts',
  'Boutique Cafés',
  'Corporate Offices',
  'Event Venues',
  'Country Clubs',
  'Wellness Centers'
]

export default function MarqueeSection() {
  return (
    <section className="py-16 bg-gradient-to-r from-charvet-900 via-charvet-800 to-charvet-900 relative overflow-hidden">
      {/* Ambient shine effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>

      <div className="mb-8 text-center">
        <p className="text-gold-400 text-xs tracking-[0.4em] uppercase font-light">
          Trusted By Industry Leaders
        </p>
      </div>

      {/* Infinite scroll marquee */}
      <div className="relative">
        <div className="flex overflow-hidden">
          <motion.div
            className="flex gap-12 pr-12"
            animate={{
              x: [0, -1920],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 30,
                ease: "linear",
              },
            }}
          >
            {[...partners, ...partners, ...partners].map((partner, index) => (
              <div
                key={index}
                className="flex-shrink-0 px-8 py-4 text-white/60 text-lg font-light tracking-wide hover:text-gold-400 transition-colors whitespace-nowrap"
              >
                {partner}
              </div>
            ))}
          </motion.div>
        </div>

        {/* Gradient fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-charvet-900 to-transparent pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-charvet-900 to-transparent pointer-events-none"></div>
      </div>
    </section>
  )
}

