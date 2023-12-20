import fs from "fs/promises";

export default class UsersFS {

    constructor () {
        this.users = [];
    }
    
    #id = 0;

    getUsers = async (next) => {
        
        try {
            const file = await fs.readFile("./src/users.json", "utf-8");
            this.users = JSON.parse(file);
            return this.users;
        } catch (error) {
            error.from = "UsersFileSystem";
            return next(error);
        }
    };

    createUser = async (user, next) => {

        const { username } = user;
        try {
            const file = await fs.readFile("./src/users.json", "utf-8");
            const users = JSON.parse(file);
            const inUse = this.users.some((user) => user.username === username);
            if (inUse) {
                console.log(`ERROR: Username in use.`);
                return;
            };
            const newUser = {
                //id: this.#id++,
                id: users[users.length -1].id + 1,
                ...user,
            }
            users.push(newUser);
            await fs.writeFile("./src/users.json", JSON.stringify(users));
            return newUser;  
        } catch (error) {
            error.from = "UsersFileSystem";
            return next(error);
        }
    };

    getUserById = async (user, next) => {
        
        try {
            const file = await fs.readFile("./src/users.json", "utf-8");
            this.users = JSON.parse(file);
            const userById = this.users.find((user) => user.id === userId);
            if(!userById) return "Not Found";
            return userById;
        } catch (error) {
            error.from = "UsersFileSystem";
            return next(error);
        }
    };

    updateUser = async (id, user, next) => {
        
        try {
            const file = await fs.readFile("./src/users.json", "utf-8");
            this.users = JSON.parse(file);
            let userFound = this.users.find((user) => user.id === id);
            if(!userFound){
                return `No se ha encontrado el puser con id: ${id}`;
            }
            let update = this.users.map((user) => {
                if(user.id === id){
                    return {...user, ...user};
                }
                return user;
            });
            await fs.writeFile("./src/users.json", JSON.stringify(update, null, 2));
            return userFound;
        } catch (error) {
            error.from = "UsersFileSystem";
            return next(error);
        }
    };

    deleteUser =  async (id, next) => {
        
        try {
            const file = await fs.readFile("./src/users.json", "utf-8");
            this.users = JSON.parse(file);
            let userFound = this.users.find((user) => user.id === id);
            if(!userFound){
                return `No se ha encontrado el usuario con id: ${id}`;
            };
            let deleteUser = this.users.filter((user) => user.id !== id)
            await fs.writeFile("./src/users.json", JSON.stringify(deleteUser, null, 2));
            console.log("PF:", userFound)
        } catch (error) {
            error.from = "UsersFileSystem";
            return next(error);
        }
    };
}