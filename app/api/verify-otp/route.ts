import { NextRequest, NextResponse } from 'next/server';
import twilio from 'twilio';

const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;
const twilioServiceSid = process.env.TWILIO_SERVICE_SID;

const client = twilio(twilioAccountSid, twilioAuthToken);

export async function POST(req: NextRequest) {
  const { phone_number, otp } = await req.json();

  if (!phone_number || !otp) {
    return NextResponse.json({ error: 'Phone number and OTP are required' }, { status: 400 });
  }

  try {
    if (!twilioAccountSid || !twilioAuthToken || !twilioServiceSid) {
      throw new Error("Missing Twilio environment variables");
    }
    let extendedPhone = '+91' + phone_number;
    // Verify OTP
    const verificationCheck = await client.verify.v2.services(twilioServiceSid)
      .verificationChecks
      .create({ to: extendedPhone, code: otp });

    if (verificationCheck.status === 'approved') {

      return NextResponse.json({ verified: true }, { status: 200 });
    } else {
      return NextResponse.json({ error: 'Invalid OTP' }, { status: 400 });
    }
  } catch (error) {
    console.error('Error verifying OTP:', error);
    return NextResponse.json({ error: 'Failed to verify OTP' }, { status: 500 });
  }
}