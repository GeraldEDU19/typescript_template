import winston from 'winston';
import path from 'path';

// Test logger configuration
const testLogger = winston.createLogger({
  level: 'debug',  // Log level for tests
  format: winston.format.combine(
    winston.format.timestamp(),  // Add timestamps to logs
    winston.format.json()        // Log format in JSON
  ),
  transports: [
    new winston.transports.File({ filename: path.join(__dirname, '../../logs/test.log') })  // Log to file for tests
  ]
});

export default testLogger;
