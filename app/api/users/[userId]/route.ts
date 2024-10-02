import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/utils/db";
import Address from "@/models/Address";
import Cart from "@/models/Cart";
import Contact from "@/models/Contact";
import Order from "@/models/Order";
import Review from "@/models/Reviews";
import Query from "@/models/Query";

// Get User by ID
export async function GET(req: NextRequest, { params }: { params: { userId: string } }) {
    await connectToDB();

    const { userId } = params;

    if (!userId || Array.isArray(userId)) {
        return NextResponse.json({ error: 'Valid User ID is required' }, { status: 400 });
    }

    try {
        const user = await getUserById(userId);
        return NextResponse.json(user, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching user' }, { status: 500 });
    }
}
// DELETE handler
export async function DELETE(req: NextRequest, { params }: { params: { userId: string } }) {
    const { userId } = params;

    try {
        await connectToDB();

        //check if user has any pending orders first
        const orders = await Order.find({ userId });
        
        for (const order of orders) {
          if (order.orderInfo.orderStatus === 'pending') {
            console.log('Looks like you have pending orders. Either cancel orders or wait for them to be delivered before deleting your account');
            return NextResponse.json({ error: 'Looks like you have pending orders. Either cancel orders or wait for them to be delivered before deleting your account' }, { status: 400 });
          }
        }
        await Promise.all([
            Address.deleteMany({ userId }),
            Cart.deleteMany({ userId }),
            Contact.deleteMany({ userId }),
            Order.deleteMany({ userId }),
            Review.deleteMany({ userId }),
            Query.deleteMany({ userId }),
        ]);

        // Delete the user
        const result = await deleteUser(userId);

        return NextResponse.json(result, { status: 200 });
    } catch (error) {
        console.error('Error deleting user:', error);
        return NextResponse.json({ error: 'Error deleting user' }, { status: 500 });
    }
}
// PUT handler
export async function PUT(req: NextRequest, { params }: { params: { userId: string } }) {
    const { userId } = params;
    const { firstName, lastName, email, profile, dateOfBirth, phone_number, gender } = await req.json();

    try {
        const result = await updateUser(userId, firstName, lastName, email, profile, dateOfBirth, phone_number, gender);
        return NextResponse.json(result, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'error updating User' }, { status: 500 });
    }
}

// Fetch user based on userId
async function getUserById(userId: string) {
    if (typeof userId !== 'string') {
        throw new Error('Invalid userId');
    }

    try {
        const user = await User.findById(userId);
        return user;
    } catch (error) {
        // console.error('Error fetching user:', error);
        throw new Error('Error fetching user');
    }
}
// Delete user based on userId
async function deleteUser(userId: string){
    if (!userId) {
        throw new Error('User ID is required');
    }

    try {
        await connectToDB();

        const user = await User.findByIdAndDelete(userId);

        if (!user) {
            throw new Error('User not found');
        }

        return { message: 'User deleted successfully' };
    } catch (error) {
        console.error('Error deleting user:', error);
        throw new Error('Internal server error');
    }
};
// Update user based on userId
 async function updateUser (
    userId: string,
    firstName?: string,
    lastName?: string,
    email?: string,
    profile?: string,
    dateOfBirth?: string,
    phone_number?: string,
    gender?: string
){
    if (!userId) {
        throw new Error('User ID is required');
    }

    try {
        await connectToDB();

        const user = await User.findById(userId);
        
        if (!user) {
            throw new Error('User not found');
        }

        user.firstName = firstName ?? user.firstName;
        user.lastName = lastName ?? user.lastName;
        user.email = email ?? user.email;
        user.profile = profile ?? user.profile;
        user.dateOfBirth = dateOfBirth ?? user.dateOfBirth;
        user.phone_number = phone_number ?? user.phone_number;
        user.gender = gender ?? user.gender;
        
        await user.save();

        return user;
    } catch (error) {
        console.error('Error updating user:', error);
        throw new Error('Internal server error');
    }
};

