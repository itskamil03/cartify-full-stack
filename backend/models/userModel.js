import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    items: { type: Array, required: true },
    amount: { type: Number, required: true },
    status: { type: String, default: "Order Placed" },

    // ✅ Return / Exchange / Refund
    returnRequest: {
        type: {
            type: String, // return | exchange | refund
            default: null
        },
        status: {
            type: String, // pending | approved | rejected
            default: null
        },
        reason: {
            type: String,
            default: ""
        }
    }

}, { timestamps: true });

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    cartData: { type: Object, default: {} },

    // ✅ Wishlist
    wishlist: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "product",
        default: []
    },

    // ✅ Orders with return system
    orders: [orderSchema]

}, { minimize: false });

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;