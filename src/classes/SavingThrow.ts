import { IsNumber } from 'class-validator';

export class SavingThrow {
  @IsNumber()
  strengthSavingThrow: number;

  @IsNumber()
  dexteritySavingThrow: number;

  @IsNumber()
  constitutionSavingThrow: number;

  @IsNumber()
  intelligenceSavingThrow: number;

  @IsNumber()
  wisdomSavingThrow: number;

  @IsNumber()
  charismaSavingThrow: number;
}
