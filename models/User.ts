import mongoose, { Schema, model, models, mongo } from 'mongoose';

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    profile: {
        type: String,
    },
    dateOfBirth: {
        type: Date,
    },
    phone: {
        type: String,
        minLength: 10,
        maxLength: 10,
    },
    gender: {
        type: String,
        enum: ["male","female","gay"]
    },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    },
    // The following has to be a snapshot of the product
    orders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order"
    }]
});

const User = models.User || model('User', UserSchema);

export default User;