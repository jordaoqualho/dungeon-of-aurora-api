import { IsNotEmpty, IsNumber } from 'class-validator';

export class Attributes {
  @IsNumber()
  @IsNotEmpty()
  strength: number;

  @IsNumber()
  @IsNotEmpty()
  dexterity: number;

  @IsNumber()
  @IsNotEmpty()
  constitution: number;

  @IsNumber()
  @IsNotEmpty()
  intelligence: number;

  @IsNumber()
  @IsNotEmpty()
  wisdom: number;

  @IsNumber()
  @IsNotEmpty()
  charisma: number;
}
