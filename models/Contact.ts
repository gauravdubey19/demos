
import mongoose, { Document, Schema } from 'mongoose';

interface IContact extends Document {
    userId: string;
    address: string;
    country: string;
    city: string;
    state: {
        name: string;
        code: string;
    };
    zip: string;
}

const contactSchema = new Schema<IContact>({
    userId: { type: String, required: true },
    address: { type: String, required: true },
    country: { type: String, required: true },
    city: { 
        name: { type: String, required: true},
        code: { type: String, required: true}
    },
    state: {
        name: { type: String, required: true },
        code: { type: String, required: true }
    },
    zip: { type: String, required: true }
});


const Contact = mongoose.models.Contact || mongoose.model<IContact>('Contact', contactSchema);

export default Contact;