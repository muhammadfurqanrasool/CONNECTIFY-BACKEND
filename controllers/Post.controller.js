import { InternalServerError } from "../error/error.js";
import Post from "../models/Post.js";

export async function createPost(Request, Response) {
    const { captions, photoURL} = Request.body;
    const {user_id} = Request;

    if(!user_id || !captions) {
        return Response.status(403).json({message: "Incomplete params"});
    }
    try {
        const post = new Post({
            user:user_id,
            captions,
            photoURL : photoURL? photoURL : ""
        });
        await post.save();
        return Response.status(200).json(post);
    } catch (error) {
       InternalServerError(Response,error); 
    }
}
export async function getPosts(Request, Response) {
    const {user_id} = Request;

    try {
        const posts = await Post.find({user: user_id});
        return Response.status(200).json(posts);
    } catch (error) {
        InternalServerError(Response,error);
    }
}