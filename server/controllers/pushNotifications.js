import expoServerSDK from 'expo-server-sdk';
import schedule from 'node-schedule';
import userDictionaryService from '../bll/services/userDictionary';
import app from '../app';
import { checkAuth } from '../middlewares';

const expo = new expoServerSDK.Expo();

const cronsByUserID = {};

const taskNotificationFromUserDictionary = (token, userID, textLang, translateLang) => async () => {
    const response = await userDictionaryService.getRandomItem(userID, textLang, translateLang);
    if (!response.error) {
        await expo.sendPushNotificationsAsync([
            {
                to: token,
                sound: 'default',
                title: 'Random text from your dictionary',
                body: response.text,
            },
        ]);
    }
};

app.post('/api/push-notification', checkAuth, async (req, res) => {
    const { token, minutes, userID, textLang, translateLang } = req.body;
    const task = schedule.scheduleJob(
        `*/${minutes} * * * *`,
        taskNotificationFromUserDictionary(token, userID, textLang, translateLang)
    );
    cronsByUserID[userID] = { token, minutes, task };
    res.send();
});

app.delete('/api/push-notification/:userID', checkAuth, async (req, res) => {
    const { userID } = req.params;
    if (cronsByUserID[userID]) {
        cronsByUserID[userID].task.cancel();
    }
    res.send();
});
