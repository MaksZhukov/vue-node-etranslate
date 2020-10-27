import SpeechToTextV1 from 'ibm-watson/speech-to-text/v1';
import auth from 'ibm-watson/auth';
import config from 'config';

const {
    server: { speech: configSpeech },
} = config;

const speechToText = new SpeechToTextV1({
    authenticator: new auth.IamAuthenticator({ apikey: configSpeech.key }),
    serviceUrl: configSpeech.serviceUrl,
});

export default speechToText;
