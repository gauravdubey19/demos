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
    const {  address, country, city, zip, state } = await req.json();
    console.log("state in backend: ", state);
    const alreadyExists = await Contact.findOne({ userId});
    const updateFields = {
        address: address ?? alreadyExists?.address,
        country: country ?? alreadyExists?.country,
        city: {
            name: city?.name ?? alreadyExists?.city.name,
            code: city?.code ?? alreadyExists?.city.code
        },
        zip: zip ?? alreadyExists?.zip,
        state: {
            name: state?.name ?? alreadyExists?.state.name,
            code: state?.code ?? alreadyExists?.state.code
        }
    };

    try {
        const updatedContact = await Contact.findOneAndUpdate(
            { userId },
            { $set: updateFields },
            { new: true, runValidators: true, upsert: true } // Added upsert option
        );

        return NextResponse.json(updatedContact, { status: 200 });
    } catch (error) {
        console.error('Error updating contact:', error);
        return NextResponse.json({ error: 'Error updating contact' }, { status: 500 });
    }
}