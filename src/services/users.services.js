import UserManager from "../dao/mongoDB/UserManager.js";

const UserDao = new UserManager();

export const GetAllUsers = async () => {

    try {
        const users = await UserDao.getUsers();
        return users;
      } catch (e) {
        return [];
      }
};
/*
export const GetUserById = async (id) => {

    try {
        const user = await userModel.findById(id);
        return user;
    } catch {

    }
};

GetUserByUsername = async (username) => {

    try {
        const user = await userModel.findOne({username});
        return user;
    } catch {

    }
};

UpdateUser = async () => {

    const user = await userModel.findOne({ username });
    user.user.avatar = profile_picture;
    await user.save();
    const userObject = user.toObject();
    const userJSON = user.toJSON();
    const products = await model.find({});
    res.render("index", { prod: products });
};

// ------- crypto ------- // 
createUser2 = async (user) => {

    const { nombre, apellido, username, passwor } = user;
    user.salt = crypto.randomBytes(128).toString("base64");
    user.password = crypto
        .createHmac("sha256", user.salt)
        .update(user.password)
        .digest("hex");
    const createUser = await userModel.create([user]);
    return createUser;
};

validateUser = async (username, password) => {

    const user = await userModel.findOne({ username });
    if (!user) return "Error, usuario no existe!";

    const loginHash = crypto
        .createHmac("sha256", user.salt)
        .update(password)
        .digest("hex");

    return loginHash == user.password ?
        user.toObject() :
        false;
};*/
/*
// ------- bcrypt ------- // 
CreateUser = async (user) => {
    
    const { nombre, apellido, username, password } = user;
    user.salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, user.salt);
    const newUser = await userModel.create(user);
    return newUser;
};

ValidateUser = async (username, password) => {

    const validateUser = await userModel.findOne({ username });
    if(!validateUser) return false;
    const passw = await bcrypt.compare(password, validateUser.password);
    return passw ? validateUser.toObject() : false;
};
*/