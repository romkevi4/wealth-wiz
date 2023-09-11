const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const isURL = require('validator/lib/isURL');
const isEmail = require('validator/lib/isEmail');

const UnauthorizedError = require('../errors/unauthorizedErr');
const { MESSAGE } = require('../utils/responseInfo');
const { DEFAULT_DATA } = require('../utils/defaultData');

// Схема данных для пользователя
const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    minlength: 2,
    maxlength: 50,
    default: 'User',
    required: true,
  },
  avatar: {
    type: String,
    validate: {
      validator(url) {
        return isURL(url);
      },
      message: MESSAGE.URL_INCORRECT,
    },
    default: DEFAULT_DATA.AVATAR,
    required: false,
  },
  email: {
    type: String,
    unique: true,
    validate: {
      validator(email) {
        return isEmail(email);
      },
      message: MESSAGE.EMAIL_INCORRECT,
    },
    required: true,
  },
  password: {
    type: String,
    select: false,
    required: true,
  },
  groups: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'group',
      default: [],
      required: true,
    }
  ],
  totalAmount: {
    type: Number,
    default: 0,
    required: true,
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnauthorizedError(MESSAGE.DATA_UNAUTHORIZED));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new UnauthorizedError(MESSAGE.DATA_UNAUTHORIZED));
          }

          return user;
        });
    })
    .catch((err) => console.error(err)); // TODO: добавлен временно, нужно выбрать, какую ошибку выбрасывать
};

module.exports = mongoose.model('user', userSchema);
