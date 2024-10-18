import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/utils/db";
import FAQ from "@/models/FAQschema";

export async function DELETE(req: NextRequest) {
    try {
        await connectToDB();

        const { headlineId, questionId } = await req.json();

        if (!headlineId || !questionId) {
            return NextResponse.json({ error: 'Missing required headline or question ID' }, { status: 400 });
        }

        const updatedFAQ = await FAQ.findByIdAndUpdate(
            headlineId,
            {
                $pull: {
                    questions: { _id: questionId }
                }
            },
            { new: true }
        );

        if (!updatedFAQ) {
            return NextResponse.json({ error: 'FAQ or question not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Question deleted successfully', faq: updatedFAQ }, { status: 200 });
    } catch (error) {
        console.error('Error deleting question:', error);
        return NextResponse.json({ error: 'Error deleting question' }, { status: 500 });
    }
}
