import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtGuard } from './jwt/jwt.guard';
import { RoleGuard } from './role/role.guard';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, JwtGuard, RoleGuard],
  exports: [AuthService, JwtGuard, RoleGuard],
  controllers: [AuthController],
})
export class AuthModule {}
