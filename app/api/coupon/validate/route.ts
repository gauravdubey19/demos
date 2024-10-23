import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/utils/db';
import Coupon from '@/models/Coupon';

// Validate Coupon Before Applying
export async function POST(req: NextRequest) {
    await connectToDB();
    
    const { userId, code, cartTotal } = await req.json();
    console.log("CartTotal: ", cartTotal);
    try {
        const coupon = await Coupon.findOne({ code });

        if (!coupon) {
            return NextResponse.json({ error: 'Invalid coupon code' }, { status: 400 });
        }

        if (coupon.expirationDate && new Date(coupon.expirationDate) < new Date()) {
            return NextResponse.json({ error: 'Coupon has expired' }, { status: 400 });
        }

        if (cartTotal < coupon.minPurchaseAmount) {
            return NextResponse.json({ error: 'Minimum purchase amount not met' }, { status: 400 });
        }

        if (coupon.usageLimit <= coupon.usedCount) {
            return NextResponse.json({ error: 'Coupon usage limit reached' }, { status: 400 });
        }

        if (coupon.userSpecific && coupon.userId !== userId) {
            return NextResponse.json({ error: 'This coupon is not available for this user' }, { status: 400 });
        }

        return NextResponse.json({ valid: true, discountValue: coupon.discountValue, discountType: coupon.discountType,
        maxDiscountAmount: coupon.maxDiscountAmount
         }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error validating coupon' }, { status: 500 });
    }
}
