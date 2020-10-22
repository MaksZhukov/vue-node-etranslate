import LanguageTranslatorV3 from 'ibm-watson/language-translator/v3';
import auth from 'ibm-watson/auth';
import config from 'config';

const {
    server: { translate: configTranslate },
} = config;

const languageTranslator = new LanguageTranslatorV3({
    authenticator: new auth.IamAuthenticator({
        apikey: configTranslate.key,
	}),
    serviceUrl: configTranslate.serviceUrl,
    version: configTranslate.version,
});

export default languageTranslator;
