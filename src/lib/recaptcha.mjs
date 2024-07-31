import axios from 'axios';

/**
 * Verifies a reCAPTCHA token by sending a request to Google's reCAPTCHA API.
 * The function uses the reCAPTCHA secret key specific to the website (identified by the `website` parameter)
 * from environment variables. It constructs a request to Google's reCAPTCHA API with the secret key and the token
 * provided by the client. The response from Google's API is then returned to the caller.
 *
 * @param {string} token - The reCAPTCHA token generated on the client side to be verified.
 * @param {string} website - The identifier for the website, used to select the correct reCAPTCHA secret key from environment variables.
 * @returns {Promise<Object>} A promise that resolves with the response from Google's reCAPTCHA API, indicating the verification result.
 */
export default async function getRecaptcha(token, website) {
  let recaptcha = await axios.post(
    `https://www.google.com/recaptcha/api/siteverify?secret=${
      process.env[`RECAPTCHA_SECRET_${website}`]
    }&response=${token}`
  );

  recaptcha = recaptcha.data;
  return recaptcha;
}
