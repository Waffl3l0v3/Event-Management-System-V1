import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    event_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "success", "failed"],
      default: "pending",
    },
    transactionId: {
      type: String,
      required: true,
      index:true, // Useful for payment verification.
    },
    // paymentGateway: {
    //   type: String,
    //   enum: ["razorpay", "stripe"],
    // },

    // currency: {
    //   type: String,
    //   default: "INR",
    // },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const Payment = new mongoose.model("Payment", paymentSchema);
export default Payment;
