import { Injectable } from '@nestjs/common';
import { EquipmentRepository } from 'src/repositories';
import { EquipmentDto } from '../dtos/EquipmentDto';

@Injectable()
export class EquipmentService {
  constructor(private readonly equipmentRepository: EquipmentRepository) {}

  async createEquipment(equipmentData: EquipmentDto) {
    return await this.equipmentRepository.create(equipmentData);
  }

  async findEquipmentById(equipmentId: string): Promise<EquipmentDto> {
    return await this.equipmentRepository.findById(equipmentId);
  }

  async findAllEquipment(): Promise<EquipmentDto[]> {
    return await this.equipmentRepository.findAll();
  }

  async updateEquipment(
    equipmentId: string,
    updateEquipmentData: EquipmentDto,
  ): Promise<EquipmentDto> {
    return await this.equipmentRepository.update(
      equipmentId,
      updateEquipmentData,
    );
  }

  async deleteEquipment(equipmentId: string): Promise<void> {
    return await this.equipmentRepository.delete(equipmentId);
  }

  async deleteAllEquipments(): Promise<void> {
    return await this.equipmentRepository.deleteAll();
  }
}
