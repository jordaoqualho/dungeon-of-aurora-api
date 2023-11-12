import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserDto } from 'src/dtos';
import { Public } from 'src/providers';
import { UserService } from 'src/services';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post()
  async createUser(@Body() payload: UserDto) {
    return await this.userService.createUser(payload);
  }

  @Public()
  @Get('/email/:email')
  async findUserByEmail(@Param('email') email: string): Promise<UserDto> {
    return await this.userService.findUserByEmail(email);
  }

  @Public()
  @Get('/:userId?')
  async findUser(
    @Param('userId') userId?: string,
  ): Promise<UserDto | UserDto[]> {
    if (userId) return await this.userService.findUserById(userId);
    return await this.userService.findAllUser();
  }

  @Public()
  @Put('/:userId')
  async updateUser(
    @Param('userId') userId: string,
    @Body() updateUserData: UserDto,
  ): Promise<UserDto> {
    return this.userService.updateUser(userId, updateUserData);
  }

  @Public()
  @Delete('/:userId')
  async deleteUser(@Param('userId') userId: string): Promise<void> {
    return this.userService.deleteUser(userId);
  }
}
