import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/utils/db";

export async function GET(req: NextRequest) {
    await connectToDB();

    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');
    const phoneNumber = searchParams.get('phone_number');

    if (!email && !phoneNumber) {
        return NextResponse.json({ error: 'Email or phone number is required' }, { status: 400 });
    }

    try {
        let userExists = false;

        if (email) {
            userExists = await User.exists({ email }) !== null;
        }

        if (phoneNumber) {
            userExists = await User.exists({ phone_number: phoneNumber }) !== null;
        }
        console.log('User exists:', userExists);
        return NextResponse.json({ exists: userExists }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error checking user existence' }, { status: 500 });
    }
}