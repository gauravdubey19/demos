import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/utils/db';
import Newsletter from '@/models/Newsletter';
import { transporter } from '../core';

export async function POST(req: NextRequest) {
    await connectToDB();

    const requestBody = await req.json();
    const email = requestBody.email;

    if (!email) {
        return NextResponse.json({ error: 'Email ID is required' }, { status: 400 });
    }

    try {
        // Check if the email exists in the database
        const existingMember = await Newsletter.findOne({ email });

        if (!existingMember) {
            return NextResponse.json({ message: 'Email not found in the newsletter list' }, { status: 404 });
        }

        // Remove the email from the newsletter database
        const result = await Newsletter.deleteOne({ email });

        if (result.deletedCount > 0) {
            // Send an unsubscribe email
            const info = await transporter.sendMail({
                from: '"CSK Textiles" <CSK@gmail.com>',
                to: email,
                subject: "Unsubscribed from CSK Textiles Newsletter ✔",
                text: "Unsubscribed",
                html: `
                <html>
                <body>
                    <h1>You have unsubscribed from the CSK Textile Newsletter</h1>
                </body>
                </html>
                `,
            });

            return NextResponse.json({
                message: 'You have successfully unsubscribed',
                result: result,
                info: info,
                status: 200
            });
        }

        return NextResponse.json({ error: 'Failed to remove email from the newsletter' }, { status: 400 });

    } catch (error) {
        console.error('Error during unsubscription:', error);
        return NextResponse.json({ error: 'Error during unsubscription process' }, { status: 500 });
    }
}
