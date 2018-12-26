import config from 'config';
import jwt from 'jsonwebtoken';
import logger from '../../common/helpers/winston';
import { encrypt } from '../../common/helpers/crypto';
import transporter from '../../common/helpers/mail';
import UserModel from '../../models/user';

const {
  server: { jwt: jwtConfig, origin, port: portServer },
  client: { port: portClient },
} = config;

class UserService {
  async find(data) {
    try {
      const user = await UserModel.findOne({ where: data });
      if (user) {
        return user;
      }
      return null;
    } catch (err) {
      logger.error(err);
      return { error: true };
    }
  }

  async update(updateData, searchData) {
    try {
      const count = await UserModel.update(updateData, { where: searchData });
      if (count) {
        return count;
      }
      return null;
    } catch (err) {
      logger.error(err);
      return { error: true };
    }
  }

  async create(email, password) {
    try {
      return await UserModel.create({ email, password: encrypt(password) });
    } catch (err) {
      logger.error(err);
      return { error: true };
    }
  }

  async createWithProvider(email, provider) {
    try {
      return await UserModel.create({ email, provider, active: true });
    } catch (err) {
      logger.error(err);
      return { error: true };
    }
  }

  async sendMail(options) {
    try {
      return await transporter.sendMail(options);
    } catch (err) {
      logger.error(err);
      return { error: true };
    }
  }

  createLinkVerify(payload) {
    jwt.invalidate();
    const verifyEmailToken = jwt.sign(payload, jwtConfig.verifyEmailTokenSecret,
      { expiresIn: jwtConfig.verifyEmailTokenLife });
    return `<a href="${origin}:${portServer}/api/verify-email/${verifyEmailToken}">verify your email</a>`;
  }

  createLinkRecover(payload) {
    const recoverPasswordToken = jwt.sign(payload, jwtConfig.recoverPasswordTokenSecret,
      { expiresIn: jwtConfig.recoverPasswordTokenLife });
    return `<a href="${origin}:${portClient}/recover/${recoverPasswordToken}">link for recover</a>`;
  }

  getTokensAndExpiresIn(payload) {
    const accessToken = jwt.sign(payload, jwtConfig.accessTokenSecret,
      { expiresIn: jwtConfig.accessTokenLife });
    const { exp: expiresIn } = jwt.verify(accessToken, jwtConfig.accessTokenSecret,
      { expiresIn: jwtConfig.accessTokenLife });
    const refreshToken = jwt.sign(payload, jwtConfig.refreshTokenSecret,
      { expiresIn: jwtConfig.refreshTokenLife });
    return {
      accessToken,
      refreshToken,
      expiresIn,
    };
  }

  verifyAccessToken(token) {
    return jwt.verify(token, jwtConfig.accessTokenSecret,
      { expiresIn: jwtConfig.accessTokenLife });
  }

  verifyRefreshToken(token) {
    return jwt.verify(token, jwtConfig.refreshTokenSecret,
      { expiresIn: jwtConfig.refreshTokenLife });
  }

  verifyEmailToken(token) {
    return jwt.verify(token, jwtConfig.verifyEmailTokenSecret,
      { expiresIn: jwtConfig.verifyEmailTokenLife });
  }

  verifyRecoverToken(token) {
    return jwt.verify(token, jwtConfig.recoverPasswordTokenSecret,
      { expiresIn: jwtConfig.recoverPasswordTokenLife });
  }
}

export default new UserService();
