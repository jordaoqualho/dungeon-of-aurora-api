import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PlayerDto } from 'src/dtos';

@Injectable()
export class PlayerRepository {
  constructor(
    @InjectModel(PlayerDto.name) private readonly playerModel: Model<PlayerDto>,
  ) {}

  async findById(playerId: string) {
    console.log('📌  playerId → ', playerId);
  }

  async create(playerData: PlayerDto) {
    const newPlayer = new this.playerModel(playerData);
    return newPlayer.save();
  }
}
