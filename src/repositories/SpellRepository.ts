import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SpellDto } from 'src/dtos';

@Injectable()
export class SpellRepository {
  constructor(
    @InjectModel(SpellDto.name)
    private readonly spellModel: Model<SpellDto>,
  ) {}

  async create(spellData: SpellDto) {
    const newSpell = new this.spellModel(spellData);
    return await newSpell.save();
  }

  async findById(spellId: string): Promise<SpellDto | null> {
    return await this.spellModel.findById(spellId).exec();
  }

  async findAll(): Promise<SpellDto[] | null> {
    return await this.spellModel.find().exec();
  }

  async update(spellId: string, updateSpellData: SpellDto): Promise<SpellDto> {
    return this.spellModel
      .findByIdAndUpdate(spellId, updateSpellData, { new: true })
      .exec();
  }

  async delete(spellId: string): Promise<void> {
    await this.spellModel.findByIdAndDelete(spellId).exec();
  }

  async deleteAll(): Promise<void> {
    await this.spellModel.deleteMany().exec();
  }
}
