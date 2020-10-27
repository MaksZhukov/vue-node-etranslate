import config from 'config';
import fs from 'fs';
import multer from 'multer';
import app from '../app';
import speechService from '../bll/services/speech';
import { checkAuth } from '../middlewares';

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename(req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}.mp3`);
    },
});

const upload = multer({ storage });

const {
    server: { apiResponses },
} = config;

app.post('/api/speech', checkAuth, upload.single('file'), async (req, res) => {
    const response = await speechService.speechToText({ speech: req.file });
    if (response.error) {
        res.json(apiResponses.problemTranslate);
    } else {
        res.json(response);
    }
    fs.unlink(req.file.path, () => {});
});
