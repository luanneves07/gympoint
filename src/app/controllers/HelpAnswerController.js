import * as Yup from 'yup';
import mongoose from 'mongoose';
import HelpOrder from '../schema/helpOrder';
import HelpOrderMail from '../jobs/HelpOrderMail';
import Student from '../models/Student';
import User from '../models/User';
import Queue from '../../lib/Queue';

class HelpAnswerController {
  async index(req, res) {
    const helpOrders = await HelpOrder.find({
      answerAt: null,
    });
    return res.json(helpOrders);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      answer: Yup.string().required(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ erro: 'Invalid Answer data' });
    }

    const { id: helpOrderId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(helpOrderId)) {
      return res.status(401).json({ Error: 'Invalid order ID' });
    }

    const validOrder = await HelpOrder.findById(helpOrderId);
    if (!validOrder) {
      return res
        .status(401)
        .json('There is no helpOrder with the specified Id to the user');
    }
    if (validOrder.answerAt) {
      return res.status(400).json({ Decline: 'Question already answered!' });
    }

    const validStudent = await Student.findByPk(validOrder.student);
    if (!validStudent) {
      return res.status(401).json('The student does not exist anymore!');
    }

    const admin = await User.findByPk(req.userId);

    const { answer } = req.body;
    const helpOrder = await HelpOrder.findByIdAndUpdate(
      helpOrderId,
      { answer, answerAt: new Date() },
      { new: true }
    );

    await Queue.add(HelpOrderMail.key, {
      student_name: validStudent.name,
      student_email: validStudent.email,
      admin_name: admin.name,
      helpOrder,
    });

    return res.json(helpOrder);
  }
}

export default new HelpAnswerController();
