import mongoose, { Document, Schema } from 'mongoose';

interface INotification extends Document {
    title: string;
    message: string;
    read: boolean;
    createdAt: Date;
}

const notificationSchema = new Schema<INotification>({
    title: { type: String, required: true },
    message: { type: String, required: true },
    read: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

const Notification = mongoose.models.Notification || mongoose.model<INotification>('Notification', notificationSchema);

export default Notification;
