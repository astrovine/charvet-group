import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-dim-900 text-white border-t border-dim-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="space-y-4">
            <h3 className="text-2xl font-display font-semibold text-gold-400"> SellWell</h3>
            <p className="text-dim-400 text-sm leading-relaxed">
              Crafting premium beverages with passion and precision since 1985.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm tracking-wide text-dim-200">NAVIGATION</h4>
            <ul className="space-y-2 text-sm text-dim-400">
              <li><Link to="/" className="hover:text-gold-400 transition-colors">Home</Link></li>
              <li><Link to="/products" className="hover:text-gold-400 transition-colors">Products</Link></li>
              <li><Link to="/login" className="hover:text-gold-400 transition-colors">Login</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm tracking-wide text-dim-200">PRODUCTS</h4>
            <ul className="space-y-2 text-sm text-dim-400">
              <li><span className="hover:text-gold-400 transition-colors cursor-pointer">Imperial Crown</span></li>
              <li><span className="hover:text-gold-400 transition-colors cursor-pointer">Cranberry</span></li>
              <li><span className="hover:text-gold-400 transition-colors cursor-pointer">Orange</span></li>
              <li><span className="hover:text-gold-400 transition-colors cursor-pointer">Mango</span></li>
              <li><span className="hover:text-gold-400 transition-colors cursor-pointer">Black Stallion</span></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm tracking-wide text-dim-200">CONTACT</h4>
            <ul className="space-y-2 text-sm text-dim-400">
              <li>Email: info@sellwell.com</li>
              <li>Phone: +1 (555) 123-4567</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-dim-800 text-center text-sm text-dim-500">
          <p>&copy; {new Date().getFullYear()}  SellWell. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
