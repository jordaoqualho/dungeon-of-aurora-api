import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CharacterDto } from 'src/dtos';

@Injectable()
export class CharacterRepository {
  constructor(
    @InjectModel(CharacterDto.name)
    private readonly characterModel: Model<CharacterDto>,
  ) {}

  async create(characterData: CharacterDto) {
    const newCharacter = new this.characterModel(characterData);
    return await newCharacter.save();
  }

  async findByUserId(userId: string): Promise<CharacterDto[]> {
    return await this.characterModel
      .find({ userId })
      .populate('equipments')
      .exec();
  }

  async findByQuery(query: any): Promise<CharacterDto[]> {
    return await this.characterModel.find(query).populate('equipments').exec();
  }

  async findById(characterId: string): Promise<CharacterDto | null> {
    return await this.characterModel
      .findById(characterId)
      .populate('equipments')
      .exec();
  }

  async findAll(): Promise<CharacterDto[] | null> {
    return await this.characterModel.find().exec();
  }

  async update(
    characterId: string,
    updateCharacterData: CharacterDto,
  ): Promise<CharacterDto> {
    return this.characterModel
      .findByIdAndUpdate(characterId, updateCharacterData, { new: true })
      .exec();
  }

  async delete(characterId: string): Promise<void> {
    await this.characterModel.findByIdAndDelete(characterId).exec();
  }

  async deleteAll(): Promise<void> {
    await this.characterModel.deleteMany().exec();
  }
}
