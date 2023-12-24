import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EquipmentDto } from 'src/dtos';

@Injectable()
export class EquipmentRepository {
  constructor(
    @InjectModel(EquipmentDto.name)
    private readonly equipmentModel: Model<EquipmentDto>,
  ) {}

  async create(equipmentData: EquipmentDto) {
    const newEquipment = new this.equipmentModel(equipmentData);
    return await newEquipment.save();
  }

  async findById(equipmentId: string): Promise<EquipmentDto | null> {
    return await this.equipmentModel.findById(equipmentId).exec();
  }

  async findAll(): Promise<EquipmentDto[] | null> {
    return await this.equipmentModel.find().exec();
  }

  async update(
    equipmentId: string,
    updateEquipmentData: EquipmentDto,
  ): Promise<EquipmentDto> {
    return this.equipmentModel
      .findByIdAndUpdate(equipmentId, updateEquipmentData, { new: true })
      .exec();
  }

  async delete(equipmentId: string): Promise<void> {
    await this.equipmentModel.findByIdAndDelete(equipmentId).exec();
  }

  async deleteAll(): Promise<void> {
    await this.equipmentModel.deleteMany().exec();
  }
}
