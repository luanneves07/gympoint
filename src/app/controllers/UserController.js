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
    const userExists = await User.findOne({ where: { email: req.body.email } });

    if (userExists) {
      return res.status(400).json({
        error: `The email ${userExists.email} exists inside our database. Please, try login or insert another e-mail`,
      });
    }

    const { id, name, email } = await User.create(req.body);

    return res.json({ id, name, email });
  }
}

export default new UserController();
