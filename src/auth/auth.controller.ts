import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';

@Controller('auth')
@ApiTags('Authentication')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Kullanıcı girişi' })
  @ApiResponse({ status: 200, description: 'Login başarılı, token döner' })
  @ApiResponse({ status: 401, description: 'Geçersiz email veya şifre' })
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