import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { Entity } from 'src/classes';
import { CharacterRaces, Classes, SkillType } from 'src/types';

export class CharacterDto extends Entity {
  @IsString()
  @IsNotEmpty()
  playerId: string;

  @IsEnum(Classes)
  @IsNotEmpty()
  class: Classes;

  @IsEnum(CharacterRaces)
  @IsNotEmpty()
  race: CharacterRaces;

  @IsEnum(SkillType, { each: true })
  skills: SkillType[];

  @IsString()
  equipment: string[];

  @IsNumber()
  @IsNotEmpty()
  gold: number;

  @IsString()
  @IsNotEmpty()
  quests: string[];

  @Min(1)
  @Max(20)
  @IsNotEmpty()
  @IsNumber()
  inspiration: number;
}
