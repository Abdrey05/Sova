require('dotenv').config();
const jwt = require('jsonwebtoken');
const formatResponse = require('../utils/formatResponse');

function verifyRefreshToken(req, res, next) {
  try {
    const { refreshToken } = req.cookies;

    const { user } = jwt.verify(refreshToken, process.env.SECRET_REFRESH_TOKEN);

    if (!user) {
      return res
        .status(400)
        .json(
          formatResponse(
            400,
            'Невалидный refreshToken',
            null,
            'Невалидный refreshToken'
          )
        );
    }

    res.locals.user = user;
    next();
  } catch (error) {
    console.log('====verifyRefreshToken====', error);
    res
      .status(400)
      .json(
        formatResponse(
          400,
          'Невалидный refreshToken',
          null,
          'Невалидный refreshToken'
        )
      );
  }
}

module.exports = verifyRefreshToken;
