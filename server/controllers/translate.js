import config from 'config';
import app from '../app';
import translateService from '../bll/services/translate';
import user from '../bll/services/user';
import { checkAuth } from '../middlewares';

const {
    server: { apiResponses },
} = config;

app.get('/api/translate', checkAuth, async (req, res) => {
    const { textLang, translateLang, text } = req.query;
    const resTranslate = await translateService.translate({
        textLang,
        translateLang,
        text,
    });
    if (resTranslate.error) {
        res.json(apiResponses.problemTranslate);
    } else {
        res.json(resTranslate);
    }
});

app.get('/api/extension-translate', async (req, res) => {
    const { key, textLang, translateLang, text } = req.query;
    const resFind = await user.find({ id: key });
    if (resFind && resFind.id) {
        const resTranslate = await translateService.translate({
            textLang,
            translateLang,
            text,
        });
        if (resTranslate.error) {
            res.json(apiResponses.problemTranslate);
        } else {
            res.json(resTranslate);
        }
    } else {
        res.json(apiResponses.userNotFound);
    }
});
