'use server'

import { z } from 'zod';
import prisma from '@/lib/db';

const emailSchema = z.string().email('Invalid email address');

export async function addToWaitlist(formDataOrEmail: FormData | string) {
  try {
    let email: string;
    
    // Handle both FormData and direct string input
    if (typeof formDataOrEmail === 'string') {
      email = formDataOrEmail;
    } else if (formDataOrEmail instanceof FormData) {
      email = formDataOrEmail.get('email') as string;
    } else {
      throw new Error('Invalid input: expected FormData or string');
    }
    
    // Validate email
    emailSchema.parse(email);
    
    // Check if email already exists
    const existingEntry = await prisma.waitlist.findUnique({
      where: { email },
    });

    if (existingEntry) {
      return { success: true, message: 'You are already on our waitlist!' };
    }

    // Add to database
    await prisma.waitlist.create({
      data: {
        email,
        status: 'REGISTERED',
      },
    });

    return { success: true, message: 'Successfully joined the waitlist' };
  } catch (error) {
    console.error('Error adding to waitlist:', error);
    return { success: false, message: 'Failed to join waitlist: ' + (error instanceof Error ? error.message : String(error)) };
  } finally {
    await prisma.$disconnect();
  }
}