import User from '../models/User';
/**
 * Since sequelize uses asynchronous process to update data inside database,
 * we need to use async await
 */
class UserController {
  /**
   * List all users registered
   */
  async index(req, res) {
    const users = await User.findAll();
    return res.json(users);
  }

  async store(req, res) {
    const user = await User.create({
      name: 'Luan Neves da Silva',
      email: 'luannevessilva@gmail.com',
      password_hash: 123456789,
    });

    return res.json(user);
  }
}

export default new UserController();
