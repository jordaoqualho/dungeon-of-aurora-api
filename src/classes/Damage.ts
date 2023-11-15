import { Type } from 'class-transformer';
import { IsEnum, IsNotEmpty, ValidateNested } from 'class-validator';
import { DamageTypes } from 'src/types';
import { DiceRolls } from './DiceRolls';

export class DamageAtLevel {
  [level: string]: DiceRolls;
}

export class Damage {
  @IsNotEmpty()
  @IsEnum(DamageTypes)
  type: DamageTypes;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => DamageAtLevel)
  characterLevel: DamageAtLevel;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => DamageAtLevel)
  slotLevel: DamageAtLevel;
}
