import { NextRequest, NextResponse } from 'next/server';
import Helpdesk from '@/models/Helpdesk'; // Adjust the import path
import { connectToDB } from '@/utils/db'; // Assuming you have a DB connection helper

export async function GET(req: NextRequest, { params }: { params: { userId: string } }) {
    try {
        await connectToDB();
        const { userId } = params;
        console.log("userId: ",userId);
        if (!userId) {
            return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
        }

        // Find all tickets for the given userId
        const tickets = await Helpdesk.find({ userId }) // Populate user details

        if (!tickets || tickets.length === 0) {
            return NextResponse.json({ error: 'No tickets found for this user' }, { status: 404 });
        }

        return NextResponse.json(tickets, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to retrieve tickets' }, { status: 500 });
    }
}
