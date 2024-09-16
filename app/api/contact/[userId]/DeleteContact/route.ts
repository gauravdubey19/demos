import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/utils/db';
import Contact from '@/models/Contact';

// Delete contact information
export async function DELETE(req: NextRequest, { params }: { params: { userId: string } }) {
    await connectToDB();

    const { userId } = params;

    if (!userId) {
        return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    // Extract contact ID from query params or request body if available
    const { _id } = await req.json();

    try {
        // Delete the contact based on userId and optional _id
        const deletedContact = await Contact.findOneAndDelete(
            { userId, _id }, // Filter by userId and optionally _id
        );

        if (!deletedContact) {
            return NextResponse.json({ error: 'Contact not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Contact successfully deleted' }, { status: 200 });
    } catch (error) {
        console.error('Error deleting contact:', error);
        return NextResponse.json({ error: 'Error deleting contact' }, { status: 500 });
    }
}
