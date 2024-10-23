import mongoose, { Document, Schema } from 'mongoose';

interface ICoupon extends Document {
    code: string;
    discountType: 'fixed' | 'percentage';  // Restricts to 'fixed' or 'percentage'
    discountValue: number;
    expirationDate?: Date;  // Optional expiration date
    minPurchaseAmount?: number;  // Optional minimum purchase amount
    maxDiscountAmount?: number;  // Optional max discount for percentage-based coupons
    usageLimit?: number;  // Number of times a coupon can be used
    usedCount?: number;  // Tracks the count of coupon usages
    userSpecific?: boolean;  // Indicates if the coupon is user-specific
}

const couponSchema = new Schema<ICoupon>({
    code: { type: String, required: true, minlength:8, maxlength: 8 },
    discountType: { type: String, enum: ['fixed', 'percentage'], required: true },
    discountValue: { type: Number, required: true },
    expirationDate: { type: Date },  // Optional field
    minPurchaseAmount: { type: Number },  // Optional field
    maxDiscountAmount: { type: Number },  // Optional field, for percentage-based coupons
    usageLimit: { type: Number, default: 1 },  // Defaults to 1 use
    usedCount: { type: Number, default: 0 },  // Tracks the number of times a coupon has been used
    userSpecific: { type: Boolean, default: false }  // Whether this coupon is exclusive to a specific user
});

const Coupon = mongoose.models.Coupon || mongoose.model<ICoupon>('Coupon', couponSchema);

export default Coupon;
