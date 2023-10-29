import config from "../config/index.js"

let usersManager;
switch(config.persistence) {

    case "MONGO":
        const { default: usersManagerMongo} = await import("./mongoDB/UserManager.js");
        usersManager = usersManagerMongo;
        break;

    case "MEM":
        const { default: usersManagerMem } = await import("./fileSystem/");
        usersManager = usersManagerMem;
        break; 
}

//export default class 