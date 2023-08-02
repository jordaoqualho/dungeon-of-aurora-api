import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { CastingTime, Duration, Range, SchoolOfMagic } from 'src/types';

export class SpellDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @Min(1)
  @Max(20)
  @IsNumber()
  @IsNotEmpty()
  level: number;

  @IsEnum(SchoolOfMagic)
  @IsNotEmpty()
  school: SchoolOfMagic;

  @IsEnum(CastingTime)
  @IsNotEmpty()
  castingTime: CastingTime;

  @IsEnum(Range)
  @IsNotEmpty()
  range: Range;

  @IsEnum(Duration)
  @IsNotEmpty()
  duration: Duration;

  @IsString()
  description: string;
}
