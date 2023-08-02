import { Injectable } from '@nestjs/common';
import { PlayerRepository } from 'src/repositories';
import { PlayerDto } from '../dtos/PlayerDto';
import { Login } from 'src/classes';

@Injectable()
export class PlayerService {
  constructor(private readonly playerRepository: PlayerRepository) {}

  async createPlayer(playerData: PlayerDto) {
    return await this.playerRepository.create(playerData);
  }

  async playerLogin(loginData: Login) {
    return await this.playerRepository.login(loginData);
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
