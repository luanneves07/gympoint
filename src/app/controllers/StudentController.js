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
    const studentExists = Student.findOne({
      where: { name: req.body.name, email: req.body.email, age: req.body.age },
    });

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
    const student = Student.findOne({
      where: { name: req.body.name, email: req.body.email, age: req.body.age },
    });

    if (!student) {
      return res.status(401).json({
        error: `The user ${student.name} does not existis in our database`,
      });
    }

    const { name, email, age } = student.update(req.body);

    return req.json({ name, email, age });
  }
}

export default new StudentController();
