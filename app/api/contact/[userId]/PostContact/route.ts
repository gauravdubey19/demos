// import { NextRequest, NextResponse } from 'next/server';
// import { connectToDB } from '@/utils/db';  

// import Contact from '@/models/Contact'; 

// export async function POST(req: NextRequest, { params }: { params: { userId: string } }) {
//     await connectToDB();

//     if (!params.userId) {
//         return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
//     }

//     const { email, phoneNo, shippingAddress, country, city, pincode } = await req.json();
//     const { userId } = params; // Extract userId from params
//     if (!email || !phoneNo || !shippingAddress || !country || !city || !pincode) {
//         return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
//     }

//     try {
//         const result = await new Contact({ userId, email, phoneNo, shippingAddress, country, city, pincode });
//         return NextResponse.json(result, { status: 200 });
//     } catch (error) {
//         return NextResponse.json({ error: 'Error sending contact message' }, { status: 500 });
//     }
// }



import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/utils/db';
import Contact from '@/models/Contact';

export async function POST(req: NextRequest, { params }: { params: { userId: string } }) {
    await connectToDB();

    const { userId } = params;
    console.log(userId)

    if (!userId) {
        return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    const { email, phoneNo, shippingAddress, country, city, pincode } = await req.json();

    if (!email || !phoneNo || !shippingAddress || !country || !city || !pincode) {
        return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    try {
        // Create a new contact instance
        const contact = new Contact({
            userId,
            email,
            phoneNo,
            shippingAddress,
            country,
            city,
            pincode
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
