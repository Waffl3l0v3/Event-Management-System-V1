import mongoose, { Mongoose } from "mongoose";

const eventSchema = new mongoose.Schema(
    {
        // event_id: {
        //     type: Number,
        //     required:true
        // }
        title: {
            type: String,
            required:true
        },
        description: {
            type: String,
            required:true
        },
        date: {
            type: Date,
            required:true
        },
        location: {
            type: String,
            required:true
        },
        capacity: {
            type: Number,
            required:true
        },
        status: {
            type: String,
            enum: ["upcoming", "completed"],
            
        },
        organiser: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required:true
        },
        coverimg: {
            type: String,
        }

    },
    {
        timestamps: true,
        versionKey: false
    },
);

const Event = new mongoose.model("Event", eventSchema);
export default Event;