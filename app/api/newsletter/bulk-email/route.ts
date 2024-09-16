import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/utils/db';
import Newsletter from '@/models/Newsletter';
import { transporter } from '../core';

export async function POST(req: NextRequest) {
    await connectToDB();

    try {
        // Fetch all the emails from the Newsletter collection
        const emails = await Newsletter.find({}, { email: 1, _id: 0 });

        if (emails.length === 0) {
            return NextResponse.json({ message: 'No emails found in the newsletter list' }, { status: 404 });
        }

        // Extract email addresses into an array
        const emailList = emails.map(emailEntry => emailEntry.email);

        // Send an email to each email address
        const sendEmailsPromises = emailList.map(email => {
            return transporter.sendMail({
                from: '"CSK Textiles" <CSK@gmail.com>',
                to: email,
                subject: "Important Update from CSK Textiles",
                text: "This is a bulk email sent to all newsletter subscribers.",
                html: `
                    <html>
                    <body>
                        <h1>Important Update</h1>
                        <p>This is a bulk email sent to all subscribers of CSK Textiles Newsletter.</p>
                    </body>
                    </html>
                `,
            });
        });

        // Await all email sending promises
        const results = await Promise.all(sendEmailsPromises);

        return NextResponse.json({ message: 'Bulk emails sent successfully', results: results }, { status: 200 });

    } catch (error) {
        console.error('Error sending bulk emails:', error);
        return NextResponse.json({ error: 'Error sending bulk emails' }, { status: 500 });
    }
}
