import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-users.dto';
import { UpdateUserDto } from './dto/update-users.dto';
@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async getUsers() {
    return this.prisma.user.findMany();
  }
  async findOne(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }
  async update(id: string, data: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }
  async createUser(data: CreateUserDto) {
    return this.prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role || 'USER',
      },
    });
  }
}
