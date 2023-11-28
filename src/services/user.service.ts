import User from "../models/user.model";

class UserService {
  async getUsers() {
    return User.findAll();
  }

  async getUserById(id: number) {
    return User.findByPk(id);
  }

  async createUser(body: any) {
    return User.create(body);
  }

  async updateUser(id: number, body: any) {
    const user = await this.getUserById(id);

    if (!user) {
      throw new Error('User not found');
    }

    user.set(body);

    await user.save();
  }

  async deleteUser(id: number) {
    const user = await this.getUserById(id);

    if (!user) {
      throw new Error('User not found');
    }

    await user.destroy();
  }
}

export default UserService;