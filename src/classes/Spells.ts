import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';
import {
  CastingTime,
  Classes,
  Duration,
  Range,
  SchoolOfMagic,
} from 'src/types';
import { Damage } from './Damage';

export class Spells {
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

  @IsString()
  upgrade: string;

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

  @IsBoolean()
  ritual: boolean;

  @IsBoolean()
  concentration: boolean;

  @IsEnum(Classes)
  @IsNotEmpty()
  classes: string;

  damage: Damage;
}
