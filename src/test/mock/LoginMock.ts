import { Login } from 'src/classes';

export const mockLoginData = (): Login => ({
  email: 'jordaoqualho@gmail.com',
  password: 'jordaoqualho',
});

export const mockIncorrectLoginData = (): Login => ({
  email: 'invalid@example.com',
  password: 'wrongpassword',
});
