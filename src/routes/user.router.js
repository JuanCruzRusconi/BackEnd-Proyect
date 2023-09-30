import { Router } from "express";
import UserManager from "../dao/mongoDB/UserManager.js";
import { JWTCookieMW, JWTMW, generateToken } from "../utils/jwt.js";
import passport from "passport";
import passportMW from "../utils/jwt.middleware.js";

const userApiRouter = Router();

const userManager = new UserManager();

userApiRouter.post("/login", async (req, res) => {

    console.log(req.body);
    
    const user = await userManager.validateUser(req.body.username, req.body.password);
    if(!user) return res.send({error: true});

    const token = generateToken({sub: user._id, user: {email: user.username}});

    res.cookie("accessToken", token, {
        maxAge: (24*60*60)*1000,
        httpOnly: true
    });
    res.send({ error: false, accessToken: token });
});

userApiRouter.get("/profile", passportMW("jwt"), async (req, res) => {

    res.send({ error: false, user: req.user });  
});

export default userApiRouter;