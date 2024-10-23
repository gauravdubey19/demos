import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/utils/db';
import Coupon from '@/models/Coupon';

// Apply Coupon to Order
export async function POST(req: NextRequest) {
    await connectToDB();

    const {code } = await req.json();

    try {
        const coupon = await Coupon.findOne({ code });

        if (!coupon || coupon.usedCount >= coupon.usageLimit) {
            return NextResponse.json({ error: 'Invalid or expired coupon' }, { status: 400 });
        }

        coupon.usedCount += 1;
        await coupon.save();

        return NextResponse.json({ message: 'Coupon applied successfully' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error applying coupon' }, { status: 500 });
    }
}
