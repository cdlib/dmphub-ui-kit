const faker = require('faker/locale/en');

module.exports = {
  label: 'Toolkit Tests',
  order: 1,
  context: {
    test: {
      text: faker.lorem.paragraph()
    }
  }
};
