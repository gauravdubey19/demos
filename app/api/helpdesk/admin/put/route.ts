import { NextRequest, NextResponse } from 'next/server';
import Helpdesk from '@/models/Helpdesk'; // Adjust the import path based on your structure
import { connectToDB } from '@/utils/db';

export async function POST(req: NextRequest) {
    await connectToDB(); // Connect to the database

    const { ticketId, response } = await req.json();

    if (!ticketId || !response) {
        return NextResponse.json({ error: 'Ticket ID and response are required' }, { status: 400 });
    }

    try {
        // Find the ticket by ID
        const ticket = await Helpdesk.findById(ticketId);

        if (!ticket) {
            return NextResponse.json({ error: 'Ticket not found' }, { status: 404 });
        }

        // Update the ticket response and status to 'closed'
        ticket.response = response;
        ticket.status = 'closed';
        await ticket.save();

        return NextResponse.json({ message: 'Response updated and ticket closed', status: 200 });
    } catch (error) {
        console.error('Error updating ticket:', error);
        return NextResponse.json({ error: 'Error updating ticket' }, { status: 500 });
    }
}
