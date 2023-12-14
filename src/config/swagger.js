import __dirname from "./dirname.js";

const options = {
    definition: {
        openapi: "3.0.1",
        info: {
            title: "BackEnd-Proyect",
            description: "API of Proyect"
        }
    },
    apis: [__dirname+"/docs/*.yaml"]
}

export default options;