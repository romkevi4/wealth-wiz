const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Category = require('../models/category');

const { NODE_ENV, JWT_SECRET, SECRET_KEY } = require('../config');

const { STATUS_CODE, MESSAGE } = require('../utils/responseInfo');
const { chooseError } = require('../utils/chooseError');

const UnauthorizedError = require('../errors/unauthorizedErr');
const NotFoundError = require('../errors/notFoundErr');
const ConflictError = require('../errors/conflictErr');

// Получение данных о категориях пользователя
// module.exports.getUserCategories = (req, res, next) => {
//   const { categories } = req.user;
//
//   Category.findById({ _id: { $in: categories } })
//     .then((categories) => {
//       if (!categories || categories.length === 0) {
//         throw new NotFoundError(MESSAGE.CATEGORIES_NOT_FOUND);
//       }
//
//       res.send(categories);
//     })
//     .catch(next);
// };

// Создание новой категории
module.exports.createCategory = (req, res, next) => {
  const { categoryName, icon, type } = req.body;

  Category.findOne({ categoryName })
    .then((categorySaved) => {
      if (!categorySaved) {
        res
          .status(STATUS_CODE.CREATED)
          .send(categorySaved);
      } else {
        throw new ConflictError(MESSAGE.ERROR_DUPLICATE_EMAIL_USER);
      }
    })
    .catch((err) => chooseError(err, next));
};









// Обновление данных пользователя
module.exports.updateUserData = (req, res, next) => {
  // const { userName, email, groups, totalAmount } = req.body;
  // const { _id } = req.user;
  //
  // const updateFields = {};
  //
  // if (userName) {
  //   updateFields.userName = userName;
  // }
  //
  // if (email) {
  //   updateFields.email = email;
  // }
  //
  // if (groups) {
  //   updateFields.groups = groups;
  // }
  //
  // if (totalAmount !== undefined) {
  //   updateFields.totalAmount = totalAmount;
  // }
  //
  // User.findByIdAndUpdate(
  //   _id,
  //   updateFields,
  //   { new: true, runValidators: true }
  // )
  //   .then((user) => {
  //     if (!user) {
  //       throw new NotFoundError(MESSAGE.USER_NOT_FOUND);
  //     }
  //
  //     res.send(user);
  //   })
  //   .catch((err) => chooseError(err, next));
};
