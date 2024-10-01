import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/utils/db';
import Address from '@/models/Address';
import { Address as AddressType} from '@/context/GlobalProvider';

// Get Addresses by User ID
export async function GET(req: NextRequest, { params }: { params: { userId: string } }) {
    await connectToDB();

    const { userId } = params;

    if (!userId || Array.isArray(userId)) {
        return NextResponse.json({ error: 'Valid User ID is required' }, { status: 400 });
    }

    try {
        const userAddress = await Address.findOne({ userId });
        if (userAddress) {
            // Sort addresses by createdAt in descending order
            userAddress.addresses.sort((a: AddressType, b: AddressType) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        }
        return NextResponse.json(userAddress, { status: 200 });
    } catch (error) {
        // console.error('Error fetching addresses:', error);
        return NextResponse.json({ error: 'Error fetching addresses' }, { status: 500 });
    }
}

// Add Address for User
export async function POST(req: NextRequest, { params }: { params: { userId: string } }) {
    await connectToDB();

    const { userId } = params;
    const { firstName, lastName, address, phone_number, zipCode, state, city } = await req.json();

    if (!userId || Array.isArray(userId)) {
        return NextResponse.json({ error: 'Valid User ID is required' }, { status: 400 });
    }

    try {
        let userAddress = await Address.findOne({ userId });

        if (userAddress) {
            const newAddress = { firstName, lastName, address, phone_number, zipCode, state, city };
            userAddress.addresses.push(newAddress);
            const savedAddress = await userAddress.save();
            const createdAddress = savedAddress.addresses[savedAddress.addresses.length - 1];
            return NextResponse.json({ message: 'Address added successfully', address: createdAddress }, { status: 201 });
        } else {
            const newAddress = {
                userId,
                addresses: [{ firstName, lastName, address, phone_number, zipCode, state, city }],
            };
            userAddress = await Address.create(newAddress);
            return NextResponse.json({ message: 'Address added successfully', address: userAddress.addresses[0] }, { status: 201 });
        }
    } catch (error) {
        console.error('Error adding address:', error);
        return NextResponse.json({ error: 'Error adding address' }, { status: 500 });
    }
}

// Update Address for User
export async function PUT(req: NextRequest, { params }: { params: { userId: string } }) {
    await connectToDB();

    const { userId } = params;
    const { addressId, firstName, lastName, address, phone_number, zipCode, state, city } = await req.json();

    if (!userId || Array.isArray(userId) || !addressId) {
        return NextResponse.json({ error: 'Valid User ID and Address ID are required' }, { status: 400 });
    }

    try {
        const userAddress = await Address.findOne({ userId });

        if (!userAddress) {
            return NextResponse.json({ error: 'User address not found' }, { status: 404 });
        }

        const addressToUpdate = userAddress.addresses.id(addressId);

        if (!addressToUpdate) {
            return NextResponse.json({ error: 'Address not found' }, { status: 404 });
        }

        addressToUpdate.firstName = firstName ?? addressToUpdate.firstName;
        addressToUpdate.lastName = lastName ?? addressToUpdate.lastName;
        addressToUpdate.address = address ?? addressToUpdate.address;
        addressToUpdate.phone_number = phone_number ?? addressToUpdate.phone_number;
        addressToUpdate.zipCode = zipCode ?? addressToUpdate.zipCode;
        addressToUpdate.state.code = state.code ?? addressToUpdate.state.code;
        addressToUpdate.state.name = state.name ?? addressToUpdate.state.name;
        addressToUpdate.city.code = city.code ?? addressToUpdate.city.code;
        addressToUpdate.city.name = city.name ?? addressToUpdate.city.name;
        
        await userAddress.save();
        addressToUpdate._id = addressId;
        return NextResponse.json({ message: 'Address updated successfully', address: addressToUpdate }, { status: 200 });
    } catch (error) {
        console.error('Error updating address:', error);
        return NextResponse.json({ error: 'Error updating address' }, { status: 500 });
    }
}

// Delete Address for User
export async function DELETE(req: NextRequest, { params }: { params: { userId: string } }) {
    await connectToDB();

    const { userId } = params;
    const { addressIds } = await req.json();

    if (!userId || Array.isArray(userId) || !Array.isArray(addressIds) || addressIds.length === 0) {
        return NextResponse.json({ error: 'Valid User ID and Address IDs are required' }, { status: 400 });
    }

    try {
        const userAddress = await Address.findOne({ userId });

        if (!userAddress) {
            return NextResponse.json({ error: 'User address not found' }, { status: 404 });
        }

        // Use the pull method to remove addresses by their IDs
        addressIds.forEach((addressId) => {
            userAddress.addresses.pull({ _id: addressId });
        });

        await userAddress.save();

        return NextResponse.json({ message: 'Addresses deleted successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error deleting addresses:', error);
        return NextResponse.json({ error: 'Error deleting addresses' }, { status: 500 });
    }
}