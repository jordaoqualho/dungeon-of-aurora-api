import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SpellController } from 'src/controllers';
import { SpellDto, SpellSchema } from 'src/dtos';
import { SpellRepository } from 'src/repositories';
import { SpellService } from 'src/services';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: SpellDto.name, schema: SpellSchema }]),
  ],
  controllers: [SpellController],
  providers: [SpellService, SpellRepository],
  exports: [MongooseModule],
})
export class SpellModule {}
