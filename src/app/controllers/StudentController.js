import * as Yup from 'yup';
import Student from '../models/Student';
/**
 * Since sequelize uses asynchronous process to update data inside database,
 * we need to use async await
 */
class StudentController {
  /**
   * Lists all students registered
   */
  async index(req, res) {
    const students = await Student.findAll();
    return res.json(students);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      age: Yup.number().required(),
      weight: Yup.number().required(),
      height: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Invalid student store data' });
    }

    const studentExists = await Student.findOne({
      where: { email: req.body.email },
    });

    if (studentExists) {
      return res
        .status(400)
        .json(`The user ${studentExists.name} already existis in our database`);
    }
    const { name, email, age, weight, height } = await Student.create(req.body);

    return res.json({ name, email, age, weight, height });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
      name: Yup.string(),
      email: Yup.string().email(),
      age: Yup.number(),
      weight: Yup.number(),
      height: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Invalid student update data' });
    }

    const { id, name, email } = req.body;

    const student = await Student.findByPk(id);

    if (!student) {
      return res.status(401).json({
        error: `The user ${student.name} does not existis in our database`,
      });
    }

    const { age } = student.update(req.body);

    return res.json({ name, email, age });
  }
}

export default new StudentController();
