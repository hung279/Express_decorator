import {
  Delete,
  Get,
  Patch,
  Post,
} from '../common/decorators/request-http.decorator';
import UserService from '../services/user.service';
import { Body, Param } from '../common/decorators/route-params.decorator';

export class UserController {
  public userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  @Get('user')
  async getUsers() {
    const user = await this.userService.getUsers();
    return user;
  }

  @Get('user/:id')
  async getUserById(@Param() { id }: any) {
    const user = await this.userService.getUserById(+id);

    return user;
  }

  @Post('user')
  async createUser(@Body() body: any) {
    const newUser = await this.userService.createUser(body);

    return newUser;
  }

  @Patch('user/:id')
  async updateUser(@Param() { id }: any, @Body() body: any) {
    return this.userService.updateUser(+id, body);
  }

  @Delete('user/:id')
  async deleteUser(@Param() { id }: any) {
    return this.userService.deleteUser(+id);
  }
}
