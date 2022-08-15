import express from "express";
import { signOut, signIn, signInGoogle, signUp } from "../controllers/Auth.js";

const authRoutes = express.Router();

////////Sign up
authRoutes.post("/signUp", signUp);

/////sign in
authRoutes.post("/signin", signIn);

authRoutes.get("/signout", signOut);

//////SIGN IN WITH GOOGLE

authRoutes.post("/googlesignin", signInGoogle);

export default authRoutes;
