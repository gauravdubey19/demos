import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/utils/db";
import FAQ from "@/models/FAQschema";

export async function DELETE(req: NextRequest) {
    try {
        await connectToDB();

        const { headlineId } = await req.json();

        if (!headlineId) {
            return NextResponse.json({ error: 'Missing required headline ID' }, { status: 400 });
        }

        const deletedFAQ = await FAQ.findByIdAndDelete(headlineId);

        if (!deletedFAQ) {
            return NextResponse.json({ error: 'FAQ not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'FAQ deleted successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error deleting FAQ:', error);
        return NextResponse.json({ error: 'Error deleting FAQ' }, { status: 500 });
    }
}
