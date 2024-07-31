import mongoose from 'mongoose';
import logger from '../lib/logger.mjs';

/**
 * Establishes a connection to the MongoDB database using mongoose.
 * The connection parameters are read from the environment variable `DATABASE`.
 * It configures the mongoose connection with specific options such as `useNewUrlParser`,
 * `useUnifiedTopology`, `minPoolSize`, and `maxPoolSize`.
 *
 * If the connection is lost, it attempts to reconnect automatically.
 */
const connectDB = () => {
  mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    minPoolSize: 10,
    maxPoolSize: 350
  });
};

mongoose.connection.on('disconnected', () => {
  // send an alert to ADMIN
  logger.info('-> DB disconnected!');
  connectDB();
});

mongoose.connection.on('connected', () => {
  logger.info('-> DB connected');
});

export default connectDB;
