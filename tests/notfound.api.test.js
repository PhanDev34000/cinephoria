const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');

describe('Route inexistante', () => {
  it('retourne 404 pour une route non trouvée', async () => {
    const res = await request(app).get('/api/route-introuvable');
    expect(res.status).toBe(404);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });
});
