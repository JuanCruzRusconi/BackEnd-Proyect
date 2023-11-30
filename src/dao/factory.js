import config from "../config/index.js"
import args from "../config/args.js";
import env from "../config/env.js";

let usersFactoryDao;

switch(args.mode) {

    case "MONGO":
        const { default: usersManagerMongo} = await import("./mongoDB/UserManager.js");
        usersFactoryDao = usersManagerMongo;
        break;

    case "MEM":
        const { default: usersManagerMem } = await import("./fileSystem/");
        usersFactoryDao = usersManagerMem;
        break; 
}

//export default class 