import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/utils/db';
import Order from '@/models/Order';

// Get Order by Order ID
export async function GET(req: NextRequest, { params }: { params: { orderId: string } }) {
    await connectToDB();

    const { orderId } = params;
    if (!orderId || Array.isArray(orderId)) {
        console.log('Valid Order ID is required');
        return NextResponse.json({ error: 'Valid Order ID is required' }, { status: 400 });
    }

    try {
        const order = await Order.findOne({ 'orderInfo.orderID': orderId }).populate({
            path: 'userId',
            select: 'email phone_number firstName lastName profile',
        });
        if (!order) {
            return NextResponse.json({ error: 'Order not found' }, { status: 404 });
        }
        return NextResponse.json(order, { status: 200 });
    } catch (error) {
        console.error('Error fetching order:', error);
        return NextResponse.json({ error: 'Error fetching order' }, { status: 500 });
    }
}