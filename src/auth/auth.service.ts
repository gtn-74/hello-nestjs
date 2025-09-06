import { CreateUserDto } from './dto/create-user.dto';
import { Injectable } from '@nestjs/common';
import { User } from 'generated/prisma';
import bcrypt from 'node_modules/bcryptjs';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  // private は、このクラスのみでアクセスできる的な意味らしい
  constructor(private readonly prismaService: PrismaService) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { name, email, password, status } = createUserDto;

    // passwordのハッシュ化
    const hashedPassword = await bcrypt.hash(password, 10);

    // statusどうするの??
    return await this.prismaService.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        status,
      },
    });
  }
}
