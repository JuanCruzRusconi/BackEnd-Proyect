import { Command } from "commander";
import dotenv from "dotenv";

const program = new Command();

program.option("--mode <mode>", "mode of excution", "local");
program.parse();

const options = program.opts();

console.log(options)

dotenv.config({
    path: options.mode == "production" ? "./.env.production" : "./.env",
});

console.log(process.env.PORT);