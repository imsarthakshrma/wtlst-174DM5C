import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

const waitlistSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = waitlistSchema.parse(body);

    // 1. Store email in your database
    const subscriber = await prisma.waitlistSubscriber.create({
      data: {
        email,
        status: 'PENDING',
      },
    });

    // 2. Register with GetWaitlist.com API
    // Use environment variables for security
    const waitlistId = process.env.YOUR_WAITLIST_ID;
    const apiKey = process.env.YOUR_WAITLIST_API_KEY;
    
    if (!waitlistId || !apiKey) {
      throw new Error('Waitlist configuration is missing');
    }
    
    const waitlistResponse = await fetch(`https://api.getwaitlist.com/api/v1/waitlists/${waitlistId}/submissions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ email }),
    });

    const waitlistData = await waitlistResponse.json();

    // 3. Check if registration was successful and update database
    if (waitlistResponse.ok) {
      await prisma.waitlistSubscriber.update({
        where: { id: subscriber.id },
        data: { 
          status: 'REGISTERED',
          waitlistReferenceId: waitlistData.id.toString(),
        },
      });

      return NextResponse.json({ 
        success: true, 
        message: 'Successfully joined the waitlist' 
      });
    } else {
      // If waitlist registration failed, mark as failed in database
      await prisma.waitlistSubscriber.update({
        where: { id: subscriber.id },
        data: { 
          status: 'FAILED',
          errorMessage: waitlistData.message || 'Unknown error',
        },
      });

      return NextResponse.json(
        { success: false, message: 'Failed to register with waitlist service' },
        { status: 500 }
      );
    }
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