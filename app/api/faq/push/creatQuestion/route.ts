import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/utils/db";
import FAQ from "@/models/FAQschema";
import mongoose from "mongoose";

// Add a new question and answer to an existing FAQ section
export async function PUT(req: NextRequest) {
    try {
        await connectToDB();

        const body = await req.json();
        const { headlineId, question, answer } = body;

        if (!headlineId || !question || !answer) {
            return NextResponse.json({ error: 'HeadlineId, question, and answer are required' }, { status: 400 });
        }

        const updatedFAQSection = await addQuestionToFAQ(headlineId, question, answer);

        if (!updatedFAQSection) {
            return NextResponse.json({ error: 'FAQ section not found' }, { status: 404 });
        }

        return NextResponse.json(updatedFAQSection, { status: 200 });
    } catch (error) {
        console.error('Error adding question to FAQ section:', error);
        return NextResponse.json({ error: 'Error adding question to FAQ section' }, { status: 500 });
    }
}

// Add a new question and answer to an existing FAQ section
async function addQuestionToFAQ(headlineId: string, question: string, answer: string) {
    try {
        if (!mongoose.Types.ObjectId.isValid(headlineId)) {
            throw new Error('Invalid headlineId');
        }

        const updatedFAQSection = await FAQ.findByIdAndUpdate(
            headlineId,
            {
                $push: {
                    questions: { question, answer }
                }
            },
            { new: true, runValidators: true }
        );

        return updatedFAQSection;
    } catch (error) {
        console.error('Error adding question to FAQ section:', error);
        throw new Error('Error adding question to FAQ section');
    }
}