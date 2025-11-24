require('dotenv').config();
const jwt = require('jsonwebtoken');
const formatResponse = require('../utils/formatResponse');

function verifyAccessToken(req, res, next) {
  try {
    const accessToken = req.headers.authorization.split(' ')[1];

    const { user } = jwt.verify(accessToken, process.env.SECRET_ACCESS_TOKEN);

    if (!user) {
      return res
        .status(403)
        .json(
          formatResponse(
            403,
            'Невалидный accessToken',
            null,
            'Невалидный accessToken'
          )
        );
    }

    res.locals.user = user;
    next();
  } catch (error) {
    console.log('====verifyAccessToken====', error);
    res
      .status(403)
      .json(
        formatResponse(
          403,
          'Невалидный accessToken',
          null,
          'Невалидный accessToken'
        )
      );
  }
}

module.exports = verifyAccessToken;
