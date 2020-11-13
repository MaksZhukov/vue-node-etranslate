import Tesseract from 'tesseract.js';
import logger from '../../common/helpers/winston';

const { createWorker } = Tesseract;

const LANGUAGES_TO_TESSERACT = {
    en: 'eng',
    ch: 'chi_tra',
    po: 'pol',
    ru: 'rus',
    de: 'deu',
    fr: 'fra',
    da: 'dan',
    es: 'spa',
    lv: 'lav',
};

class ImageRecognizerTextService {
    async recognize({ image, textLang }) {
        try {
            const worker = createWorker();
            await worker.load();
            await worker.loadLanguage(LANGUAGES_TO_TESSERACT[textLang]);
            await worker.initialize(LANGUAGES_TO_TESSERACT[textLang]);
            const result = await worker.recognize(image);
            await worker.terminate();
            return result;
        } catch (err) {
            logger.error(err);
            return { error: true };
        }
    }
}

export default new ImageRecognizerTextService();
