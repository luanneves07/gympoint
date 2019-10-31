import bcrypt from 'bcryptjs';
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

    /**
     * Creates a hash of given password inserted by user before save
     */
    this.addHook('beforeSave', async user => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });

    return this;
  }

  /**
   * Verifies if given password matches with stored hash
   */
  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default User;
