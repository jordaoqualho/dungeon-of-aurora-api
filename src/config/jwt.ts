import { env } from './environment';

export const jwtConfig = {
  global: true,
  secret: env.jwtSecret,
  privateKey: env.jwtSecret,
  signOptions: { expiresIn: '1d' },
};
