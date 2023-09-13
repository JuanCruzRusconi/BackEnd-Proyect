import passport from "passport";
import local from "passport-local";
import GitHubStrategy from "passport-github2";
import UserManager from "../dao/mongoDB/UserManager.js";

const userManager = new UserManager();

local.Strategy; 

const InitLocalStrategy = () => {

    passport.use("login", new local.Strategy({
        passReqToCallback: true
    }, async (req, username, password, done) => {

        //const { username, password } = req.body;
        const user = await userManager.validateUser(username, password);
        if(!user) return done("Credenciales inexistentes.");

        return done(null, user);
    }));
    
    passport.use("register", new local.Strategy({
        passReqToCallback: true
    }, async (req, username, password, done) => {

        const userExists = await userManager.getUserByUsername(username);
        if (userExists) return done("Usuario existente.");

        const { name, surname } = req.body;

        const user = await userManager.createUser({
            name: name,
            surname: surname,
            username: username,
            password: password,
            role: username === "admincoder@coder.com" ? "admin" : "user"
        });

        return done(null, user.toObject());
    }));

    passport.use("github", new GitHubStrategy ({
        clientID: "Iv1.691c49ed935c2683",
        clientSecret: "394518bf0992c95fc9e6ba589074642450660520",
        callbackURL: "http://localhost:8081/api/auth/callback"
    }, async (accessToken, refreshToken, profile, done) => {

        console.log(profile);
        const username = profile._json.login;
        const user = await userManager.getUserByUsername(username);
        if(user) return done(null, user);

        const createUser = await userManager.createUser({
            name: profile._json.name.split(" ")[0],
            surname: profile._json.name.split(" ")[2],
            username,
            password: "",
            role: username === "admincoder@coder.com" ? "admin" : "user"
        });

        done(null, createUser);
    }));

    passport.serializeUser((user, done) => {

        done(null, user.username);
    });

    passport.deserializeUser(async (username, done) => {

        try {
            const user = await userManager.getUserByUsername(username);
            done(null, user);
        } catch (e) {
            done(null, false);
        }
    });
}

export default InitLocalStrategy;
