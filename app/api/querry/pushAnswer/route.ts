
import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/utils/db';
import Query from '@/models/Query'; // Adjust the import path as needed

export async function POST(req: NextRequest) {
    await connectToDB(); // Connect to the database

    try {
        const { queryId, answer } = await req.json(); // Get the query ID and answer from the request body

        if (!queryId || !answer) {
            return NextResponse.json({ error: 'Missing query ID or answer' }, { status: 400 });
        }

        const query = await Query.findByIdAndUpdate(queryId, {
            $push: { answers: answer }, // Push the new answer to the answers array
        }, { new: true });

        if (!query) {
            return NextResponse.json({ error: 'Query not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Answer added successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error adding answer:', error);
        return NextResponse.json({ error: 'Error adding answer' }, { status: 500 });
    }
}