import { InternalServerError } from "../error/error";
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
    const { content, recipient_id } = Request.body;
    const {user_id} = Request;
    try {
        content = content?.trim();
        if(!content || !user_id || !recipient_id) {
            return Response.status(403).json({message: "Incomplete params!"});
        }
        const message = new Message({user_id, content, recipient_id});
        await message.save();
        Response.status(201).json(message);
    } catch (error) {
        InternalServerError(Response,error);
    }
}