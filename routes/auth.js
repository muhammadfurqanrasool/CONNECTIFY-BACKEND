import { Router } from "express";
import { login,register,logout } from "../controllers/Auth.controller.js";
// import { upload } from "../middlewares/multer.js";
const auth = Router();


auth.post("/login", login);
auth.post("/register", register);
auth.get("/logout", logout);

export default auth;