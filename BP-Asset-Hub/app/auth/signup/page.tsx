'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthContext';
import { FiMail, FiUser, FiArrowRight, FiAlertCircle } from 'react-icons/fi';

export default function SignupPage() {
  const router = useRouter();
  const { createAccount } = useAuth();
  const [step, setStep] = useState<'form' | 'verify'>('form');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      // Validate inputs
      if (!email || !username) {
        throw new Error('Please fill in all fields');
      }

      if (username.length < 3) {
        throw new Error('Username must be at least 3 characters');
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        throw new Error('Please enter a valid email');
      }

      await createAccount(email, username);
      setMessage(`Verification code sent to ${email}. Check your inbox!`);
      setStep('verify');
    } catch (err: any) {
      setError(err.message || 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!code || code.length !== 6) {
        throw new Error('Please enter a valid 6-digit code');
      }

      const response = await fetch('/api/auth/verify-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code, username }),
      });

      const data = await response.json();
      if (data.success) {
        localStorage.setItem('bp_auth_token', data.token);
        router.push('/dashboard');
      } else {
        throw new Error(data.error || 'Verification failed');
      }
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
          <h1 className="text-3xl font-bold mb-2">Create Account</h1>
          <p className="text-gray-400">Join the BP Asset Hub community</p>
        </div>

        {/* Form */}
        <div className="glass rounded-lg p-8 mb-6">
          {step === 'form' ? (
            <form onSubmit={handleSignup} className="space-y-4">
              {error && (
                <div className="flex items-center gap-3 p-4 bg-red-500 bg-opacity-10 border border-red-500 border-opacity-30 rounded-lg">
                  <FiAlertCircle size={20} className="text-red-500" />
                  <p className="text-sm text-red-200">{error}</p>
                </div>
              )}

              {message && (
                <div className="p-4 bg-bp-red bg-opacity-10 border border-bp-red border-opacity-30 rounded-lg text-sm text-bp-red">
                  {message}
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
                  />
                </div>
              </div>

              {/* Username Field */}
              <div>
                <label className="block text-sm font-semibold mb-2">Username</label>
                <div className="relative">
                  <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Choose a username"
                    className="w-full pl-10 pr-4 py-3 bg-bp-darker border border-white border-opacity-10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-bp-red transition-smooth"
                    disabled={loading}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">3-20 characters, letters and numbers only</p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Creating Account...' : 'Continue'}
                {!loading && <FiArrowRight size={18} />}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerify} className="space-y-4">
              {error && (
                <div className="flex items-center gap-3 p-4 bg-red-500 bg-opacity-10 border border-red-500 border-opacity-30 rounded-lg">
                  <FiAlertCircle size={20} className="text-red-500" />
                  <p className="text-sm text-red-200">{error}</p>
                </div>
              )}

              <div className="text-center mb-6">
                <p className="text-gray-400 text-sm mb-2">Verification code sent to</p>
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
                {loading ? 'Verifying...' : 'Verify & Create Account'}
              </button>

              {/* Resend Code */}
              <button
                type="button"
                onClick={() => handleSignup({ preventDefault: () => {} } as React.FormEvent)}
                className="w-full btn-secondary text-sm"
              >
                Resend Code
              </button>

              {/* Back Button */}
              <button
                type="button"
                onClick={() => {
                  setStep('form');
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
          Already have an account?{' '}
          <Link href="/auth/login" className="text-bp-red hover:text-bp-red-hover transition-smooth font-semibold">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
