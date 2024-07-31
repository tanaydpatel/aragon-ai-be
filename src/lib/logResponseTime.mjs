import logger from './logger.mjs';

/**
 * Middleware function to log the response time of requests.
 * It measures the time from when a request is received until the response is finished sending.
 * The response time is logged along with the HTTP method, request URL, and status code.
 * If the response time exceeds a predefined threshold (e.g., 1200ms), it logs a warning indicating a slow response.
 *
 * @param {Object} req - The request object provided by Express.
 * @param {Object} res - The response object provided by Express.
 * @param {Function} next - The next middleware function in the stack.
 */
export default function logResponseTime(req, res, next) {
  const startHrTime = process.hrtime();
  res.on('finish', () => {
    const elapsedHrTime = process.hrtime(startHrTime);
    const elapsedTimeInMs = (elapsedHrTime[0] * 1e9 + elapsedHrTime[1]) / 1e6; // Improved readability
    const logMessage = `${req.method} ${req.originalUrl} ${res.statusCode} : ${elapsedTimeInMs.toFixed(2)}ms`;

    // Log based on response time
    if (elapsedTimeInMs > 1200) {
      // Example threshold, adjust based on needs
      logger.warn(`Slow response: ${logMessage}`);
    } else {
      logger.info(logMessage);
    }
  });
  next();
}
