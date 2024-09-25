import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/utils/db";
import FAQ from "@/models/FAQschema";

// Get all FAQs
export async function GET(req: NextRequest) {
    try {
        await connectToDB();
        const faqs = await getAllFAQs();
        return NextResponse.json(faqs, { status: 200 });
    } catch (error) {
        console.error('Error fetching FAQs:', error);
        return NextResponse.json({ error: 'Error fetching FAQs' }, { status: 500 });
    }
}

// Fetch all FAQs
async function getAllFAQs() {
    try {
        const faqs = await FAQ.find({});
        return faqs;
    } catch (error) {
        console.error('Error fetching FAQs:', error);
        throw new Error('Error fetching FAQs');
    }
}