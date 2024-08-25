import logger from '../config/logger';

// A simple sum function with logging
export const sum = (a: number, b: number): number => {
  const result = a + b;
  logger.info(`Sum called with a=${a}, b=${b}, result=${result}`);
  return result;
};


// Test logging