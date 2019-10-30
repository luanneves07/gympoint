class UserController {
  index(req, res) {
    return res.json({ 'Application name': 'GYMPOINT' });
  }
}

export default new UserController();
