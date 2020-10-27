import schedule from 'node-schedule';
import logger from '../../common/helpers/winston';
import userModel from '../../models/user';
import sequelize from '../../models';

const { Op } = sequelize;


class ScheduleService {
  startSchedule() {
    this.deleteIsNotActiveUsers();
    this.deleteIsNotRecoverUsers();
    schedule.scheduleJob('0 */6 * * *', () => {
      this.deleteIsNotActiveUsers();
      this.deleteIsNotRecoverUsers();
    });
  }

  async deleteIsNotActiveUsers() {
    try {
      await userModel.destroy({
        where: {
          active: false,
          createdAt: {
            [Op.gte]: sequelize.literal('"createdAt" + INTERVAL \'1 day\''),
          },
        },
      });
    } catch (err) {
      logger.error(err);
    }
  }

  async deleteIsNotRecoverUsers() {
    try {
      await userModel.update({ isRecover: false }, {
        where: {
          isRecover: true,
          recoverUpdatedAt: {
            [Op.gte]: sequelize.literal('"recoverUpdatedAt" + INTERVAL \'1 day\''),
          },
        },
      });
    } catch (err) {
      logger.error(err);
    }
  }
}

export default new ScheduleService();
