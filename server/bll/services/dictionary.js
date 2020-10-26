
import dictionary from '../../common/helpers/dictionary';
import logger from '../../common/helpers/winston';

class Dictionary {
  async get({ text, lang }) {
    try {
      return await new Promise((resolve) => {
        dictionary.lookup(text, lang, { ui: 'en', flag: 2 }, (err, res) => {
          resolve(res);
        });
      });
    } catch (err) {
      logger.error(err);
      return { error: true };
    }
  }
}

export default new Dictionary();
