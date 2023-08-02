import { Injectable } from '@nestjs/common';
import { PlayerRepository } from 'src/repositories';
import { LoginDto, PlayerDto } from '../dtos/PlayerDto';

@Injectable()
export class PlayerService {
  constructor(private readonly playerRepository: PlayerRepository) {}

  async createPlayer(playerData: PlayerDto) {
    return await this.playerRepository.create(playerData);
  }

  async playerLogin(loginData: LoginDto) {
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
