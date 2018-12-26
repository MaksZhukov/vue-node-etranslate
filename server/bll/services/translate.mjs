
import logger from '../../common/helpers/winston';
import translate from '../../common/helpers/translate';


class TranslateService {
  async translateText({ text, from, to }) {
    try {
      return await translate(text, { from, to });
    } catch (err) {
      logger.error(err);
      return { error: true };
    }
  }
}

export default new TranslateService();
