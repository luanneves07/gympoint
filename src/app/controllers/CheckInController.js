import Sequelize, { Op } from 'sequelize';
import CheckIn from '../models/CheckIn';
import Student from '../models/Student';
import Registration from '../models/Registration';

class CheckInController {
  async index(req, res) {
    const { studentId } = req.params;

    const isStudent = await Student.findByPk(studentId);
    if (!isStudent) {
      return res.status(401).json({ Error: `Student ${studentId} not found` });
    }

    const checkIns = await CheckIn.findAll({
      where: { student_id: studentId },
    });
    return res.json(checkIns);
  }

  async store(req, res) {
    const MAXIMUM_ENTRANCE = 5;
    const INTERVAL_CHECKIN_ANALYSIS_DAYS = 7;

    const { studentId } = req.params;

    const isStudent = await Student.findByPk(studentId);
    if (!isStudent) {
      return res.status(401).json({ Denied: `Student ${studentId} not found` });
    }

    const isRegistered = await Registration.findOne({
      where: { student_id: studentId },
    });
    if (!isRegistered) {
      return res.status(401).json({
        Denied: `There is no registration for student ${isStudent.name}`,
      });
    }

    const checkins = await CheckIn.findAndCountAll({
      where: {
        student_id: studentId,
        [Sequelize.Op.and]: [
          Sequelize.literal(
            `created_at > NOW() - INTERVAL '${INTERVAL_CHECKIN_ANALYSIS_DAYS}d'`
          ),
        ],
      },
    });

    if (checkins.count > MAXIMUM_ENTRANCE) {
      return res
        .status(400)
        .json({ error: 'You exceeded entrance number int the last 7 days.' });
    }

    const checkin = await CheckIn.create({
      student_id: studentId,
    });

    return res.json(checkin);
  }
}

export default new CheckInController();
