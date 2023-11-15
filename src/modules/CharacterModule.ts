import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CharacterController } from 'src/controllers';
import { CharacterDto, CharacterSchema } from 'src/dtos';
import { CharacterRepository } from 'src/repositories';
import { CharacterService } from 'src/services';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CharacterDto.name, schema: CharacterSchema },
    ]),
  ],
  controllers: [CharacterController],
  providers: [CharacterService, CharacterRepository],
  exports: [MongooseModule],
})
export class CharacterModule {}
