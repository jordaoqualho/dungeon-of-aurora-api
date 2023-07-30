import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlayerController } from 'src/controllers';
import { PlayerDto, PlayerSchema } from 'src/dtos';
import { PlayerRepository } from 'src/repositories';
import { PlayerService } from 'src/services';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: PlayerDto.name, schema: PlayerSchema }]),
  ],
  controllers: [PlayerController],
  providers: [PlayerService, PlayerRepository],
  exports: [MongooseModule],
})
export class PlayerModule {}
