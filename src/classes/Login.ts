import { UserDto } from 'src/dtos';

export class Login {
  email: string;
  password: string;
}

export class LoginResponse {
  access_token: string;
  user: UserDto;
}
