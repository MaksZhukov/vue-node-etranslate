import passport from 'passport';
import passportGoogle from 'passport-google-oauth';
import passportYandex from 'passport-yandex';
import config from 'config';
import userService from '../../../bll/services/user';

const {
    server: {
        passport: { google: googleConfig, yandex: yandexConfig },
        origin,
    },
} = config;
const { OAuth2Strategy: GoogleStrategy } = passportGoogle;
const { Strategy: YandexStrategy } = passportYandex;

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

passport.use(
    new GoogleStrategy(
        {
            clientID: googleConfig.clientID,
            clientSecret: googleConfig.clientSecret,
            callbackURL: `${origin}/api/auth/google/callback`,
        },
        async (accessToken, refreshToken, profile, done) => {
            const {
                emails: [{ value: email }],
                provider,
            } = profile;
            const resFind = await userService.find({ email });
            if (!resFind) {
                const resCreate = await userService.createWithProvider(
                    email,
                    provider
                );
                done(null, resCreate);
            } else {
                done(null, resFind);
            }
        }
    )
);

passport.use(
    new YandexStrategy(
        {
            clientID: yandexConfig.clientID,
            clientSecret: yandexConfig.clientSecret,
            callbackURL: `${origin}/api/auth/yandex/callback`,
        },
        async (accessToken, refreshToken, profile, done) => {
            const {
                emails: [{ value: email }],
                provider,
            } = profile;
            const resFind = await userService.find({ email });
            if (!resFind) {
                const resCreate = await userService.createWithProvider(
                    email,
                    provider
                );
                done(null, resCreate);
            } else {
                done(null, resFind);
            }
        }
    )
);

export default passport;
