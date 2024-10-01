import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/utils/db';
import Contact from '@/models/Contact';
import User from '@/models/User';
import Address from '@/models/Address';

// Function to establish database connection
async function connectDB() {
    try {
        await connectToDB();
    } catch (error) {
        console.error('Failed to connect to DB:', error);
        throw new Error('Database connection failed');
    }
}

// Handler for GET requests
export async function GET(req: NextRequest, { params }: { params: { userId: string } }) {
    await connectDB();

    const { userId } = params;

    // Validate userId
    if (!userId || Array.isArray(userId)) {
        return NextResponse.json({ error: 'Valid User ID is required' }, { status: 400 });
    }

    try {
        // Fetch all contacts related to the userId
        const contacts = await getContactsByUserId(userId);

        if (!contacts || contacts.length === 0) {
            return NextResponse.json({ message: 'No contacts found for this user' }, { status: 404 });
        }

        return NextResponse.json(contacts, { status: 200 });
    } catch (error) {
        console.error('Error fetching contacts:', error);
        return NextResponse.json({ error: 'Error fetching contacts' }, { status: 500 });
    }
}

// Fetch contacts based on userId
async function getContactsByUserId(userId: string) {
    if (typeof userId !== 'string') {
        throw new Error('Invalid userId');
    }

    try {
        // Find contacts that match the userId
        const contact = await Contact.findOne({ userId});
        const user = await User.findById(userId);
        console.log('Contact:', contact);
        console.log('User:', user);
        let userAddress = null;
        if(contact && user){
            console.log("user.firstName", user.firstName);
            console.log("user.lastName", user.lastName);
            console.log("user.phone_number", user.phone_number);
            console.log("contact.address", contact.address);
            console.log("contact.city", contact.city);
            console.log("contact.state", contact.state);
            console.log("contact.zipCode", contact.zipCode);
            if(user.firstName && user.lastName && user.phone_number && contact.address && contact.city && contact.state && contact.zipCode){
            console.log('User and contact details found');
            userAddress = {
            _id: contact._id,
            firstName: user.firstName,
            lastName: user.lastName,
            phone_number: user.phone_number,
            address: contact.address,
            city: contact.city,
            state: contact.state,
            zipCode: contact.zipCode,
            isSameAddress: true,
        }
    }
    }
        const userAddresses = await Address.findOne({userId});
        let finalUserAddresses = [];
        let sortedFinalUserAddresses = [];
        if (!userAddresses && userAddress) {
            finalUserAddresses = [userAddress];
        }
        if(!userAddress && !userAddresses){
            finalUserAddresses = [];
        }
        if(userAddresses && !userAddress){
            sortedFinalUserAddresses= userAddresses.addresses.sort((a:any, b:any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            finalUserAddresses = sortedFinalUserAddresses;
        }
        if(userAddress && userAddresses){
            sortedFinalUserAddresses= userAddresses.addresses.sort((a:any, b:any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            finalUserAddresses = [userAddress, ...sortedFinalUserAddresses];
    }
    return finalUserAddresses;
    } catch (error) {
        console.error('Error fetching contacts:', error);
        throw new Error('Error fetching contacts');
    }
}
