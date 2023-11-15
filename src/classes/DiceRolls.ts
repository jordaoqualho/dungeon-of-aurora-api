import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { Dices } from 'src/types';

export class DiceRolls {
  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @IsEnum(Dices)
  @IsNotEmpty()
  dice: Dices;
}
