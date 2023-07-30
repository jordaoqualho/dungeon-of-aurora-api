import { Injectable } from '@nestjs/common';
import { PlayerDto } from '../dtos/PlayerDto';
import { PlayerRepository } from 'src/repositories';

@Injectable()
export class PlayerService {
  constructor(private readonly playerRepository: PlayerRepository) {}

  async savePlayer(playerData: PlayerDto): Promise<void> {
    await this.playerRepository.create(playerData);
  }

  async findPlayer(playerId: string): Promise<void> {
    const player = await this.playerRepository.findById(playerId);
    return player;
  }
}
