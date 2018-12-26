import nodemailer from 'nodemailer';
// import googleapis from 'googleapis';
import config from 'config';

// const { google: { auth: { OAuth2 } } } = googleapis;

const { server: { mail: configMail } } = config;

// const oauth2Client = new OAuth2(
//   configMail.auth.clientId,
//   configMail.auth.clientSecret, // Client Secret
//   'https://developers.google.com/oauthplayground', // Redirect URL
// );

// oauth2Client.setCredentials({
//   refresh_token: configMail.auth.refreshToken,
// });

// async function setss() {
//   console.log(await oauth2Client.refreshAccessToken());
// }

// setss();

const transporter = nodemailer.createTransport(configMail);

export default transporter;
