import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

// Import local images
import imperialCrownImg from '../assets/images/products/imperial_crown.jpeg'
import cranberryImg from '../assets/images/products/cranberry.jpeg'
import orangeImg from '../assets/images/products/orange.jpeg'
import mangoImg from '../assets/images/products/mango.jpeg'
import blackStallionImg from '../assets/images/products/black_stallion.jpeg'

const products = [
  {
    id: 1,
    name: 'Imperial Crown',
    tagline: 'The Sovereign Choice',
    description: 'A regal blend that commands attention. Rich, bold, and crafted for those who appreciate the finer things in life. Our flagship beverage represents the pinnacle of our craft—a harmonious blend of premium ingredients that creates an unforgettable taste experience.',
    details: [
      '100% Natural Ingredients',
      'No Artificial Preservatives',
      'Rich & Bold Flavor Profile',
      'Premium Glass Bottle'
    ],
    image: imperialCrownImg,
    color: 'from-amber-900 to-yellow-800'
  },
  {
    id: 2,
    name: 'Cranberry',
    tagline: 'Elegance Refined',
    description: 'A delicate balance of tartness and sweetness. Sophisticated, refreshing, and impossibly smooth. Made from hand-selected cranberries, this blend offers a refined taste that appeals to the most discerning palates.',
    details: [
      'Hand-Selected Cranberries',
      'Perfectly Balanced Taste',
      'Antioxidant Rich',
      'Refreshingly Smooth'
    ],
    image: cranberryImg,
    color: 'from-red-900 to-rose-700'
  },
  {
    id: 3,
    name: 'Orange',
    tagline: 'Pure Vitality',
    description: 'Sun-kissed perfection in every pour. Vibrant, energizing, and refreshingly authentic. Crafted from the finest oranges, our Orange blend captures the essence of freshness with every sip.',
    details: [
      'Fresh-Squeezed Quality',
      'Vitamin C Enriched',
      'Natural Sweetness',
      'No Added Sugar'
    ],
    image: orangeImg,
    color: 'from-orange-700 to-amber-600'
  },
  {
    id: 4,
    name: 'Mango',
    tagline: 'Tropical Luxury',
    description: 'An exotic escape captured in a bottle. Luscious, velvety, and utterly indulgent. Our Mango blend transports you to tropical paradise with its rich, authentic flavor and smooth finish.',
    details: [
      'Exotic Mango Varieties',
      'Velvety Smooth Texture',
      'Rich Tropical Flavor',
      'Premium Quality'
    ],
    image: mangoImg,
    color: 'from-yellow-600 to-orange-500'
  },
  {
    id: 5,
    name: 'Black Stallion',
    tagline: 'Untamed Excellence',
    description: 'Bold, mysterious, and powerfully distinctive. For those who dare to stand apart. Our most enigmatic creation, Black Stallion is a testament to innovation and audacity in beverage craftsmanship.',
    details: [
      'Signature Blend',
      'Bold & Distinctive',
      'Limited Edition',
      'Collector\'s Choice'
    ],
    image: blackStallionImg,
    color: 'from-gray-900 to-gray-700'
  }
]

export default function Products() {
  return (
    <div className="bg-white min-h-screen">
      <Navbar />

      <section className="pt-32 pb-20 bg-gradient-to-br from-charvet-900 to-charvet-700">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <p className="text-gold-400 text-sm tracking-[0.3em] uppercase font-medium mb-4">
            Premium Collection
          </p>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6">
            Our Products
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Five distinct experiences, each crafted to perfection
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid gap-20">
            {products.map((product, index) => (
              <div
                key={product.id}
                className="grid md:grid-cols-5 gap-8 items-start"
              >
                <div className="md:col-span-2">
                  <div className="sticky top-24">
                    <div className="relative h-[500px] rounded-sm overflow-hidden shadow-2xl">
                      <div className={`absolute inset-0 bg-gradient-to-br ${product.color}`}>
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover mix-blend-overlay opacity-30"
                        />
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-6xl font-serif font-bold text-white/20">
                          {product.name.split(' ')[0]}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-3 space-y-8">
                  <div>
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-charvet-900 mb-2">
                      {product.name}
                    </h2>
                    <p className="text-gold-600 text-xl italic font-light">
                      {product.tagline}
                    </p>
                  </div>

                  <p className="text-lg text-gray-700 leading-relaxed">
                    {product.description}
                  </p>

                  <div className="bg-charvet-50 p-8 rounded-sm">
                    <h3 className="font-semibold text-charvet-900 mb-4">Product Features</h3>
                    <ul className="grid md:grid-cols-2 gap-3">
                      {product.details.map((detail, idx) => (
                        <li key={idx} className="flex items-center text-gray-700">
                          <svg className="w-5 h-5 text-gold-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4">
                    <Link
                      to="/login"
                      className="inline-block px-8 py-3 bg-charvet-800 hover:bg-charvet-900 text-white font-medium text-sm tracking-wide transition-all rounded-sm"
                    >
                      BECOME A PARTNER
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-charvet-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-serif font-bold text-charvet-900 mb-6">
            Experience the Difference
          </h2>
          <p className="text-lg text-gray-700 mb-8">
            Join our network of distinguished partners and bring premium quality to your customers.
          </p>
          <Link
            to="/login"
            className="inline-block px-10 py-4 bg-charvet-800 hover:bg-charvet-900 text-white font-medium text-sm tracking-wide transition-all rounded-sm shadow-lg"
          >
            PARTNER LOGIN
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
