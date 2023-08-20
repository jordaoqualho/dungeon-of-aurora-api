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
    const { password: userPassword } = await this.userRepository.findByEmail(
      email,
    );
    if (!userPassword) throw new BadRequestException('Email not found');

    const isPasswordValid = await this.authProvider.compare(
      loginPassword,
      userPassword,
    );

    if (!isPasswordValid) throw new BadRequestException('Invalid password');
    return { access_token: this.authProvider.generateJwtToken(userPassword) };
  }
}
