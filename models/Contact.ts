
import mongoose, { Document, Schema } from 'mongoose';

interface IContact extends Document {
    userId: string;
    email: string;
    phoneNo: string;
    shippingAddress: string;
    country: string;
    city: string;
    pincode: string;
}

const contactSchema = new Schema<IContact>({
    userId: { type: String, required: true },
    email: { type: String, required: true },
    phoneNo: { type: String, required: true },
    shippingAddress: { type: String, required: true },
    country: { type: String, required: true },
    city: { type: String, required: true },
    pincode: { type: String, required: true }
});


const Contact = mongoose.models.Contact || mongoose.model<IContact>('Contact', contactSchema);

export default Contact;