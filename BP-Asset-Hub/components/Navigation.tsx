'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FiMenu, FiX, FiSearch, FiShoppingCart, FiUser } from 'react-icons/fi';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <nav className="sticky top-0 z-50 glass border-b border-white border-opacity-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-bp-red rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">BP</span>
            </div>
            <span className="hidden sm:inline font-bold text-lg">Bournys</span>
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search assets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 bg-bp-darker border border-white border-opacity-10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-bp-red transition-smooth"
              />
              <FiSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/marketplace" className="hover:text-bp-red transition-smooth">
              Marketplace
            </Link>
            <Link href="/dashboard" className="hover:text-bp-red transition-smooth">
              Dashboard
            </Link>
            <div className="flex items-center gap-4">
              <button className="relative hover:text-bp-red transition-smooth">
                <FiShoppingCart size={20} />
                <span className="absolute -top-2 -right-2 bg-bp-red text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  0
                </span>
              </button>
              <button className="px-4 py-2 bg-bp-red hover:bg-bp-red-hover rounded-lg font-semibold transition-smooth">
                <FiUser size={20} />
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white hover:text-bp-red transition-smooth"
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t border-white border-opacity-10">
            <div className="py-4">
              <input
                type="text"
                placeholder="Search assets..."
                className="w-full px-4 py-2 bg-bp-darker border border-white border-opacity-10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-bp-red mb-4"
              />
            </div>
            <Link href="/marketplace" className="block py-2 hover:text-bp-red transition-smooth">
              Marketplace
            </Link>
            <Link href="/dashboard" className="block py-2 hover:text-bp-red transition-smooth">
              Dashboard
            </Link>
            <div className="pt-4 border-t border-white border-opacity-10 mt-4 flex gap-2">
              <button className="flex-1 px-4 py-2 bg-bp-card border border-bp-red border-opacity-30 rounded-lg hover:border-opacity-100 transition-smooth">
                Cart
              </button>
              <button className="flex-1 px-4 py-2 bg-bp-red hover:bg-bp-red-hover rounded-lg font-semibold transition-smooth">
                Login
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
