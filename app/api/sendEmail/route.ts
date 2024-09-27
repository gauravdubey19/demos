import { NextRequest, NextResponse } from 'next/server';
import { transporter } from '@/app/api/newsletter/core'; // Adjust the import path as needed

const generateOTP = (length: number = 6): string => {
  const digits = '0123456789';
  let otp = '';
  for (let i = 0; i < length; i++) {
    otp += digits[Math.floor(Math.random() * 10)];
  }
  return otp;
};

export async function POST(req: NextRequest) {
  if (req.method !== 'POST') {
    return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
  }

  const { to, subject, from = '"CSK Textiles" <CSK@gmail.com>' } = await req.json();

  if (!to || !subject) {
    return NextResponse.json({ message: 'To and subject are required' }, { status: 400 });
  }

  const otp = generateOTP();
  const emailOptions = {
    from,
    to,
    subject,
    text: `Your OTP is ${otp}`,
    html: `
      <html>
      <body>
        <h4>Your OTP is ${otp}</h4>
        <p>Please use this OTP to complete your verification.</p>
      </body>
      </html>
    `,
  };

  try {
    const info = await transporter.sendMail(emailOptions);
    return NextResponse.json({ success: true, otp, info }, { status: 200 });
  } catch (error) {
    console.error('Error sending OTP email:', error);
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}