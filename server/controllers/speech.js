import config from 'config';
import app from '../app';
import speechService from '../bll/services/speech';
import { checkAuth } from '../middlewares';

const {
    server: { apiResponses },
} = config;

app.post('/api/speech', checkAuth, async (req, res) => {
    const { speech } = req.body;
    const response = await speechService.speechToText({ speech });
    if (response.error) {
        res.json(apiResponses.problemTranslate);
    } else {
        res.json(response);
    }
});
