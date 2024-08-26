import mongoose from 'mongoose';
import mongooseLogger from './loggers/mongooseLogger';

// Connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI as string);
        mongooseLogger.info('MongoDB connected successfully');
    } catch (error) {
        mongooseLogger.error('Error connecting to MongoDB:', error);
        process.exit(1);  // Exit the process if the connection fails
    }
};

// Disconnect from MongoDB
const disconnectDB = async () => {
    try {
        await mongoose.disconnect();
        mongooseLogger.info('MongoDB disconnected successfully');
    } catch (error) {
        mongooseLogger.error('Error disconnecting from MongoDB:', error);
    }
};

export { connectDB, disconnectDB };
