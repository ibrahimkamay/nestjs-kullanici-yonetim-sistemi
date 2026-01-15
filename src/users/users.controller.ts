import {
  Controller,
  Get,
  Post,
  Body,
  ValidationPipe,
  Param,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-users.dto';
import { UpdateUserDto } from './dto/update-users.dto';
import { JwtGuard } from 'src/auth/jwt/jwt.guard';
import { RoleGuard } from 'src/auth/role/role.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {} // dependency injection
  @Get()
  @UseGuards(JwtGuard)
  getUsers() {
    return this.usersService.getUsers();
  }
  @Get(':id')
  @UseGuards(JwtGuard)
  getUser(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }
  @Delete(':id')
  @UseGuards(JwtGuard)
  deleteUser(@Param('id') id: string) {
    return this.usersService.delete(id);
  }

  @Post()
  createUser(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }
  @Get('admin-only')
  @UseGuards(JwtGuard, RoleGuard)
  @Roles('ADMIN')
  getAdminData() {
    return { message: 'Bu sadece admin görebilir' };
  }
  @Patch(':id')
  @UseGuards(JwtGuard)
  updateUser(
    @Param('id') id: string,
    @Body(new ValidationPipe()) updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }
}
