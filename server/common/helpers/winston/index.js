import winston from 'winston';
import fs from 'fs';

if (!fs.existsSync('./logs')) {
  fs.mkdirSync('./logs');
}

const { createLogger, format, transports } = winston;
const { combine, timestamp, printf } = format;

const myFormat = printf(info => `${info.timestamp} ${info.level}: ${info.message}`);


const logger = createLogger({
  format: combine(
    timestamp(),
    winston.format.json(),
    myFormat,
  ),
  transports: [
    new transports.File({ filename: 'logs/combined.log' }),
  ],
});

export default logger;
