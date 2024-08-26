module.exports = {
  preset: 'ts-jest',                       // Use ts-jest for TypeScript testing
  testEnvironment: 'node',                 // Use Node.js environment for testing
  testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'], // Match test files with .test.ts or .spec.ts extensions
  setupFilesAfterEnv: ['<rootDir>/__tests__/setup.ts'], // Include the setup file for database connection and cleaning
};
