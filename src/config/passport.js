import passport from "passport";
import local from "passport-local";
import GitHubStrategy from "passport-github2";
import UserManager from "../dao/mongoDB/UserManager.js";
import jwt from "passport-jwt";
import cookieExtractor from "../utils/cookieJWT.js";
import { SECRET } from "../utils/jwt.js";

const userManager = new UserManager();

local.Strategy; 

const JWTStrategy = jwt.Strategy;

const InitLocalStrategy = () => {

    passport.use("login", new local.Strategy({
        passReqToCallback: true
    }, async (req, username, password, done) => {

        //const { username, password } = req.body;
        const user = await userManager.validateUser(username, password);
        if(!user) return done(null, false);

        return done(null, user);
    }));
    
    passport.use("register", new local.Strategy({
        passReqToCallback: true
    }, async (req, username, password, done) => {

        const userExists = await userManager.getUserByUsername(username);
        if (userExists) return done(null, false);

        const { name, surname } = req.body;

        const user = await userManager.createUser({
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
        const user = await userManager.getUserById(payload.sub);
        if(!user) return done("Credenciales invalidas");

        return done(null, user);
    }));

    passport.use("github", new GitHubStrategy ({
        clientID: "Iv1.691c49ed935c2683",
        clientSecret: "394518bf0992c95fc9e6ba589074642450660520",
        callbackURL: "http://localhost:8080/api/auth/callback"
    }, async (accessToken, refreshToken, profile, done) => {

        console.log(profile);
        const username = profile._json.login;
        const userExists = await userManager.getUserByUsername(username);
        if(userExists) return done(null, user);

        const user = await userManager.createUser({
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
            const user = await userManager.getUserById(id);
            done(null, user);
        } catch (e) {
            done(null, false);
        }
    });
}

export default InitLocalStrategy;
