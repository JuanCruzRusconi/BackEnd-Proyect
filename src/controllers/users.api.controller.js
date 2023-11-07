import * as UsersServices from "../services/users.services.js"

export const GETUsers = async (req, res) => {

    await UsersServices.GetAllUsers();
};

export const POSTLogin = async (req, res) => {

    console.log(req.body);
    
    const user = await UsersServices.ValidateUser(req.body.username, req.body.password);
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