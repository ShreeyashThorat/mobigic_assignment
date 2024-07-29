import { createLogger, transports, format } from "winston";
import path from "path";

const logger = createLogger({
    level: "info",
    transports: [
        new transports.Console(),
        new transports.File({
            filename: path.join("./logger", "info-logs.log"),
            level: "info",
            format: format.combine(format.timestamp(), format.json()),
        }),
        new transports.File({
            filename: path.join("./logger", "error-logs.log"),
            level: "error",
            format: format.combine(format.timestamp(), format.json()),
        }),
    ],
});

export default logger;