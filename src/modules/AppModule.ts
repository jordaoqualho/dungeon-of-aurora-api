import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { db_url } from 'src/config';
import { PlayerModule } from './PlayerModule';

@Module({
  imports: [
    MongooseModule.forRoot(db_url),
    ConfigModule.forRoot({ isGlobal: true }),
    PlayerModule,
  ],
})
export class AppModule {}
