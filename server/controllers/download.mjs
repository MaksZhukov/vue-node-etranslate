import path from 'path';
import app from '../app';

app.get('/api/download/:file', (req, res) => {
    const filename = req.params.file;
    const file = path.resolve(`${process.cwd()}/server/public`, filename);
    res.download(file);
});
