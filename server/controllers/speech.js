import config from 'config';
import multer from 'multer';
import app from '../app';
import speechService from '../bll/services/speech';
import translateService from '../bll/services/translate';
import { checkAuth } from '../middlewares';

const storage = multer.memoryStorage();

const upload = multer({ storage });

const {
    server: { apiResponses },
} = config;

app.post('/api/speech', checkAuth, upload.single('file'), async (req, res) => {
    console.log(req.file);
    const response = await speechService.speechToText({
        speech: req.file.buffer,
    });
    console.log(response);
    if (response.error) {
        res.json(apiResponses.problemTranslate);
    } else {
        res.json(response);
    }
});
