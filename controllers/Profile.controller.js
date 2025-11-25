import User from "../models/User.js";

export async function Profile(Request,Response) {
    console.log("GET /api/profile")
    const{user_id} = Request;

    try {
        const user = await User.findById(user_id, {fullName:1, email:1, photoURL:1, friends:1, posts:1, createdAt:1})
        if(user) {
            return Response.status(200).json(user);
        }
    } catch (error) {
        
    }
}
export async function getProfile(Request,Response) {

}