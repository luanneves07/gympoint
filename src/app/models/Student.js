import Sequelize, { Model } from 'sequelize';

class Student extends Model {
  /**
   * this method is called by index.js of dataBase while it is
   * loading all models of the application
   */
  static init(connection) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        age: Sequelize.INTEGER,
        weight: Sequelize.DECIMAL,
        height: Sequelize.DECIMAL,
      },
      { sequelize: connection }
    );

    return this;
  }
}

export default Student;
