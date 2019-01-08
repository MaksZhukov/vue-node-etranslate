import path from 'path';
import app from '../app';
import './user';
import './translate';
import './userDictionary';
import './dictionary';

app.get('*', (req, res) => {
  res.sendFile(path.resolve('dist/index.html'));
});
