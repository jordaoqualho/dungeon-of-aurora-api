import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { Classes } from 'src/types';

export class Features {
  @IsString()
  @IsNotEmpty()
  name: string;

  @Min(1)
  @Max(20)
  @IsNumber()
  @IsNotEmpty()
  level: number;

  @IsString()
  description: string;

  @IsEnum(Classes)
  @IsNotEmpty()
  classes: string;
}
