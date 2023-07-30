import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from 'src/app.controller';
import { AppService } from 'src/app.service';
import { db_url } from 'src/config';

@Module({
  imports: [
    MongooseModule.forRoot(db_url),
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
