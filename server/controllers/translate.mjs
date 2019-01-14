import config from 'config';
import app from '../app';
import translateService from '../bll/services/translate';
import { checkAuth } from '../middlewares';

const { server: { apiResponses } } = config;

app.get('/api/translate', checkAuth, async (req, res) => {
  const { from, to, text } = req.query;
  const resTranslate = await translateService.translate({ from, to, text });
  if (resTranslate.error) {
    res.json(apiResponses.problemTranslate);
  } else {
    res.json(resTranslate);
  }
});
