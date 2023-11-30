import { Command } from "commander";
import env from "./env.js"

const args = new Command();

args.option("--mode <mode>", "mode of excution", "dev")
       .option("--port <port>", "Port to init app", 7000)

args.parse();

console.log(args.opts()); 
const argsOpts = args.opts()

export default argsOpts;