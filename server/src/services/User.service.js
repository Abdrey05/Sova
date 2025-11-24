const { User } = require('../db/models');

class UserService {
  static async getUserByEmail(email) {
    return (await User.findOne({ where: { email } }))?.get();
  }

  static async createNewUser(userData) {
    return (await User.create(userData))?.get();
  }
}

module.exports = UserService;
