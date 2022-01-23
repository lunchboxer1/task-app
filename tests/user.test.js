const request = require('supertest');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const app = require('../src/app');
const User = require('../src/models/user');

const userOneId = new mongoose.Types.ObjectId();
const userOne = {
  _id: userOneId,
  name: 'Evie',
  email: 'eevee@email.com',
  password: 'Red123!',
  tokens: [{
    token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET),
  }],
};

beforeEach(async () => {
  await User.deleteMany();
  await new User(userOne).save();
});

test('Should sign up a new user', async () => {
  const response = await request(app).post('/users').send({
    name: 'Eric',
    email: 'eric1@gmail.com',
    password: 'Red123!',
  }).expect(201);

  // Potential things to do
  const user = await User.findById(response.body.user._id);
  expect(user).not.toBeNull();

  // Assertions about the response
  expect(response.body).toMatchObject({
    user: {
      name: 'eric',
      email: 'eric1@gmail.com',
    },
    token: user.tokens[0].token,
  });
});

test('Should log-in exsisting user.', async () => {
  await request(app).post('/users/login').send({
    email: userOne.email,
    password: userOne.password,
  }).expect(200);
});

test('Should not log in non-exsistent user.', async () => {
  const password = `${userOne.password}password`;
  await request(app).post('/users/login').send({
    email: userOne.email,
    password,
  }).expect(400);
});

test('Should get profile for user', async () => {
  await request(app)
    .get('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});

test('Should not get profile for unauthenticated user.', async () => {
  await request(app)
    .get('/users/me')
    .send()
    .expect(401);
});

test('Should delete account for user.', async () => {
  await request(app)
    .delete('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});

test('Should not delete account for unauthenitcated user.', async () => {
  await request(app)
    .delete('/users/me')
    .send()
    .expect(401);
});
