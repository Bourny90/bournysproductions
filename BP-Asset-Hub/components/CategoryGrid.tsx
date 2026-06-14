'use client';

import React from 'react';
import Link from 'next/link';
import { FiCode, FiTruck, FiMap, FiBox, FiUsers, FiImage, FiCube, FiGrid } from 'react-icons/fi';

const categories = [
  { name: 'Scripts', icon: FiCode, color: 'from-blue-500', count: 428 },
  { name: 'Vehicles', icon: FiTruck, color: 'from-yellow-500', count: 156 },
  { name: 'Maps', icon: FiMap, color: 'from-green-500', count: 89 },
  { name: 'UI Systems', icon: FiBox, color: 'from-purple-500', count: 234 },
  { name: 'Uniforms', icon: FiUsers, color: 'from-pink-500', count: 167 },
  { name: 'Liveries', icon: FiImage, color: 'from-indigo-500', count: 112 },
  { name: 'Models', icon: FiCube, color: 'from-cyan-500', count: 345 },
  { name: 'Systems', icon: FiGrid, color: 'from-orange-500', count: 198 },
];

export default function CategoryGrid() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Browse by Category</h2>
          <p className="text-gray-400 text-lg">Find exactly what you need for your next project</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Link key={category.name} href={`/marketplace?category=${category.name.toLowerCase().replace(' ', '-')}`}>
                <div className="group glass-red rounded-lg p-6 hover:scale-105 transition-smooth cursor-pointer h-full">
                  <div className={`w-14 h-14 rounded-lg bg-gradient-to-br ${category.color} bg-opacity-20 flex items-center justify-center mb-4 group-hover:scale-110 transition-smooth`}>
                    <Icon size={28} className="text-bp-red" />
                  </div>
                  <h3 className="font-semibold text-lg mb-1 group-hover:text-bp-red transition-smooth">
                    {category.name}
                  </h3>
                  <p className="text-gray-400 text-sm">{category.count} products</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
