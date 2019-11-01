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

  async update(req, res) {
    const { email, oldPassword } = req.body;

    const user = User.findByPk(req.userId);

    if (email !== user.email) {
      const userExists = await User.findOne({
        where: { email },
      });

      if (userExists) {
        return res.status(400).json({
          error: `The email ${userExists.email} exists inside our database. Please, try login or insert another e-mail`,
        });
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    const { id, name } = await user.update(req.body);

    return res.json({ id, name, email });
  }
}

export default new UserController();
