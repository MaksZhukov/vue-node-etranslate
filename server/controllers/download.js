import path from 'path';
import app from '../app';
import { checkAuth } from '../middlewares';

app.get('/api/download/:file', checkAuth, (req, res) => {
    const filename = req.params.file;
    const file = path.resolve(`${process.cwd()}/server/public`, filename);
    res.download(file);
});
