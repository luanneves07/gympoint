import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import authConfig from '../../config/auth';

/**
 * this file holds the responsability of verify the token between each requisition
 * of user to server
 */
export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);
    // Recover user ID inside decoded JWT and inserts it on request.userId
    req.userId = decoded.id;
    // Give access to user since all verifications has passed
    return next();
  } catch (err) {
    // Blocks the user requisition since token was not decoded by jwt
    return res.status(401).json({ error: 'Invalid token provided' });
  }
};
