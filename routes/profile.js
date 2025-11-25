import { Router } from "express";
import {Profile, getProfile} from "../controllers/Profile.controller.js";
import { authenticateJWT } from "../middlewares/AuthMiddleware.js";

const profile = Router();



profile.get("/",authenticateJWT, Profile);
profile.get("/:id",authenticateJWT, getProfile);

export default profile;