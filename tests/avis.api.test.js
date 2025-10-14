const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');

describe('POST /api/avis', () => {
  it('retourne 400 si données invalides', async () => {
    const res = await request(app)
      .post('/api/avis')
      .send({ contenu: '' }); // volontairement invalide
    expect([400, 401]).toContain(res.status);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });
});

