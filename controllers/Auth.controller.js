import User from "../models/User.js"
import {setAuthCookie} from "../middlewares/AuthMiddleware.js"
import bcrypt from "bcryptjs";
import { InternalServerError } from "../error/error.js";



export async function login(Request,Response,Next) {
  console.log("POST /api/auth/login")
    const {email, password} = Request.body;

    try {
        const user = await User.findOne({email});

        if(user) {
            if(await bcrypt.compare(password, user.password)){
                await setAuthCookie(Response,user._id);
                return Response.status(200).json({username:user.username, fullName: user.fullName, friends: user.fullName, photoURL: 1})
            }
        }
        else {
            return Response.status(404).json({message: "Invalid Credentials!"});
        }
    } catch (error) {
        InternalServerError(Response,error)
    }
}

export const register = async (Request , Response) => {
    const {fullName, email, password, photoURL} = Request.body;
    try {
        if(!fullName || !email || !password || !photoURL) {
            Response.status(401).json({message: "Incomplete params!"});
        }else {
            const salt = await bcrypt.genSalt(salt);
            const hashedPassword = await bcrypt.hash(password, salt);
            const user = new User({fullName,email,password:hashedPassword,photoURL});
            await user.save();
            await setAuthCookie(Response, user._id );
            Response.status(201).json({fullName:user.fullName, email:user.email,photoURL:photoURL, friends:user.friends, posts: user.posts, createdAt:user.createdAt});
        }
    } catch (error) {
        InternalServerError(Response,error);
    }

}