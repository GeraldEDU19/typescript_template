import mongoose, { Document, Schema } from 'mongoose';
import { IUser } from '../interfaces/userInterface';  // Import the generic interface

// Define the Mongoose-specific interface extending from mongoose.Document
export interface IUserDocument extends IUser, Document {}

// Define the Mongoose schema
const UserSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: { type: String, required: true }
}, { timestamps: true });

// Create and export the Mongoose user model
const User = mongoose.model<IUserDocument>('User', UserSchema);

export default User;
