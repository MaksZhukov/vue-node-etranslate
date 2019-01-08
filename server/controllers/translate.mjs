import config from 'config';
import app from '../app';
import translateService from '../bll/services/translate';
import { checkAuth } from '../middlewares';

const { server: { apiResponses } } = config;

app.post('/api/translate', checkAuth, async (req, res) => {
  const { from, to, text } = req.body;
  const resTranslate = await translateService.translate({ from, to, text });
  if (resTranslate.error) {
    res.json(apiResponses.problemWithTranslate);
  } else {
    res.json(resTranslate);
  }
});
