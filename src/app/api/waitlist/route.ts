import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { PrismaClient } from '@prisma/client';
import { Resend } from 'resend';
import { sendThankYouEmail } from '@/lib/email';

const prisma = new PrismaClient();
const emailSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = emailSchema.parse(body);
    
    console.log('Processing waitlist signup for:', email);
    
    // Check if email already exists in our database
    let existingEntry = null;
    try {
      existingEntry = await prisma.waitlist.findUnique({
        where: { email },
      });
    } catch (dbError) {
      console.error('Database error when checking existing entry:', dbError);
      // Continue even if database check fails
    }

    if (existingEntry) {
      console.log('Email already registered in our database:', email);
      return NextResponse.json({ 
        success: true, 
        message: 'You are already on our waitlist!',
        source: 'database'
      });
    }
    
    // Try to register with GetWaitlist.com
    let waitlistSuccess = false;
    let waitlistData = null;
    
    try {
      const waitlistId = process.env.NEXT_PUBLIC_YOUR_WAITLIST_ID;
      const apiKey = process.env.NEXT_PUBLIC_YOUR_WAITLIST_API_KEY;
      
      if (!waitlistId || !apiKey) {
        throw new Error('Waitlist configuration is missing');
      }
      
      console.log('Registering with GetWaitlist.com...');
      const waitlistResponse = await fetch(`https://api.getwaitlist.com/api/v1/waitlists/${waitlistId}/submissions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({ email }),
      });
      
      waitlistData = await waitlistResponse.json();
      console.log('GetWaitlist.com response:', waitlistData);
      
      if (waitlistResponse.ok) {
        waitlistSuccess = true;
        console.log('Successfully registered with GetWaitlist.com');
      } else {
        console.error('Failed to register with GetWaitlist.com:', waitlistData);
      }
    } catch (waitlistError) {
      console.error('Error registering with GetWaitlist.com:', waitlistError);
      // Continue even if GetWaitlist.com registration fails
    }
    
    // Try to store in our database
    let dbSuccess = false;
    let dbEntry = null;
    
    try {
      console.log('Storing in database...');
      dbEntry = await prisma.waitlist.create({
        data: {
          email,
          status: waitlistSuccess ? 'REGISTERED_BOTH' : 'REGISTERED_DB_ONLY',
        },
      });
      dbSuccess = true;
      console.log('Successfully stored in database');
    } catch (dbError) {
      console.error('Error storing in database:', dbError);
      // Continue even if database storage fails
    }
    
    // Determine overall success and send thank you email if needed
    if (waitlistSuccess || dbSuccess) {
      // At least one storage method succeeded
      
      // Send thank you email
      try {
        await sendThankYouEmail(email);
        console.log('Thank you email sent to:', email);
      } catch (emailError) {
        console.error('Error sending thank you email:', emailError);
        // Continue even if email sending fails
      }
      
      return NextResponse.json({ 
        success: true, 
        message: 'Successfully joined the waitlist',
        waitlistSuccess,
        dbSuccess
      });
    } else {
      // Both storage methods failed
      return NextResponse.json(
        { 
          success: false, 
          message: 'Failed to register with waitlist service and database' 
        },
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
  } finally {
    await prisma.$disconnect();
  }
}