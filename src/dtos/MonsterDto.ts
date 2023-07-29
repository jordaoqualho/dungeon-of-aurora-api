import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { MonsterRaces } from '../types';
import { Entity } from 'src/classes';

export class MonsterDto extends Entity {
  @IsEnum(MonsterRaces)
  @IsNotEmpty()
  race: MonsterRaces;

  @IsNumber()
  challengeRating: number;

  @IsString()
  description: string;

  @IsString({ each: true })
  senses: string[];

  @IsNumber()
  passivePerception: number;

  @IsNumber()
  challengeExperience: number;
}
