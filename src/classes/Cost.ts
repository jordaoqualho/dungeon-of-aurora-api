import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class Cost {
  @IsNotEmpty()
  @IsString()
  quantity: string;

  @IsNotEmpty()
  @IsNumber()
  unit: number;
}
