import User from "../models/User.js"
import {clearAuthCookie, setAuthCookie} from "../middlewares/AuthMiddleware.js"
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
    console.log("POST /api/auth/register")
    const {fullName, email, password, photoURL} = Request.body;
    try {
        const data = await User.findOne({email});

        if(!data) {

            
            if(!fullName || !email || !password || !photoURL) {
                Response.status(401).json({message: "Incomplete params!"});
            }else {
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(password, salt);
                const user = await User.create({fullName,email,password:hashedPassword,photoURL});
                await setAuthCookie(Response, user._id );
                Response.status(201).json({fullName:user.fullName, email:user.email,photoURL:photoURL, friends:user.friends, posts: user.posts, createdAt:user.createdAt});
            }
        }
        else {
            console.log("User already exists!");
            return Response.status(400).json({message: "Email already exists!"})
        }
    } catch (error) {
        InternalServerError(Response,error);
        console.log(error)
    }

}

export async function logout(Request,Response) {
    console.log("GET /api/auth/logout")
    await clearAuthCookie(Response);
    Response.status(200).json({message: "Logged Out successfully!"})
}