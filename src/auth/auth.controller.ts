import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(
    @Body(new ValidationPipe())
    loginDto: {
      email: string;
      password: string;
    },
  ) {
    return this.authService.login(loginDto.email, loginDto.password);
  }
}
