import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/utils/db';
import Coupon from '@/models/Coupon';

// Get All Coupons
export async function GET() {
    await connectToDB();

    try {
        const coupons = await Coupon.find();
        return NextResponse.json(coupons, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching coupons' }, { status: 500 });
    }
}

// Add a Coupon
export async function POST(req: NextRequest) {
    await connectToDB();

    const { code, discountType, discountValue, expirationDate, minPurchaseAmount, maxDiscountAmount, usageLimit, userSpecific } = await req.json();

    try {
        //First check if the coupon code already exists
        const existingCoupon = await Coupon.findOne({ code });
        if (existingCoupon) {
            return NextResponse.json({ error: 'Coupon code already exists' }, { status: 400 });
        }
        const newCoupon = await Coupon.create({
            code,
            discountType,
            discountValue,
            expirationDate,
            minPurchaseAmount,
            maxDiscountAmount,
            usageLimit,
            userSpecific,
        });

        return NextResponse.json({ message: 'Coupon created successfully', coupon: newCoupon }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Error creating coupon' }, { status: 500 });
    }
}

// Delete a Coupon by ID
export async function DELETE(req: NextRequest) {
    await connectToDB();

    const { couponId } = await req.json();

    try {
        const coupon = await Coupon.findByIdAndDelete(couponId);

        if (!coupon) {
            return NextResponse.json({ error: 'Coupon not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Coupon deleted successfully' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error deleting coupon' }, { status: 500 });
    }
}
