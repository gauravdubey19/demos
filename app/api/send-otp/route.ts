import { NextRequest, NextResponse } from 'next/server';
import twilio from 'twilio';

const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;
const twilioServiceSid = process.env.TWILIO_SERVICE_SID;

const client = twilio(twilioAccountSid, twilioAuthToken);

export async function POST(req: NextRequest) {
  const { phone_number } = await req.json();

  if (!phone_number) {
    return NextResponse.json({ error: 'Phone number is required' }, { status: 400 });
  }
  let extendedPhone = '+91' + phone_number;
  try {
    if (!twilioAccountSid || !twilioAuthToken || !twilioServiceSid) {
      throw new Error("Missing Twilio environment variables");
    }

    // Send OTP
    const verification = await client.verify.v2.services(twilioServiceSid)
      .verifications
      .create({ to: extendedPhone, channel: 'sms' });

    if (verification.status === 'pending') {
      return NextResponse.json({ otpSent: true }, { status: 200 });
    } else {
      throw new Error('Failed to send OTP');
    }
  } catch (error) {
    console.error('Error sending OTP:', error);
    return NextResponse.json({ error: 'Failed to send OTP' }, { status: 500 });
  }
}