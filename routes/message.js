import {Router} from "express";
import { getMessages, sendMessage } from "../controllers/Message.controller.js";


const message = Router();

message.get("/:recipient_id", getMessages);
message.post("/send",sendMessage)


export default message;