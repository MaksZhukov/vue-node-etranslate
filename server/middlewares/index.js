import url from 'url';
import userService from '../bll/services/user';
import logger from '../common/helpers/winston';

const checkAuth = (req, res, next) => {
    let verify;
    try {
        const { authorization } = req.headers;
        const accessToken = authorization.split(' ')[1];
        verify = userService.verifyAccessToken(accessToken);
        req.verify = { email: verify.email, id: verify.id };
    } catch (error) {
        logger.warn(error);
        res.status(401);
    }
    next();
};

const storeRedirectToInSession = (req, res, next) => {
    const { protocol, host, ...rest } = url.parse(req.get('referer'));
    console.log({ protocol, host, ...rest });
    req.session.redirectTo = `${protocol}//${host}`;
    next();
};

export { storeRedirectToInSession, checkAuth };
