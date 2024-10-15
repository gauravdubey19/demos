import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/utils/db'; // Adjust the import path as needed
import Helpdesk from '@/models/Helpdesk'; // Adjust the import path as needed

export async function GET(req: NextRequest) {
    await connectToDB(); // Connect to the database

    try {
        const helpdeskTickets = await Helpdesk.find(); // Fetch all helpdesk tickets from the database
        return NextResponse.json({ helpdeskTickets }, { status: 200 });
    } catch (error) {
        console.error('Error fetching helpdesk tickets:', error);
        return NextResponse.json({ error: 'Error fetching helpdesk tickets' }, { status: 500 });
    }
}
