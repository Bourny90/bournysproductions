'use client';

import React from 'react';
import { FiStar, FiQuote } from 'react-icons/fi';

const reviews = [
  {
    id: 1,
    author: 'Alex Dev',
    rating: 5,
    content: 'Absolutely amazing scripts! The quality is top-tier and the support is incredible. Highly recommended!',
    avatar: '👨‍💻',
  },
  {
    id: 2,
    author: 'Sarah Studios',
    rating: 5,
    content: 'Best asset marketplace for Roblox developers. Fast downloads, secure transactions, and great products.',
    avatar: '👩‍🎨',
  },
  {
    id: 3,
    author: 'Game Masters',
    rating: 5,
    content: 'We purchased multiple items for our server. Everything works perfectly and adds great value to our game.',
    avatar: '🎮',
  },
];

export default function ReviewSection() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Loved by Creators</h2>
          <p className="text-gray-400 text-lg">See what developers are saying about BP Asset Hub</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div key={review.id} className="glass rounded-lg p-8">
              <FiQuote size={32} className="text-bp-red mb-4 opacity-50" />
              <p className="text-gray-300 mb-6 leading-relaxed">"{review.content}"</p>
              <div className="flex items-center justify-between pt-4 border-t border-white border-opacity-10">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-bp-red rounded-full flex items-center justify-center text-xl">
                    {review.avatar}
                  </div>
                  <div>
                    <p className="font-semibold">{review.author}</p>
                    <div className="flex text-bp-red gap-1">
                      {[...Array(review.rating)].map((_, i) => (
                        <FiStar key={i} size={14} className="fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
