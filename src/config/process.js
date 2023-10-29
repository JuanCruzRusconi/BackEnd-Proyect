import { Command } from "commander";

console.log(process.argv);

const program = new Command();

program.option("-p <port>", "Port to init app", 8080)
       .option("-env <env>", "env for app", "development")

program.parse();

console.log(program.opts()); 