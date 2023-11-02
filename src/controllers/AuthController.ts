import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { Login, LoginResponse } from 'src/classes';
import { Public } from 'src/providers';
import { AuthService } from 'src/services';

export
@Controller('auth')
class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  @HttpCode(200)
  async userLogin(@Body() loginData: Login): Promise<LoginResponse> {
    return await this.authService.userLogin(loginData);
  }
}
