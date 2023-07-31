import { Injectable } from '@nestjs/common';
import { PlayerRepository } from 'src/repositories';
import { PlayerDto } from '../dtos/PlayerDto';

@Injectable()
export class PlayerService {
  constructor(private readonly playerRepository: PlayerRepository) {}

  async savePlayer(playerData: PlayerDto) {
    return await this.playerRepository.create(playerData);
  }

  async findPlayerById(playerId: string): Promise<PlayerDto> {
    return await this.playerRepository.findById(playerId);
  }

  async findAllPlayer(): Promise<PlayerDto[]> {
    return await this.playerRepository.findAll();
  }

  async updatePlayer(
    playerId: string,
    updatePlayerData: PlayerDto,
  ): Promise<PlayerDto> {
    return await this.playerRepository.update(playerId, updatePlayerData);
  }

  async deletePlayer(playerId: string): Promise<void> {
    return await this.playerRepository.delete(playerId);
  }
}
