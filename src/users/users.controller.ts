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
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-users.dto';
import { UpdateUserDto } from './dto/update-users.dto';
import { JwtGuard } from 'src/auth/jwt/jwt.guard';
import { RoleGuard } from 'src/auth/role/role.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  
  @Get()
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Tüm kullanıcıları listele' })
  @ApiResponse({ status: 200, description: 'Kullanıcı listesi' })
  @ApiResponse({ status: 401, description: 'Token gerekli' })
  getUsers() {
    return this.usersService.getUsers();
  }
  
  @Get(':id')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'ID ile kullanıcı getir' })
  @ApiResponse({ status: 200, description: 'Kullanıcı bulundu' })
  @ApiResponse({ status: 401, description: 'Token gerekli' })
  getUser(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }
  
  @Post()
  @ApiOperation({ summary: 'Yeni kullanıcı oluştur (Kayıt)' })
  @ApiResponse({ status: 201, description: 'Kullanıcı oluşturuldu' })
  @ApiResponse({ status: 400, description: 'Geçersiz veri' })
  createUser(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }
  
  @Patch(':id')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Kullanıcı bilgilerini güncelle' })
  @ApiResponse({ status: 200, description: 'Kullanıcı güncellendi' })
  @ApiResponse({ status: 401, description: 'Token gerekli' })
  updateUser(
    @Param('id') id: string,
    @Body(new ValidationPipe()) updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }
  
  @Delete(':id')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Kullanıcıyı sil' })
  @ApiResponse({ status: 200, description: 'Kullanıcı silindi' })
  @ApiResponse({ status: 401, description: 'Token gerekli' })
  deleteUser(@Param('id') id: string) {
    return this.usersService.delete(id);
  }
  
  @Get('admin-only')
  @UseGuards(JwtGuard, RoleGuard)
  @Roles('ADMIN')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Admin paneli (Sadece ADMIN)' })
  @ApiResponse({ status: 200, description: 'Admin erişimi başarılı' })
  @ApiResponse({ status: 401, description: 'Token gerekli' })
  @ApiResponse({ status: 403, description: 'Sadece admin erişebilir' })
  getAdminData() {
    return { message: 'Bu sadece admin görebilir' };
  }
}