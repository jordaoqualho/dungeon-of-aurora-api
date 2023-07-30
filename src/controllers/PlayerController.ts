import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PlayerDto } from 'src/dtos';
import { PlayerService } from 'src/services';

@Controller('player')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Post()
  async savePlayer(@Body() payload: PlayerDto): Promise<void> {
    return this.playerService.savePlayer(payload);
  }

  @Get('/:playerId')
  async findPlayer(@Param('playerId') playerId: string): Promise<void> {
    return this.playerService.findPlayer(playerId);
  }
}
