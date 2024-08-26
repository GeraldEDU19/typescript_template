import winston from 'winston';
import path from 'path';

const logPath = path.join(__dirname, '../../../logs/combined.log');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: logPath })  // Use absolute path
  ]
});

export default logger;
