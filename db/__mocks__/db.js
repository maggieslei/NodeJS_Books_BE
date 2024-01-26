const connect = async () => {
  try {
    console.log(`connected to mocked DB`);
  } catch (error) {
    console.log(error);
  }
};

const disconnect = async () => {
  console.log('Mocked disconnected from database');
};

const findUser = async (userObj) => {
  return Promise.resolve({
    lastName: 'Lei',
  });
};

const createUser = async (newUserObj) => {
  return Promise.resolve({
    firstName: 'Maggie',
    lastName: 'Lei',
    address: '1234 Main Street',
    city: 'Troy',
    state: 'Michigan',
    zipCode: '48322',
    email: 'maggie.lei@test.com',
    password: '123',
  });
};

module.exports = {
  connect,
  disconnect,
  findUser,
  createUser,
};
