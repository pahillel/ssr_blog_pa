class UserService {
  async login(username) {
    // Check in the database if the username exists
    // Return true if the username exists, false otherwise
  }

  async logout() {
    // Perform logout logic here
  }

  register(user) {
    // Create a new user in the database
    // Return the created user object
  }
}

module.exports = new UserService();
