'use client';

import { useState } from 'react';
import { z } from 'zod';

const emailSchema = z.string().email('Please enter a valid email address');

export default function WaitlistWidget() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Validate email
      emailSchema.parse(email);
      
      // Submit to our API endpoint that will handle both database storage and waitlist registration
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      // Show success message
      setSuccess(true);
      setEmail('');
      
      // trigger the GetWaitlist.com popup
      if (typeof window !== 'undefined' && window.Waitlist) {
        window.Waitlist.show(process.env.NEXT_PUBLIC_YOUR_WAITLIST_ID || '', { email });
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.errors[0].message);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 w-80 border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold mb-2">Join our waitlist</h3>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
        Be the first to know when we launch.
      </p>
      
      {success ? (
        <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-md text-green-700 dark:text-green-300 text-sm">
          Thanks for joining our waitlist! We'll be in touch soon.
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
              required
            />
            {error && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>}
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Signing up...' : 'Sign up'}
          </button>
        </form>
      )}
    </div>
  );
}