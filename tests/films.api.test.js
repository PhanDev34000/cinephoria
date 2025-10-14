const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');

describe('GET /api/films', () => {
  it('doit répondre 200 et retourner un tableau', async () => {
    const res = await request(app).get('/api/films');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  afterAll(async () => {
    await mongoose.connection.close(); // ✅ ferme proprement la connexion
  });
});
