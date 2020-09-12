import tokenGenerator from './token-generator';

const genAdminTokenObject = (object, genTokenData) => {
  const result = {};
  result.admin = object;
  result.token = tokenGenerator.generate({ _id: object[genTokenData] });
  result.refreshToken = tokenGenerator.generate(
    { _id: object[genTokenData] },
    { expiresIn: '30d' }
  );

  return result;
}

const genUserTokenObject = (object, genTokenData) => {
  const result = {};
  result.user = object;
  result.token = tokenGenerator.generate({ _id: object[genTokenData] });
  result.refreshToken = tokenGenerator.generate(
    { _id: object[genTokenData] },
    { expiresIn: '30d' }
  );

  return result;
};

module.exports = {
  genAdminTokenObject,
  genUserTokenObject,
};
