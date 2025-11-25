import {Schema, model} from "mongoose";


const UserSchema = new Schema({
    fullName: {
        required: true, 
        unique: false,
        type:String,
    },
     email: {
        required: true, 
        unique: true,
        type:String,
    },
    password: {
        type:String,
        required:true
    },
    friends : {
        type: [Schema.Types.ObjectId],
        ref: "User",
        default: [],
        required: false,

    },
    photoURL: {
        type: String,
        default: ""
    },
    posts: {
        type: [Schema.Types.ObjectId],
        ref: "Post",
        required: false,
        default : []
    },

}, {timestamps: true});

const User = model("User", UserSchema);
export default  User;
