import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/utils/db';
import Contact from '@/models/Contact';

// Function to establish database connection
async function connectDB() {
    try {
        await connectToDB();
    } catch (error) {
        console.error('Failed to connect to DB:', error);
        throw new Error('Database connection failed');
    }
}

// Handler for GET requests
export async function GET(req: NextRequest, { params }: { params: { userId: string } }) {
    await connectDB();

    const { userId } = params;

    // Validate userId
    if (!userId || Array.isArray(userId)) {
        return NextResponse.json({ error: 'Valid User ID is required' }, { status: 400 });
    }

    try {
        // Fetch all contacts related to the userId
        const contacts = await getContactsByUserId(userId);

        if (!contacts || contacts.length === 0) {
            return NextResponse.json({ message: 'No contacts found for this user' }, { status: 404 });
        }

        return NextResponse.json(contacts, { status: 200 });
    } catch (error) {
        console.error('Error fetching contacts:', error);
        return NextResponse.json({ error: 'Error fetching contacts' }, { status: 500 });
    }
}

// Fetch contacts based on userId
async function getContactsByUserId(userId: string) {
    if (typeof userId !== 'string') {
        throw new Error('Invalid userId');
    }

    try {
        // Find contacts that match the userId
        const contacts = await Contact.find({ userId }).exec();
        return contacts;
    } catch (error) {
        console.error('Error fetching contacts:', error);
        throw new Error('Error fetching contacts');
    }
}
