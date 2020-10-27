import config from 'config';
import multer from 'multer';
import app from '../app';
import speechService from '../bll/services/speech';
import { checkAuth } from '../middlewares';

const upload = multer({ dest: 'uploads/' });

const {
    server: { apiResponses },
} = config;

app.post('/api/speech', checkAuth, upload.any(), async (req, res) => {
    console.log(req.body);
    console.log(req.files);
    const response = await speechService.speechToText({ speech: req.files[0] });
    if (response.error) {
        res.json(apiResponses.problemTranslate);
    } else {
        res.json(response);
    }
});
