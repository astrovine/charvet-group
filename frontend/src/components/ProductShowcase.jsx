import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Tilt } from 'react-tilt'


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
		description:
			'A regal blend that commands attention. Rich, bold, and crafted for those who appreciate the finer things in life.',
		image: imperialCrownImg,
		color: 'from-amber-500/20 to-yellow-600/20',
		accent: 'bg-gradient-to-br from-amber-400 to-yellow-600',
	},
	{
		id: 2,
		name: 'Cranberry',
		tagline: 'Elegance Refined',
		description:
			'A delicate balance of tartness and sweetness. Sophisticated, refreshing, and impossibly smooth.',
		image: cranberryImg,
		color: 'from-red-500/20 to-rose-600/20',
		accent: 'bg-gradient-to-br from-red-400 to-rose-600',
	},
	{
		id: 3,
		name: 'Orange',
		tagline: 'Pure Vitality',
		description:
			'Sun-kissed perfection in every pour. Vibrant, energizing, and refreshingly authentic.',
		image: orangeImg,
		color: 'from-orange-500/20 to-amber-500/20',
		accent: 'bg-gradient-to-br from-orange-400 to-amber-500',
	},
	{
		id: 4,
		name: 'Mango',
		tagline: 'Tropical Luxury',
		description:
			'An exotic escape captured in a bottle. Luscious, velvety, and utterly indulgent.',
		image: mangoImg,
		color: 'from-yellow-400/20 to-orange-400/20',
		accent: 'bg-gradient-to-br from-yellow-300 to-orange-500',
	},
	{
		id: 5,
		name: 'Black Stallion',
		tagline: 'Untamed Excellence',
		description:
			'Bold, mysterious, and powerfully distinctive. For those who dare to stand apart.',
		image: blackStallionImg,
		color: 'from-gray-800/20 to-slate-900/20',
		accent: 'bg-gradient-to-br from-gray-700 to-slate-900',
	},
	{
		id: 6,
		name: 'Custom Blend',
		tagline: 'Special Edition',
		description:
			'A unique blend crafted just for you. A limited-time offering that embodies exclusivity and bespoke luxury.',
		image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800',
		color: 'from-purple-500/20 to-indigo-600/20',
		accent: 'bg-gradient-to-br from-purple-400 to-indigo-600',
		isComingSoon: true,
	},
]

export default function ProductShowcase() {
	return (
		<section className="relative py-24 overflow-hidden">
			{/* Ambient Background with Parallax Effect */}
			<div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50 to-white" />
			<div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-gold-200/40 to-transparent blur-3xl animate-pulse" style={{ animationDuration: '4s' }}></div>
			<div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-amber-200/40 to-transparent blur-3xl animate-pulse" style={{ animationDuration: '5s' }}></div>

			<div className="relative max-w-7xl mx-auto px-6 lg:px-8">
				{/* Header */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className="text-center mb-20"
				>
					<span className="inline-block px-5 py-2 rounded-full bg-gradient-to-r from-gold-100/80 to-amber-100/80 backdrop-blur-sm text-gold-800 text-xs font-semibold tracking-[0.2em] uppercase mb-8 shadow-sm">
						Our Collection
					</span>
					<h2 className="text-6xl md:text-7xl lg:text-8xl font-display font-bold text-charvet-900 mb-6 tracking-tight leading-none">
						Five Signature
						<span className="block text-transparent bg-clip-text bg-gradient-to-r from-gold-600 via-amber-600 to-gold-700 mt-2">
							Experiences
						</span>
					</h2>
					<p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed">
						Each blend tells its own story, crafted with precision and passion
					</p>
				</motion.div>

				{/* Premium Bento Grid with 3D Tilt Effect */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
					{products.map((product, index) => (
						<motion.div
							key={product.id}
							initial={{ opacity: 0, y: 40 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: index * 0.15, duration: 0.6 }}
						>
							<Tilt
								options={{
									max: 8,
									scale: 1.02,
									speed: 1000,
									glare: true,
									maxGlare: 0.15,
								}}
								className="h-full"
							>
								<div className="group relative overflow-hidden rounded-[2rem] h-[500px] cursor-pointer">
									{/* Premium Glassmorphic Card */}
									<div className="relative h-full bg-gradient-to-br from-white/70 to-white/50 backdrop-blur-2xl border border-white/30 shadow-[0_8px_32px_0_rgba(0,0,0,0.12)] overflow-hidden">
										{/* Sophisticated Gradient Overlay */}
										<div
											className={`absolute inset-0 bg-gradient-to-br ${product.color} opacity-60 group-hover:opacity-80 transition-all duration-700`}
										/>

										{/* Premium Image Treatment */}
										<div className="absolute inset-0 overflow-hidden">
											<img
												src={product.image}
												alt={product.name}
												className="w-full h-full object-cover opacity-25 group-hover:opacity-35 group-hover:scale-110 transition-all duration-1000 ease-out"
											/>
											{/* Image overlay for depth */}
											<div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
										</div>

										{/* Content with Enhanced Typography */}
										<div className="relative h-full p-10 flex flex-col justify-end">
											{/* Accent Line */}
											<motion.div
												className={`h-1 ${product.accent} rounded-full mb-8 shadow-lg`}
												initial={{ width: 0 }}
												whileInView={{ width: 80 }}
												viewport={{ once: true }}
												transition={{ delay: index * 0.15 + 0.3, duration: 0.8 }}
											/>

											<h3 className="text-5xl font-display font-bold text-charvet-900 mb-3 tracking-tight leading-none group-hover:tracking-wide transition-all duration-300">
												{product.name}
											</h3>

											<p className="text-gold-800 font-semibold text-lg mb-5 tracking-wide">
												{product.tagline}
											</p>

											<p className="text-gray-700 text-base leading-relaxed mb-6 max-h-0 opacity-0 group-hover:max-h-32 group-hover:opacity-100 transition-all duration-500">
												{product.description}
											</p>

											<Link
												to="/products"
												className="inline-flex items-center text-charvet-900 font-bold text-sm tracking-wide hover:gap-4 gap-2 transition-all duration-300 group/link"
											>
												<span className="relative">
													Explore Collection
													<span className="absolute bottom-0 left-0 w-0 h-0.5 bg-charvet-900 group-hover/link:w-full transition-all duration-300"></span>
												</span>
												<svg
													className="w-5 h-5"
													fill="none"
													stroke="currentColor"
													viewBox="0 0 24 24"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth={2.5}
														d="M17 8l4 4m0 0l-4 4m4-4H3"
													/>
												</svg>
											</Link>
										</div>

										{/* Premium Shine Effect */}
										<div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
											<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1500" />
										</div>

										{/* Corner Accent */}
										<div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
									</div>
								</div>
							</Tilt>
						</motion.div>
					))}
				</div>

				{/* Refined CTA */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ delay: 0.5 }}
					className="text-center mt-20"
				>
					<Link
						to="/products"
						className="group inline-flex items-center gap-4 px-10 py-5 bg-gradient-to-r from-charvet-900 to-charvet-800 hover:from-charvet-800 hover:to-charvet-700 text-white font-semibold text-base tracking-wide rounded-full shadow-2xl hover:shadow-charvet-900/30 transition-all duration-300 hover:scale-105 border border-charvet-700/20"
					>
						View Full Collection
						<svg
							className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M14 5l7 7m0 0l-7 7m7-7H3"
							/>
						</svg>
					</Link>
				</motion.div>
			</div>
		</section>
	)
}
