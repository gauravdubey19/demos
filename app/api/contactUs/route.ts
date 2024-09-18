import { NextRequest, NextResponse } from 'next/server';
import { transporter } from '../newsletter/core';


export async function POST(req: NextRequest) {

    const requestBody = await req.json();

    const {name,email,message} = requestBody;

    if (!email) {
        return NextResponse.json({ error: 'Email ID is required' }, { status: 400 });
    }

    try {
        const info = await transporter.sendMail({
            from: '"CSK Textiles" <CSK@gmail.com>',
            to: email,
            subject: "We have Recieved your query",
            text: "Our Specialist will contact you soon",
            html: `
            <html>
            <body>
                <h4>Hi ${name} we have recieved your Query</h4>
                <p>${message}</p>
            </body>
            </html>
            `,
        });

        return NextResponse.json({
            message: 'Email Sent',
            info: info,
            status: 200
        });
    } catch (error) {
        console.error('Error creating contact:', error);
        return NextResponse.json({ error: 'Error creating contact message' }, { status: 500 });
    }
}
