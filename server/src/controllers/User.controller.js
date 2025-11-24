const bcrypt = require('bcrypt');
const UserService = require('../services/User.service');
const formatResponse = require('../utils/formatResponse');
const generateTokens = require('../utils/generateTokens');
const { User } = require('../db/models');
const cookieConfig = require('../config/cookieConfig');

class UserController {
  static async refreshTokens(req, res) {
    try {
      const { user } = res.locals;

      const { accessToken, refreshToken } = generateTokens({ user });

      return res
        .status(200)
        .cookie('refreshToken', refreshToken, cookieConfig)
        .json(
          formatResponse(
            200,
            'Токены обновлены, успешно продлили пользовательскую сессию',
            { user, accessToken },
            null
          )
        );
    } catch (error) {
      console.log('====UserController.refreshTokens====', error);
      res
        .status(401)
        .json(
          formatResponse(401, 'Ошибка при перевыпуске токенов', null, error)
        );
    }
  }

  static async signUp(req, res) {
    const { username, email, password } = req.body;

    const { isValid, error } = User.validateSignUpData({
      username,
      email,
      password,
    });

    if (!isValid) {
      return res
        .status(400)
        .json(formatResponse(400, 'Ошибка валидации', null, error));
    }

    const normalizedEmail = email.toLowerCase();

    try {
      const userFound = await UserService.getUserByEmail(normalizedEmail);

      if (userFound) {
        res
          .status(400)
          .json(
            formatResponse(
              400,
              'Пользователь с таким адресом электронной почты уже зарегистрирован',
              null,
              'Пользователь с таким адресом электронной почты уже зарегистрирован'
            )
          );
        return;
      }

      const passwordHash = await bcrypt.hash(password, 10);

      const newUser = await UserService.createNewUser({
        username,
        email,
        password: passwordHash,
      });

      if (!newUser) {
        return res
          .status(500)
          .json(
            formatResponse(
              500,
              'Ошибка при создании пользователя',
              null,
              'Ошибка при создании пользователя'
            )
          );
      }

      delete newUser.password;

      const { accessToken, refreshToken } = generateTokens({ user: newUser });

      return res
        .status(201)
        .cookie('refreshToken', refreshToken, cookieConfig)
        .json(
          formatResponse(
            201,
            'Регистрация успешна',
            { user: newUser, accessToken },
            null
          )
        );
    } catch (error) {
      console.log('====UserController.signUp====', error);
      res
        .status(500)
        .json(formatResponse(500, 'Внутренняя ошибка сервера', null, error));
    }
  }

  static async signIn(req, res) {
    const { email, password } = req.body;

    const { isValid, error } = User.validateSignInData({
      email,
      password,
    });

    if (!isValid) {
      return res
        .status(400)
        .json(formatResponse(400, 'Ошибка валидации', null, error));
    }

    const normalizedEmail = email.toLowerCase();

    try {
      const userFound = await UserService.getUserByEmail(normalizedEmail);

      if (!userFound) {
        res
          .status(400)
          .json(
            formatResponse(
              400,
              'Пользователь с таким адресом электронной почты не найден',
              null,
              'Пользователь с таким адресом электронной почты не найден'
            )
          );
        return;
      }

      const isValidPassword = await bcrypt.compare(
        password,
        userFound.password
      );

      if (!isValidPassword) {
        return res
          .status(400)
          .json(
            formatResponse(400, 'Неверный пароль', null, 'Неверный пароль')
          );
      }

      delete userFound.password;

      const { accessToken, refreshToken } = generateTokens({ user: userFound });

      return res
        .status(200)
        .cookie('refreshToken', refreshToken, cookieConfig)
        .json(
          formatResponse(
            200,
            'Успешный вход',
            { user: userFound, accessToken },
            null
          )
        );
    } catch (error) {
      console.log('====UserController.signIn====', error);
      res
        .status(500)
        .json(formatResponse(500, 'Внутренняя ошибка сервера', null, error));
    }
  }

  static async signOut(req, res) {
    try {
      res
        .status(200)
        .clearCookie('refreshToken')
        .json(formatResponse(200, 'Успешный выход'));
    } catch (error) {
      console.log('====UserController.signOut====', error);
      res
        .status(500)
        .json(formatResponse(500, 'Внутренняя ошибка сервера', null, error));
    }
  }
}

module.exports = UserController;
