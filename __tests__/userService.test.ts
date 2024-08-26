import { createUser, findUserByEmail } from '../src/services/userService';
import testLogger from '../src/config/loggers/testLogger';
import User from '../src/models/userModel';

jest.mock('../src/config/loggers/logger', () => ({
    info: jest.fn(),
    error: jest.fn(),
}));

describe('User Service', () => {
    beforeAll(() => {
        testLogger.info("Starting tests for User Service...");
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('Should handle user creation correctly', async () => {
        const mockUserData = { email: 'test@example.com', password: 'securepassword' };


        try {
            const user = await createUser(mockUserData);

            expect(user.email).toBe('test@example.com');
    
            expect(typeof user.password).toBe('string');
            expect(user.password).not.toBe('securepassword');

        } catch (error) {
            if (error instanceof Error) {
                testLogger.error(`Failed to create a user`);
            } else {
                testLogger.error('Unexpected error during user creating.');
            }
            throw error;  // Rethrow the error so Jest marks the test as failed
        }


        
    });

    it('Should find a user by email', async () => {
        const mockUserData = { email: 'test@example.com', password: 'securepassword' };
    
        try {
            const user = await findUserByEmail('test@example.com');

            expect(user?.email).toBe(mockUserData.email);
            expect(typeof user?.password).toBe('string');
    
            testLogger.info('User found successfully.');
        } catch (error) {
            if (error instanceof Error) {
                testLogger.error(`Failed to find user by email: ${error.message}`);
            } else {
                testLogger.error('Unexpected error during user lookup.');
            }
            throw error;
        }
    });
    

    it('Should return null if user is not found', async () => {
        try {

            const user = await findUserByEmail('nonexistent@example.com');

            expect(user).toBeNull();

            // Log success
            testLogger.info('No user found, as expected.');
        } catch (error) {
            if (error instanceof Error) {
                testLogger.error(`Unexpected failure during user lookup: ${error.message}`);
            } else {
                testLogger.error('Unexpected error type during user lookup.');
            }
            throw error;  // Rethrow the error so Jest marks the test as failed
        }
    });

    it('Should handle errors during user creation', async () => {
        const mockUserData = { email: 'test@example.com', password: 'securepassword' };
    
        try {
          // Mock the `save` method to throw an error
          User.prototype.save = jest.fn().mockRejectedValue(new Error('Save failed'));
    
          await createUser(mockUserData);  // This should throw an error
    
          // If the error is not thrown, fail the test
          throw new Error('Expected error was not thrown');
        } catch (error) {
          if (error instanceof Error) {
            expect(error.message).toBe('Save failed');
            expect(User.prototype.save).toHaveBeenCalledTimes(1);  // Ensure `save` was called
          }
        }
      });
});
