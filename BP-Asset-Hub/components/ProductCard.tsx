'use client';

import React from 'react';
import Link from 'next/link';
import { FiHeart, FiDownload, FiStar } from 'react-icons/fi';
import { Product } from '@/types';

interface ProductCardProps {
  product: Product;
  featured?: boolean;
}

export default function ProductCard({ product, featured = false }: ProductCardProps) {
  return (
    <Link href={`/product/${product.id}`}>
      <div className={`group cursor-pointer transition-smooth hover:scale-105 ${
        featured ? 'col-span-2 row-span-2' : ''
      }`}>
        <div className="glass-red rounded-lg overflow-hidden h-full flex flex-col">
          {/* Image Container */}
          <div className="relative overflow-hidden bg-gradient-to-br from-bp-red from-0% to-transparent to-100% bg-opacity-10 aspect-video group-hover:aspect-square transition-all">
            <img
              src={product.thumbnail_url}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-smooth duration-300"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-smooth flex items-center justify-center">
              <span className="opacity-0 group-hover:opacity-100 transition-smooth text-white font-semibold flex items-center gap-2">
                <FiDownload /> View Details
              </span>
            </div>
            <button className="absolute top-2 right-2 p-2 bg-black bg-opacity-50 hover:bg-bp-red rounded-lg transition-smooth z-10">
              <FiHeart size={18} />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 p-4 flex flex-col">
            <div className="mb-2">
              <span className="inline-block px-2 py-1 bg-bp-red bg-opacity-20 text-bp-red text-xs font-semibold rounded uppercase">
                {product.category}
              </span>
            </div>

            <h3 className="font-semibold text-lg mb-1 group-hover:text-bp-red transition-smooth line-clamp-2">
              {product.name}
            </h3>

            <p className="text-gray-400 text-sm mb-4 line-clamp-2 flex-1">
              {product.description}
            </p>

            {/* Rating */}
            <div className="flex items-center gap-1 mb-3">
              <div className="flex text-bp-red">
                {[...Array(5)].map((_, i) => (
                  <FiStar
                    key={i}
                    size={14}
                    className={i < Math.floor(product.rating) ? 'fill-current' : ''}
                  />
                ))}
              </div>
              <span className="text-xs text-gray-400 ml-1">
                ({product.reviews_count})
              </span>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-white border-opacity-10">
              <span className="text-bp-red font-bold text-lg">
                ${product.price.toFixed(2)}
              </span>
              <span className="text-xs text-gray-400">
                {product.downloads} downloads
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
