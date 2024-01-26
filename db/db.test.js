const mongoose = require('mongoose');
const { connect, disconnect, createUser, findUser } = require('./db');
const User = require('../models/userModel');

jest.mock('./db');
beforeAll(async () => {
  return await connect();
});

describe('User Test Suite', () => {
  test('As a user, I want to save a user to the database', async () => {
    const newUser = {
      _id: new mongoose.Types.ObjectId(),
      firstName: 'Maggie',
      lastName: 'Lei',
      address: '1234 Main Street',
      city: 'Troy',
      state: 'Michigan',
      zipCode: '48322',
      email: 'maggie.lei@test.com',
      password: '123',
    };
    const user = await createUser(newUser);
    expect(user.firstName).toEqual('Maggie');
    expect(user.lastName).toEqual('Lei');
    expect(user.address).toEqual('1234 Main Street');
    expect(user.city).toEqual('Troy');
    expect(user.state).toEqual('Michigan');
    expect(user.zipCode).toEqual('48322');
    expect(user.email).toEqual('maggie.lei@test.com');
    expect(user.password).toEqual('123');
  });
  test('As a user, I want to find a user by any property', async () => {
    const obj = {
      lastName: 'Lei',
    };
    const user = await findUser(obj);
    expect(user.lastName).toEqual('Lei');
  });
});

afterAll(async () => {
  return await disconnect();
});
