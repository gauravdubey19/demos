import mongoose, { Schema, model, models, mongo } from 'mongoose';

const OrderSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    productInfo:{
        productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
        },
        productName: {
        type: String,
        required: true,
        },
        productDescr: {
        type: String,
        required: true,
        },
        productImages: {
        type: [String], // Array of strings for image URLs
        required: true,
        },
        categories: {
        type: [String], // Array of strings for categories
        required: true,
        },
        productMP: {
        type: Number, // Market price
        required: true,
        },
        productSP: {
        type: Number, // Selling price
        required: true,
        },
        varieties: {
            colors: {
                type: [String], // Array of strings for colors
                required: true,
            },
            sizes: {
                type: [String], // Array of strings for sizes
                required: true,
            },
        },
        productFAQs: {
        type: [String], // Array of strings for FAQs
        required: false,
        },
        productDetails: {
        material: {
            type: String,
            required: false,
        },
        origin: {
            type: String,
            required: false,
        },
        fabric: {
            type: String,
            required: false,
        },
        
        },
    },
    orderInfo:{
        orderDate: {
            type: Date,
            required: true,
            },
            shippingDate: {
            type: Date,
            required: true,
            },
            deliveryDate: {
                type: Date,
                required: true,
            },
            orderStatus: {
            type: String,
            enum: ["pending","shipped","delivered"],
            required: true,
            },
            quantity: {
            type: Number,
            required: true,
            min: 1,
            },
            totalPrice: {
            type: Number,
            required: true,
            },
            shippingAddress: {
            type: String,
            required: true,
            },
    }
});

const Order = models.Order || model('Order', OrderSchema);

export default Order;