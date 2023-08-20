import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from 'src/config';
import { AuthController } from 'src/controllers';
import { AuthProvider, GuardModule } from 'src/providers';
import { UserRepository } from 'src/repositories';
import { AuthService } from 'src/services';
import { UserModule } from './UserModule';

export
@Module({
  imports: [JwtModule.register(jwtConfig), UserModule],
  controllers: [AuthController],
  providers: [UserRepository, AuthProvider, AuthService, GuardModule],
})
class AuthModule {}
