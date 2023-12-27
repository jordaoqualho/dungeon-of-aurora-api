import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Pieces } from 'src/types';

export class Cost {
  @IsNotEmpty()
  @IsString()
  quantity: string;

  @IsNotEmpty()
  @IsEnum(Pieces)
  unit: Pieces;
}
