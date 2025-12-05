import { InternalServerError } from "../error/error.js";
import Message from "../models/Message.js";
export async function getMessages(Request,Response) {
    const {recipient_id} = Request.params;
    const {user_id} = Request;
    try {
        const conversationQuery = {
            $or: [
                { $and: [{ user:user_id }, { recipient: recipient_id }] },
                { $and: [{ user: recipient_id }, { recipient: user_id }] }
            ]
        };
        const messages = await Message.find(conversationQuery).populate("user", "fullName photoURL").populate("recipient","fullName photoURL").sort({timestamps:1});
        if(messages.length > 0) {
            return Response.status(200).json(messages);
        }
    } catch (error) {
        InternalServerError(Response,error);
    }
}
export async function sendMessage(Request, Response) {
    console.log("POST /api/message/send")
    const { content, recipient_id } = Request.body;
    const {user_id} = Request;
    try {
        let newContent = content?.trim();
        console.log(newContent, user_id, recipient_id)
        if(!content || !user_id || !recipient_id) {
            return Response.status(403).json({message: "Incomplete params!"});
        }
        const message = new Message({user:user_id, content:newContent, recipient:recipient_id});
        await message.save();
        Response.status(201).json(message);
    } catch (error) {
        console.log(error)
        InternalServerError(Response,error);
    }
}