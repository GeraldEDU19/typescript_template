import { hashPassword, comparePassword } from '../src/services/bcryptService';
import testLogger from '../src/config/testLogger';

jest.mock('../src/config/logger', () => ({
    info: jest.fn(),
    error: jest.fn(),
}));

describe('Bcrypt Service', () => {
    testLogger.info("Testing Bcrypt Service...")

    it('Should hash a password', async () => {
        const password = 'securepassword';

        try {
            const hashedPassword = await hashPassword(password);
            expect(hashedPassword).not.toBe(password);

            // Log success
            testLogger.info('Password hashed successfully.');
        } catch (error) {
            // Log error
            testLogger.error(`Failed to hash password`);
            throw error;  // Rethrow the error so Jest detects the failure
        }
    });

    it('Should compare passwords successfully', async () => {
        const password = 'securepassword';

        try {
            const hashedPassword = await hashPassword(password);
            const isMatch = await comparePassword(password, hashedPassword);
            expect(isMatch).toBe(true);

            // Log success
            testLogger.info('Passwords compared successfully.');
        } catch (error) {
            // Log error
            testLogger.error(`Failed to compare passwords`);
            throw error;  // Rethrow the error so Jest detects the failure
        }
    });

    it('Should fail to compare with wrong password', async () => {
        const password = 'securepassword';

        try {
            const hashedPassword = await hashPassword(password);
            const isMatch = await comparePassword('wrongpassword', hashedPassword);
            expect(isMatch).toBe(false);

            // Log success
            testLogger.info('Password comparison failed as expected with wrong password.');
        } catch (error) {
            // Log error
            testLogger.error(`Unexpected failure during password comparison`);
            throw error;  // Rethrow the error so Jest detects the failure
        }
    });
});
