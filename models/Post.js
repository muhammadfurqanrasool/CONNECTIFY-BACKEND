import {Schema, model} from "mongoose";


const PostSchema = new Schema({
    user : {
        _id: {
        type:Schema.Types.ObjectId,
        ref: "User",
        required:true,
    },
    fullName: {
        required: true, 
        unique: false,
        type:String,
    },
    },
    captions: {
        type:String,
        required:false,
        default: ""

    },
    photoURL: {
        type:String,
        required: false,
        default: ""
    },
    

}, {timestamps: true});

const Post = model("Post", PostSchema);
export default  Post;
