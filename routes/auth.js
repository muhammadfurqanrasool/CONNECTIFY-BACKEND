import { Router } from "express";
import { login,register } from "../controllers/Auth.controller.js";
// import { upload } from "../middlewares/multer.js";
const auth = Router();


auth.post("/login", login);
auth.post("/register", register);

export default auth;