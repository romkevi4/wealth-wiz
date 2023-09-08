const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const isEmail = require('validator/lib/isEmail');

const UnauthorizedError = require('../errors/unauthorizedErr');
const { MESSAGE } = require('../utils/responseInfo');

// Схема данных для пользователя
const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
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
      required: true,
    }
  ],
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password')
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
    });
};

module.exports = mongoose.model('user', userSchema);
