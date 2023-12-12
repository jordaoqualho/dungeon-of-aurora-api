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
import { CharacterDto } from 'src/dtos';
import { Public } from 'src/providers';
import { CharacterService } from 'src/services';

@Controller('character')
export class CharacterController {
  constructor(private readonly characterService: CharacterService) {}

  @Public()
  @Post()
  async createCharacter(@Body() payload: CharacterDto) {
    return await this.characterService.createCharacter(payload);
  }

  @Public()
  @Get('/search')
  async searchSpells(
    @Query('name') name?: string,
    @Query('level') level?: number,
  ): Promise<CharacterDto[]> {
    return await this.characterService.searchCharacters({
      name,
      level,
    });
  }

  @Public()
  @Get('/:characterId?')
  async findCharacter(
    @Param('characterId') characterId?: string,
  ): Promise<CharacterDto | CharacterDto[]> {
    if (characterId)
      return await this.characterService.findCharacterById(characterId);
    return await this.characterService.findAllCharacter();
  }

  @Public()
  @Get('user/:userId?')
  async findAllUserCharacters(
    @Param('userId') userId?: string,
  ): Promise<CharacterDto | CharacterDto[]> {
    return await this.characterService.findAllUserCharacters(userId);
  }

  @Public()
  @Put('/:characterId')
  async updateCharacter(
    @Param('characterId') characterId: string,
    @Body() updateCharacterData: CharacterDto,
  ): Promise<CharacterDto> {
    return this.characterService.updateCharacter(
      characterId,
      updateCharacterData,
    );
  }

  @Public()
  @Delete('/:characterId')
  async deleteCharacter(
    @Param('characterId') characterId: string,
  ): Promise<void> {
    return this.characterService.deleteCharacter(characterId);
  }

  @Delete()
  async deleteAllCharacters(): Promise<void> {
    return this.characterService.deleteAllCharacters();
  }
}
