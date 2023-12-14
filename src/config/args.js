import { Command } from "commander";

const args = new Command();

args.option("--mode <mode>", "mode of excution", "prod")

args.parse();

console.log(args.opts()); 
const argsOpts = args.opts()

export default argsOpts;