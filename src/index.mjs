// app starts
import express from 'express';
import cors from 'cors';
import compression from 'compression';
import nocache from 'nocache';
import helmet from 'helmet';
import dotenv from 'dotenv';

import router from './router.mjs';
import logResponseTime from './lib/logResponseTime.mjs';
import connectDB from './DB/connect.mjs';
import logger from './lib/logger.mjs';

dotenv.config({
  path: `./.env.${process.env.NODE_ENV}`,
});

// Validate required environment variables
if (!process.env.ALLOWED_URLS) {
  logger.error('Required environment variables are missing');
  process.exit(1); // Exit application if configuration is invalid
}

const app = express();

// connect to DB
connectDB();

app.use(nocache());
app.use(compression()); // Use compression middleware
app.use(helmet()); // Use helmet for security
// body parser
app.use(express.json());
// enable cors
app.use(
  cors({
    origin: '*',
  }),
);

app.use(logResponseTime);

app.use(router());

// start server on desired port
app.listen(process.env.PORT, () => {
  logger.info(`Server started at :${process.env.PORT}`);
});
