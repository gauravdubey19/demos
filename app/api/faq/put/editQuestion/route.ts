import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/utils/db";
import FAQ from "@/models/FAQschema";

export async function PUT(req: NextRequest) {
    try {
        await connectToDB();

        const body = await req.json();
        const { headlineId, questionId, question, answer } = body;

        if (!headlineId || !questionId || !question || !answer) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const updatedFAQ = await FAQ.findOneAndUpdate(
            { _id: headlineId, "questions._id": questionId },
            {
                $set: {
                    "questions.$.question": question,
                    "questions.$.answer": answer
                }
            },
            { new: true }
        );

        if (!updatedFAQ) {
            return NextResponse.json({ error: 'FAQ not found' }, { status: 404 });
        }

        return NextResponse.json(updatedFAQ, { status: 200 });
    } catch (error) {
        console.error('Error editing FAQ:', error);
        return NextResponse.json({ error: 'Error editing FAQ' }, { status: 500 });
    }
}