import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Login } from 'src/classes';
import { UserDto } from 'src/dtos';
import { Encryptor } from 'src/utils';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(UserDto.name) private readonly userModel: Model<UserDto>,
  ) {}
  private encryptor = new Encryptor();

  async create(userData: UserDto) {
    userData.password = await this.encryptor.hashPassword(userData.password);
    const alreadyExist = await this.userModel
      .findOne({ email: userData.email })
      .exec();

    if (alreadyExist) throw new BadRequestException('Email already exists');
    const newUser = new this.userModel(userData);
    return await newUser.save();
  }

  async login({ email, password }: Login) {
    const loginUser: UserDto = await this.userModel.findOne({ email }).exec();

    if (!loginUser) throw new BadRequestException('Email not found');

    const isPasswordValid = await this.encryptor.comparePasswords(
      password,
      loginUser.password,
    );

    if (!isPasswordValid) throw new BadRequestException('Invalid password');

    return;
  }

  async findById(userId: string): Promise<UserDto | null> {
    return await this.userModel.findById(userId).exec();
  }

  async findByEmail(email: string): Promise<UserDto | null> {
    return await this.userModel.findOne({ email }).exec();
  }

  async findAll(): Promise<UserDto[] | null> {
    return await this.userModel.find().exec();
  }

  async update(userId: string, updateUserData: UserDto): Promise<UserDto> {
    return this.userModel
      .findByIdAndUpdate(userId, updateUserData, { new: true })
      .exec();
  }

  async delete(userId: string): Promise<void> {
    await this.userModel.findByIdAndDelete(userId).exec();
  }
}
