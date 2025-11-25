import {Router} from "express";
import { createPost } from "../controllers/Post.controller";
import { authenticateJWT } from "../middlewares/AuthMiddleware";

const post = Router();

post.post("/create",authenticateJWT, createPost);
post.get("/",authenticateJWT ,getPosts);
// post.get("/:id")