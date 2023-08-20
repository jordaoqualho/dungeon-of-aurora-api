import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthProvider {
  constructor(private readonly jwtService: JwtService) {}
  private saltOrRounds = 10;

  public async encrypt(textToEncrypt: string): Promise<string> {
    return await bcrypt.hash(textToEncrypt, this.saltOrRounds);
  }

  public async comparePasswords(
    plainText: string,
    encryptedText: string,
  ): Promise<boolean> {
    return await bcrypt.compare(plainText, encryptedText);
  }

  public generateAccessToken(userId: string): string {
    return this.jwtService.sign({ sub: userId });
  }
}
