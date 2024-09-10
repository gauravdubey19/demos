import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/utils/db';
import Contact from '@/models/Contact';

// Update contact information
export async function PUT(req: NextRequest, { params }: { params: { userId: string } }) {
    await connectToDB();

    const { userId } = params;

    if (!userId) {
        return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    const {_id, email, phoneNo, shippingAddress, country, city, pincode } = await req.json();

    if (!_id && !email && !phoneNo && !shippingAddress && !country && !city && !pincode) {
        return NextResponse.json({ error: 'At least one field is required to update' }, { status: 400 });
    }

    try {
        const updatedContact = await Contact.findOneAndUpdate(
            { userId,_id }, // Filter by userId
            { email, phoneNo, shippingAddress, country, city, pincode }, // Update fields
            { new: true, runValidators: true } // Return the updated document and run validators
        ).exec();

        if (!updatedContact) {
            return NextResponse.json({ error: 'Contact not found' }, { status: 404 });
        }

        return NextResponse.json(updatedContact, { status: 200 });
    } catch (error) {
        console.error('Error updating contact:', error);
        return NextResponse.json({ error: 'Error updating contact' }, { status: 500 });
    }
}
