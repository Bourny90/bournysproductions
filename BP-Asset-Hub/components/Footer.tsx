'use client';

import React from 'react';
import Link from 'next/link';
import { FiTwitter, FiDiscord, FiGithub } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer className="border-t border-white border-opacity-10 bg-bp-darker py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-bp-red rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">BP</span>
              </div>
              <span className="font-bold text-lg">Bournys</span>
            </div>
            <p className="text-gray-400 text-sm">
              Premium assets for Roblox developers and creators.
            </p>
          </div>

          {/* Marketplace */}
          <div>
            <h4 className="font-semibold mb-4">Marketplace</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link href="/marketplace" className="hover:text-bp-red transition-smooth">Browse Assets</Link></li>
              <li><Link href="/marketplace?new" className="hover:text-bp-red transition-smooth">New Items</Link></li>
              <li><Link href="/marketplace?popular" className="hover:text-bp-red transition-smooth">Popular</Link></li>
              <li><Link href="/marketplace?trending" className="hover:text-bp-red transition-smooth">Trending</Link></li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h4 className="font-semibold mb-4">Community</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link href="#" className="hover:text-bp-red transition-smooth">Discord</Link></li>
              <li><Link href="#" className="hover:text-bp-red transition-smooth">Twitter</Link></li>
              <li><Link href="#" className="hover:text-bp-red transition-smooth">Forums</Link></li>
              <li><Link href="#" className="hover:text-bp-red transition-smooth">Blog</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link href="#" className="hover:text-bp-red transition-smooth">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-bp-red transition-smooth">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-bp-red transition-smooth">DMCA</Link></li>
              <li><Link href="#" className="hover:text-bp-red transition-smooth">Contact</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white border-opacity-10 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © 2024 Bournys Productions. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-gray-400 hover:text-bp-red transition-smooth">
              <FiTwitter size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-bp-red transition-smooth">
              <FiDiscord size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-bp-red transition-smooth">
              <FiGithub size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
