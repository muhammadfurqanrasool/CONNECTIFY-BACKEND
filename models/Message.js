import {Schema,model} from "mongoose";

const MessageSchema = new Schema({
    
    user: {
        type:Schema.Types.ObjectId,
        ref: "User",
        required:true,
    },
    content : {
        type:String,
        required: true,
        min:1
    },
    recipient: {
        type:Schema.Types.ObjectId,
        ref: "User",
        required:true,
    }

}, {timestamps:true});

const Message = model("Message", MessageSchema);

export default Message;

