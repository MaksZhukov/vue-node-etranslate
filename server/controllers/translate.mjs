import config from 'config';
import app from '../app';
import translateService from '../bll/services/translate';
import { checkAuth } from '../middlewares';

const { server: { apiResponses } } = config;

app.get('/api/translate', checkAuth, async (req, res) => {
  const { textLang, translateLang, text } = req.query;
  const resTranslate = await translateService.translate({ textLang, translateLang, text });
  if (resTranslate.error) {
    res.json(apiResponses.problemTranslate);
  } else {
    res.json(resTranslate);
  }
});
