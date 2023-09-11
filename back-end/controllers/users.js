const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const { NODE_ENV, JWT_SECRET, SECRET_KEY } = require('../config');

const { STATUS_CODE, MESSAGE, SALT_HASH } = require('../utils/responseInfo');
const { chooseError } = require('../utils/chooseError');

const UnauthorizedError = require('../errors/unauthorizedErr');
const NotFoundError = require('../errors/notFoundErr');
const ConflictError = require('../errors/conflictErr');

// Получение данных о пользователе
module.exports.getUserData = (req, res, next) => {
  const { _id } = req.user;

  User.findById(_id)
    .select('-password')
    .then((user) => {
      if (!user) {
        throw new NotFoundError(MESSAGE.USER_NOT_FOUND);
      }

      res.send(user);
    })
    .catch(next);
};

// Создание пользователя
module.exports.createUser = (req, res, next) => {
  const { userName, email, password } = req.body;

  User.findOne({ email })
    .then((userSaved) => {
      if (!userSaved) {
        bcrypt.hash(password, SALT_HASH.ROUNDS)
          .then((hash) => User.create({
            userName,
            email,
            password: hash,
          }))
          .then((user) => {
            res
              .status(STATUS_CODE.CREATED)
              .send({
                userName: user.userName,
                email: user.email,
                groups: user.groups,
                totalAmount: user.totalAmount,
                _id: user._id,
              });
          })
          .catch((err) => chooseError(err, next));
      } else {
        throw new ConflictError(MESSAGE.ERROR_DUPLICATE_EMAIL_USER);
      }
    })
    .catch((err) => chooseError(err, next));
};

// Аутентификация
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : SECRET_KEY,
        { expiresIn: '7d' },
      );

      if (!token) {
        throw new UnauthorizedError(MESSAGE.DATA_UNAUTHORIZED);
      }

      res.send({ token });
    })
    .catch(next);
};

// Обновление данных пользователя
module.exports.updateUserData = (req, res, next) => {
  const { userName, email, groups, totalAmount } = req.body;
  const { _id } = req.user;

  const updateFields = {};

  if (userName) {
    updateFields.userName = userName;
  }

  if (email) {
    updateFields.email = email;
  }

  if (groups) {
    updateFields.groups = groups;
  }

  if (totalAmount !== undefined) {
    updateFields.totalAmount = totalAmount;
  }

  User.findByIdAndUpdate(
    _id,
    updateFields,
    { new: true, runValidators: true }
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError(MESSAGE.USER_NOT_FOUND);
      }

      res.send(user);
    })
    .catch((err) => chooseError(err, next));
};
