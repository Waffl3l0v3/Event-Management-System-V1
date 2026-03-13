import mongoose from "mongoose";

const registrationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    paymentId: {
      // type: mongoose.Schema.Types.ObjectId,
      // ref: "Payment",
      type:String,
      required: true,
    },
    payment_status: {
      type: String,
      enum: ["pending", "success", "failed"],
      default: "pending",
    },
    status: {
      type: String,
      enum: ["registered", "waitlisted"],
      default: "registered",
    },
    registered_at: {
      type: Date,
      default: Date.now, //whenever object is created that time is taken
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

// prevents same user registering twice
registrationSchema.index(
  { user_id: 1, event_id: 1 },
  { unique: true }
);

// show events user registered for
registrationSchema.index({ user_id: 1 });

const Registration = new mongoose.model("Registration", registrationSchema);
export default Registration;
