
import userDictionaryModel from '../../models/userDictionary';
import logger from '../../common/helpers/winston';

class UserDictionary {
  async add({ userId, translate, text }) {
    try {
      return await userDictionaryModel.create({ text, translate, userId });
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
      }));
    } catch (err) {
      logger.error(err);
      return { error: true };
    }
  }
}

export default new UserDictionary();
