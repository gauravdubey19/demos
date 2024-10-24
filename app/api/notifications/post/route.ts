import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/utils/db";
import Notification from "@/models/Notification";

// Creating a notification based on title and message (read is always false by default)
export async function POST(req: NextRequest) {
    try {
        await connectToDB();

        // Extract title and message from the request body
        const { title, message } = await req.json();

        // Check if the required fields are present
        if (!title || !message) {
            return NextResponse.json({ error: 'Title and message are required' }, { status: 400 });
        }

        // Create the notification with read defaulted to false
        const notification = await createNotification(title, message);

        // Return the created notification
        return NextResponse.json(notification, { status: 200 });
    } catch (error) {
        console.error('Error creating notification:', error);
        return NextResponse.json({ error: 'Error creating notification' }, { status: 500 });
    }
}

// Function to create the notification in the database
async function createNotification(title: string, message: string) {
    if (typeof title !== 'string' || typeof message !== 'string') {
        throw new Error('Invalid input');
    }

    try {
        // Create and save the notification with read set to false
        const notification = await Notification.create({ title, message, read: false });
        return notification;
    } catch (error) {
        console.error('Error creating notification:', error);
        throw new Error('Error creating notification');
    }
}
