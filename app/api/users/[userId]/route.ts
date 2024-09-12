import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/utils/db";

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
        const result = await deleteUser(userId);
        return NextResponse.json(result, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'error deleting' }, { status: 500 });
    }
}
// PUT handler
export async function PUT(req: NextRequest, { params }: { params: { userId: string } }) {
    const { userId } = params;
    const { firstName, lastName, email, profile, dateOfBirth, phone, gender } = await req.json();

    try {
        const result = await updateUser(userId, firstName, lastName, email, profile, dateOfBirth, phone, gender);
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
        console.error('Error fetching user:', error);
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
    phone?: string,
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
        user.phone = phone ?? user.phone;
        user.gender = gender ?? user.gender;
        
        await user.save();

        return user;
    } catch (error) {
        console.error('Error updating user:', error);
        throw new Error('Internal server error');
    }
};

