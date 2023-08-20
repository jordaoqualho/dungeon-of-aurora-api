import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { env } from 'src/config';
import { AuthModule } from './AuthModule';
import { UserModule } from './UserModule';

@Module({
  imports: [
    MongooseModule.forRoot(env.db_url),
    ConfigModule.forRoot({ isGlobal: true }),
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
