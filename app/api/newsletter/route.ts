import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/utils/db';
import Newsletter from '@/models/Newsletter';

export async function GET(req: NextRequest) {
    await connectToDB();

    try {
        // Fetch all the emails from the Newsletter collection
        const emails = await Newsletter.find({}, { email: 1, _id: 0 }); // Only return the email field, omit the _id field

        if (emails.length === 0) {
            return NextResponse.json({ message: 'No emails found in the newsletter list' }, { status: 404 });
        }

        return NextResponse.json({ emails }, { status: 200 });
    } catch (error) {
        console.error('Error fetching emails:', error);
        return NextResponse.json({ error: 'Error fetching emails' }, { status: 500 });
    }
}
