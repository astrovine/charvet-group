import { Link } from 'react-router-dom'

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-zinc-900 to-slate-950">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        {/* Main Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1751178185249-f382832343c8?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDU2fENEd3V3WEpBYkV3fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&q=60&w=600')"
          }}
        ></div>
        {/* Modern gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950/80 via-zinc-900/60 to-slate-950/80"></div>
        {/* Ambient glow effects */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
        <div className="space-y-10">
          <div className="space-y-8">
            <p className="text-gold-400 text-[10px] tracking-[0.5em] uppercase font-light">
              Since 1985
            </p>
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-sans font-light text-white leading-[1.1] tracking-tight">
              Crafting Excellence
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-gold-400 via-amber-300 to-gold-500 mt-3 font-normal">
                In Every Sip
              </span>
            </h1>
          </div>

          <p className="text-base md:text-lg text-zinc-300 max-w-2xl mx-auto leading-relaxed font-light">
            Premium beverages crafted with passion, precision, and an unwavering commitment to quality
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-12">
            <Link
              to="/products"
              className="group px-8 py-4 bg-white text-slate-900 font-medium text-sm tracking-wide transition-all duration-300 rounded-full hover:bg-gold-400 hover:text-slate-950 shadow-2xl hover:shadow-gold-500/20 hover:scale-105"
            >
              Explore Collection
            </Link>
            <Link
              to="/login"
              className="px-8 py-4 bg-transparent backdrop-blur-md border border-zinc-700/50 hover:border-gold-500/50 hover:bg-zinc-800/30 text-white font-medium text-sm tracking-wide transition-all duration-300 rounded-full"
            >
              Partner Login
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg className="w-5 h-5 text-zinc-500" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </section>
  )
}
