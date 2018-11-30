import app from '../app';
import userService from '../bll/services/user';

app.post('/api/sign-up', (req, res) => {
  const {
    email,
    password,
  } = req.body;
  res.json({});
});

app.post('/api/sign-in', (req, res) => {
  const {
    email,
    password,
  } = req.body;
  res.json({});
});
