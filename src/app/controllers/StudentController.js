class StudentController {
  index(req, res) {
    return res.json({ 'Application name': 'GYMPOINT' });
  }
}

export default new StudentController();
