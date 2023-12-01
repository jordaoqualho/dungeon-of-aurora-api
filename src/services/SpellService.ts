import { Injectable } from '@nestjs/common';
import { SpellRepository } from 'src/repositories';
import { SpellDto } from '../dtos/SpellDto';

@Injectable()
export class SpellService {
  constructor(private readonly spellRepository: SpellRepository) {}

  async createSpell(spellData: SpellDto) {
    return await this.spellRepository.create(spellData);
  }

  async findSpellById(spellId: string): Promise<SpellDto> {
    return await this.spellRepository.findById(spellId);
  }

  async findAllSpell(): Promise<SpellDto[]> {
    return await this.spellRepository.findAll();
  }

  async updateSpell(
    spellId: string,
    updateSpellData: SpellDto,
  ): Promise<SpellDto> {
    return await this.spellRepository.update(spellId, updateSpellData);
  }

  async deleteSpell(spellId: string): Promise<void> {
    return await this.spellRepository.delete(spellId);
  }

  async deleteAllSpells(): Promise<void> {
    return await this.spellRepository.deleteAll();
  }
}
