import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/utils/db';
import Contact from '@/models/Contact';

// Connect to the database
async function connectDB() {
    await connectToDB();
}

// Handler for GET requests
export async function GET(req: NextRequest, { params }: { params: { userId: string } }) {
    await connectDB();

    const { userId } = params;

    if (!userId || Array.isArray(userId)) {
        return NextResponse.json({ error: 'Valid User ID is required' }, { status: 400 });
    }

    try {
        const contacts = await getContact(userId);
        return NextResponse.json(contacts, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching contacts' }, { status: 500 });
    }
}

// Fetch contacts based on userId
async function getContact(userId: string) {
    if (typeof userId !== 'string') {
        throw new Error('Invalid userId');
    }

    try {
        const contacts = await Contact.findOne({ userId })
        return contacts;
    } catch (error) {
        console.error('Error fetching contacts:', error);
        throw new Error('Error fetching contacts');
    }
}
