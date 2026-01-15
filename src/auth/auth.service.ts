import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid email or password');
    }

    return {
      access_token: this.jwtService.sign(
        { sub: user.id, email: user.email, role: user.role },
        { secret: process.env.JWT_SECRET, expiresIn: '1h' },
      ),
    };
  }

  async validateUser(userId: string) {
    return this.usersService.findOne(userId);
  }
}