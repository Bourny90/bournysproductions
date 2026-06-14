'use client';

import React, { useState } from 'react';
import { FiStar, FiDownload, FiHeart, FiShare2, FiCheck } from 'react-icons/fi';

export default function ProductPage({ params }: { params: { id: string } }) {
  const [mainImage, setMainImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedLicense, setSelectedLicense] = useState<string | null>(null);

  // Mock product data
  const product = {
    id: params.id,
    name: 'Premium Roleplay Framework',
    price: 49.99,
    rating: 4.8,
    reviews_count: 342,
    downloads: 1250,
    seller: {
      username: 'DevMaster',
      avatar: '👨‍💻',
      followers: 1250,
    },
    description: 'Complete roleplay system for your Roblox server',
    longDescription: `This is a comprehensive roleplay framework designed for Roblox developers. It includes everything you need to create an immersive roleplay experience.`,
    images: [
      'https://images.unsplash.com/photo-1633356122544-f134ef2e00dc?w=800',
      'https://images.unsplash.com/photo-1633356122544-f134ef2e00dc?w=800',
    ],
    features: [
      'Complete character system',
      'Job and role management',
      'Realistic vehicle physics',
      'Economy system',
      'Police and emergency services',
      'Property management',
      'Criminal system',
      'Admin tools',
      'Comprehensive documentation',
      'Active support',
    ],
    changelog: [
      { version: '2.5.0', date: 'Jan 15, 2024', changes: ['Fixed login bug', 'Improved performance'] },
      { version: '2.4.0', date: 'Jan 1, 2024', changes: ['Added new jobs', 'Updated UI'] },
    ],
  };

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images */}
          <div>
            <div className="glass-red rounded-lg overflow-hidden mb-6 aspect-square">
              <img
                src={product.images[mainImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, idx) => (
                <button
                  key={idx}
                  onClick={() => setMainImage(idx)}
                  className={`glass-red rounded-lg overflow-hidden aspect-square cursor-pointer transition-all ${
                    mainImage === idx ? 'ring-2 ring-bp-red' : ''
                  }`}
                >
                  <img src={image} alt={`Preview ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div>
            {/* Header */}
            <div className="mb-6">
              <span className="inline-block px-3 py-1 bg-bp-red bg-opacity-20 text-bp-red text-xs font-semibold rounded uppercase mb-4">
                Scripts
              </span>
              <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-2">
                  {[...Array(5)].map((_, i) => (
                    <FiStar
                      key={i}
                      size={18}
                      className={i < Math.floor(product.rating) ? 'fill-bp-red text-bp-red' : 'text-gray-600'}
                    />
                  ))}
                </div>
                <span className="text-gray-400">
                  {product.rating} • {product.reviews_count} reviews
                </span>
              </div>
              <p className="text-gray-400 mb-6">
                <FiDownload className="inline mr-2" />
                {product.downloads} downloads
              </p>
            </div>

            {/* Seller Info */}
            <div className="glass rounded-lg p-6 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-bp-red rounded-full flex items-center justify-center text-xl">
                    {product.seller.avatar}
                  </div>
                  <div>
                    <p className="font-semibold">{product.seller.username}</p>
                    <p className="text-gray-400 text-sm">{product.seller.followers} followers</p>
                  </div>
                </div>
                <button className="px-4 py-2 bg-bp-red hover:bg-bp-red-hover rounded-lg font-semibold transition-smooth">
                  Follow
                </button>
              </div>
            </div>

            {/* Price and Actions */}
            <div className="glass-red rounded-lg p-6 mb-6">
              <div className="flex items-end justify-between mb-6">
                <div>
                  <p className="text-gray-400 text-sm mb-2">Price</p>
                  <p className="text-5xl font-bold text-bp-red">${product.price}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className={`p-3 rounded-lg transition-smooth ${
                      isWishlisted
                        ? 'bg-bp-red bg-opacity-20 text-bp-red'
                        : 'bg-bp-card hover:bg-white hover:bg-opacity-5 text-white'
                    }`}
                  >
                    <FiHeart size={20} className={isWishlisted ? 'fill-current' : ''} />
                  </button>
                  <button className="p-3 bg-bp-card hover:bg-white hover:bg-opacity-5 rounded-lg transition-smooth text-white">
                    <FiShare2 size={20} />
                  </button>
                </div>
              </div>

              {/* License Selection */}
              <div className="mb-6">
                <p className="text-sm font-semibold mb-3">Select License</p>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 p-3 rounded-lg border-2 border-white border-opacity-20 cursor-pointer hover:border-bp-red transition-smooth">
                    <input
                      type="radio"
                      name="license"
                      value="personal"
                      checked={selectedLicense === 'personal'}
                      onChange={(e) => setSelectedLicense(e.target.value)}
                      className="w-4 h-4"
                    />
                    <div>
                      <p className="font-semibold">Personal License</p>
                      <p className="text-xs text-gray-400">For single server use</p>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 p-3 rounded-lg border-2 border-white border-opacity-20 cursor-pointer hover:border-bp-red transition-smooth">
                    <input
                      type="radio"
                      name="license"
                      value="commercial"
                      checked={selectedLicense === 'commercial'}
                      onChange={(e) => setSelectedLicense(e.target.value)}
                      className="w-4 h-4"
                    />
                    <div>
                      <p className="font-semibold">Commercial License</p>
                      <p className="text-xs text-gray-400">Unlimited servers</p>
                    </div>
                  </label>
                </div>
              </div>

              <button className="w-full btn-primary">
                Buy Now
              </button>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-20 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold mb-6">Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {product.features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-bp-red flex-shrink-0 flex items-center justify-center mt-1">
                    <FiCheck size={16} className="text-white" />
                  </div>
                  <p className="text-gray-300">{feature}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Changelog */}
          <div className="glass rounded-lg p-6 h-fit">
            <h3 className="font-bold mb-4">Recent Updates</h3>
            <div className="space-y-4">
              {product.changelog.map((entry, idx) => (
                <div key={idx} className="pb-4 border-b border-white border-opacity-10 last:border-0">
                  <p className="font-semibold text-bp-red text-sm mb-1">v{entry.version}</p>
                  <p className="text-xs text-gray-400 mb-2">{entry.date}</p>
                  <ul className="text-xs text-gray-400 space-y-1">
                    {entry.changes.map((change, cidx) => (
                      <li key={cidx}>• {change}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
