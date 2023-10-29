import UserManager from "../dao/mongoDB/UserManager.js";
import * as UsersServices from "../services/users.services.js"

const userManager = new UserManager();

export const GETUsers = async (req, res) => {

    await UsersServices.GetAllUsers();
};

export const POSTLogin = async (req, res) => {

    console.log(req.body);
    
    const user = await userManager.validateUser(req.body.username, req.body.password);
    if(!user) return res.send({error: true});

    const token = generateToken({sub: user._id, user: {email: user.username}});

    res.cookie("accessToken", token, {
        maxAge: (24*60*60)*1000,
        httpOnly: true
    });
    res.send({ error: false, accessToken: token });
};

export const GETSessionCurrent = async (req, res) => {

    res.send({ error: false, user: req.user });  
};