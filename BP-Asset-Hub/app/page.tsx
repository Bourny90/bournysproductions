import React from 'react';
import Link from 'next/link';
import { FiShoppingCart, FiDownload, FiLock, FiZap, FiUsers, FiTrendingUp, FiCheck, FiArrowRight, FiCode, FiTruck, FiMap, FiBox } from 'react-icons/fi';

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Background Gradient */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-bp-red opacity-10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-bp-red opacity-5 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-5xl mx-auto px-4 text-center">
          {/* Kicker */}
          <div className="mb-6 inline-block">
            <span className="px-4 py-2 rounded-full bg-bp-red bg-opacity-10 border border-bp-red border-opacity-30 text-bp-red text-sm font-semibold uppercase tracking-wider">
              🚀 Premium Assets for Roblox Creators
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-6xl md:text-7xl font-black mb-6 leading-tight">
            The Trusted Marketplace for
            <br />
            <span className="bg-gradient-red bg-clip-text text-transparent">
              Roblox Developers
            </span>
          </h1>

          {/* Subheader */}
          <p className="text-xl text-gray-400 mb-12 max-width-3xl mx-auto leading-relaxed">
            Discover thousands of premium scripts, vehicles, maps, and complete systems. Secure payments, instant downloads, and world-class support—all in one marketplace.
          </p>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <div className="flex items-center gap-2 px-4 py-2 glass rounded-full text-sm">
              <FiLock size={16} className="text-bp-red" />
              Secure & Verified
            </div>
            <div className="flex items-center gap-2 px-4 py-2 glass rounded-full text-sm">
              <FiZap size={16} className="text-bp-red" />
              Instant Downloads
            </div>
            <div className="flex items-center gap-2 px-4 py-2 glass rounded-full text-sm">
              <FiUsers size={16} className="text-bp-red" />
              2.5K+ Products
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link href="/marketplace">
              <button className="btn-primary w-full sm:w-auto flex items-center justify-center gap-2">
                <FiShoppingCart size={20} />
                Browse Marketplace
              </button>
            </Link>
            <Link href="/auth/signup">
              <button className="btn-secondary w-full sm:w-auto flex items-center justify-center gap-2">
                Create Account
                <FiArrowRight size={18} />
              </button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 md:gap-8 mb-16">
            <div className="glass rounded-lg p-6">
              <div className="text-4xl font-bold text-bp-red mb-2">2.5K+</div>
              <div className="text-sm text-gray-400">Premium Products</div>
            </div>
            <div className="glass rounded-lg p-6">
              <div className="text-4xl font-bold text-bp-red mb-2">15K+</div>
              <div className="text-sm text-gray-400">Happy Users</div>
            </div>
            <div className="glass rounded-lg p-6">
              <div className="text-4xl font-bold text-bp-red mb-2">$500K+</div>
              <div className="text-sm text-gray-400">Total Sales</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-bp-darker">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">Why Choose BP Asset Hub?</h2>
            <p className="text-gray-400 text-lg">Everything you need for seamless asset purchasing and downloads</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1: Passwordless Auth */}
            <div className="glass-red rounded-lg p-8 hover:scale-105 transition-smooth">
              <div className="w-14 h-14 bg-bp-red rounded-lg flex items-center justify-center mb-4">
                <FiLock size={28} className="text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Passwordless Login</h3>
              <p className="text-gray-300 mb-4">
                No passwords to remember. Sign in with a 6-digit code sent to your email. Fast, secure, and simple.
              </p>
              <Link href="/auth/login" className="text-bp-red hover:text-bp-red-hover font-semibold text-sm flex items-center gap-2">
                Try It Now <FiArrowRight size={14} />
              </Link>
            </div>

            {/* Feature 2: Instant Downloads */}
            <div className="glass-red rounded-lg p-8 hover:scale-105 transition-smooth">
              <div className="w-14 h-14 bg-bp-red rounded-lg flex items-center justify-center mb-4">
                <FiDownload size={28} className="text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Instant Downloads</h3>
              <p className="text-gray-300 mb-4">
                Access your purchased products immediately. Download links available for 7 days with automatic renewal.
              </p>
              <Link href="/auth/signup" className="text-bp-red hover:text-bp-red-hover font-semibold text-sm flex items-center gap-2">
                Get Started <FiArrowRight size={14} />
              </Link>
            </div>

            {/* Feature 3: Secure Payments */}
            <div className="glass-red rounded-lg p-8 hover:scale-105 transition-smooth">
              <div className="w-14 h-14 bg-bp-red rounded-lg flex items-center justify-center mb-4">
                <FiShoppingCart size={28} className="text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Secure Payments</h3>
              <p className="text-gray-300 mb-4">
                Stripe-powered checkout with SSL encryption. Your payment information is always protected.
              </p>
              <Link href="/marketplace" className="text-bp-red hover:text-bp-red-hover font-semibold text-sm flex items-center gap-2">
                Browse Products <FiArrowRight size={14} />
              </Link>
            </div>

            {/* Feature 4: Download Center */}
            <div className="glass-red rounded-lg p-8 hover:scale-105 transition-smooth">
              <div className="w-14 h-14 bg-bp-red rounded-lg flex items-center justify-center mb-4">
                <FiZap size={28} className="text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Download Center</h3>
              <p className="text-gray-300 mb-4">
                Manage all your purchases in one place. View expiration dates, redownload anytime, track licenses.
              </p>
              <Link href="/downloads" className="text-bp-red hover:text-bp-red-hover font-semibold text-sm flex items-center gap-2">
                View Downloads <FiArrowRight size={14} />
              </Link>
            </div>

            {/* Feature 5: Premium Support */}
            <div className="glass-red rounded-lg p-8 hover:scale-105 transition-smooth">
              <div className="w-14 h-14 bg-bp-red rounded-lg flex items-center justify-center mb-4">
                <FiUsers size={28} className="text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Premium Support</h3>
              <p className="text-gray-300 mb-4">
                24/7 community support, detailed documentation, and direct creator communication. We're here to help.
              </p>
              <a href="#" className="text-bp-red hover:text-bp-red-hover font-semibold text-sm flex items-center gap-2">
                Get Support <FiArrowRight size={14} />
              </a>
            </div>

            {/* Feature 6: Verified Creators */}
            <div className="glass-red rounded-lg p-8 hover:scale-105 transition-smooth">
              <div className="w-14 h-14 bg-bp-red rounded-lg flex items-center justify-center mb-4">
                <FiTrendingUp size={28} className="text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Verified Creators</h3>
              <p className="text-gray-300 mb-4">
                All products manually reviewed. Quality assurance on every asset. Ratings and reviews from real users.
              </p>
              <Link href="/marketplace" className="text-bp-red hover:text-bp-red-hover font-semibold text-sm flex items-center gap-2">
                Browse Verified <FiArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-400 text-lg">Get started in 3 simple steps</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-bp-red to-bp-red bg-opacity-20 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-4xl font-bold text-bp-red">1</span>
                </div>
                {false && (
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 text-bp-red">
                    <FiArrowRight size={32} />
                  </div>
                )}
              </div>
              <h3 className="text-2xl font-bold mb-3">Create Account</h3>
              <p className="text-gray-400 mb-4">
                Sign up with your email. We'll send you a verification code. No password needed—ever.
              </p>
              <Link href="/auth/signup" className="text-bp-red hover:text-bp-red-hover font-semibold inline-flex items-center gap-2">
                Sign Up <FiArrowRight size={16} />
              </Link>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-bp-red to-bp-red bg-opacity-20 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-4xl font-bold text-bp-red">2</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-3">Browse & Purchase</h3>
              <p className="text-gray-400 mb-4">
                Browse 2,500+ verified products. Read reviews, check ratings, and purchase with Stripe.
              </p>
              <Link href="/marketplace" className="text-bp-red hover:text-bp-red-hover font-semibold inline-flex items-center gap-2">
                Browse Now <FiArrowRight size={16} />
              </Link>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-bp-red to-bp-red bg-opacity-20 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-4xl font-bold text-bp-red">3</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-3">Download & Enjoy</h3>
              <p className="text-gray-400 mb-4">
                Instant access to your purchases. Download anytime from your dashboard for 7 days.
              </p>
              <Link href="/downloads" className="text-bp-red hover:text-bp-red-hover font-semibold inline-flex items-center gap-2">
                Go to Downloads <FiArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="py-20 px-4 bg-bp-darker">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">Popular Categories</h2>
            <p className="text-gray-400 text-lg">Find what you need in seconds</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'Scripts', icon: FiCode, count: 428 },
              { name: 'Vehicles', icon: FiTruck, count: 156 },
              { name: 'Maps', icon: FiMap, count: 89 },
              { name: 'UI Systems', icon: FiBox, count: 234 },
            ].map((cat) => {
              const Icon = cat.icon;
              return (
                <Link key={cat.name} href={`/marketplace?category=${cat.name.toLowerCase().replace(' ', '-')}`}>
                  <div className="glass-red rounded-lg p-6 text-center hover:scale-105 transition-smooth cursor-pointer h-full">
                    <div className="w-14 h-14 bg-bp-red rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Icon size={24} className="text-white" />
                    </div>
                    <h3 className="font-semibold text-lg mb-1">{cat.name}</h3>
                    <p className="text-gray-400 text-sm">{cat.count} products</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">What Users Say</h2>
            <p className="text-gray-400 text-lg">Trusted by developers worldwide</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                text: 'The quality of assets here is incredible. Best marketplace for Roblox development. Highly recommended!',
                author: 'Alex Dev',
                emoji: '💻',
              },
              {
                text: 'Passwordless login is genius. I never have to worry about remembering passwords. Love it!',
                author: 'Sarah Studios',
                emoji: '🎨',
              },
              {
                text: 'Fast downloads, excellent support, and verified products. This is the gold standard.',
                author: 'Game Masters',
                emoji: '🎮',
              },
            ].map((testimonial, idx) => (
              <div key={idx} className="glass rounded-lg p-8">
                <div className="flex items-start gap-2 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-bp-red">★</span>
                  ))}
                </div>
                <p className="text-gray-300 mb-6 italic">"{testimonial.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-bp-red rounded-full flex items-center justify-center text-lg">
                    {testimonial.emoji}
                  </div>
                  <div>
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-gray-400 text-sm">Verified Customer</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security & Trust */}
      <section className="py-20 px-4 bg-bp-darker">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">Security & Trust</h2>
            <p className="text-gray-400 text-lg">Your data and transactions are protected</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass rounded-lg p-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-bp-red rounded-lg flex items-center justify-center flex-shrink-0">
                  <FiLock size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">SSL Encryption</h3>
                  <p className="text-gray-400">
                    All data transmitted with 256-bit SSL encryption. Your information is always secure.
                  </p>
                </div>
              </div>
            </div>

            <div className="glass rounded-lg p-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-bp-red rounded-lg flex items-center justify-center flex-shrink-0">
                  <FiCheck size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Stripe Payments</h3>
                  <p className="text-gray-400">
                    PCI DSS Level 1 compliant. Industry-leading payment processing and fraud protection.
                  </p>
                </div>
              </div>
            </div>

            <div className="glass rounded-lg p-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-bp-red rounded-lg flex items-center justify-center flex-shrink-0">
                  <FiZap size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">DMCA Protection</h3>
                  <p className="text-gray-400">
                    All products verified and screened. Copyright protection for creators and buyers.
                  </p>
                </div>
              </div>
            </div>

            <div className="glass rounded-lg p-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-bp-red rounded-lg flex items-center justify-center flex-shrink-0">
                  <FiUsers size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Community Moderated</h3>
                  <p className="text-gray-400">
                    Real user reviews and ratings. Trusted seller verification. Transparent feedback system.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="glass-red rounded-lg p-12 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-gray-300 text-lg mb-8">
              Join thousands of developers creating amazing Roblox experiences. No credit card required to sign up.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/auth/signup">
                <button className="btn-primary flex items-center justify-center gap-2">
                  Create Free Account
                  <FiArrowRight size={18} />
                </button>
              </Link>
              <Link href="/marketplace">
                <button className="btn-secondary">
                  Browse Products
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
