import bcrypt from 'bcrypt';
import logger from '../config/logger';

const saltRounds = parseInt(process.env.SALT_ROUNDS as string, 10);
const saltString = process.env.SALT_STRING as string;  // Retrieve the salt string from environment variables

// Hash a password using both salt rounds and a custom salt string
export const hashPassword = async (password: string): Promise<string> => {
    logger.info("Hashing Password")
    const salt = await bcrypt.genSalt(saltRounds);  // Generate the salt with the specified rounds
    const hashedPassword = await bcrypt.hash(password + saltString, salt);  // Hash the password with the salt string
    return hashedPassword;
};

// Compare a plain text password with a hashed password, using the salt string for comparison
export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
    logger.info("Comparing Password")
    const isMatch = await bcrypt.compare(password + saltString, hashedPassword);  // Compare the password and hash
    return isMatch;
};
