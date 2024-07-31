/* eslint-disable no-console */
import { CloudWatchLogsClient } from '@aws-sdk/client-cloudwatch-logs';
import winston from 'winston';
import WinstonCloudWatch from 'winston-cloudwatch';
import moment from 'moment';

import { API_LOG_NAME, ENV } from '../app/constants.mjs';

const cloudWatchLogsClient = new CloudWatchLogsClient({
  region: process.env.AWS_REGION
});

const loggerInstance = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
    winston.format.colorize()
  ),
  transports: [new winston.transports.Console()]
});

if (process.env.NODE_ENV !== ENV.DEV) {
  const currentDate = moment().format('YYYY-MM-DD');
  const cloudWatchTransport = new WinstonCloudWatch({
    logGroupName: API_LOG_NAME,
    logStreamName: `${process.env.NODE_ENV}-${currentDate}`,
    cloudWatchLogs: cloudWatchLogsClient,
    errorHandler: err => {
      console.error('CloudWatch Logging Error:', err);
    }
  });
  loggerInstance.add(cloudWatchTransport);
}

const logger = {
  info: message => {
    if (process.env.NODE_ENV !== ENV.DEV) {
      loggerInstance.info(message);
    } else {
      console.log(message);
    }
  },
  error: error => {
    if (process.env.NODE_ENV !== ENV.DEV) {
      loggerInstance.error(error.message);
    } else {
      console.log(error);
    }
  }
};

export default logger;
