
import logger from '../../common/helpers/winston';
import translate from '../../common/helpers/translate';


class TranslateService {
  async translate({ text, textLang, translateLang }) {
    try {
      return await translate(text, { from: textLang, to: translateLang });
    } catch (err) {
      logger.error(err);
      return { error: true };
    }
  }
}

export default new TranslateService();
