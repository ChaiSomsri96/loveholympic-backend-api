export default {
  db: 'mongodb://localhost/festfive-dev',
  dbOptions: (options) => {
    return {
      useCreateIndex: true,
      autoIndex: options.autoIndex,
      useUnifiedTopology: true,
      useNewUrlParser: true,
      keepAlive: 1,
      connectTimeoutMS: 300000,
      socketTimeoutMS: 300000,
    };
  },
  admin: {
    username: 'admin',
    password: 'Festfive@123',
  },
  jwt: {
    secret: 'asdasdjsfhsaf',
    expiresIn: '7d',
  },
  crypto: {
    iv: '5thgfrt7^%$876KO',
    secret: '8?@B##o!fV}5R8fsdf*&*G',
  }
};
