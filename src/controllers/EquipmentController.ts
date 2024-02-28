import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { EquipmentDto } from 'src/dtos';
import { Public } from 'src/providers';
import { EquipmentService } from 'src/services';

@Controller('equipment')
export class EquipmentController {
  constructor(private readonly equipmentService: EquipmentService) {}

  @Public()
  @Post()
  async createEquipment(@Body() payload: EquipmentDto) {
    return await this.equipmentService.createEquipment(payload);
  }

  @Public()
  @Get('/:equipmentId?')
  async findEquipment(
    @Param('equipmentId') equipmentId?: string,
  ): Promise<EquipmentDto | EquipmentDto[]> {
    if (equipmentId)
      return await this.equipmentService.findEquipmentById(equipmentId);
    return await this.equipmentService.findAllEquipment();
  }

  @Public()
  @Put('/:equipmentId')
  async updateEquipment(
    @Param('equipmentId') equipmentId: string,
    @Body() updateEquipmentData: EquipmentDto,
  ): Promise<EquipmentDto> {
    return this.equipmentService.updateEquipment(
      equipmentId,
      updateEquipmentData,
    );
  }

  // @Public()
  // @Post('/translate')
  // async translateEquipments() {
  //   return this.equipmentService.callIt();
  // }

  @Public()
  @Delete('/:equipmentId')
  async deleteEquipment(
    @Param('equipmentId') equipmentId: string,
  ): Promise<void> {
    return this.equipmentService.deleteEquipment(equipmentId);
  }

  @Delete()
  async deleteAllEquipments(): Promise<void> {
    return this.equipmentService.deleteAllEquipments();
  }
}
