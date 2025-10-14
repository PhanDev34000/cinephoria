const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');

describe('GET /api/reservations', () => {
  it('refuse sans token (400 ou 401)', async () => {
    const res = await request(app).get('/api/reservations');
    expect([400, 401]).toContain(res.status); // <- accepte 400 ou 401
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });
});
