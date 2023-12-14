import { createLogger, format, transports, addColors } from "winston";

const { simple, colorize } = format;

const levels = {
    HTTP: 5,
    INFO: 5,
    WARN: 3,
    ERROR: 2,
    FATAL: 1,
};

const colors = {
    HTTP: "blue",
    INFO: "green",
    WARN: "yellow",
    ERROR: "red",
    FATAL: "magenta",
};

addColors(colors);

export default createLogger({
    levels: levels,
    format: colorize(),
    transports: [
        new transports.Console({
            level: "HTTP",
            format: simple()
        }),
    ]
});