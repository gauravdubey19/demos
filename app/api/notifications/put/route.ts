import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/utils/db";
import Notification from "@/models/Notification";

// API Route to update the "read" status of a notification by ID
export async function PATCH(req: NextRequest) {
    try {
        await connectToDB(); // Connect to the database

        // Extract the notificationId from the request body
        const { notificationId } = await req.json();

        // Check if notificationId is provided
        if (!notificationId) {
            return NextResponse.json({ error: 'Notification ID is required' }, { status: 400 });
        }

        // Find the notification by ID and update the "read" field to true
        const updatedNotification = await Notification.findByIdAndUpdate(
            notificationId,
            { read: true },
            { new: true } // This returns the updated document
        );

        // If no notification is found
        if (!updatedNotification) {
            return NextResponse.json({ error: 'Notification not found' }, { status: 404 });
        }

        // Return the updated notification
        return NextResponse.json(updatedNotification, { status: 200 });
    } catch (error) {
        console.error('Error updating notification:', error);
        return NextResponse.json({ error: 'Error updating notification' }, { status: 500 });
    }
}
