import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;
    
    console.log('Received email:', email);
    
    // Just return success without doing anything
    return NextResponse.json({ 
      success: true, 
      message: 'Test successful' 
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { success: false, message: 'Error processing request' },
      { status: 500 }
    );
  }
} 