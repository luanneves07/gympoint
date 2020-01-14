import Plan from '../models/Plan';

class GymPlanController {
  async index(req, res) {
    const plan = await Plan.findAll();
    return res.json(plan);
  }
}

export default new GymPlanController();
