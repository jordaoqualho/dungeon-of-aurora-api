import { IsBoolean, IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { Abilities, SkillType } from 'src/types';

export class Skills {
  @IsEnum(SkillType)
  @IsNotEmpty()
  skill: SkillType;

  @IsNumber()
  @IsNotEmpty()
  modifier: number;

  @IsEnum(Abilities)
  @IsNotEmpty()
  ability: Abilities;

  @IsBoolean()
  @IsNotEmpty()
  isProficient: boolean;
}
