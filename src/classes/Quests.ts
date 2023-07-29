import { IsNotEmpty, IsString } from 'class-validator';

export class Quest {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  status: string;

  @IsString()
  reward: string;
}
