import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { z } from 'zod';

const waitlistSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = waitlistSchema.parse(body);

    console.log('Processing waitlist signup for:', email);

    // Check if the email already exists
    const existingEntry = await prisma.waitlist.findUnique({
      where: { email },
    });

    if (existingEntry) {
      console.log('Email already registered:', email);
      return NextResponse.json({ 
        success: true, 
        message: 'You are already on our waitlist!' 
      });
    }

    // Store email in your database using the Waitlist model instead
    console.log('Storing email in database...');
    await prisma.waitlist.create({
      data: {
        email,
        status: 'REGISTERED',
      },
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Successfully joined the waitlist' 
    });
  } catch (error) {
    console.error('Waitlist registration error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: error.errors[0].message },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}