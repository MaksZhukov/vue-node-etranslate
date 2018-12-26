import passport from 'passport';
import passportGoogle from 'passport-google-oauth';
import config from 'config';
import userService from '../../../bll/services/user';


const { server: { passport: { google: googleConfig }, origin, port } } = config;
const { OAuth2Strategy: GoogleStrategy } = passportGoogle;

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(new GoogleStrategy({
  clientID: googleConfig.clientID,
  clientSecret: googleConfig.clientSecret,
  callbackURL: `${origin}:${port}/api/auth/google/callback`,
},
(async (accessToken, refreshToken, profile, done) => {
  const { emails: [{ value: email }], provider } = profile;
  const resFind = await userService.find({ email });
  if (!resFind) {
    const resCreate = await userService.createWithProvider(email, provider);
    done(null, resCreate);
  }
  done(null, resFind);
})));

export default passport;
