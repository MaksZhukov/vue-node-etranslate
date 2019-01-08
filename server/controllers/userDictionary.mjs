import config from 'config';
import app from '../app';
import userDictionaryService from '../bll/services/userDictionary';
import { checkAuth } from '../middlewares';

const { server: { apiResponses } } = config;

app.post('/api/add-to-user-dictionary', checkAuth, async (req, res) => {
  const resAdd = await userDictionaryService.add(req.body);
  if (resAdd.error) {
    res.json(apiResponses.problemDatabase);
  } else {
    const { id, text, translate } = resAdd;
    res.json({ id, text, translate });
  }
});

app.post('/api/remove-from-user-dictionary', checkAuth, async (req, res) => {
  const resRemove = await userDictionaryService.remove(req.body.id);
  if (resRemove.error) {
    res.json(apiResponses.problemDatabase);
  } else {
    res.json(resRemove);
  }
});

app.post('/api/get-user-dictionary', checkAuth, async (req, res) => {
  const { userId } = req.body;
  const resGetList = await userDictionaryService.getList(userId);
  if (resGetList.error) {
    res.json(apiResponses.problemDatabase);
  } else {
    res.json(resGetList);
  }
});
