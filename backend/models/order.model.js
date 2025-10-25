const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    orderNumber: {
        type: String,
        required: true,
        unique: true
    },
    orderItems: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true,
            },
            productName: { type: String, required: true },
            unitPrice: { type: Number, required: true },
            taxRate: { type: Number, required: true },
            taxType: { type: String, required: true },
            mainImage: { type: String, required: true },
            taxAmount: { type: Number, required: true },
            quantity: { type: Number, required: true },
            total: { type: Number, required: true },
        },
    ],
    grandTotal: {
        type: Number,
        required: true
    },
    shippingAddress: {
        fullName: { type: String },
        phone: { type: String },
        fullAddress: { type: String },
        city: { type: String },
        state: { type: String },
        pincode: { type: String },
        company: { type: String },
        gstNo: { type: String },
        altContact: { type: String }
    },
    paymentMethod: {
        type: String,
        default: "COD"
    },
    trackingId: {
        type: String,
    },
    trackingUrl: {
        type: String,
    },
    cancellationReason: {
        type: String,
    },
    shippingPrice: {
        type: Number,
        default: 0.0,
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'dispatched', 'delivered', 'canceled'],
        default: 'pending',
    }
}, { timestamps: true });

const OrderModel = mongoose.model('Order', orderSchema);

module.exports = OrderModel;