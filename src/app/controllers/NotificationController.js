import mongoose from 'mongoose';
import Notification from '../schema/Notification';

class NotificationController {
  async index(req, res) {
    const notifications = await Notification.find({
      user: req.userId,
    })
      .sort({ createdAt: 'desc' })
      .limit(20);

    return res.json(notifications);
  }

  async update(req, res) {
    const notificationId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(notificationId)) {
      return res.status(401).json({ Error: 'Invalid ID' });
    }

    try {
      /**
       * Only updates the notification for the logged user
       */
      const isValid = await Notification.find({
        _id: notificationId,
        user: req.userId,
      });

      if (!(Array.isArray(isValid) && isValid.length)) {
        return res
          .status(401)
          .json('There is no notification with the specified Id to the user');
      }
    } catch (error) {
      return res.status(500).json(error);
    }

    const notification = await Notification.findByIdAndUpdate(
      notificationId,
      {
        read: true,
      },
      { new: true }
    );
    return res.json(notification);
  }
}

export default new NotificationController();
