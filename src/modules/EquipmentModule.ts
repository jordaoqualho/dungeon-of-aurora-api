import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EquipmentController } from 'src/controllers';
import { EquipmentDto, EquipmentSchema } from 'src/dtos';
import { EquipmentRepository } from 'src/repositories';
import { EquipmentService } from 'src/services';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: EquipmentDto.name, schema: EquipmentSchema },
    ]),
  ],
  controllers: [EquipmentController],
  providers: [EquipmentService, EquipmentRepository],
  exports: [MongooseModule],
})
export class EquipmentModule {}
