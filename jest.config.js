module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',        // Use Node.js environment for testing
  testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'] // Match test files with .test.ts or .spec.ts extensions
};
