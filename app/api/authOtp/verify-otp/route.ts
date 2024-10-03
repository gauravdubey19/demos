import { NextRequest, NextResponse } from 'next/server';
import twilio from 'twilio';
import { connectToDB } from '@/utils/db';
import User from '@/models/User';
import jwt from 'jsonwebtoken';

const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;
const twilioServiceSid = process.env.TWILIO_SERVICE_SID;
const jwtSecret = process.env.JWT_SECRET;

const client = twilio(twilioAccountSid, twilioAuthToken);

export async function POST(req: NextRequest) {
  const { phone_number, otp } = await req.json();

  if (!phone_number || !otp) {
    return NextResponse.json({ error: 'Phone number and OTP are required' }, { status: 400 });
  }

  try {
    await connectToDB();
    if (!twilioAccountSid || !twilioAuthToken || !twilioServiceSid) {
      throw new Error("Missing Twilio environment variables");
    }
    let extendedPhone = '+91' + phone_number;
    // Verify OTP
    const verificationCheck = await client.verify.v2.services(twilioServiceSid)
      .verificationChecks
      .create({ to: extendedPhone, code: otp });

    if (verificationCheck.status === 'approved') {
      // Find or create user
      let user = await User.findOne({ phone_number });
      if (!user) {
        user = await User.create({ phone_number });
      }
      
      // Ensure user._id and jwtSecret are defined
      if (!user._id || !jwtSecret) {
        throw new Error('User ID or JWT secret is undefined');
      }

      // Generate JWT token
      const token = jwt.sign(
        { id: user._id, phone_number: user.phone_number },
        jwtSecret,
        { expiresIn: '3d' } // Set JWT to expire in 3 days
      );

      return NextResponse.json({ verified: true, user, token }, { status: 200 });
    } else {
      return NextResponse.json({ error: 'Invalid OTP' }, { status: 400 });
    }
  } catch (error) {
    console.error('Error verifying OTP:', error);
    return NextResponse.json({ error: 'Failed to verify OTP' }, { status: 500 });
  }
}