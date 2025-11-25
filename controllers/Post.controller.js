import Post from "../models/Post.js";

export async function createPost(Request, Response) {
    const {user_id, captions, photoURL} = Request.body;

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
        
    }
}
export async function getPosts(Request, Response) {

}