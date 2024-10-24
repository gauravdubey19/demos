import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/utils/db";
import Notification from "@/models/Notification";

// API Route to get all notifications from the database
export async function GET(req: NextRequest) {
    try {
        await connectToDB(); // Connect to the database

        // Fetch all notifications from the database
        const notifications = await Notification.find({});

        // Return the fetched notifications as JSON
        return NextResponse.json(notifications, { status: 200 });
    } catch (error) {
        console.error('Error fetching notifications:', error);
        return NextResponse.json({ error: 'Error fetching notifications' }, { status: 500 });
    }
}
