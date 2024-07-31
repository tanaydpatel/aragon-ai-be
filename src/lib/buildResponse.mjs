import logger from './logger.mjs';

/**
 * Generates a success response object.
 * @param {Object} data - The response data.
 * @param {number} [statusCode=200] - The HTTP status code.
 * @returns {{statusCode: number, body: {success: boolean, data: Object, message: string}}}
 */
const success = (data, statusCode = 200) => ({
  statusCode,
  body: {
    success: true,
    data,
    message: 'Request successful'
  }
});

/**
 * Generates a failure response object.
 * @param {Error} error - The error object.
 * @param {number} [statusCode=500] - The HTTP status code.
 * @returns {{statusCode: number, body: {success: boolean, msg: string, error: string}}}
 */
const failure = (error, statusCode = 500) => {
  logger.info(error, 'error');
  return {
    statusCode,
    body: {
      success: false,
      message: 'Something went wrong',
      error: error?.message || 'Unknown error'
    }
  };
};

const buildResponse = { success, failure };
export default buildResponse;
