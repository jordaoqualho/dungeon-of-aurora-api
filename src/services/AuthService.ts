import { BadRequestException, Injectable } from '@nestjs/common';
import { Login, Token } from 'src/classes';
import { AuthProvider } from 'src/providers';
import { UserRepository } from 'src/repositories';

export
@Injectable()
class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly authProvider: AuthProvider,
  ) {}

  async userLogin({ email, password: loginPassword }: Login): Promise<Token> {
    const foundUser = await this.userRepository.findByEmail(email);

    if (!foundUser) throw new BadRequestException('Email not found');

    const isPasswordValid = await this.authProvider.comparePasswords(
      loginPassword,
      foundUser.password,
    );

    if (!isPasswordValid) throw new BadRequestException('Invalid password');
    return {
      access_token: this.authProvider.generateAccessToken(foundUser.password),
    };
  }
}
