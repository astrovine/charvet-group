import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import ProductShowcase from '../components/ProductShowcase'
import Heritage from '../components/Heritage'
import Footer from '../components/Footer'
import MarqueeSection from '../components/MarqueeSection'
import TestimonialsCarousel from '../components/TestimonialsCarousel'

export default function Homepage() {
  return (
    <div className="bg-dim-950">
      <Navbar />
      <Hero />
      <Heritage />
      <MarqueeSection />
      <ProductShowcase />
      <TestimonialsCarousel />
      <Footer />
    </div>
  )
}
