import config from 'config';
import app from '../app';
import passport from '../common/helpers/passport';
import logger from '../common/helpers/winston';
import userService from '../bll/services/user';
import { checkAuth, storeRedirectToInSession } from '../middlewares';
import { encrypt } from '../common/helpers/crypto';

const {
    server: {
        apiResponses,
        mail: { messages: emailMessages },
    },
    client: { origin: originClient },
} = config;

app.post('/api/sign-up', async (req, res) => {
    const { email, password } = req.body;
    const resFind = await userService.find({ email });
    if (resFind && resFind.id) {
        res.json(apiResponses.userExists);
    } else if (resFind && resFind.error) {
        res.json(apiResponses.problemDatabase);
    } else {
        const verifyEmailLink = userService.createLinkVerify({ email });
        const resSendMail = await userService.sendMail({
            from: emailMessages.from,
            to: email,
            subject: emailMessages.subjects.confirmEmail,
            html: verifyEmailLink,
        });
        if (resSendMail.error) {
            res.json(apiResponses.problemMailer);
        } else {
            const resCreate = await userService.create(email, password);
            if (resCreate && resCreate.error) {
                res.json(apiResponses.problemDatabase);
            } else {
                res.json(apiResponses.createUser);
            }
        }
    }
});

app.get('/api/verify-email/:verifyToken', async (req, res) => {
    const {
        params: { verifyToken },
    } = req;
    try {
        const { email } = await userService.verifyEmailToken(verifyToken);
        const resFind = await userService.find({ email });
        if (resFind && resFind.id && !resFind.active) {
            await userService.update({ active: true }, { email });
        }
    } catch (err) {
        logger.error(err);
    }
    res.redirect(`${originClient}/sign-in`);
});

app.post('/api/sign-in', async (req, res) => {
    const { email, password } = req.body;
    const resFind = await userService.find({
        email,
        password: encrypt(password),
    });
    if (resFind && resFind.id) {
        if (resFind.active) {
            const {
                accessToken,
                refreshToken,
                expiresIn,
            } = userService.getTokensAndExpiresIn({ email, id: resFind.id });
            const resUpdate = await userService.update(
                { refreshToken, isRecover: false },
                { email }
            );
            if (resUpdate.error) {
                res.json(apiResponses.problemDatabase);
            } else {
                res.json({
                    ...apiResponses.userSignIn,
                    accessToken,
                    refreshToken,
                    expiresIn,
                    email,
                    access: true,
                    id: resFind.id,
                });
            }
        } else {
            res.json(apiResponses.emailNoVerify);
        }
    } else if (resFind && resFind.error) {
        res.json(apiResponses.problemDatabase);
    } else {
        res.json(apiResponses.userNotFound);
    }
});

app.get(
    '/api/auth/google',
    storeRedirectToInSession,
    passport.authenticate('google', { scope: ['email'] })
);

app.get(
    '/api/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/sign-in' }),
    async (req, res) => {
        const { email, id } = req.user;
        const host = req.session.redirectTo;
        const {
            accessToken,
            refreshToken,
            expiresIn,
        } = userService.getTokensAndExpiresIn({ email, id });
        await userService.update({ refreshToken }, { email });
        res.redirect(
            `${host}/?accessToken=${accessToken}&expiresIn=${expiresIn}&refreshToken=${refreshToken}`
        );
    }
);

app.get(
    '/api/auth/yandex',
    storeRedirectToInSession,
    passport.authenticate('yandex')
);

app.get(
    '/api/auth/yandex/callback',
    passport.authenticate('yandex', { failureRedirect: '/sign-in' }),
    async (req, res) => {
        const { email, id } = req.user;
        const host = req.session.redirectTo;
        const {
            accessToken,
            refreshToken,
            expiresIn,
        } = userService.getTokensAndExpiresIn({ email, id });
        await userService.update({ refreshToken }, { email });

        res.redirect(
            `${host}/?accessToken=${accessToken}&expiresIn=${expiresIn}&refreshToken=${refreshToken}`
        );
    }
);

app.post('/api/check-token', checkAuth, (req, res) => {
    res.json(req.verify);
});

app.post('/api/update-tokens', async (req, res) => {
    const { authorization } = req.headers;
    const refreshToken = authorization.split(' ')[1];
    try {
        const { email, id } = userService.verifyRefreshToken(refreshToken);
        const resFind = await userService.find({ refreshToken });
        if (resFind && resFind.id) {
            const {
                accessToken: newAccessToken,
                refreshToken: newRefreshToken,
                expiresIn,
            } = userService.getTokensAndExpiresIn({ email, id });
            await userService.update(
                { refreshToken: newRefreshToken },
                { email }
            );
            res.json({
                expiresIn,
                accessToken: newAccessToken,
                refreshToken: newRefreshToken,
            });
        } else {
            res.status(404).end();
        }
    } catch (error) {
        logger.warn(error);
        res.status(401).end();
    }
});

app.post('/api/email-for-recover', async (req, res) => {
    const { email } = req.body;
    const recoverEmailLink = userService.createLinkRecover({ email });
    const resFind = await userService.find({ email });
    if (resFind && resFind.error) {
        res.json(apiResponses.problemDatabase);
    } else if (!resFind) {
        res.json(apiResponses.userNotFound);
    } else if (resFind && !resFind.isRecover) {
        if (!resFind.provider) {
            const resSendMail = await userService.sendMail({
                from: emailMessages.from,
                to: email,
                subject: emailMessages.subjects.recoverPassword,
                html: recoverEmailLink,
            });
            if (resSendMail.error) {
                res.json(apiResponses.problemMailer);
            } else {
                const resUpdate = userService.update(
                    {
                        isRecover: true,
                        recoverUpdatedAt: new Date(),
                    },
                    { email }
                );
                if (resUpdate.error) {
                    res.json(apiResponses.problemDatabase);
                } else {
                    res.json(apiResponses.recoverPasswordEmail);
                }
            }
        } else {
            res.json({
                ...apiResponses.sentRecoverProvider,
                message: `${apiResponses.sentRecoverProvider.message} ${resFind.provider}`,
            });
        }
    } else if (resFind && resFind.isRecover) {
        res.json(apiResponses.sentRecoverMessage);
    }
});

app.post('/api/check-recover-token', async (req, res) => {
    const { authorization } = req.headers;
    const recoverToken = authorization.split(' ')[1];
    try {
        userService.verifyRecoverToken(recoverToken);
        res.end();
    } catch (error) {
        logger.warn(error);
        res.status(401).end();
    }
});

app.post('/api/change-password', async (req, res) => {
    const { authorization } = req.headers;
    const { password } = req.body;
    const recoverToken = authorization.split(' ')[1];
    try {
        const { email } = userService.verifyRecoverToken(recoverToken);
        const resFind = await userService.find({ email });
        if (resFind && resFind.id) {
            const resUpdate = await userService.update(
                {
                    password: encrypt(password),
                    isRecover: false,
                },
                { email }
            );
            if (resUpdate.error) {
                res.json(apiResponses.problemDatabase);
            } else {
                res.json(apiResponses.changePassword);
            }
        }
    } catch (error) {
        logger.warn(error);
        res.json(apiResponses.expireRecoverToken);
    }
});

app.post('/api/get-extension-key', async (req, res) => {
    try {
        const { email } = req.body;
        const resFind = await userService.find({ email });
        if (resFind && resFind.id) {
            res.json({ access: true, id: resFind.id });
        } else {
            res.json(apiResponses.userNotFound);
        }
    } catch (error) {
        logger.warn(error);
        res.status(401);
    }
});
