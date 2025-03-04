'use client';

import { useState } from 'react';
import { z } from 'zod';
import { Button } from "@/components/ui/button";
import { addToWaitlist } from '@/actions/waitlist';

const emailSchema = z.string().email('Please enter a valid email address');

export default function WaitlistForm() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Validate email client-side
      emailSchema.parse(email);
      
      console.log('Submitting email:', email);
      
      // Call server action with email directly
      const result = await addToWaitlist(email);
      console.log('Server action result:', result);
      
      if (result.success) {
        // Show success message
        setSuccess(true);
        setEmail('');
        
        // Trigger GetWaitlist.com popup
        if (typeof window !== 'undefined' && window.Waitlist) {
          window.Waitlist.show(process.env.NEXT_PUBLIC_YOUR_WAITLIST_ID || '', { email });
        }
      } else {
        // Show error from server
        setError(result.message || 'Failed to join waitlist');
      }
    } catch (err) {
      console.error('Form submission error:', err);
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
    <div className="w-full max-w-md mx-auto">
      {success ? (
        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-md text-green-700 dark:text-green-300 text-sm text-center">
          Thanks for joining our waitlist! We'll be in touch soon.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
          <div className="flex-grow">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-3 py-2 rounded-md border border-gray-300 bg-white text-black focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              required
            />
            {error && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {error}
              </p>
            )}
          </div>
          <Button
            type="submit"
            size="sm"
            disabled={loading}
            className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white border-0"
          >
            {loading ? 'Joining...' : 'Join the waitlist'}
          </Button>
        </form>
      )}
    </div>
  );
}