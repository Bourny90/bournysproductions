'use client';

import React, { useState } from 'react';
import ProductCard from '@/components/ProductCard';
import { FiChevronDown } from 'react-icons/fi';

const categories = ['scripts', 'vehicles', 'maps', 'ui-systems', 'uniforms', 'liveries', 'models', 'systems'];
const sortOptions = [
  { label: 'Newest', value: 'newest' },
  { label: 'Popular', value: 'popular' },
  { label: 'Highest Rated', value: 'rated' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
];

// Mock products
const mockProducts = [
  {
    id: '1',
    name: 'Premium Roleplay Framework',
    description: 'Complete roleplay system',
    long_description: '',
    price: 49.99,
    category: 'scripts',
    tags: [],
    thumbnail_url: 'https://images.unsplash.com/photo-1633356122544-f134ef2e00dc?w=300&h=300&fit=crop',
    images: [],
    seller_id: '1',
    downloads: 1250,
    rating: 4.8,
    reviews_count: 342,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    featured: false,
    status: 'active',
  },
  // Add more mock products...
];

export default function MarketplacePage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSort, setSelectedSort] = useState('newest');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold mb-4">Marketplace</h1>
          <p className="text-gray-400 text-lg">Browse our collection of premium Roblox assets</p>
        </div>

        {/* Filters and Sorting */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            {/* Search */}
            <div className="glass rounded-lg p-6 mb-6">
              <h3 className="font-semibold mb-4">Search</h3>
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 bg-bp-darker border border-white border-opacity-10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-bp-red transition-smooth"
              />
            </div>

            {/* Categories */}
            <div className="glass rounded-lg p-6">
              <h3 className="font-semibold mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
                    className={`block w-full text-left px-4 py-2 rounded-lg transition-smooth capitalize ${
                      selectedCategory === category
                        ? 'bg-bp-red text-white'
                        : 'text-gray-400 hover:text-white hover:bg-white hover:bg-opacity-5'
                    }`}
                  >
                    {category.replace('-', ' ')}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Sorting */}
            <div className="flex justify-between items-center mb-8">
              <p className="text-gray-400">Showing {mockProducts.length} products</p>
              <div className="relative">
                <select
                  value={selectedSort}
                  onChange={(e) => setSelectedSort(e.target.value)}
                  className="appearance-none px-4 py-2 bg-bp-card border border-white border-opacity-10 rounded-lg text-white focus:outline-none focus:border-bp-red pr-10 cursor-pointer"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
