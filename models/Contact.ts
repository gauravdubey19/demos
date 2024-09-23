
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
    address: { type: String },
    country: { type: String },
    city: { 
        name: { type: String},
        code: { type: String}
    },
    state: {
        name: { type: String },
        code: { type: String }
    },
    zip: { type: String}
});


const Contact = mongoose.models.Contact || mongoose.model<IContact>('Contact', contactSchema);

export default Contact;