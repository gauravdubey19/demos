
import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/utils/db";
import FAQ from "@/models/FAQschema";

export async function POST(req: NextRequest) {
    try {
        await connectToDB();

        const body = await req.json();
        const { headline } = body;

        if (!headline) {
            return NextResponse.json({ error: 'Headline is required' }, { status: 400 });
        }

        const newFAQSection = await createNewFAQSection(headline);
        return NextResponse.json(newFAQSection, { status: 201 });
    } catch (error) {
        console.error('Error in POST request:', error);
        return NextResponse.json({ error: 'Error creating new FAQ section', details: error }, { status: 500 });
    }
}

async function createNewFAQSection(headline: string) {
    try {
        const newFAQSection = new FAQ({
            headline: headline,
            questions: []  // Initialize with an empty array of questions
        });

        const savedFAQSection = await newFAQSection.save();
        return savedFAQSection;
    } catch (error) {
        console.error('Error in createNewFAQSection:', error);
        throw new Error(`Error creating new FAQ section: ${error}`);
    }
}