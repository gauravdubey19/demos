import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/utils/db';
import Coupon from '@/models/Coupon';

// Delete a Coupon by couponCode
export async function DELETE(req: NextRequest, { params }: { params: { couponCode: string } }) {
    await connectToDB();

    const { couponCode } = params;

    try {
        const coupon = await Coupon.findOneAndDelete({ code: couponCode });

        if (!coupon) {
            return NextResponse.json({ error: 'Coupon not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Coupon deleted successfully' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error deleting coupon' }, { status: 500 });
    }
}

// Get a Coupon by couponCode
export async function GET(req: NextRequest, { params }: { params: { couponCode: string } }) {
    await connectToDB();

    const { couponCode } = params;

    try {
        const coupon = await Coupon.findOne({ code: couponCode });

        if (!coupon) {
            return NextResponse.json({ error: 'Coupon not found' }, { status: 404 });
        }

        return NextResponse.json(coupon, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching coupon' }, { status: 500 });
    }
}