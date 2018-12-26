import Sequelize from 'sequelize';
import config from 'config';

const { dbConfig } = config.server;

const sequelize = new Sequelize(dbConfig.database,
  dbConfig.user, dbConfig.password, {
    host: dbConfig.host,
    dialect: 'postgres',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    operatorsAliases: false,
    logging: false,
  });

// sequelize.sync({ force: true });

export default sequelize;