import config from 'config';
import app from '../app';
import dictionaryService from '../bll/services/dictionary';
import { checkAuth } from '../middlewares';

const { server: { apiResponses } } = config;

app.get('/api/get-dictionary', checkAuth, async (req, res) => {
  const { textLang, translateLang, text } = req.query;
  const [resGetDictionaryTranslateLang, resGetDictionaryTextLang] = await Promise.all([
    dictionaryService.get({ text, lang: `${textLang}-${translateLang}` }),
    dictionaryService.get({ text, lang: `${textLang}-${textLang}` }),
  ]);
  if (resGetDictionaryTranslateLang.error) {
    res.json(apiResponses.problemDictionary);
  } else {
    res.json({
      dictionaryTranslateLang: resGetDictionaryTranslateLang,
      dictionaryTextLang: resGetDictionaryTextLang,
    });
  }
});
