import { Injectable } from '@nestjs/common';
import { Login } from 'src/classes';
import { UserRepository } from 'src/repositories';
import { UserDto } from '../dtos/UserDto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(userData: UserDto) {
    return await this.userRepository.create(userData);
  }

  async userLogin(loginData: Login) {
    return await this.userRepository.login(loginData);
  }

  async findUserByEmail(email: string): Promise<UserDto> {
    return await this.userRepository.findByEmail(email);
  }

  async findUserById(userId: string): Promise<UserDto> {
    return await this.userRepository.findById(userId);
  }

  async findAllUser(): Promise<UserDto[]> {
    return await this.userRepository.findAll();
  }

  async updateUser(userId: string, updateUserData: UserDto): Promise<UserDto> {
    return await this.userRepository.update(userId, updateUserData);
  }

  async deleteUser(userId: string): Promise<void> {
    return await this.userRepository.delete(userId);
  }
}
