'use client';

import React, { useState } from 'react';
import { FiDownload, FiShoppingBag, FiKey, FiSettings } from 'react-icons/fi';

const tabs = [
  { id: 'purchases', label: 'My Purchases', icon: FiShoppingBag },
  { id: 'downloads', label: 'Downloads', icon: FiDownload },
  { id: 'licenses', label: 'Licenses', icon: FiKey },
  { id: 'settings', label: 'Settings', icon: FiSettings },
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('purchases');

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold mb-2">Dashboard</h1>
          <p className="text-gray-400">Welcome back! Manage your purchases and account here.</p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-white border-opacity-10 pb-4">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 font-semibold transition-smooth rounded-lg ${
                  activeTab === tab.id
                    ? 'text-bp-red bg-bp-red bg-opacity-10 border-b-2 border-bp-red'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Icon size={20} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Content */}
        {activeTab === 'purchases' && (
          <div className="grid gap-6">
            {[1, 2, 3].map((item) => (
              <div key={item} className="glass rounded-lg p-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-bp-red to-bp-red bg-opacity-20 rounded-lg"></div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Premium Roleplay Framework</h3>
                    <p className="text-gray-400 text-sm">Purchased on Jan 15, 2024</p>
                  </div>
                </div>
                <button className="px-4 py-2 bg-bp-red hover:bg-bp-red-hover rounded-lg font-semibold transition-smooth">
                  Download
                </button>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'downloads' && (
          <div className="glass rounded-lg p-12 text-center">
            <FiDownload size={48} className="mx-auto mb-4 text-bp-red" />
            <h3 className="text-2xl font-bold mb-2">Your Downloads</h3>
            <p className="text-gray-400 mb-6">View and manage your downloaded files</p>
            <button className="btn-primary">View Download History</button>
          </div>
        )}

        {activeTab === 'licenses' && (
          <div className="glass rounded-lg p-12 text-center">
            <FiKey size={48} className="mx-auto mb-4 text-bp-red" />
            <h3 className="text-2xl font-bold mb-2">License Keys</h3>
            <p className="text-gray-400">Your active license keys will appear here</p>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="glass rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Account Settings</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 bg-bp-darker border border-white border-opacity-10 rounded-lg text-white focus:outline-none focus:border-bp-red transition-smooth"
                  defaultValue="user@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Username</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 bg-bp-darker border border-white border-opacity-10 rounded-lg text-white focus:outline-none focus:border-bp-red transition-smooth"
                  defaultValue="username"
                />
              </div>
              <button className="btn-primary">Save Changes</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
