import * as Yup from 'yup';
import Plan from '../models/Plan';

class GymPlanController {
  async index(req, res) {
    const plan = await Plan.findAll();
    return res.json(plan);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.number().required(),
      price: Yup.number().required(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ erro: 'Invalid plan store data' });
    }

    const planExists = await Plan.findOne({ where: { title: req.body.title } });
    if (planExists) {
      return res.status(400).json({
        error: `The plan ${planExists.title} exists inside our database. Please, insert another name to this plan`,
      });
    }

    const { title, duration, price } = await Plan.create(req.body);
    return res.json({ title, duration, price });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.number().required(),
      price: Yup.number().required(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ erro: 'Invalid plan update data' });
    }

    const { title } = req.body;
    const plan = await Plan.findByPk(req.params.id);
    if (!plan) {
      return res.status(401).json('Invalid plan!');
    }

    const { duration, price } = await plan.update(req.body);
    return res.json({ title, duration, price });
  }

  async delete(req, res) {
    const { id } = req.params;
    const plan = await Plan.findByPk(id);
    if (plan) {
      try {
        await Plan.destroy({ where: { id } });
        return res.json({ deleted: `Plan ${plan.title} deleted!` });
      } catch (error) {
        return res
          .status(400)
          .json({ error: `Failed to delete plan ${plan.title}` });
      }
    }
    return res
      .status(400)
      .json({ error: `Unnable to locate plan number ${id}` });
  }
}

export default new GymPlanController();
