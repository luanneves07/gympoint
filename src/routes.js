import { Router } from 'express';

const routes = new Router();

routes.get('/students', (req, res) => {
  res.json({
    name: 'Luan Neves',
    app: 'GYMPOINT',
  });
});

export default routes;
