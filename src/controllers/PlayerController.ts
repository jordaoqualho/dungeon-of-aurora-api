import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { LoginDto, PlayerDto } from 'src/dtos';
import { PlayerService } from 'src/services';

@Controller('player')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Post()
  async createPlayer(@Body() payload: PlayerDto) {
    return await this.playerService.createPlayer(payload);
  }

  @Post('login')
  @HttpCode(200)
  async playerLogin(@Body() loginData: LoginDto): Promise<void> {
    return await this.playerService.playerLogin(loginData);
  }

  @Get('/:playerId?')
  async findPlayer(
    @Param('playerId') playerId?: string,
  ): Promise<PlayerDto | PlayerDto[]> {
    if (playerId) return await this.playerService.findPlayerById(playerId);
    return await this.playerService.findAllPlayer();
  }

  @Put('/:playerId')
  async updatePlayer(
    @Param('playerId') playerId: string,
    @Body() updatePlayerData: PlayerDto,
  ): Promise<PlayerDto> {
    return this.playerService.updatePlayer(playerId, updatePlayerData);
  }

  @Delete('/:playerId')
  async deletePlayer(@Param('playerId') playerId: string): Promise<void> {
    return this.playerService.deletePlayer(playerId);
  }
}
