import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/utils/db';
import Query from '@/models/Query'; // Adjust the import path as needed

export async function GET(req: NextRequest) {
    await connectToDB(); // Connect to the database

    try {
        const queries = await Query.find(); // Fetch all queries from the database
        return NextResponse.json({ queries }, { status: 200 });
    } catch (error) {
        console.error('Error fetching queries:', error);
        return NextResponse.json({ error: 'Error fetching queries' }, { status: 500 });
    }
}