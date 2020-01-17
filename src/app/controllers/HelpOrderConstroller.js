import * as Yup from 'yup';
import HelpOrder from '../schema/helpOrder';
import Student from '../models/Student';

class HelpOrderController {
  async index(req, res) {
    const student_id = req.params.studentHelpId;

    const validStudent = await Student.findByPk(student_id);
    if (!validStudent) {
      return res.status(401).json({ Error: 'Student not found' });
    }

    const helpOrders = await HelpOrder.find({
      student: student_id,
    })
      .sort({ createdAt: 'desc' })
      .limit(20);

    return res.json(helpOrders);
  }

  async store(req, res) {
    const student_id = req.params.studentHelpId;

    const validStudent = await Student.findByPk(student_id);
    if (!validStudent) {
      return res.status(401).json({ Error: 'Student not found' });
    }

    const schema = Yup.object().shape({
      question: Yup.string().required(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ erro: 'Invalid HelpOrder data' });
    }

    const { question } = req.body;
    const helpOrder = await HelpOrder.create({
      student: student_id,
      question,
    });

    return res.json(helpOrder);
  }
}

export default new HelpOrderController();
