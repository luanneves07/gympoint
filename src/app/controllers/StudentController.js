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
    const student = await Student.create({
      name: 'Luan Neves',
      email: 'luannevessilva@gmail.com',
      weight: 69.8,
      height: 1.72,
    });

    return res.json(student);
  }
}

export default new StudentController();
