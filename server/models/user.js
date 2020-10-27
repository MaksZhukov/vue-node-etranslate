import Sequelize from 'sequelize';
import sequelize from './index';
import Dictionary from './userDictionary';

const User = sequelize.define('user', {
    email: {
        type: Sequelize.STRING,
        unique: true,
    },
    active: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
    },
    isRecover: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
    },
    recoverUpdatedAt: {
        type: Sequelize.DATE,
    },
    password: {
        type: Sequelize.STRING,
    },
    refreshToken: {
        type: Sequelize.STRING,
    },
    provider: {
        type: Sequelize.STRING,
    },
});

Dictionary.belongsTo(User);

export default User;
