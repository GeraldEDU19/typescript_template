import { IUser } from '../interfaces/userInterface';
import User from '../models/userModel';

import { hashPassword } from './bcryptService';

// Create a new user
export const createUser = async (userData: IUser): Promise<IUser> => {

  // Hash the user's password before saving
  const hashedPassword = await hashPassword(userData.password);
  userData.password = hashedPassword;
  // Create a new user instance and save it
  const user = new User(userData);
  await user.save();  // Save the user using the `save` method


  if (!user) throw new Error("Save failed");

  return user;
};

// Find a user by email
export const findUserByEmail = async (email: string): Promise<IUser | null> => {
  const user = await User.findOne({ email });
  return user;
};
