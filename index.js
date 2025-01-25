import Logger from "./logger/logger.js";
import { APP_ENV } from "./config.js";

const logger  = new Logger()

function triggerError() {
    try {
        throw new TypeError("Both arguments must be numbers.")
    } catch (error) {
        logger.error(error);
    }
}

triggerError();

logger.info("Info message")
logger.warning("Warning message")
logger.error("Error message")

console.log({
    APP_ENV: APP_ENV
})
