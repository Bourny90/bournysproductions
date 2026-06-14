'use client';

import React from 'react';
import { FiSearch } from 'react-icons/fi';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-bp-red opacity-10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-bp-red opacity-5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 text-center">
        {/* Kicker */}
        <div className="mb-6 inline-block">
          <span className="px-4 py-2 rounded-full bg-bp-red bg-opacity-10 border border-bp-red border-opacity-30 text-bp-red text-sm font-semibold uppercase tracking-wider">
            🚀 Premium Assets for Creators
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
          Premium Roblox Assets &
          <br />
          <span className="bg-gradient-red bg-clip-text text-transparent">
            Development Resources
          </span>
        </h1>

        {/* Subheader */}
        <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
          Discover high-quality scripts, vehicles, maps, UI systems, and complete solutions for your Roblox projects. Built by creators, for creators.
        </p>

        {/* Search Bar */}
        <div className="mb-12">
          <div className="relative max-w-2xl mx-auto">
            <div className="glass-red rounded-xl p-2 flex items-center gap-3">
              <FiSearch size={24} className="text-bp-red ml-3" />
              <input
                type="text"
                placeholder="Search assets, scripts, vehicles..."
                className="flex-1 bg-transparent border-none outline-none text-white placeholder-gray-500 text-lg"
              />
              <button className="px-6 py-3 bg-bp-red hover:bg-bp-red-hover rounded-lg font-semibold transition-smooth">
                Search
              </button>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="btn-primary w-full sm:w-auto">
            Explore Marketplace
          </button>
          <button className="btn-secondary w-full sm:w-auto">
            Sell Your Assets
          </button>
        </div>

        {/* Statistics */}
        <div className="mt-20 grid grid-cols-3 gap-8">
          <div className="glass rounded-lg p-6">
            <div className="text-4xl font-bold text-bp-red mb-2">2.5K+</div>
            <div className="text-gray-400">Products</div>
          </div>
          <div className="glass rounded-lg p-6">
            <div className="text-4xl font-bold text-bp-red mb-2">15K+</div>
            <div className="text-gray-400">Happy Users</div>
          </div>
          <div className="glass rounded-lg p-6">
            <div className="text-4xl font-bold text-bp-red mb-2">$500K+</div>
            <div className="text-gray-400">Sales Volume</div>
          </div>
        </div>
      </div>
    </section>
  );
}
