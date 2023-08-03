import { BadRequestException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Connection, Model, connect } from 'mongoose';
import { PlayerController } from 'src/controllers';
import { PlayerDto, PlayerSchema } from 'src/dtos';
import { PlayerRepository } from 'src/repositories';
import { PlayerService } from 'src/services';
import { mockIncorrectLoginData, mockLoginData, mockPlayerData } from '../mock';

describe('PlayerController', () => {
  let playerController: PlayerController;
  let mongoServer: MongoMemoryServer;
  let mongoConnection: Connection;
  let playerModel: Model<PlayerDto>;
  const mockPlayer = mockPlayerData();

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    mongoConnection = (await connect(uri)).connection;
    playerModel = mongoConnection.model(PlayerDto.name, PlayerSchema);

    const player: TestingModule = await Test.createTestingModule({
      controllers: [PlayerController],
      providers: [
        PlayerRepository,
        PlayerService,
        { provide: getModelToken(PlayerDto.name), useValue: playerModel },
      ],
    }).compile();

    playerController = player.get<PlayerController>(PlayerController);
  });

  afterAll(async () => {
    await mongoConnection.dropDatabase();
    await mongoConnection.close();
    await mongoServer.stop();
  });

  // afterEach(async () => {
  //   const collections = mongoConnection.collections;
  //   for (const key in collections) {
  //     const collection = collections[key];
  //     await collection.deleteMany({});
  //   }
  // });

  describe('postPlayer', () => {
    it('should return the created player data', async () => {
      const response = await playerController.createPlayer(mockPlayer);
      expect(response).toEqual(
        expect.objectContaining({
          name: mockPlayer.name,
          password: expect.any(String),
          email: mockPlayer.email,
          avatarUrl: mockPlayer.avatarUrl,
          totalGamesPlayed: 0,
          quests: [],
          inspiration: 0,
        }),
      );
    });

    it('should return BadRequestException "Email already exists"', async () => {
      await playerController.createPlayer(mockPlayer).catch((error) => {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.message).toContain('Email already exists');
      });
    });
  });

  describe('findPlayer', () => {
    it('should return an array of all players', async () => {
      const response = await playerController.findPlayer();
      expect(Array.isArray(response)).toBe(true);
      expect(response).toContainEqual(
        expect.objectContaining({
          name: mockPlayer.name,
          password: expect.any(String),
          email: mockPlayer.email,
          avatarUrl: mockPlayer.avatarUrl,
          totalGamesPlayed: 0,
          quests: [],
          inspiration: 0,
        }),
      );
    });
  });

  describe('loginPlayer', () => {
    it('should return ok when correct login data', async () => {
      const mockLogin = mockLoginData();
      await playerController.playerLogin(mockLogin).then((response) => {
        expect(response).toBe(undefined);
      });
    });

    it('should return BadRequestException with "Email not found"', async () => {
      const mockLogin = mockIncorrectLoginData();
      await playerController.playerLogin(mockLogin).catch((error) => {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.message).toContain('Email not found');
      });
    });
  });
});
