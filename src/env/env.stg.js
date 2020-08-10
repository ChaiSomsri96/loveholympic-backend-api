export default {
  db: 'mongodb://localhost/prod-festfive',
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
    username: process.env.ADMIN_USERNAME,
    password: process.env.ADMIN_PASSWORD,
  },
  jwt: {
    secret: process.env.JWT_SCERET,
    expiresIn: process.env.JWT_EXPIRES_IN,
  },
  crypto: {
    secret: process.env.SECRET,
    iv: process.env.IV,
  },
};
