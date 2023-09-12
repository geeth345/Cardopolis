class UserList {

  users: Map<string, any>;

  constructor() {
    // stores users in a map
    this.users = new Map();
  }

  addUser(userId, user) {
    this.users.set(userId, user);
  }

  removeUser(userId) {
    this.users.delete(userId);
  }

  getUser(userId) {
    return this.users.get(userId);
  }


}

const userList = new UserList();

export default userList;
