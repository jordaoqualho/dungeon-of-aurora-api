import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { EquipmentType } from 'src/types';

export class Equipment {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(EquipmentType)
  @IsNotEmpty()
  type: EquipmentType;

  @IsNumber()
  damage?: number;

  @IsString()
  description?: string;
}
