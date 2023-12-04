import { BadRequestException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Connection, Model, connect } from 'mongoose';
import { UserController } from 'src/controllers';
import { UserDto, UserSchema } from 'src/dtos';
import { UserRepository } from 'src/repositories';
import { UserService } from 'src/services';
import { mockUserData } from '../mock';

describe('UserController', () => {
  let userController: UserController;
  let mongoServer: MongoMemoryServer;
  let mongoConnection: Connection;
  let userModel: Model<UserDto>;
  const mockUser = mockUserData();

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    mongoConnection = (await connect(uri)).connection;
    userModel = mongoConnection.model(UserDto.name, UserSchema);

    const user: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserRepository,
        UserService,
        { provide: getModelToken(UserDto.name), useValue: userModel },
      ],
    }).compile();

    userController = user.get<UserController>(UserController);
  });

  afterAll(async () => {
    await mongoConnection.dropDatabase();
    await mongoConnection.close();
    await mongoServer.stop();
  });

  describe('postUser', () => {
    // it('should return the created user data', async () => {
    //   const response = await userController.createUser(mockUser);
    //   const expectedUser = {
    //     name: mockUser.name,
    //     password: expect.any(String),
    //     email: mockUser.email,
    //     avatarUrl: mockUser.avatarUrl,
    //     totalGamesPlayed: 0,
    //     quests: [],
    //     inspiration: 0,
    //   };
    //   expect(response).toEqual(expect.objectContaining(expectedUser));
    // });

    it('should return BadRequestException "Email already exists"', async () => {
      await userController.createUser(mockUser).catch((error) => {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.message).toContain('Email already exists');
      });
    });
  });

  describe('findUser', () => {
    it('should return an array of all users', async () => {
      const users = await userController.findUser();
      expect(Array.isArray(users)).toBe(true);
    });

    it('should contain user objects with specific properties', async () => {
      const users = await userController.findUser();
      const expectedProperties = ['name', 'password', 'email', 'avatarUrl'];

      if (Array.isArray(users)) {
        users.forEach((user) => {
          expectedProperties.forEach((property) => {
            expect(user).toHaveProperty(property);
          });
          expect(user.password).toEqual(expect.any(String));
        });
      } else {
        expectedProperties.forEach((property) => {
          expect(users).toHaveProperty(property);
        });
        expect(users.password).toEqual(expect.any(String));
      }
    });
  });
});
