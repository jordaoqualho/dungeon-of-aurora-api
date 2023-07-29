import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { Attributes, SavingThrow } from 'src/classes';
import { Alignment, Language, Status } from 'src/types';

export class Entity {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  attributes: Attributes;

  @IsNumber()
  armorClass: number;

  @IsNumber()
  speed: number;

  @IsString()
  @IsNotEmpty()
  alignment: Alignment;

  @Min(1)
  @Max(20)
  @IsNotEmpty()
  @IsNumber()
  level: number;

  @IsNumber()
  @IsNotEmpty()
  experience: number;

  @IsNumber()
  @IsNotEmpty()
  hitPoints: number;

  @IsNumber()
  @IsNotEmpty()
  maxHitPoints: number;

  @IsEnum(Status, { each: true })
  @IsNotEmpty()
  status: Status[];

  @IsEnum(Language, { each: true })
  @IsNotEmpty()
  languages: Language[];

  @IsNotEmpty()
  savingThrow: SavingThrow;
}
