import Student from '../models/Student';
/**
 * Since sequelize uses asynchronous process to update data inside database,
 * we need to use async await
 */
class StudentController {
  /**
   * List all students registered
   */
  async index(req, res) {
    const students = await Student.findAll();
    return res.json(students);
  }

  async store(req, res) {
    const studentExists = Student.findOne({ where: { email: req.body.email } });

    if (studentExists) {
      return res
        .status(400)
        .json(`The user ${studentExists.name} already existis in our database`);
    }
    const { id, name, email, age, weight, height } = await Student.create(
      req.body
    );

    return res.json({ id, name, email, age, weight, height });
  }

  async update(req, res) {
    const { name, email } = req.body;

    const student = Student.findOne({ where: { email } });

    if (!student) {
      return res.status(401).json({
        error: `The user ${student.name} does not existis in our database`,
      });
    }

    const { age } = student.update(req.body);

    return req.json({ name, email, age });
  }
}

export default new StudentController();
