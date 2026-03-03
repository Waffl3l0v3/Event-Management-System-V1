import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users",
            required:true
        },
        event_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "event",
            required:true
        },
        amount: {
            type: Number,
            required:true
        },
        status: {
            type: String,
            enum: ["pending", "success", "failed"],
            default: "pending"
        },
        transactionId: {
            type: String,
            required:true
        }
    },
    {
        timestamps:true   //automatically adds createdAt, updatedAt
    }

);

const payment = new mongoose.model("Payment", paymentSchema)
export default payment