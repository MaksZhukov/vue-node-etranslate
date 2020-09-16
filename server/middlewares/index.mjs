import userService from '../bll/services/user';
import logger from '../common/helpers/winston';

const checkAuth = (req, res, next) => {
  let verify;
  try {
    const { authorization } = req.headers;
    console.log(authorization);
    const accessToken = authorization.split(' ')[1];
    verify = userService.verifyAccessToken(accessToken);
    console.log(verify);
    req.verify = { email: verify.email, id: verify.id };
  } catch (error) {
    logger.warn(error);
    res.status(401);
  }
  next();
};

export {
  // eslint-disable-next-line import/prefer-default-export
  checkAuth,
};
