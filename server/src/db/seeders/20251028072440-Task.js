'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          username: 'test',
          email: 'test@email.com',
          password: 'SecurePass123!',
        },
      ],
      {}
    );
    await queryInterface.bulkInsert(
      'Tasks',
      [
        {
          title: 'Погладить собаку',
          text: 'Собаке требуется внимание',
          user_id: 1,
        },
        {
          title: 'Создать БД',
          text: 'Не забыть gitignore',
          user_id: 1,
        },
        {
          title: 'Слетать на Луну',
          text: 'Зарыть команду для создания сервера',
          user_id: 1,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Tasks', null, {});
    await queryInterface.bulkDelete('Users', null, {});
  },
};
