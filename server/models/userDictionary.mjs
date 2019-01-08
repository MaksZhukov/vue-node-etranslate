import Sequelize from 'sequelize';
import sequelize from './index';

const Dictionary = sequelize.define('userDictionary', {
  text: {
    type: Sequelize.STRING,
  },
  translate: {
    type: Sequelize.STRING,
  },
});

export default Dictionary;
