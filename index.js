import Logger from "./logger/logger.js";

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
