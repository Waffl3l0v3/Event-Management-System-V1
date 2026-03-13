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
      enum: ["draft", "upcoming", "completed", "cancelled"],
      default:"upcoming"
    },
    organizer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    coverImg: {
      type: String,
      default: "",
    },
    price: {
      type: Number,
      default: 0,
    },
    registeredCount: {
      type: Number,
      default: 0,
    },
    comments: [
      {
        // mongoose automatically creates _id for every subdocument
        // commentId: {
        //   type: mongoose.Schema.Types.ObjectId,
        //   default: () => new mongoose.Types.ObjectId(),
        // },
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
          },
        ],
      },
    ],
    
    // category: {
    //   type: String
    // },

    // tags: [String],
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

// find upcoming events sorted by date
eventSchema.index({ status: 1, date: 1 });

// // MongoDB text search
// eventSchema.index({ title: "text", description: "text" });

const Event = new mongoose.model("Event", eventSchema);
export default Event;
