'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthContext';
import { FiDownload, FiFile, FiClock, FiCheck } from 'react-icons/fi';

interface PurchasedItem {
  id: string;
  product_name: string;
  product_id: string;
  download_url: string;
  expires_at: string;
  purchased_at: string;
  license: string;
}

export default function DownloadsPage() {
  const router = useRouter();
  const { user, token, isLoading } = useAuth();
  const [purchases, setPurchases] = useState<PurchasedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/auth/login');
      return;
    }

    if (user && token) {
      fetchPurchases();
    }
  }, [user, token, isLoading, router]);

  const fetchPurchases = async () => {
    try {
      const response = await fetch('/api/downloads', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (data.success) {
        setPurchases(data.purchases);
      }
    } catch (error) {
      console.error('Error fetching purchases:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (item: PurchasedItem) => {
    setDownloading(item.id);
    try {
      const response = await fetch(`/api/download/${item.product_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${item.product_name}.zip`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } else {
        alert('Download failed');
      }
    } catch (error) {
      console.error('Error downloading:', error);
      alert('Error downloading file');
    } finally {
      setDownloading(null);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="glass rounded-lg p-8 text-center">
          <div className="w-16 h-16 bg-bp-red rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold mb-2">My Downloads</h1>
          <p className="text-gray-400">
            {user?.username && `Welcome back, ${user.username}!`} Access all your purchased assets here.
          </p>
        </div>

        {/* Downloads List */}
        {loading ? (
          <div className="glass rounded-lg p-12 text-center">
            <div className="w-16 h-16 bg-bp-red rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-400">Loading your purchases...</p>
          </div>
        ) : purchases.length === 0 ? (
          <div className="glass rounded-lg p-12 text-center">
            <FiShoppingBag size={48} className="mx-auto mb-4 text-bp-red opacity-50" />
            <h3 className="text-2xl font-bold mb-2">No Purchases Yet</h3>
            <p className="text-gray-400 mb-6">You haven't purchased any products yet. Browse the marketplace to get started!</p>
            <a href="/marketplace" className="btn-primary inline-block">
              Browse Marketplace
            </a>
          </div>
        ) : (
          <div className="space-y-4">
            {purchases.map((item) => {
              const expiresAt = new Date(item.expires_at);
              const isExpired = expiresAt < new Date();
              const daysRemaining = Math.ceil(
                (expiresAt.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
              );

              return (
                <div
                  key={item.id}
                  className="glass-red rounded-lg p-6 flex items-center justify-between group hover:bg-opacity-20 transition-smooth"
                >
                  <div className="flex items-center gap-4 flex-1">
                    {/* Icon */}
                    <div className="w-14 h-14 bg-bp-red rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-smooth">
                      <FiFile size={24} className="text-white" />
                    </div>

                    {/* Info */}
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1">{item.product_name}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <span className="flex items-center gap-1">
                          <FiCheck size={14} className="text-bp-red" />
                          {item.license} License
                        </span>
                        <span className="flex items-center gap-1">
                          <FiClock size={14} />
                          {isExpired
                            ? 'Expired'
                            : daysRemaining <= 1
                            ? 'Expires today'
                            : `${daysRemaining} days left`}
                        </span>
                        <span className="text-xs text-gray-500">Purchased {new Date(item.purchased_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Download Button */}
                  <button
                    onClick={() => handleDownload(item)}
                    disabled={isExpired || downloading === item.id}
                    className={`px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-smooth ${
                      isExpired
                        ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                        : downloading === item.id
                        ? 'bg-bp-red bg-opacity-50 text-white'
                        : 'btn-primary'
                    }`}
                  >
                    <FiDownload size={18} />
                    {downloading === item.id ? 'Downloading...' : 'Download'}
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
