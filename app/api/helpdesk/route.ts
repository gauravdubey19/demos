import { NextRequest, NextResponse } from 'next/server';
import Helpdesk from '@/models/Helpdesk'; // Adjust the import path
import { connectToDB } from '@/utils/db'; // Assuming you have a DB connection helper

// export async function POST(req: NextRequest) {
//     try {
//         await connectToDB();
//         const { fullName, userId, issueType, subIssueType, description } = await req.json();

//         // Validate fields
//         if (!fullName || !userId || !issueType || !description) {
//             return NextResponse.json({ error: 'All required fields must be filled' }, { status: 400 });
//         }

//         // Create a new Helpdesk ticket
//         const newTicket = new Helpdesk({
//             fullName,
//             userId, // userId reference added
//             issueType,
//             subIssueType,
//             description,
//         });

//         await newTicket.save();
//         return NextResponse.json({ message: 'Ticket created successfully', ticket: newTicket }, { status: 201 });
//     } catch (error) {
//         return NextResponse.json({ error: 'Failed to create ticket' }, { status: 500 });
//     }
// }

export async function POST(req: NextRequest) {
    try {
        await connectToDB();

        const formData = await req.formData();
        const fullName = formData.get('fullName') as string;
        const issueType = formData.get('issueType') as string;
        const subIssueType = formData.get('subIssueType') as string;
        const description = formData.get('description') as string;
        const orderNumber = formData.get('orderNumber') as string;
        const userId = formData.get('userId') as string;

        // Collect file URLs
        const fileUrls: string[] = [];
        for (let i = 0; formData.get(`file${i}`); i++) {
            fileUrls.push(formData.get(`file${i}`) as string);
        }

        // Validate fields
        if (!fullName || !userId || !issueType || !description) {
            return NextResponse.json({ error: 'All required fields must be filled' }, { status: 400 });
        }

        // Create a new Helpdesk ticket
        const newTicket = new Helpdesk({
            fullName,
            userId,
            issueType,
            subIssueType,
            description,
            orderNumber,
            attachments: fileUrls,
        });

        await newTicket.save();
        return NextResponse.json({ message: 'Ticket created successfully', ticket: newTicket }, { status: 201 });
    } catch (error) {
        console.error('Error creating ticket:', error);
        return NextResponse.json({ error: 'Failed to create ticket' }, { status: 500 });
    }
}


export async function GET(req: NextRequest, { params }: { params: { ticketId: string } }) {
    try {
        await connectToDB();
        const { ticketId } = params;

        if (!ticketId) {
            return NextResponse.json({ error: 'Ticket ID is required' }, { status: 400 });
        }

        const ticket = await Helpdesk.findById(ticketId).populate('userId'); // Populate the userId with related user details
        if (!ticket) {
            return NextResponse.json({ error: 'Ticket not found' }, { status: 404 });
        }

        return NextResponse.json(ticket, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to retrieve ticket' }, { status: 500 });
    }
}

export async function PUT(req: NextRequest, { params }: { params: { ticketId: string } }) {
    try {
        await connectToDB();
        const { ticketId } = params;
        const updateData = await req.json();

        if (!ticketId) {
            return NextResponse.json({ error: 'Ticket ID is required' }, { status: 400 });
        }

        const updatedTicket = await Helpdesk.findByIdAndUpdate(ticketId, updateData, { new: true });
        if (!updatedTicket) {
            return NextResponse.json({ error: 'Ticket not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Ticket updated successfully', ticket: updatedTicket }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update ticket' }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest, { params }: { params: { ticketId: string } }) {
    try {
        await connectToDB();
        const { ticketId } = params;

        if (!ticketId) {
            return NextResponse.json({ error: 'Ticket ID is required' }, { status: 400 });
        }

        const deletedTicket = await Helpdesk.findByIdAndDelete(ticketId);
        if (!deletedTicket) {
            return NextResponse.json({ error: 'Ticket not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Ticket deleted successfully' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete ticket' }, { status: 500 });
    }
}
