import mongoose, { Mongoose } from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    // event_id: {
    //     type: Number,
    //     required:true
    // }
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    capacity: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["draft","upcoming","completed","cancelled"],
    },
    organiser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    coverImg: {
      type: String,
    },
    price: {
      type: Number,
      default: 0,
    },

    registeredCount: {
      type: Number,
      default: 0,
    },

    // category: {
    //   type: String
    // },

    // tags: [String],
    comments: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        text: {
          type: String,
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
        // likes: {
          // type: Number,
          // default: 0,
        // },
        likes: [
          {
         type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        }
      ],
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const Event = new mongoose.model("Event", eventSchema);
export default Event;
