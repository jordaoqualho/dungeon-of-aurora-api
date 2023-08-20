import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from 'src/controllers';
import { UserDto, UserSchema } from 'src/dtos';
import { UserRepository } from 'src/repositories';
import { UserService } from 'src/services';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserDto.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [MongooseModule],
})
export class UserModule {}
