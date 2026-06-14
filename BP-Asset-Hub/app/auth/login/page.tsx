'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthContext';
import { FiMail, FiArrowRight, FiAlertCircle } from 'react-icons/fi';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [step, setStep] = useState<'email' | 'verify'>('email');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleRequestCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      if (!email) {
        throw new Error('Please enter your email');
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        throw new Error('Please enter a valid email');
      }

      const response = await fetch('/api/auth/request-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (data.success) {
        setMessage(`Login code sent to ${email}. Check your inbox!`);
        setStep('verify');
      } else {
        throw new Error(data.error || 'Failed to request code');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to request code');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!code || code.length !== 6) {
        throw new Error('Please enter a valid 6-digit code');
      }

      await login(email, code);
      router.push('/downloads');
    } catch (err: any) {
      setError(err.message || 'Verification failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-20 px-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-bp-red to-bp-red bg-opacity-20 rounded-lg flex items-center justify-center mx-auto mb-4">
            <div className="w-12 h-12 bg-bp-red rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">BP</span>
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-2">Sign In</h1>
          <p className="text-gray-400">Access your purchased assets</p>
        </div>

        {/* Form */}
        <div className="glass rounded-lg p-8 mb-6">
          {step === 'email' ? (
            <form onSubmit={handleRequestCode} className="space-y-4">
              {error && (
                <div className="flex items-center gap-3 p-4 bg-red-500 bg-opacity-10 border border-red-500 border-opacity-30 rounded-lg">
                  <FiAlertCircle size={20} className="text-red-500" />
                  <p className="text-sm text-red-200">{error}</p>
                </div>
              )}

              {/* Email Field */}
              <div>
                <label className="block text-sm font-semibold mb-2">Email Address</label>
                <div className="relative">
                  <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full pl-10 pr-4 py-3 bg-bp-darker border border-white border-opacity-10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-bp-red transition-smooth"
                    disabled={loading}
                    autoFocus
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Sending Code...' : 'Continue'}
                {!loading && <FiArrowRight size={18} />}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyCode} className="space-y-4">
              {error && (
                <div className="flex items-center gap-3 p-4 bg-red-500 bg-opacity-10 border border-red-500 border-opacity-30 rounded-lg">
                  <FiAlertCircle size={20} className="text-red-500" />
                  <p className="text-sm text-red-200">{error}</p>
                </div>
              )}

              <div className="text-center mb-6">
                <p className="text-gray-400 text-sm mb-2">Login code sent to</p>
                <p className="font-semibold text-white">{email}</p>
              </div>

              {/* Code Input */}
              <div>
                <label className="block text-sm font-semibold mb-2">Enter 6-Digit Code</label>
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="000000"
                  maxLength={6}
                  className="w-full px-4 py-3 bg-bp-darker border border-white border-opacity-10 rounded-lg text-white text-center text-2xl font-bold placeholder-gray-500 focus:outline-none focus:border-bp-red transition-smooth tracking-widest"
                  disabled={loading}
                  autoFocus
                />
                <p className="text-xs text-gray-500 mt-2">Check your email inbox and spam folder</p>
              </div>

              {/* Verify Button */}
              <button
                type="submit"
                disabled={loading || code.length !== 6}
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Verifying...' : 'Sign In'}
              </button>

              {/* Resend Code */}
              <button
                type="button"
                onClick={() => handleRequestCode({ preventDefault: () => {} } as React.FormEvent)}
                className="w-full btn-secondary text-sm"
              >
                Resend Code
              </button>

              {/* Back Button */}
              <button
                type="button"
                onClick={() => {
                  setStep('email');
                  setCode('');
                  setError('');
                }}
                className="w-full btn-ghost text-sm"
              >
                Back
              </button>
            </form>
          )}
        </div>

        {/* Footer */}
        <p className="text-center text-gray-400">
          Don't have an account?{' '}
          <Link href="/auth/signup" className="text-bp-red hover:text-bp-red-hover transition-smooth font-semibold">
            Create One
          </Link>
        </p>
      </div>
    </div>
  );
}
