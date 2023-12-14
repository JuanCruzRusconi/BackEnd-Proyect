import passport from "passport";
import local from "passport-local";
import GitHubStrategy from "passport-github2";
import jwt from "passport-jwt";
import cookieExtractor from "../utils/cookieJWT.js";
import { SECRET } from "../utils/jwt.js";
import UsersServices from "../services/users.services.js";

const UserService = new UsersServices();

local.Strategy; 

const JWTStrategy = jwt.Strategy;

const InitLocalStrategy = () => {

    passport.use("login", new local.Strategy({
        passReqToCallback: true
    }, async (req, username, password, done) => {

        //const { username, password } = req.body;
        const user = await UserService.ValidateUser(username, password);
        if(!user) return done(null, false);

        return done(null, user);
    }));
    
    passport.use("register", new local.Strategy({
        passReqToCallback: true
    }, async (req, username, password, done) => {

        const userExists = await UserService.GetUserByUsername(username);
        if (userExists) return done(null, false);

        const { name, surname } = req.body;

        const user = await UserService.CreateUser({
            name: name,
            surname: surname,
            username: username,
            password: password,
            role: username === "admincoder@coder.com" ? "admin" : "user"
        });

        return done(null, user);
    }));

    passport.use("jwt", new JWTStrategy({
        jwtFromRequest: jwt.ExtractJwt.fromExtractors([cookieExtractor]),
        secretOrKey: SECRET, 
    }, async (payload, done) => {
        console.log(payload);
        const user = await UserService.GetUserById(payload.sub);
        if(!user) throw new Error("Credenciales invalidas");

        return done(null, user);
    }));

    passport.use("github", new GitHubStrategy ({
        clientID: "Iv1.691c49ed935c2683",
        clientSecret: "6053bffa7b319f898e2c3e00b7655733331cdd1a",
        callbackURL: `http://localhost:9000/users/auth/callback`
    }, async (accessToken, refreshToken, profile, done) => {

        console.log(profile);
        const username = profile._json.login;
        const userExists = await UserService.GetUserByUsername(username);
        if(userExists) return done(null, user);

        const user = await UserService.CreateUser({
            name: profile._json.name.split(" ")[0],
            surname: profile._json.name.split(" ")[2],
            username,
            password: "",
            role: username === "admincoder@coder.com" ? "admin" : "user"
        });

        done(null, user);
    }));

    passport.serializeUser((user, done) => {
        try {
        console.log(user)
        done(null, user._id);
        } catch (e) {
            console.log(e)
        }
    });

    passport.deserializeUser(async (id, done) => {

        try {
            const user = await UserService.GetUserById(id);
            done(null, user);
        } catch (e) {
            done(null, false);
        }
    });
}

export default InitLocalStrategy;
