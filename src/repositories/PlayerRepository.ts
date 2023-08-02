import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Login } from 'src/classes';
import { PlayerDto } from 'src/dtos';
import { Encryptor } from 'src/utils';

@Injectable()
export class PlayerRepository {
  constructor(
    @InjectModel(PlayerDto.name) private readonly playerModel: Model<PlayerDto>,
  ) {}
  private encryptor = new Encryptor();

  async create(playerData: PlayerDto) {
    playerData.password = await this.encryptor.hashPassword(
      playerData.password,
    );
    const newPlayer = new this.playerModel(playerData);
    return await newPlayer.save();
  }

  async login({ email, password }: Login) {
    const loginPlayer: PlayerDto = await this.playerModel
      .findOne({ email })
      .exec();

    if (!loginPlayer) throw new BadRequestException('Email not found');

    const isPasswordValid = await this.encryptor.comparePasswords(
      password,
      loginPlayer.password,
    );

    if (!isPasswordValid) throw new BadRequestException('Invalid password');

    return;
  }

  async findById(playerId: string): Promise<PlayerDto | null> {
    return await this.playerModel.findById(playerId).exec();
  }

  async findAll(): Promise<PlayerDto[] | null> {
    return await this.playerModel.find().exec();
  }

  async update(
    playerId: string,
    updatePlayerData: PlayerDto,
  ): Promise<PlayerDto> {
    return this.playerModel
      .findByIdAndUpdate(playerId, updatePlayerData, { new: true })
      .exec();
  }

  async delete(playerId: string): Promise<void> {
    await this.playerModel.findByIdAndDelete(playerId).exec();
  }
}
