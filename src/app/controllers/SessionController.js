import jwt from 'jsonwebtoken';
import User from '../models/User';
import authConfig from '../../config/auth';
/**
 * This classes exists with the objective of maintain an user session when
 * the user loggs into the system.
 */
class SessionController {
  async store(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res
        .status(401)
        .json({ error: `The e-mail ${email} does not exists in database` });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(400).json({ error: 'Password does not match!' });
    }

    const { id, name } = user;
    return res.json({
      user: {
        id,
        name,
        email,
      },
      // Create a token and put the user ID inside the token. Create an MD5 hash and set expiration time
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
