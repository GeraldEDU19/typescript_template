import winston from 'winston';
import path from 'path';

const logPath = path.join(__dirname, '../../../logs/mongoose.log');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: logPath })  // Use absolute path
  ]
});

export default logger;
