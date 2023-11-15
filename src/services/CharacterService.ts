import { Injectable } from '@nestjs/common';
import { CharacterRepository } from 'src/repositories';
import { CharacterDto } from '../dtos/CharacterDto';

@Injectable()
export class CharacterService {
  constructor(private readonly characterRepository: CharacterRepository) {}

  async createCharacter(characterData: CharacterDto) {
    return await this.characterRepository.create(characterData);
  }

  async findAllUserCharacters(userId: string): Promise<CharacterDto[]> {
    return await this.characterRepository.findByUserId(userId);
  }

  async findCharacterById(characterId: string): Promise<CharacterDto> {
    return await this.characterRepository.findById(characterId);
  }

  async findAllCharacter(): Promise<CharacterDto[]> {
    return await this.characterRepository.findAll();
  }

  async updateCharacter(
    characterId: string,
    updateCharacterData: CharacterDto,
  ): Promise<CharacterDto> {
    return await this.characterRepository.update(
      characterId,
      updateCharacterData,
    );
  }

  async deleteCharacter(characterId: string): Promise<void> {
    return await this.characterRepository.delete(characterId);
  }

  async deleteAllCharacters(): Promise<void> {
    return await this.characterRepository.deleteAll();
  }
}
