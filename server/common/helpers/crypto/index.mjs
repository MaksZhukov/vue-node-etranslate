import crypto from 'crypto';
import config from 'config';

const { server: { crypto: cryptoConfig } } = config;


function encrypt(data) {
  const cipher = crypto.createCipher(cryptoConfig.algorithm, cryptoConfig.secret);
  let encrypted = cipher.update(data, cryptoConfig.inputEncoding, cryptoConfig.outputEncoding);
  encrypted += cipher.final(cryptoConfig.outputEncoding);
  return encrypted;
}

function decrypt(data) {
  const decipher = crypto.createDecipher(cryptoConfig.algorithm, cryptoConfig.secret);
  let decrypted = decipher.update(data, cryptoConfig.outputEncoding, cryptoConfig.inputEncoding);
  decrypted += decipher.final(cryptoConfig.inputEncoding);
  return decrypted;
}


export { decrypt, encrypt };
