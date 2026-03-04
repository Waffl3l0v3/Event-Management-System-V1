import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        // user_id: {
        //     type: Number,
        //     required: true,
        //     unique: true,
        // },
        //user id is not needed whenever a document is created, mongodb creates user._id which can be used
        //there is no auto increment in mongodb!!!
        name: {
            type: String,
            required:true
        },
        username: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        contact: {
            type: String,
            default:""
        },
        coverImg: {
            type:String,
            default:""
        }
    },
    {
        timestamps: true,
        versionKey: false
    },
);

//mongoose.model(ModelName, Schema)
//users is just a javascript variable name which is used to interact with mongodb later on
//User is converted to users which is the collection name 
//user is just the blueprint(structure of the document)
const user = mongoose.model("User", userSchema)
export default user;