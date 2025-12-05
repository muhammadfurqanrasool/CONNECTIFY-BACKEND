import {Router} from "express";
import { getMessages, sendMessage } from "../controllers/Message.controller.js";
import { authenticateJWT } from "../middlewares/AuthMiddleware.js";


const message = Router();

message.get("/:recipient_id",authenticateJWT, getMessages);
message.post("/send",authenticateJWT,sendMessage)


export default message;