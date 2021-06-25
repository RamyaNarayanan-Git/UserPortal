const request = require('supertest');
const app = require('express');

describe('User Endpoints', () => {
  it('should create a new user', async () => {
    const res = await request(app)
      .post('/users')
      .send({
        name: 'Ram',
        address: 'Park avenue',
        description: 'Driver',
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('user');
  });

  it('should fetch a single user', async () => {
    const userId = '60d54446702054526811d8ce';
    const res = await request(app).get(`/users/${userId}`);
    expect(res.statusCode).toEqual(200);
  });

  it('should fetch all users', async () => {
    const res = await request(app).get('/users');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('users');
    expect(res.body.posts).toHaveLength(1);
  });

  it('should update a user', async () => {
    const res = await request(app)
      .put('users/60d54446702054526811d8ce')
      .send({
        userId: '60d54446702054526811d8ce',
        name: 'Bill',
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('user');
  });

  

  it('should delete a user', async () => {
    const res = await request(app).delete('/users/60d54446702054526811d8ce');
    expect(res.statusCode).toEqual(200);
  });

  it('should delete all users', async () => {
    const res = await request(app).delete('/users/');
    expect(res.statusCode).toEqual(200);
  });
});
