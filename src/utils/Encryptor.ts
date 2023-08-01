import * as bcrypt from 'bcryptjs';

export class Encryptor {
  private saltRounds = 10;

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, this.saltRounds);
  }
  async comparePasswords(hash: string, password: string): Promise<boolean> {
    return await bcrypt.compare(hash, password);
  }
}
