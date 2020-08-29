import winston from 'winston';
import config from '../../../config';
const { combine, colorize, json, prettyPrint, timestamp, simple } = winston.format;
const setupFormat = combine(json(), prettyPrint());

const logger = winston.createLogger({
    level: config.loggingLevel,
    format: setupFormat,
    transports: [new winston.transports.File({ filename: 'combined.log', format: combine(timestamp(), setupFormat) })],
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(
        new winston.transports.Console({
            format: combine(colorize(), simple()),
        }),
    );
}

export default logger;
