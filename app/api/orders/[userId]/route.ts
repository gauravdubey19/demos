import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/utils/db';
import Order from '@/models/Order';
import Products from '@/models/Products';

// Get Orders by User ID
export async function GET(req: NextRequest, { params }: { params: { userId: string } }) {
    await connectToDB();

    const { userId } = params;
    if (!userId || Array.isArray(userId)) {
        console.log('Valid User ID is required');
        return NextResponse.json({ error: 'Valid User ID is required' }, { status: 400 });
    }

    try {
        const userOrders = await Order.find({ userId }).sort({ createdAt: -1 });
        return NextResponse.json(userOrders, { status: 200 });
    } catch (error) {
        // console.error('Error fetching orders:', error);
        return NextResponse.json({ error: 'Error fetching orders' }, { status: 500 });
    }
}

// Add Order for User
export async function POST(req: NextRequest, { params }: { params: { userId: string } }) {
    await connectToDB();
    const { userId } = params;
    const { orderDetails } = await req.json();

    if (!userId || Array.isArray(userId)) {
        console.log('Valid User ID is required');
        return NextResponse.json({ error: 'Valid User ID is required' }, { status: 400 });
    }

    try {
        const newOrder = {
            userId,
            orderInfo: orderDetails.orderInfo,
            orderedProducts: orderDetails.orderedProducts
        };

        // Keep generating unique order ID until it is unique
        if (!newOrder.orderInfo) {
            console.log('Valid Order Info is required');
            return NextResponse.json({ error: 'Valid Order Info is required' }, { status: 400 });
        }

        do {
            newOrder.orderInfo.orderID = Math.floor(100000 + Math.random() * 900000).toString();
        } while (await Order.findOne({ 'orderInfo.orderID': newOrder.orderInfo.orderID }));

        // Decrease the stocks of the orderedProducts
        for (const product of newOrder.orderedProducts) {
            const productToUpdate = await Products.findOne({ _id: product.productId });
            if (!productToUpdate) {
                console.error(`Product ${product.title} not found`);
                return NextResponse.json({ error: `Product ${product.title} not found` }, { status: 404 });
            }

            console.log("product quantity: ", product.quantity);
            console.log("productToUpdate.quantityInStock: ", productToUpdate.quantityInStock);

            if (productToUpdate.quantityInStock < product.quantity) {
                console.error(`Insufficient stock for product ${product.title}`);
                return NextResponse.json({ error: `Insufficient stock for product ${product.title}` }, { status: 400 });
            }

            productToUpdate.quantityInStock -= product.quantity;
            await productToUpdate.save();
            console.log(`Product ${product.title} updated successfully`);
        }

        const createdOrder = await Order.create(newOrder);
        return NextResponse.json({ message: 'Order added successfully', order: createdOrder }, { status: 201 });
    } catch (error) {
        console.error('Error adding order:', error);
        return NextResponse.json({ error: 'Error adding order' }, { status: 500 });
    }
}

// Update Order for User
// export async function PUT(req: NextRequest, { params }: { params: { userId: string } }) {
//     await connectToDB();

//     const { userId } = params;
//     const { orderId, orderedProducts, orderInfo } = await req.json();

//     if (!userId || Array.isArray(userId) || !orderId) {
//         return NextResponse.json({ error: 'Valid User ID and Order ID are required' }, { status: 400 });
//     }

//     try {
//         const orderToUpdate = await Order.findOne({ userId, _id: orderId });

//         if (!orderToUpdate) {
//             return NextResponse.json({ error: 'Order not found' }, { status: 404 });
//         }

//         orderToUpdate.orderedProducts = orderedProducts ?? orderToUpdate.orderedProducts;
//         orderToUpdate.orderInfo = { ...orderToUpdate.orderInfo, ...orderInfo };

//         await orderToUpdate.save();
//         return NextResponse.json({ message: 'Order updated successfully', order: orderToUpdate }, { status: 200 });
//     } catch (error) {
//         console.error('Error updating order:', error);
//         return NextResponse.json({ error: 'Error updating order' }, { status: 500 });
//     }
// }

//Change Order Status
export async function PUT(req: NextRequest, { params }: { params: { userId: string } }) {
    await connectToDB();

    const { userId } = params;
    const { orderId, orderStatus } = await req.json();

    if (!userId || Array.isArray(userId) || !orderId || !orderStatus) {
        return NextResponse.json({ error: 'Valid User ID, Order ID and Order Status are required' }, { status: 400 });
    }

    try {
        const orderToUpdate = await Order.findOne({ userId, _id: orderId });

        if (!orderToUpdate) {
            return NextResponse.json({ error: 'Order not found' }, { status: 404 });
        }

        orderToUpdate.orderInfo.orderStatus = orderStatus;
        if(orderStatus === 'cancelled'){
            orderToUpdate.orderInfo.cancelledDate = new Date();
        } else if(orderStatus === 'shipped'){
            orderToUpdate.orderInfo.shippingDate = new Date();
        } else if(orderStatus === 'delivered'){
            orderToUpdate.orderInfo.deliveryDate = new Date();
        }
        await orderToUpdate.save();
        return NextResponse.json({ message: 'Order status updated successfully', order: orderToUpdate }, { status: 200 });
    } catch (error) {
        console.error('Error updating order status:', error);
        return NextResponse.json({ error: 'Error updating order status' }, { status: 500 });
    }
}

// Delete Order for User
export async function DELETE(req: NextRequest, { params }: { params: { userId: string } }) {
    await connectToDB();

    const { userId } = params;
    const { orderIds } = await req.json();

    if (!userId || Array.isArray(userId) || !Array.isArray(orderIds) || orderIds.length === 0) {
        return NextResponse.json({ error: 'Valid User ID and Order IDs are required' }, { status: 400 });
    }

    try {
        await Order.deleteMany({ userId, _id: { $in: orderIds } });
        return NextResponse.json({ message: 'Orders deleted successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error deleting orders:', error);
        return NextResponse.json({ error: 'Error deleting orders' }, { status: 500 });
    }
}