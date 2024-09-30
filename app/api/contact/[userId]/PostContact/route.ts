
import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/utils/db';
import Contact from '@/models/Contact';

export async function POST(req: NextRequest, { params }: { params: { userId: string } }) {
    await connectToDB();

    const { userId } = params;

    if (!userId) {
        return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    const { address, country, city, zipCode,state } = await req.json();

    if (!address || !country || !city || !zipCode || !state) {
        return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    try {
        // Create a new contact instance
        const contact = new Contact({
            userId,
            address,
            country,
            city,
            state,
            zipCode
        });

        // Save the contact to the database
        const result = await contact.save();

        // Return the saved contact
        return NextResponse.json(result, { status: 200 });
    } catch (error) {
        console.error('Error Creating contact:', error);
        return NextResponse.json({ error: 'Error Creating contact message' }, { status: 500 });
    }
}
