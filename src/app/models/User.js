import Sequelize, { Model } from 'sequelize';

class User extends Model {
  /**
   * this methodo is called by index.js of dataBase while it is
   * loading all models of the application
   */
  static init(connection) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
      },
      { sequelize: connection }
    );

    return this;
  }
}

export default User;
