import logger from '../../common/helpers/winston';
import translator from '../../common/helpers/translator';

class TranslateService {
    async translate({ text, textLang, translateLang }) {
        try {
            const response = await translator.translate({
                text,
                source: textLang,
                target: translateLang,
            });
            return response.result.translations[0].translation;
        } catch (err) {
            logger.error(err);
            return { error: true };
        }
    }
}

export default new TranslateService();
