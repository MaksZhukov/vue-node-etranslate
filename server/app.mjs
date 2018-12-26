import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import config from 'config';
import passport from './common/helpers/passport';

import scheduleService from './bll/services/schedule';


const { server: serverConf } = config;


const app = express();


app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static('dist'));
app.use(helmet());
app.use(passport.initialize());
app.use(passport.session());
app.disable('x-powered-by');

app.listen(serverConf.port, () => {
  console.log(`app listening at port ${serverConf.port}`);
  scheduleService.startSchedule();
});

export default app;
