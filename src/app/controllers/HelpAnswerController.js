import * as Yup from 'yup';
import mongoose from 'mongoose';
import HelpOrder from '../schema/helpOrder';

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

    const isValid = await HelpOrder.find({
      _id: helpOrderId,
    });
    if (!(Array.isArray(isValid) && isValid.length)) {
      return res
        .status(401)
        .json('There is no notification with the specified Id to the user');
    }
    const { answer } = req.body;
    const helpOrder = await HelpOrder.findByIdAndUpdate(
      helpOrderId,
      { answer, answerAt: new Date() },
      { new: true }
    );

    return res.json(helpOrder);
  }
}

export default new HelpAnswerController();
