import config from 'config';
import app from '../app';
import translateService from '../bll/services/translate';
import { checkAuth } from '../middlewares';

const { server: { apiResponses } } = config;

app.post('/api/translate', checkAuth, async (req, res) => {
  const resTranslate = await translateService.translateText(req.body);
  if (resTranslate.error) {
    res.json(apiResponses.problemWithTranslate);
  } else {
    res.json(resTranslate);
  }
});
