import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { SpellDto } from 'src/dtos';
import { Public } from 'src/providers';
import { SpellService } from 'src/services';

@Controller('spell')
export class SpellController {
  constructor(private readonly spellService: SpellService) {}

  @Public()
  @Post()
  async createSpell(@Body() payload: SpellDto) {
    return await this.spellService.createSpell(payload);
  }

  @Public()
  @Get('/search')
  async searchSpells(
    @Query('name') name?: string,
    @Query('level') level?: number,
    @Query('school') school?: string,
    @Query('classes') classes?: string,
  ): Promise<SpellDto[]> {
    return await this.spellService.searchSpells({
      name,
      level,
      school,
      classes,
      originalName: name,
    });
  }

  @Public()
  @Get('/:spellId?')
  async findSpell(
    @Param('spellId') spellId?: string,
  ): Promise<SpellDto | SpellDto[]> {
    if (spellId) return await this.spellService.findSpellById(spellId);
    return await this.spellService.findAllSpell();
  }

  @Public()
  @Put('/:spellId')
  async updateSpell(
    @Param('spellId') spellId: string,
    @Body() updateSpellData: SpellDto,
  ): Promise<SpellDto> {
    return this.spellService.updateSpell(spellId, updateSpellData);
  }

  @Public()
  @Delete('/:spellId')
  async deleteSpell(@Param('spellId') spellId: string): Promise<void> {
    return this.spellService.deleteSpell(spellId);
  }

  @Public()
  @Post('/translate')
  async translateSpells(): Promise<void> {
    return this.spellService.callIt();
  }

  @Delete()
  async deleteAllSpells(): Promise<void> {
    return this.spellService.deleteAllSpells();
  }
}
