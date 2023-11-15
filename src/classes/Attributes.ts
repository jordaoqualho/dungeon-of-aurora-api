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

export const defaultAttribute = {
  strength: 10,
  dexterity: 10,
  constitution: 10,
  intelligence: 10,
  wisdom: 10,
  charisma: 10,
};
