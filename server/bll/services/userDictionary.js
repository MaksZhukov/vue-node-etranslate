
import userDictionaryModel from '../../models/userDictionary';
import logger from '../../common/helpers/winston';

class UserDictionary {
  async add(data) {
    try {
      return await userDictionaryModel.create(data);
    } catch (err) {
      logger.error(err);
      return { error: true };
    }
  }

  async remove(id) {
    try {
      return await userDictionaryModel.destroy({ where: { id } });
    } catch (err) {
      logger.error(err);
      return { error: true };
    }
  }

  async getList(userId) {
    try {
      const list = await userDictionaryModel.findAll({ where: { userId } });
      return list.map(el => ({
        text: el.text,
        translate: el.translate,
        id: el.id,
        textLang: el.textLang,
        translateLang: el.translateLang,
      }));
    } catch (err) {
      logger.error(err);
      return { error: true };
    }
  }
}

export default new UserDictionary();
