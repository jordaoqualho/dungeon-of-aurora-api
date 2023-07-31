import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PlayerDto } from 'src/dtos';

@Injectable()
export class PlayerRepository {
  constructor(
    @InjectModel(PlayerDto.name) private readonly playerModel: Model<PlayerDto>,
  ) {}

  async create(playerData: PlayerDto) {
    const newPlayer = new this.playerModel(playerData);
    return await newPlayer.save();
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
