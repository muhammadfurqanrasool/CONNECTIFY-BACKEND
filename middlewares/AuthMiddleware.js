import jwt from "jsonwebtoken";


const JWTTOKEN = 'authToken';
const SECRET_KEY = process.env.SECRET_KEY || "";

export const authenticateJWT = (Request, Response, Next) => {
    const token = Request.cookies[JWTTOKEN];
    if (!token) {
        return Response.status(401).json({ message: 'Access denied. No token provided.' });
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET)._id;
        Request.body.user_id = decoded; 
        console.log("decoded : ", decoded);
        Next(); 

    } catch (error) {
        console.error('JWT verification failed:', error.message);
        clearAuthCookie(Response);
        return Response.status(401).json({ message: 'Invalid or expired token.' });
    }
};

export async function clearAuthCookie(Response) {
    Response.cookies(JWTTOKEN, '', {
        httpOnly:true,
        secure:true,
        samesite:'lax',
        expires: new Date(0)
    })
}

export async function setAuthCookie(Response,payload){
    const token = jwt.sign({payload},SECRET_KEY, {
        expiresIn: '7d'
    });

    Response.cookies(JWTTOKEN, token , {
        httpOnly:true,
        secure:true,
        samesite: 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7d
        }); 
}