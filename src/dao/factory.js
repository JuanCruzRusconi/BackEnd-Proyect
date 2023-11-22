import config from "../config/index.js"

let usersFactoryDao;
switch(config.persistence) {

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