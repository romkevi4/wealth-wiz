const Category = require('../models/category');
const initialCategories = require('../utils/defaultData')

const addInitialCategories = [
  { name: 'Еда' },
  { name: 'Транспорт' },
  { name: 'Жилье' },
  // Добавьте другие категории по мере необходимости
];

module.exports.addInitialCategories = async () => {
  try {
    await Category.insertMany(initialCategories);
    console.log('Начальные категории успешно добавлены в базу данных.');

  } catch (error) {
    console.error('Ошибка при добавлении начальных категорий:', error);
  }
};
