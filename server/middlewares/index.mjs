import userService from '../bll/services/user';
import logger from '../common/helpers/winston';

const checkAuth = (req, res, next) => {
  let verify;
  try {
    const { authorization } = req.headers;
    const accessToken = authorization.split(' ')[1];
    verify = userService.verifyAccessToken(accessToken);
    req.verify = { email: verify.email, access: true };
  } catch (error) {
    logger.warn(error);
    req.verify = { access: false };
  }
  next();
};

export {
  checkAuth,
};
