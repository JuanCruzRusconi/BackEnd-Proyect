import { Command } from "commander";
import dotenv from "dotenv";
import args from "./args.js";

const mode = args.mode;

const envRouts = (mode === "dev") ? ("./.env.dev") : ("./.env.prod");

dotenv.config({
    path: envRouts,
});

export default {
    MODE: process.env.MODE,
    PORT: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI
}