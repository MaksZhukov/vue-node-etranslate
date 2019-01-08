import config from 'config';
import app from '../app';
import dictionaryService from '../bll/services/dictionary';
import { checkAuth } from '../middlewares';

const { server: { apiResponses } } = config;

app.post('/api/get-dictionary', checkAuth, async (req, res) => {
  const { from, to, text } = req.body;
  const [resGetDictionary, resGetDictionaryFromLang] = await Promise.all([
    dictionaryService.get({ text, lang: `${from}-${to}` }),
    dictionaryService.get({ text, lang: `${from}-${from}` }),
  ]);
  if (resGetDictionary.error) {
    res.json(apiResponses.problemWithTranslate);
  } else {
    res.json({ dictionary: resGetDictionary, dictionaryFromLang: resGetDictionaryFromLang });
  }
});
